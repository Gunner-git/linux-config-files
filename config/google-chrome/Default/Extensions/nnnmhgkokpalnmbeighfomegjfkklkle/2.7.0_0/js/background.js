async function getTabId() {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.query(
        {
          active: true,
        },
        function (tabs) {
          resolve(tabs[0].id);
        }
      );
    } catch (e) {
      reject(e);
    }
  });
}

chrome.runtime.onInstalled.addListener(function () {
  chrome.tabs.query({}, function (e) {
    e.forEach(async function (e) {
      return (
        -1 === e.url.indexOf("chrome://") &&
        -1 === e.url.indexOf("chrome.google.com/webstore") &&
        void chrome.scripting
          .executeScript({
            target: { tabId: await getTabId() },
            files: ["js/contentscript.js"],
          })
          .then(() => {
            return !0;
          })
      );
    });
  });
}),
  chrome.action.onClicked.addListener(function () {
    chrome.tabs.query({ active: !0, currentWindow: !0 }, function (e) {
      chrome.tabs.sendMessage(e[0].id, {
        type: "csToggleFrame",
        content: "toggleFrame",
      });
    });
  }),
  chrome.runtime.onMessage.addListener(function (e) {
    "bgToggleFrame" === e.type &&
      chrome.tabs.query({ active: !0, currentWindow: !0 }, function (e) {
        chrome.tabs.sendMessage(e[0].id, {
          type: "csToggleFrame",
          content: "toggleFrame",
        });
      });
  }),
  chrome.runtime.onMessage.addListener(function (e, t, n) {
    return "bgGetUrl" === e.type
      ? (chrome.tabs.query({ active: !0, currentWindow: !0 }, function (e) {
          n(e[0].url);
        }),
        !0)
      : void 0;
  }),
  chrome.runtime.onMessage.addListener(function (e) {
    "bgHighlightedText" === e.type &&
      chrome.tabs.query({ active: !0, currentWindow: !0 }, function (t) {
        chrome.tabs.sendMessage(t[0].id, {
          type: "tbsHighlightedText",
          content: e.content,
        });
      });
  });
// ,chrome.runtime.onMessage.addListener(function(e) {
//   "bgOpenUrl" === e.type &&
//     chrome.tabs.query({ url: "http://www.citethisforme.com/*" }, function(t) {
//       t.length > 0
//         ? ((tab = t[0]),
//           chrome.tabs.executeScript(tab.id, { code: e.content }))
//         : chrome.tabs.create({ url: e.content }, null);
//     });
// })
