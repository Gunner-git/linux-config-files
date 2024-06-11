let picInPicIcon = `<svg version="1.1" id="Picture_in_Picture" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><style type="text/css">.st0 {fill:#FFFFFF;}</style><g><title>Picture In Picture</title>
<g id="XMLID_6_"><path id="XMLID_11_" class="st0" d="M19.6,11.2h-8.9v6.4h8.8L19.6,11.2L19.6,11.2z M23.9,19.8v-15c0-1.2-1-2.1-2.2-2.1H1.9 c-1.2,0-2.2,0.9-2.2,2.1v15c0,1.2,1,2.1,2.2,2.1h19.9C22.9,21.9,23.9,21,23.9,19.8z M21.7,19.8H1.9v-15h19.9V19.8z"/></g></g></svg>`
let picInPicIcon2 = `<svg viewBox="1 1 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 12.75C16.4142 12.75 16.75 12.4142 16.75 12C16.75 11.5858 16.4142 11.25 16 11.25C15.5858 11.25 15.25 11.5858 15.25 12C15.25 12.4142 15.5858 12.75 16 12.75Z" fill="#ffffff"/><path d="M8 10.5C8 9.67157 8.67157 9 9.5 9H17.5C18.3284 9 19 9.67157 19 10.5V15.5C19 16.3284 18.3284 17 17.5 17H9.5C8.67157 17 8 16.3284 8 15.5V10.5ZM9.5 10.5V14.8942L11.5815 12.6392C12.0764 12.103 12.9235 12.103 13.4185 12.6392L16.0511 15.4912L16.0416 15.5H17.5V10.5H9.5ZM12.5 13.8556L10.9821 15.5H14.0178L12.5 13.8556Z" fill="#ffffff"/><path d="M5.75 4C3.67893 4 2 5.67893 2 7.75V16.25C2 18.3211 3.67893 20 5.75 20H18.25C20.3211 20 22 18.3211 22 16.25V7.75C22 5.67893 20.3211 4 18.25 4H5.75ZM3.5 7.75C3.5 6.50736 4.50736 5.5 5.75 5.5H18.25C19.4926 5.5 20.5 6.50736 20.5 7.75V16.25C20.5 17.4926 19.4926 18.5 18.25 18.5H5.75C4.50736 18.5 3.5 17.4926 3.5 16.25V7.75Z" fill="#ffffff"/></svg>`
const MAX_TRIES_MONITOR_SKIP = 10
let isMonitorActive = false
let isIconActive = false
let isNewPipActive = false

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
}

function createIcon() {
    let modal = document.createElement('div')
    let modal2 = document.createElement('div')
    let liveIcon = document.querySelector('.badge-live')
    const createSmallPopup = () => {
        const iconFrame = document.querySelector('.controls-bottom-right')
        if (iconFrame) {
            modal.innerHTML = picInPicIcon
            modal.classList.add('ontop')

            modal2.innerHTML = picInPicIcon2
            modal2.classList.add('ontop')
            if (iconFrame) {
                iconFrame.insertBefore(modal, iconFrame.firstChild)
                if (liveIcon.getAttribute('aria-hidden') == 'true') {
                   iconFrame.insertBefore(modal2, iconFrame.firstChild) 
                }
            }
        }
    }
    createSmallPopup()

    modal2.addEventListener('click', async () => {
        isNewPipActive = true
        const playerElem = document.querySelector('main')
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
        monitorPip(newWindow)
        
        const helpLink = newWindow.document.querySelector('.brandLogo_feedBack-container')
        helpLink.style.display = 'none'
        const episodesSection = newWindow.document.querySelector('#latest-episodes')
        episodesSection != null ? episodesSection.style.display = 'none' : null
        const bottomComponents = newWindow.document.querySelector('.bottom-components')
        bottomComponents.style.display = 'none'
        // const bottomElem2 = newWindow.document.querySelectorAll('[class*="padded-container"]')[1]
        // bottomElem2 ? bottomElem2.style.display = 'none' : null

        newWindow.addEventListener('pagehide', e => {
            isNewPipActive = false
            const playerContainer = document.querySelector('body')
            const player = e.target.querySelector('main')
            playerContainer.insertBefore(player, playerContainer.firstChild)
            const progresBarElemMain = document.querySelector('.seek-bar-container')
            if (progresBarElemMain) {
                progresBarElemMain.style.width = ''
            }
            const volumeSliderMain = document.querySelector('[class*="volume-slider-li-content"]')
            if (volumeSliderMain) {
                volumeSliderMain.style.display = ''
            }
            const episodesSectionMain = document.querySelector('#latest-episodes')
            episodesSectionMain != null ? episodesSectionMain.style.display = '' : null
            const bottomComponentsMain = document.querySelector('.bottom-components')
            bottomComponentsMain.style.display = ''
            const helpLinkMain = document.querySelector('.brandLogo_feedBack-container')
            helpLinkMain.style.display = ''
            // const bottomElem2Main = document.querySelectorAll('[class*="padded-container"]')[1]
            // bottomElem2Main ? bottomElem2Main.style.display = '' : null
        })
    })

    modal.addEventListener('click', () => {
        let video = document.querySelector('video:not(.marqueeVideo)')
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
}


function startMonitoringForVideo(numTries) {
    numTries++
    const monitor = new MutationObserver(() => {
        let video = document.querySelector('video:not(.marqueeVideo)')
        if (video && isIconActive == false) {
            createIcon()
            isIconActive = true
        } else if (!video) {
            eraseIcon()
            isIconActive = false
        }
    })

    let reactEntry = document.querySelector("#main-container")
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

function monitorPip(newWindow) {
    const pipMonitor = new MutationObserver(() => {
        const fullscreenBtn = newWindow.document.querySelector('.btn-fullscreen')
        if (fullscreenBtn) {
            fullscreenBtn.style.display = 'none'
        }
        const progresBarElem = newWindow.document.querySelector('.seek-bar-container')
        if (progresBarElem) {
            progresBarElem.style.width = 0
        }
        // const bottomElem2 = newWindow.document.querySelectorAll('[class*="padded-container"]')[1]
        // bottomElem2 ? bottomElem2.style.display = 'none' : null
        const volumeSlider = newWindow.document.querySelector('[class*="volume-slider-li-content"]')
        if (volumeSlider) {
            volumeSlider.style.display = 'none'
        }
        if (!isNewPipActive) {
            pipMonitor.disconnect()
        }
    })
    const observerObject = newWindow.document.querySelector('body')
    pipMonitor.observe(observerObject, {
        attributes: true,
        childList: true,
        subtree: true,
    })
}