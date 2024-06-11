let picInPicIcon = `<svg version="1.1" id="Warstwa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><style type="text/css">.st0 {fill:#FFFFFF;}</style><g><title>Picture In Picture</title><g id="XMLID_6_"><path id="XMLID_11_" class="st0" d="M19.6,11.2h-8.9v6.4h8.8L19.6,11.2L19.6,11.2z M23.9,19.8v-15c0-1.2-1-2.1-2.2-2.1H1.9c-1.2,0-2.2,0.9-2.2,2.1v15c0,1.2,1,2.1,2.2,2.1h19.9C22.9,21.9,23.9,21,23.9,19.8z M21.7,19.8H1.9v-15h19.9V19.8z"/></g></g></svg>`
let picInPicIcon2 = `<svg viewBox="1 1 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 12.75C16.4142 12.75 16.75 12.4142 16.75 12C16.75 11.5858 16.4142 11.25 16 11.25C15.5858 11.25 15.25 11.5858 15.25 12C15.25 12.4142 15.5858 12.75 16 12.75Z" fill="#ffffff"/><path d="M8 10.5C8 9.67157 8.67157 9 9.5 9H17.5C18.3284 9 19 9.67157 19 10.5V15.5C19 16.3284 18.3284 17 17.5 17H9.5C8.67157 17 8 16.3284 8 15.5V10.5ZM9.5 10.5V14.8942L11.5815 12.6392C12.0764 12.103 12.9235 12.103 13.4185 12.6392L16.0511 15.4912L16.0416 15.5H17.5V10.5H9.5ZM12.5 13.8556L10.9821 15.5H14.0178L12.5 13.8556Z" fill="#ffffff"/><path d="M5.75 4C3.67893 4 2 5.67893 2 7.75V16.25C2 18.3211 3.67893 20 5.75 20H18.25C20.3211 20 22 18.3211 22 16.25V7.75C22 5.67893 20.3211 4 18.25 4H5.75ZM3.5 7.75C3.5 6.50736 4.50736 5.5 5.75 5.5H18.25C19.4926 5.5 20.5 6.50736 20.5 7.75V16.25C20.5 17.4926 19.4926 18.5 18.25 18.5H5.75C4.50736 18.5 3.5 17.4926 3.5 16.25V7.75Z" fill="#ffffff"/></svg>`
const MAX_TRIES_MONITOR_SKIP = 10
let isMonitorActive = false
let isIconActive = false
let isPiPActive = false

function initContent() {
    startMonitoringForVideo(0)
}

initContent()

function eraseIcon() {
    let modals = document.querySelectorAll('.ontop')
    if (modals.length > 0) {
        modals.forEach(modal => {
            modal.remove()
        })
    }
    isIconActive = false
}

