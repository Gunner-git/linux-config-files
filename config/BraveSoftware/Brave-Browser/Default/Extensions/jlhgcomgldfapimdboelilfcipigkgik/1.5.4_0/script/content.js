(function () {
    var isOn, u, lastT;
    var css_rules = {
        "borders_color": "*:not(a):not(button), #mainContainer *:not(a):not(button)::before {border-color:#color# !important}",
        "header_color": ".yt-uix-overlay-actions, .ytd-masthead {background:#color# !important;border-color:#colorc# !important}",
        "theme_color": "div.sbsb_a,  div.container.style-scope.ytd-account-settings,div#channel-container, #tabs-container, div.yt-dialog-base, .ytd-page-manager, .style-scope.ytd-menu-popup-renderer {background:#color# !important;}",
        "buttons_color": "#button.style-scope.ytd-button-renderer, button#create-channel-submit-button, .style-scope.ytd-subscribe-button-renderer, #search-icon-legacy, button.style-scope.ytd-searchbox,.badge.badge-style-type-live-now.style-scope.ytd-badge-supported-renderer {background-color:#color# !important; border-color:#colorc# !important}",
        "text_color": "*:not(#country-code) {color:#color# !important;}",
        "inner_boxes_color": "div#container.style-scope.ytd-searchbox, input#create-channel-first-name, input#create-channel-last-name, button.yt-uix-button.yt-uix-button-size-default.yt-uix-button-default.yt-pd-close {background:#color# !important;}"+
        "#guide-inner-content::-webkit-scrollbar {background:#color# !important;}",
        "sidebar_color": "div.yt-dialog-fg-content.yt-dialog-show-content, .ytd-guide-renderer,"+ 
        "#header .style-scope.ytd-multi-page-menu-renderer, .style-scope.ytd-multi-page-menu-renderer {background:#color# !important; filter: brightness(95%);}"
    }
    // "{background:#color# !important;  filter: brightness(95%);}",

    function loadTheme(items, isDefault, active, ison) {
        let headerColor;
        for (var id in css_rules) {
            if(id==='header_color'){
                headerColor = items[id]
            }
            setColor(id, items[id]);
        }

        // wait for the page to load then update the logo color
        window.addEventListener ("load", () => {
            var jsInitCheckTimer = setInterval (checkForJS_Finish, 111);

            function checkForJS_Finish () {
                if (    typeof SOME_GLOBAL_VAR != "undefined"
                    || document.querySelector('#masthead.masthead-finish')
                ) {
                    clearInterval (jsInitCheckTimer);

                    ToggleDarkMode(headerColor)
                }
            }
        },false);
    }
    


    function getImg() {
        return $(new Image());
    }

    function ColorLuminance(hex, lum) {
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        lum = lum || 0;
        var rgb = "#", c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00" + c).substr(c.length);
        }
        return rgb;
    }

    function disabledStyles() {
        for (var e_id in css_rules) {
            id = "cssv_" + e_id;
            var style = document.getElementById(id);
            if (style) {
                style.disabled = !isOn;
            }
        }
    }

    function setColor(e_id, c) {
        id = "cssv_" + e_id;
        var rule = css_rules[e_id];
     

        if (!rule) {
            return;
        }
        
        var style = document.getElementById(id);
        
        if (!style) {
            style = document.createElement("style");
            style.setAttribute("type", "text/css");
            style.setAttribute("id", id);
            var head = document.querySelector("head") || document.head || document.documentElement;
            if (head) head.appendChild(style);
        }
        if (c && c != "false") {
            var rule_t = rule.replace(/#color#/g, c);
            rule_t = rule_t.replace(/#colorc#/g, ColorLuminance(c, -0.2));
            style.textContent = rule_t;
        } else {
            style.textContent = "";
        }
        style.disabled = !isOn;
}

    // convert HEX color values to RGB
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // Determine if a color is a light or dark
    function Brightness(color)
    {
        return Math.sqrt(
            color.r * color.r * .241 + 
            color.g * color.g * .691 + 
            color.b * color.b * .068);
    }

    // Select the color of the YT logo based on the theme color
    function ToggleDarkMode(color){
        const rgb = hexToRgb(color);
        const isThemeLight = Brightness(rgb) > 130 ? true : false;
        const header = document.querySelector('#masthead.masthead-finish');
        if(isThemeLight){
            header.setAttribute('style', '--yt-swatch-logo-override : rgb(0,0,0);--yt-swatch-text : rgb(0,0,0)') 
        }else{
            header.setAttribute('style', '--yt-swatch-logo-override : rgb(255,255,255); --yt-swatch-text : rgb(255,255,255)')
        }
    }


    return {
        initialize: function () {
            chrome.storage.sync.get({
                "themes": {},
                "u": "",
                "iDate": 0,
                "isOn": true,
                "active_theme": "My Template",
                "lastT": 0
            }, function (items) {
                isOn = items["isOn"];
                lastT = items["lastT"];
                u = items["u"] + items["iDate"] + "/";
                loadTheme(items["themes"][items["active_theme"]] || default_themes[items["active_theme"]] || {}, !items["themes"][items["active_theme"]], items["active_theme"], +items["isOn"]);
            });
            chrome.runtime.onMessage.addListener(
                function (request, sender, sendResponse) {
                    if (request.method === "c_color") {
                        setColor(request.id, request.c);
                        if(request.id === 'header_color'){
                            ToggleDarkMode(request.c)
                    }
                    }
                    else if (request.method === "c_on") {
                        isOn = request.c;
                        disabledStyles();
                    }
                }
            );
        }
    }

})().initialize()