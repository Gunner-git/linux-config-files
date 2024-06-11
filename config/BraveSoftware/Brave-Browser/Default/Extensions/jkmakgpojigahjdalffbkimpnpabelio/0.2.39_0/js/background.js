/* global chrome */
try {
    importScripts('/js/peacock_background.min.js');
} catch (e) {
    console.error('import peacock background: ', e);
}

chrome.tabs.onUpdated.addListener(
  function (tabId, changeInfo, tab) {
    // read changeInfo data and do something with it
    // like send the new url to contentscripts.js
    if (changeInfo.url) {
      chrome.tabs.sendMessage(tabId, {
        message: 'url_changed!',
        url: changeInfo.url
      })
    }
  }
)
  
chrome.runtime.onInstalled.addListener((reason) => {
  if (reason.reason === chrome.runtime.OnInstalledReason.INSTALL) {
      chrome.tabs.create({
          url: 'https://www.vodextended.com/thank-you'
      });
  }
  reloadTabs()
});

function reloadTabs() {
  chrome.tabs.query({url: "*://*.primevideo.com/*"}, function(tabs) {
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            chrome.tabs.reload(tab.id) 
        })
    }
  })
  chrome.tabs.query({url: "*://*.netflix.com/*"}, function(tabs) {
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            chrome.tabs.reload(tab.id) 
        })
    }
  })
  chrome.tabs.query({url: "*://*.hbomax.com/*"}, function(tabs) {
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            chrome.tabs.reload(tab.id) 
        })
    }
  })
  chrome.tabs.query({url: "*://*.apple.com/*"}, function(tabs) {
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            chrome.tabs.reload(tab.id) 
        })
    }
  })
  chrome.tabs.query({url: "*://*.disneyplus.com/*"}, function(tabs) {
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            chrome.tabs.reload(tab.id) 
        })
    } 
  })
  chrome.tabs.query({url: "*://*.hulu.com/*"}, function(tabs) {
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            chrome.tabs.reload(tab.id) 
        })
    }
  })
  chrome.tabs.query({url: "*://*.peacocktv.com/*"}, function(tabs) {
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            chrome.tabs.reload(tab.id) 
        })
    }
  })
  chrome.tabs.query({url: "*://*.paramountplus.com/*"}, function(tabs) {
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            chrome.tabs.reload(tab.id) 
        })
    }
  })
}