function createIcon() {
    eraseIcon()
    let modal = document.createElement('div')
    let modal2 = document.createElement('div')
    let iconFrames
    const createSmallPopup = async() => {
        // iconFrame = await document.querySelector('.fe39tpk')
        iconFrames = document.querySelectorAll('.atvwebplayersdk-hideabletopbuttons-container')
        iconFrames.forEach(iconFrame => {
            if (iconFrame) {
                modal.innerHTML = picInPicIcon
                modal.classList.add('ontop')
                modal.children[0].classList.add('fpp3az0')
                modal.children[0].classList.add('f989gul')
    
                modal2.innerHTML = picInPicIcon2
                modal2.classList.add('ontop')
                modal2.children[0].classList.add('fpp3az0')
                modal2.children[0].classList.add('f989gul')
                if (iconFrame) {
                    iconFrame.firstChild.insertBefore(modal, iconFrame.children[0].firstChild)
                    iconFrame.firstChild.insertBefore(modal2, iconFrame.children[0].firstChild)
                }
                isIconActive = true
            }
        })
    }
    createSmallPopup()

    modal2.addEventListener('click', async () => {
        const xRaySidebarCloseBtn = document.querySelector('[aria-label="Close X-Ray"]')
        xRaySidebarCloseBtn ? xRaySidebarCloseBtn.click() : null
        const playerElem = document.querySelector('#dv-web-player')
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
        const pipBtns = newWindow.document.querySelectorAll('.ontop')
        pipBtns.forEach(pipBtn => {
            pipBtn.remove()
        })
        isIconActive = false
        const closeBtn = newWindow.document.querySelector('[class*="closebutton"]')
        closeBtn.style.display = 'none'
        const fullscreenBtns = Array.from(newWindow.document.querySelectorAll('button[class*="fullscreen"]'))
        fullscreenBtns.forEach(btn => {
            btn.style.display = 'none'
        })
        const playBtn = newWindow.document.querySelector('button[class*="playpause-button"]')
        playBtn.addEventListener('click', () => {
            const video = newWindow.document.querySelector('video')
            if (!video) return
            if (video.paused) {
                video.play()
            } else {
                video.pause()
            }
        })
        const adjustBtns = newWindow.document.querySelectorAll('button[class*=atvwebplayersdk-fast]')
        adjustBtns.forEach(btn => {
            btn.style.display = 'none'
        })

        // for video ends...
        monitorForEndVideo(newWindow)

        newWindow.addEventListener('pagehide', e => {
            const playerContainer = document.querySelector('body')
            const player = e.target.querySelector('#dv-web-player')
            playerContainer.append(player)
            const closeBtnMain = document.querySelector('[class*="closebutton"]')
            closeBtnMain.style.display = ''
            const fullscreenBtnsMain = Array.from(document.querySelectorAll('button[class*="fullscreen"]'))
            fullscreenBtnsMain.forEach(btn => {
                btn.style.display = ''
            })
            const adjustBtnsMain = document.querySelectorAll('button[class*=atvwebplayersdk-fast]')
            adjustBtnsMain.forEach(btn => {
                btn.style.display = ''
            })
            const xRayelemMain = document.querySelector('.xrayQuickView')
            if (xRayelemMain) {
                xRayelemMain.style.display = ''
            }
        })
    })

    modal.addEventListener('click', async () => {
        let videos = document.querySelectorAll('.rendererContainer video')
        videos.forEach(video => {
            if (video.style.display != 'none') {
                // creating picture in picture
                if ('pictureInPictureEnabled' in document) {
                    if (document.pictureInPictureElement) {
                        document.exitPictureInPicture().then(() => {
                            isPiPActive = false
                        }).catch(err => {
                            console.log(err)
                        })
                        return
                    }
                    video.requestPictureInPicture().then(() => {
                        isPiPActive = true
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }
        })
    })
}

function startMonitoringForVideo(numTries) {
    numTries++
    const monitor = new MutationObserver(() => {
        let videos = document.querySelectorAll('video:not(.tst-video-overlay-player-html5)')
        let modal = document.querySelector('.ontop')
        videos.forEach(video => {
            if (video && isIconActive == false && video.src && video.src != '') {
                createIcon()
                console.log('icon created')
                console.log(video)
            } 
        })
        if (modal && !document.querySelector('video:not(.tst-video-overlay-player-html5)')) {
            eraseIcon()
            isIconActive = false
        }
    })

    let reactEntry = document.querySelector("#dv-web-player")
    if (reactEntry) {
        if (isMonitorActive == false) {
            monitor.observe(reactEntry, {
                attributes: true,
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

function monitorForEndVideo(newWindow) {
    const videoTimeInterval = setInterval(() => {
        const video = newWindow.document.querySelector('video')
        if (video) {
            let xRayelem = newWindow.document.querySelector('.xrayQuickView')
            if (xRayelem) {
                xRayelem.style.display = 'none'
            }
            let timeToEnd = Number(video.duration - video.currentTime)
            console.log(timeToEnd)
            if (timeToEnd < 5) {
                let nextepisodeBtn = newWindow.document.querySelector('button.atvwebplayersdk-nexttitle-button')
                if (nextepisodeBtn) {
                    nextepisodeBtn.click()
                    clearInterval(videoTimeInterval)
                    monitorForEndVideo(newWindow)
                } else {
                    newWindow.close()
                    clearInterval(videoTimeInterval)
                }
            }
        }
    },1000)
}