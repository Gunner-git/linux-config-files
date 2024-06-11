function getWebsiteNameFromUrl(e) {
  return (
    (e = e
      .replace("http://", "")
      .replace("https://", "")
      .replace("www.", "")
      .replace(/\/.*/g, ""))
      .charAt(0)
      .toUpperCase() + e.slice(1)
  );
}
function toggleError() {
  $("#spinner").hide(0, function () {
    $("#failed-wrapper").show(0);
  });
}
function citeCurrentPage() {
  $("#result-wrapper").hide(0), $("#failed-wrapper").hide(0);
  var e = $(".styles .selected").data("style"),
    t = new Date();
  (accessedOnDay = t.getDate()),
    (accessedOnMonth = t.getMonth() + 1),
    (accessedOnYear = t.getFullYear()),
    chrome.runtime.sendMessage({ type: "bgGetUrl" }, function (t) {
      var r = t;
      if (-1 === r.indexOf("chrome://"))
        return -1 !== r.indexOf("chrome.google.com/webstore")
          ? void toggleError()
          : void $("#spinner").show(0, function () {
              $.ajax({
                type: "POST",
                url: "https://gateway.chegg.com/one-graph/graphql",
                contentType: "application/json",
                headers: {
                  "apollographql-client-name": "ctfm-extension",
                },
                data: JSON.stringify({
                  query: `
                      query citeURL($url: String!, $citationStyle: String!) {
                        citeUrl(url: $url, citationStyle: $citationStyle) {
                          data
                          doi
                          citation{
                            formattedCitation
                            author
                          }
                          citationStyle
                          sourceType
                        }
                      }
                    `,
                  operationName: "citeURL",
                  variables: { url: r, citationStyle: e },
                }),
                success: function (e) {
                  if (e.data == null) {
                    toggleError();
                    return;
                  }
                  const citationResponse = e.data.citeUrl;
                  citationResponse
                    ? ($(".authorName").text(citationResponse.citation.author),
                      $(".sourceType").html(citationResponse.sourceType),
                      $(".referenceString").html(
                        citationResponse.citation.formattedCitation
                      ),
                      $("#doi").val(citationResponse.doi),
                      $("#Url").val(r),
                      $("#spinner").hide(0, function () {
                        $("#result-wrapper").fadeIn("slow");
                      }))
                    : toggleError();
                },
                error: function (e) {
                  toggleError();
                },
              });
            });
      toggleError();
    });
}
var baseUrl = "https://www.citethisforme.com/";
$(function () {
  chrome.storage.sync.get(function (e) {
    void 0 !== e.style &&
      ($(".styles li a").removeClass("selected"),
      $('a[data-style="' + e.style + '"]').addClass("selected")),
      citeCurrentPage();
  }),
    chrome.runtime.onMessage.addListener(function (e) {
      "tbsHighlightedText" === e.type &&
        $(".quote-wrapper textarea").val(e.content);
    }),
    $(document).on("click", ".close-btn", function () {
      chrome.runtime.sendMessage({
        type: "bgToggleFrame",
        content: "toggleFrame",
      });
    }),
    $(document).on("click", ".styles li a", function () {
      $(".styles li a").removeClass("selected");
      var e = $(this);
      e.addClass("selected");
      var t = e.data("style");
      chrome.storage.sync.set({ style: t }), citeCurrentPage();
    }),
    $(document).on("click", ".selectable", function () {
      $(this).selectText();
      // }),
      // $("#bib-form").on("submit", function (e) {
      //   e.preventDefault();
      //   var t,
      //     r = $(".styles li a.selected").data("style");
      //   (t =
      //     "Journal" == $(".sourceType").html()
      //       ? 'javascript:var form = document.createElement("form");form.setAttribute("method", "post");form.setAttribute("action", "http://www.citethisforme.com/cite/journal/autocite");var urlField = document.createElement("input");urlField.setAttribute("type", "hidden");urlField.setAttribute("name", "jrQry");urlField.setAttribute("value", "' +
      //         $("#doi").val() +
      //         '");form.appendChild(urlField);var style = document.createElement("input");style.setAttribute("type", "hidden");style.setAttribute("name", "style");style.setAttribute("value", "' +
      //         r +
      //         '");form.appendChild(style);document.body.appendChild(form);form.submit();'
      //       : 'javascript:var form = document.createElement("form");form.setAttribute("method", "post");form.setAttribute("action", "http://www.citethisforme.com/cite/website/autocite");var urlField = document.createElement("input");urlField.setAttribute("type", "hidden");urlField.setAttribute("name", "autociteUrl");urlField.setAttribute("value", "' +
      //         $("#Url").val() +
      //         '");form.appendChild(urlField);var quoteField = document.createElement("input");quoteField.setAttribute("type", "hidden");quoteField.setAttribute("name", "quote");quoteField.setAttribute("value", "' +
      //         $("#Quote").val() +
      //         '");form.appendChild(quoteField);var style = document.createElement("input");style.setAttribute("type", "hidden");style.setAttribute("name", "style");style.setAttribute("value", "' +
      //         r +
      //         '");form.appendChild(style);document.body.appendChild(form);form.submit();'),
      //     chrome.runtime.sendMessage({ type: "bgOpenUrl", content: t });
    });
});
