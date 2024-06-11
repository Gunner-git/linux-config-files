let picInPicIcon = `<svg version="1.1" id="Picture_in_Picture" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><style type="text/css">.st0 {fill:#FFFFFF;}</style><g><title>Picture In Picture</title><g id="XMLID_6_"><path id="XMLID_11_" class="st0" d="M19.6,11.2h-8.9v6.4h8.8L19.6,11.2L19.6,11.2z M23.9,19.8v-15c0-1.2-1-2.1-2.2-2.1H1.9c-1.2,0-2.2,0.9-2.2,2.1v15c0,1.2,1,2.1,2.2,2.1h19.9C22.9,21.9,23.9,21,23.9,19.8z M21.7,19.8H1.9v-15h19.9V19.8z"/></g></g></svg>`
let picInPicIcon2 = `<svg viewBox="1 1 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 12.75C16.4142 12.75 16.75 12.4142 16.75 12C16.75 11.5858 16.4142 11.25 16 11.25C15.5858 11.25 15.25 11.5858 15.25 12C15.25 12.4142 15.5858 12.75 16 12.75Z" fill="#ffffff"/><path d="M8 10.5C8 9.67157 8.67157 9 9.5 9H17.5C18.3284 9 19 9.67157 19 10.5V15.5C19 16.3284 18.3284 17 17.5 17H9.5C8.67157 17 8 16.3284 8 15.5V10.5ZM9.5 10.5V14.8942L11.5815 12.6392C12.0764 12.103 12.9235 12.103 13.4185 12.6392L16.0511 15.4912L16.0416 15.5H17.5V10.5H9.5ZM12.5 13.8556L10.9821 15.5H14.0178L12.5 13.8556Z" fill="#ffffff"/><path d="M5.75 4C3.67893 4 2 5.67893 2 7.75V16.25C2 18.3211 3.67893 20 5.75 20H18.25C20.3211 20 22 18.3211 22 16.25V7.75C22 5.67893 20.3211 4 18.25 4H5.75ZM3.5 7.75C3.5 6.50736 4.50736 5.5 5.75 5.5H18.25C19.4926 5.5 20.5 6.50736 20.5 7.75V16.25C20.5 17.4926 19.4926 18.5 18.25 18.5H5.75C4.50736 18.5 3.5 17.4926 3.5 16.25V7.75Z" fill="#ffffff"/></svg>`
let playIcon = `<svg class="svg-icon" style="width: 5em; height: 5em;vertical-align: middle;fill: currentColor;overflow: hidden; cursor: pointer;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M256 832c-11.712 0-23.36-3.2-33.664-9.536A64.170667 64.170667 0 0 1 192 768V256c0-22.208 11.52-42.816 30.336-54.464a64.298667 64.298667 0 0 1 62.272-2.816l512 256a64.064 64.064 0 0 1 0 114.56l-512 256c-8.96 4.48-18.88 6.72-28.608 6.72z" fill="white" /></svg>`
let pauseIcon = `<svg class="svg-icon" style="width: 5em; height: 5em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><g fill="white"><path d="M735.059262 155.203828c-3.090385 0-115.797329 0-118.887714 0-19.643386 0-35.567054 15.923668-35.567054 35.567054 0 3.090385 0 639.366829 0 642.457214 0 19.643386 15.923668 35.567054 35.567054 35.567054 3.090385 0 115.797329 0 118.887714 0 19.643386 0 35.567054-15.923668 35.567054-35.567054 0-3.090385 0-639.366829 0-642.457214C770.626315 171.128519 754.702648 155.203828 735.059262 155.203828z"  /><path d="M407.828452 155.203828c-3.090385 0-115.797329 0-118.887714 0-19.643386 0-35.567054 15.923668-35.567054 35.567054 0 3.090385 0 639.366829 0 642.457214 0 19.643386 15.923668 35.567054 35.567054 35.567054 3.090385 0 115.797329 0 118.887714 0 19.643386 0 35.567054-15.923668 35.567054-35.567054 0-3.090385 0-639.366829 0-642.457214C443.395506 171.128519 427.471838 155.203828 407.828452 155.203828z"/></g></svg>`
const MAX_TRIES_MONITOR_SKIP = 10
let isMonitorActive = false
let isIconActive = false
let isPiPActive = false
let isNewPipActive = null

function initContent() {
    startMonitoringForVideo(0)
}

initContent()

function startMonitoringForVideo(numTries) {
    numTries++
    const monitor = new MutationObserver(() => {
        let video = document.querySelector('video')
        let videoplay = document.querySelector('[data-uia="control-play-pause-play"]')
        iconFrame = document.querySelector('[data-uia="control-audio-subtitle"]')
        if (video && iconFrame && isIconActive == false) {
            createIcon()
            isIconActive = true
        } else if (!video || !iconFrame) {
            eraseIcon()
            isIconActive = false
        }
        if (videoplay) {
            videoplay.addEventListener('click', () => {
                let videoObj = document.querySelector('video')
                videoObj.play()
            })            
        }
    })

    let entryPoint = document.querySelector('body')
    if (entryPoint) {
        if (isMonitorActive == false) {
            monitor.observe(entryPoint, {
                atttibutes: false,
                childList: true,
                subtree: true
            })
            isMonitorActive = true
        } else {
            return
        }
    } else {
        if (numTries > MAX_TRIES_MONITOR_SKIP) return
        setTimeout(() => {
            startMonitoringForVideo(numTries)
        }, 100* numTries)
    }
}

function eraseIcon() {
    let modals = document.querySelectorAll('.ontopN')
    if (modals.length > 0) {
        modals.forEach(modal => {
            modal.remove()
        })
    }
}

