let picInPicIcon = `<svg version="1.1" id="Picture_in_Picture" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><style type="text/css">.st0 {fill:#FFFFFF;}</style><g><title>Picture In Picture</title><g id="XMLID_6_"><path id="XMLID_11_" class="st0" d="M19.6,11.2h-8.9v6.4h8.8L19.6,11.2L19.6,11.2z M23.9,19.8v-15c0-1.2-1-2.1-2.2-2.1H1.9c-1.2,0-2.2,0.9-2.2,2.1v15c0,1.2,1,2.1,2.2,2.1h19.9C22.9,21.9,23.9,21,23.9,19.8z M21.7,19.8H1.9v-15h19.9V19.8z"/></g></g></svg>`
let picInPicIcon2 = `<svg viewBox="1 1 21 21" width="24" height="24" id="pip2" fill="none" xmlns="http://www.w3.org/2000/svg" style="fill: rgb(175, 175, 175)"><path d="M16 12.75C16.4142 12.75 16.75 12.4142 16.75 12C16.75 11.5858 16.4142 11.25 16 11.25C15.5858 11.25 15.25 11.5858 15.25 12C15.25 12.4142 15.5858 12.75 16 12.75Z" /><path d="M8 10.5C8 9.67157 8.67157 9 9.5 9H17.5C18.3284 9 19 9.67157 19 10.5V15.5C19 16.3284 18.3284 17 17.5 17H9.5C8.67157 17 8 16.3284 8 15.5V10.5ZM9.5 10.5V14.8942L11.5815 12.6392C12.0764 12.103 12.9235 12.103 13.4185 12.6392L16.0511 15.4912L16.0416 15.5H17.5V10.5H9.5ZM12.5 13.8556L10.9821 15.5H14.0178L12.5 13.8556Z" /><path d="M5.75 4C3.67893 4 2 5.67893 2 7.75V16.25C2 18.3211 3.67893 20 5.75 20H18.25C20.3211 20 22 18.3211 22 16.25V7.75C22 5.67893 20.3211 4 18.25 4H5.75ZM3.5 7.75C3.5 6.50736 4.50736 5.5 5.75 5.5H18.25C19.4926 5.5 20.5 6.50736 20.5 7.75V16.25C20.5 17.4926 19.4926 18.5 18.25 18.5H5.75C4.50736 18.5 3.5 17.4926 3.5 16.25V7.75Z" /></svg>`
const MAX_TRIES_MONITOR_SKIP = 10
let isMonitorActive = false
let isIconActive = false
let isNewPipActive = false

function initContent() {
    startMonitoringForVideo(0)
}

initContent()

function eraseIcon() {
    let modals = document.querySelectorAll('.pipExtension')
    if (modals.length > 0) {
        modals.forEach(modal => {
            modal.remove()
        })
    }
}

