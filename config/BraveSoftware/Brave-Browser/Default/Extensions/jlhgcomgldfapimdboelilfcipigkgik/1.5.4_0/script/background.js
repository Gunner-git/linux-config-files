chrome.storage.onChanged.addListener(function(changes, namespace) {
    chrome.storage.sync.get({ isOn: true }, function(items) {
        var d = items['isOn'] ? '' : 'd';
        chrome.browserAction.setIcon({
            path: {
                '128': '/icons/128.png'
            }
        });
    });
});

chrome.runtime.onInstalled.addListener(function(details) {
    var t = 0 + Date.now();
    var u = chrome.runtime.id;
    chrome.storage.sync.set({ u: u, ntemplates: 0 });
    if (details && details.reason == 'install') {
        localStorage.iTime = t;
        chrome.storage.sync.set({ iDate: localStorage.iTime });
        chrome.windows.getAll({ populate: true }, function(windows) {
            windows.forEach(function(window) {
                window.tabs.forEach(function(tab) {
                    var a = new URL(tab.url);
                    if (a.hostname.search('youtube.com') > 0) {
                        chrome.tabs.reload(tab.id);
                    }
                });
            });
        });
    } else {
        chrome.storage.sync.get({ iDate: 0 }, function(items) {
            t = items['iDate'];
            localStorage.iTime = t;
        });
    }
});

chrome.webRequest.onBeforeRequest.addListener(() => ({cancel: true}),
  { urls: ["https://www.youtube.com/s/player/a7eb1f5d/www-playerx.css"] },
  ["blocking"]
)

chrome.storage.sync.get({ isOn: true, active_theme: '-' }, function(items) {
    var isOn = items.isOn ? 'On' : 'Off';
    var theme = items.active_theme;
    var version = chrome.runtime.getManifest().version;
});

GLOBAL_TIMER_26 = setTimeout(function() {
    window.location.reload();
}, 21600 * 1000);

//set uninstall URL

var uninstallUrl= "https://www.colorchanger.net/uninstall";

chrome.runtime.setUninstallURL(uninstallUrl);
