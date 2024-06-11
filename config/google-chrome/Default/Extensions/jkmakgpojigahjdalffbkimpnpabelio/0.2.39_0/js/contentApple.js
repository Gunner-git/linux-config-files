let picInPicIcon = `<svg version="1.1" id="Warstwa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><style type="text/css">.st0 {fill:#FFFFFF;opacity: .6;cursor: pointer;}.st0:hover {opacity: 1;}</style><g><title>Picture In Picture</title><g id="XMLID_6_"><path id="XMLID_11_" class="st0" d="M19.6,11.2h-8.9v6.4h8.8L19.6,11.2L19.6,11.2z M23.9,19.8v-15c0-1.2-1-2.1-2.2-2.1H1.9c-1.2,0-2.2,0.9-2.2,2.1v15c0,1.2,1,2.1,2.2,2.1h19.9C22.9,21.9,23.9,21,23.9,19.8z M21.7,19.8H1.9v-15h19.9V19.8z"/></g></g></svg>`
let picInPicIcon2 = `<svg viewBox="1 1 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><title>Better Picture In Picture</title><path d="M16 12.75C16.4142 12.75 16.75 12.4142 16.75 12C16.75 11.5858 16.4142 11.25 16 11.25C15.5858 11.25 15.25 11.5858 15.25 12C15.25 12.4142 15.5858 12.75 16 12.75Z" fill="#ffffff"/><path d="M8 10.5C8 9.67157 8.67157 9 9.5 9H17.5C18.3284 9 19 9.67157 19 10.5V15.5C19 16.3284 18.3284 17 17.5 17H9.5C8.67157 17 8 16.3284 8 15.5V10.5ZM9.5 10.5V14.8942L11.5815 12.6392C12.0764 12.103 12.9235 12.103 13.4185 12.6392L16.0511 15.4912L16.0416 15.5H17.5V10.5H9.5ZM12.5 13.8556L10.9821 15.5H14.0178L12.5 13.8556Z" fill="#ffffff"/><path d="M5.75 4C3.67893 4 2 5.67893 2 7.75V16.25C2 18.3211 3.67893 20 5.75 20H18.25C20.3211 20 22 18.3211 22 16.25V7.75C22 5.67893 20.3211 4 18.25 4H5.75ZM3.5 7.75C3.5 6.50736 4.50736 5.5 5.75 5.5H18.25C19.4926 5.5 20.5 6.50736 20.5 7.75V16.25C20.5 17.4926 19.4926 18.5 18.25 18.5H5.75C4.50736 18.5 3.5 17.4926 3.5 16.25V7.75Z" fill="#ffffff"/></svg>`
let playIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="102.69 30.35 87.5 97.51"><path fill="white" d="M113.428 127.863c2.588 0 5.03-.733 8.448-2.686l60.302-35.01c4.883-2.88 8.008-6.103 8.008-11.084 0-4.98-3.125-8.203-8.008-11.035l-60.302-35.01c-3.418-2.002-5.86-2.685-8.448-2.685-5.566 0-10.742 4.248-10.742 11.67v74.17c0 7.422 5.176 11.67 10.742 11.67Z"></path></svg>`
let pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="104.23 34.94 74.91 88.23"><path fill="white" d="M113.411 123.175h12.94c6.103 0 9.13-3.027 9.13-9.13V44.073c0-5.86-3.027-8.936-9.13-9.131h-12.94c-6.103 0-9.18 3.027-9.18 9.13v69.971c-.146 6.104 2.881 9.131 9.18 9.131Zm43.604 0h12.939c6.104 0 9.18-3.027 9.18-9.13V44.073c0-5.86-3.076-9.131-9.18-9.131h-12.94c-6.103 0-9.18 3.027-9.18 9.13v69.971c0 6.104 2.93 9.131 9.18 9.131Z"></path></svg>`
let isIconActive = false
let src

setInterval(() => {
    let video = document.querySelector("video")
    let modal = document.querySelector("div.ontopApple")
    if (video && isIconActive == false) {
        createIcon()
    } else if (!video || !modal) {
        eraseIcon()
        isIconActive = false
    }
}, 1000)

function eraseIcon() {
    let modals = document.querySelectorAll('div.ontopApple')
    if (modals.length > 0) {
        modals.forEach(modal => {
           modal.remove() 
        })
    }
}