//hbo
function createIcon() {
    eraseIcon()
    let modal = document.createElement('div')
    let modal2 = document.createElement('div')
    const createSmallPopup = async() => {
        const iconFrameHBO = document.querySelector('[data-testid="MlpButton"]')
        iconFramePrime = await document.querySelector('.atvwebplayersdk-hideabletopbuttons-container')
        if (iconFrameHBO && document.querySelector('#root')) {
            modal.innerHTML = picInPicIcon
            modal.classList.add('ontopPipHBO')
            modal.classList.add('pipExtension')
            modal.style.width = '26px'
            modal2.innerHTML = picInPicIcon2
            modal2.classList.add('ontopPipHBO')
            modal2.classList.add('pipExtension')
            iconFrameHBO.parentElement.insertBefore(modal, iconFrameHBO.parentElement.firstChild)
            iconFrameHBO.parentElement.insertBefore(modal2, iconFrameHBO.parentElement.firstChild)
            isIconActive = true
        }
    }
    createSmallPopup()

    modal.addEventListener('click', () => {
        let video = document.querySelector('video')
        // creating picture in picture
        if ('pictureInPictureEnabled' in document) {
            video.disablePictureInPicture = false
            if (document.pictureInPictureElement) {
                document.exitPictureInPicture().then(() => {
                    video.play()
                }).catch(err => {
                    console.log(err)
                })
                return
            }
            video.requestPictureInPicture()
                .then(() => {
                    document.pictureInPictureElement.duration = ''
                    navigator.mediaSession.setActionHandler('play', function() {
                        video.play()
                    })
                    navigator.mediaSession.setActionHandler('pause', function() {
                        video.pause()
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    })

    modal2.addEventListener('click', async () => {
        isNewPipActive = true
        const playerElem = document.querySelector('#root')
        const newWindow = await documentPictureInPicture.requestWindow({
          width: playerElem.clientWidth / 2,
          height: playerElem.clientHeight / 2
        })
        const styleSheetsArr = [...document.styleSheets]
        styleSheetsArr.forEach((styleSheet) => {
            try {
                const cssRules = [...styleSheet.cssRules].map(rule => rule.cssText).join('')
                const style = document.createElement('style')
                style.textContent = cssRules
                newWindow.document.head.appendChild(style)
            } catch (e) {
                const link = document.createElement('link')
                link.rel = 'stylesheet'
                link.type = styleSheet.type
                link.media = styleSheet.media
                link.href = styleSheet.href
                newWindow.document.head.appendChild(link)
            }
        })
        newWindow.document.body.append(playerElem)
        // custom
        const videoContainer = newWindow.document.querySelector('#rn-video')
        if (videoContainer) {
            videoContainer.style.height = '100vh'
            videoContainer.style.width = '100vw'
        }
        const pipBtns = newWindow.document.querySelectorAll('.pipExtension')
        pipBtns.forEach(pipBtn => {
            pipBtn.remove()
        })
        const backbtn = newWindow.document.querySelector('[data-testid="BackButton"]')
        if (backbtn) {
            backbtn.style.display = 'none'
        }
        const volumeSlider = newWindow.document.querySelector('[data-testid="VolumeControlSlider"]')
        if (volumeSlider) {
            volumeSlider.style.display = 'none'
        }
        monitoringSubtitles(newWindow)

        newWindow.addEventListener("pagehide", e => {
            const playerContainer = document.querySelector('body')
            const player = e.target.querySelector('#root')
            playerContainer.append(player)
            isNewPipActive = false
        })
    })
}

// only max
function initiateIconMax() {
    const video = document.querySelector('video')
    const fullScreenBtn = document.querySelector('[data-testid="player-ux-fullscreen-button"]')
    const pipBtn = document.querySelector('.pipExtension')
    if (video && fullScreenBtn && !pipBtn) {
        createIconMax()
    }
}

// only max
function createIconMax() {
    let modal = document.createElement('div')
    let modal2 = document.createElement('div')
    const createSmallPopup = () => {
        const iconFrame = document.querySelector('[data-testid="player-ux-fullscreen-button"]').parentElement
        if (iconFrame) {
        modal.innerHTML = `<div class="juKjkd">${picInPicIcon}</div>`
        modal.classList.add('pipExtension')
        modal.classList.add('krazvC')

        modal2.innerHTML = `<div class="juKjkd">${picInPicIcon2}</div>`
        modal2.classList.add('pipExtension')
        modal2.classList.add('krazvC')
        if (iconFrame) {
            iconFrame.insertBefore(modal, iconFrame.firstChild)
            iconFrame.insertBefore(modal2, iconFrame.firstChild)
        }
        }
    }
    createSmallPopup()

    modal.addEventListener('click', () => {
        let video = document.querySelector('video')
            // creating picture in picture
        if ('pictureInPictureEnabled' in document) {
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture().catch(err => {
                console.log(err)
            })
            return
        }
        video.requestPictureInPicture().catch(err => {
            console.log(err)
        })
        }
    })

    modal2.addEventListener('click', async () => {
        isNewPipActive = true
        const playerElem = document.querySelector('#app-root')
        const newWindow = await documentPictureInPicture.requestWindow({
        width: playerElem.clientWidth / 2,
        height: playerElem.clientHeight > 0 ? playerElem.clientHeight / 2 : playerElem.clientWidth / 3
        })
        const styleSheetsArr = [...document.styleSheets]
        styleSheetsArr.forEach((styleSheet) => {
            try {
                const cssRules = [...styleSheet.cssRules].map(rule => rule.cssText).join('')
                const style = document.createElement('style')
                style.textContent = cssRules
                newWindow.document.head.appendChild(style)
            } catch (e) {
                const link = document.createElement('link')
                link.rel = 'stylesheet'
                link.type = styleSheet.type
                link.media = styleSheet.media
                link.href = styleSheet.href
                newWindow.document.head.appendChild(link)
            }
        })
        newWindow.document.body.append(playerElem)
        // custiom
        const pipBtns = newWindow.document.querySelectorAll('.pipExtension')
        pipBtns.forEach(pipBtn => {
            pipBtn.remove()
        })
        // const trackElem = newWindow.document.querySelector('[data-testid="player-ux-scrubber-track"]')
        // trackElem.style.top = '-11.5px'
        const exitBtns = Array.from(newWindow.document.querySelectorAll('[data-testid="player-ux-back-button"]'))
        exitBtns.forEach(exitBtn => {
        exitBtn.style.display = 'none'
        })
        const fullscreenBtn = newWindow.document.querySelector('[data-testid="player-ux-fullscreen-button"]')
        fullscreenBtn.style.display = 'none'
        monitoringSubtitlesMax(newWindow)
        const volumeBtn = newWindow.document.querySelector('[data-testid="volume-container"]')
        volumeBtn ? volumeBtn.style.marginRight = '10px' : null

        newWindow.addEventListener("pagehide", e => {
        isNewPipActive = false
        const playerContainer = document.querySelector('body')
        const player = e.target.querySelector('#app-root')
        playerContainer.append(player)
        // custom
        // const trackElemMain = document.querySelector('[data-testid="player-ux-scrubber-track"]')
        // trackElemMain ? trackElemMain.style.top = '-23.5px' : null
        const exitBtnsMain = Array.from(document.querySelectorAll('[data-testid="player-ux-back-button"]'))
        if (exitBtnsMain.length > 0) {
            exitBtnsMain.forEach(exitBtn => {
            exitBtn.style.display = ''
            })
        }
        const fullscreenBtnMain = document.querySelector('[data-testid="player-ux-fullscreen-button"]')
        fullscreenBtnMain ? fullscreenBtnMain.style.display = '' : null
        const volumeBtn = document.querySelector('[data-testid="volume-container"]')
        volumeBtn ? volumeBtn.style.marginRight = '' : null
        })
    })
}


function startMonitoringForVideo(numTries) {
    numTries++
    const monitor = new MutationObserver(() => {
        let video = document.querySelector("video")
        let hboCase = document.querySelector('#root')
        let maxCase = document.querySelector('#app-root')
        let pipIcon = document.querySelector('.pipExtension')
        if (video && hboCase && isIconActive == false) {
            createIcon()
        } else if (video && maxCase && isIconActive == false) {
            initiateIconMax()
        } else if (!video || (video && !pipIcon)) {
            eraseIcon()
            isIconActive = false
        }
    })

    let reactEntry = document.querySelector("body")
    if (reactEntry) {
        if (isMonitorActive == false) {
            monitor.observe(reactEntry, {
                attributes: false,
                childList: true,
                subtree: true
            })
            isMonitorActive = true
        } else {
            return
        }

    } else {
        if (numTries > MAX_TRIES_MONITOR_SKIP) { return }
        setTimeout(() => {
            startMonitoringForVideo(numTries)
        }, 100 * numTries)
    }
}

function monitoringSubtitles(newWindow) {
    const monitor = new MutationObserver(() => {
      const captionsElem = newWindow.document.querySelector('[data-testid="CueBoxContainer"]')
      const fullScreenBtn = newWindow.document.querySelector('[data-testid="EnterFullscreenButton"]')
      const backbtn = newWindow.document.querySelector('[data-testid="BackButton"]')
      if (backbtn) {
        backbtn.style.display = 'none'
      }
      if (captionsElem) {
        captionsElem.style.height = '100vh'
        captionsElem.style.width = '100vw'
        captionsElem.style.left = '0'
        if (captionsElem.children[0] && captionsElem.children[0].children[0]) {
          captionsElem.children[0].style.width = '100%'
          captionsElem.children[0].style.bottom = '5%'
          captionsElem.children[0].style.left = '0'
          captionsElem.children[0].style.top = 'auto'
          let captionsSmallContainers = Array.from(captionsElem.children[0].children[0].children)
          captionsSmallContainers.forEach(elem => {
            elem.style.fontSize = '20px'
          })
        }
      }
      if (fullScreenBtn) {
        fullScreenBtn.style.display = 'none'
      }
      const volumeSlider = newWindow.document.querySelector('[data-testid="VolumeControlSlider"]')
      if (volumeSlider) {
        volumeSlider.style.display = 'none'
      }
      const video = newWindow.document.querySelector('video')
      if (video) {
        let timeToEnd = Number(video.duration - video.currentTime)
        if (timeToEnd < 10) {
          monitor.disconnect()
          newWindow.close()
        }
      }
      if (!isNewPipActive) {
        monitor.disconnect()
      }
    })
    const observerObject = newWindow.document.querySelector('body')
    monitor.observe(observerObject, {
      attributes: true,
      childList: true,
      subtree: true,
    })
  }

  function monitoringSubtitlesMax(newWindow) {
    const monitorMax = new MutationObserver(() => {
      // const captionsElemContainer = newWindow.document.querySelector('[data-testid="caption_renderer_overlay"]')
      const video = newWindow.document.querySelector('video')
      if (!video) {
        newWindow.close()
        monitorMax.disconnect()
        return
      }
      const captionsElems = Array.from(newWindow.document.querySelectorAll('[class*="TextCue-Beam-Web-Ent"]'))
      if (captionsElems.length > 0) {
        captionsElems.forEach(captionsElem => {
          captionsElem.style.color = 'white'
          captionsElem.style.background = '#00000088'
          captionsElem.style.padding = '4px'
          captionsElem.style.fontSize = '20px'
        })
      }
      const volumeSlider = newWindow.document.querySelector('[data-testid="volume-scrubber"]')
      if (volumeSlider) {
        volumeSlider.style.display = 'none'
      }
      if (!isNewPipActive) {
        monitorMax.disconnect()
      }
    })
    const observerObject = newWindow.document.querySelector('body')
    monitorMax.observe(observerObject, {
      attributes: true,
      childList: true,
      subtree: true,
    })
  }