function createIcon() {
    let modal = document.createElement('div')
    let modal2 = document.createElement('div')
    let iconFrame
    const createSmallPopup = async() => {
        iconFrame = await document.querySelector('[data-uia="control-audio-subtitle"]')
        if (iconFrame) {
            modal.innerHTML = picInPicIcon
            modal.classList.add('ontopN')

            modal2.innerHTML = picInPicIcon2
            modal2.classList.add('ontopN')
            if (iconFrame) {
                iconFrame.parentElement.parentElement.insertBefore(modal, iconFrame.parentElement.parentElement.firstChild)
                iconFrame.parentElement.parentElement.insertBefore(modal2, iconFrame.parentElement.parentElement.firstChild)
            }
        }
    }
    createSmallPopup()

    modal.addEventListener('click', () => {
        let video = document.querySelector('video')
        if (video.style.display != 'none') {
            if ('pictureInPictureEnabled' in document) {
                if (document.pictureInPictureElement) {
                    document.exitPictureInPicture().then(() => {
                        isPiPActive = false
                        if (video.paused) {
                            video.play()
                        }
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

    modal2.addEventListener('click', async () => {
        // if (!"documentPictureInPicture" in window) return
        () => {}
        if (document.fullscreenElement) {
            let fullScreenBtn = document.querySelector('[data-uia="control-fullscreen-exit"]')
            fullScreenBtn && fullScreenBtn.click()
        }
        setTimeout(async () => {
            isNewPipActive = true
            const playerElem = document.querySelector('#appMountPoint')
            const videoElem = document.querySelector('video')
            const newWindow = await documentPictureInPicture.requestWindow({
                width: videoElem.clientWidth / 2,
                height: videoElem.clientHeight ? videoElem.clientHeight / 2 : videoElem.clientWidth / 3
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
            const pipBtns = newWindow.document.querySelectorAll('.ontopN')
            pipBtns.forEach(pipBtn => {
                pipBtn.remove()
            })
            // custom - all controls are missing
            createControls(newWindow)
            hideElements(newWindow)

            newWindow.addEventListener('pagehide', e => {
                isNewPipActive = false
                const playerContainer = document.querySelector('body')
                const player = e.target.querySelector('#appMountPoint')
                playerContainer.append(player)
                const controlsPanelExt = document.querySelector('.controlsPanelExt')
                controlsPanelExt ? controlsPanelExt.remove() : null
                const playerElem = document.querySelector('[data-uia="player"]')
                if (playerElem && playerElem.children.length > 1) {
                    const playerChildren = Array.from(playerElem.children)
                    playerChildren.forEach(child => {
                        if (!child.getAttribute('data-uia') && child.getAttribute('class') != 'controlsPanelExt') {
                            child.style.opacity = ''
                        }
                    })
                }
                const backElem = document.querySelector('.BackToBrowse')
                if (backElem) {
                    backElem.style.display = ''
                }
                const moreInfoElem = document.querySelector('[data-uia="postplay-background-info"]')
                moreInfoElem ? moreInfoElem.style.display = '' : null
            })
        },100)
    })
}

function createControls(newWindow) {
    const frame = newWindow.document.querySelector('[data-uia="player"]')
    const video = newWindow.document.querySelector('video')
    const controlsPanel = document.createElement('div')
    controlsPanel.classList.add('controlsPanelExt')
    controlsPanel.style.width = '100%'
    controlsPanel.style.height = '100%'
    controlsPanel.style.position = 'absolute'
    controlsPanel.style.top = '0'
    controlsPanel.style.cursor = 'auto'
    controlsPanel.style.display = 'flex'
    controlsPanel.style.justifyContent = 'center'
    controlsPanel.style.alignItems = 'center'
    controlsPanel.style.zIndex = '1000'
    controlsPanel.innerHTML = `<div style="cursor: pointer;" class="btnPlay">${video.paused ? playIcon : pauseIcon}</div>`
    frame.append(controlsPanel)

    controlsPanel.addEventListener('click', e => {
        e.stopImmediatePropagation()
    })
    controlsPanel.addEventListener('mouseenter', () => {
        controlsPanel.style.opacity = '1'
    })
    controlsPanel.addEventListener('mouseleave', () => {
        controlsPanel.style.opacity = '0'
    })
    newWindow.document.querySelector('.btnPlay').addEventListener('click', () => {
        if (video.paused) {
            video.play()
            newWindow.document.querySelector('.btnPlay').innerHTML = pauseIcon
        } else {
            video.pause()
            newWindow.document.querySelector('.btnPlay').innerHTML = playIcon
        }
    })
}

function hideElements(newWindow) {
    const pipMonitor = new MutationObserver(() => {
        // here observe 
        const backElem = newWindow.document.querySelector('.BackToBrowse')
        const playerElem = newWindow.document.querySelector('[data-uia="player"]')
        // const newControlPanel = newWindow.document.querySelector('.controlsPanelExt')
        const moreInfoElem = newWindow.document.querySelector('[data-uia="postplay-background-info"]')
        moreInfoElem ? moreInfoElem.style.display = 'none' : null
        if (playerElem && playerElem.children.length > 1) {
            const playerChildren = Array.from(playerElem.children)
            playerChildren.forEach(child => {
                if (!child.getAttribute('data-uia') && child.getAttribute('class') != 'controlsPanelExt') {
                    child.style.opacity = 0
                }
            })
        }
        if (backElem) {
            backElem.style.display = 'none'
        }
        // if (!newControlPanel) {
        //     createControls(newWindow)
        // }
        if (!isNewPipActive) {
            pipMonitor.disconnect()
        }
    })
    const observedObject = newWindow.document.querySelector('body')
    pipMonitor.observe(observedObject, {
        attributes: true,
        childList: true,
        subtree: true
    })
}