function createIcon() {
    let modal = document.createElement('div')
    let modalNew = document.createElement('div')
    const createSmallPopup = () => {
        const iconFrameApple = document.querySelector("div.scrim-footer__controls")
        if (iconFrameApple) {
            modal.innerHTML = picInPicIcon
            modal.classList.add('ontopApple')
            // modal.classList.add('footer__control')
            modal.children[0].classList.add('playback-button-icon')

            modalNew.innerHTML = picInPicIcon2
            modalNew.classList.add('ontopApple')
            // modal.classList.add('footer__control')
            modalNew.children[0].classList.add('playback-button-icon')
            iconFrameApple.insertBefore(modal, iconFrameApple.children[0])
            iconFrameApple.insertBefore(modalNew, iconFrameApple.children[0])
            isIconActive = true
        }
    }
    createSmallPopup()

    modalNew.addEventListener('click', async () => {
        const playerElem = document.querySelector('.video-container')
        const newWindow = await documentPictureInPicture.requestWindow({
            width: playerElem.clientWidth / 2,
            height: playerElem.clientHeight / 2
        })
        await newWindow.document.body.append(playerElem)

        createElements(newWindow)
        
        newWindow.addEventListener('pagehide', e => {
            const pipBtns = newWindow.document.querySelectorAll('.pipBtn')
            if (pipBtns.length > 0) {
                pipBtns.forEach(pipBtn => {
                    pipBtn.remove()
                })
            }
            const playerContainer = document.querySelector('.video-player__content')
            const player = e.target.querySelector('.video-container')
            playerContainer.append(player)
        })
    })

    modal.addEventListener('click', () => {
        let video = document.querySelector("video")
        if ('pictureInPictureEnabled' in document) {
            video.disablePictureInPicture = false
            if (document.pictureInPictureElement) {
                video.controls = false
                document.exitPictureInPicture().catch(err => {
                    console.log(err)
                })
                return
            }
            video.controls = true
            console.log(video.controls)
            video.requestPictureInPicture()
                .then(() => {
                    document.pictureInPictureElement.duration = ''
                    navigator.mediaSession.setActionHandler('play', function() {
                        video.play()
                    })
                    navigator.mediaSession.setActionHandler('pause', function() {
                        video.pause()
                    })
                    navigator.mediaSession.setActionHandler("nexttrack", () => {
                        video.currentTime += 10
                    })
                    navigator.mediaSession.setActionHandler("previoustrack", () => {
                        if (video.currentTime > 10) {
                            video.currentTime -= 10
                        } else {
                            video.currentTime = 0
                        }
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    })
}

function createElements(newWindow) {
    const frame = newWindow.document.querySelector('.video-container')
    let video = newWindow.document.querySelector('video')
    const playBtn = document.createElement('div')
    playBtn.classList.add('pipBtn')
    if (video.paused) {
        playBtn.innerHTML = playIcon
    } else if (!video.paused) {
        playBtn.innerHTML = pauseIcon
    }
    frame.append(playBtn)

    playBtn.addEventListener('click', () => {
        video = newWindow.document.querySelector('video')
        const mainPagePlayBtn = document.querySelector('.playback-controls-play')
        if (video.paused) {
            playBtn.innerHTML = pauseIcon
        } else if (!video.paused) {
            playBtn.innerHTML = playIcon
        } 
        mainPagePlayBtn.click()
    })
    frame.addEventListener('mouseenter', () => {
        playBtn.style.opacity = 1
    })
    frame.addEventListener('mouseleave', () => {
        playBtn.style.opacity = 0
    })
    frame.addEventListener('mousemove', () => {
        playBtn.style.opacity = 1
    })
    video.controls = false
    video.style.width = '100%'
    video.style.height = '100%'
    playBtn.style.width = '24px'
    playBtn.style.height = '24px'
    playBtn.style.position = 'absolute'
    playBtn.style.bottom = '10%'
    playBtn.style.right = 'calc(50vw - 12px)'
    playBtn.style.cursor = 'pointer'
    playBtn.style.opacity = 0
    playBtn.style.zIndex = 100
    frame.style.background = 'black'
    frame.style.overflow = 'hidden'
    frame.parentElement.style.margin = 0
    frame.style.width = '100vw'
    frame.style.height = '100vh'
}