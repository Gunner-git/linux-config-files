(function ()
{
	var ga = document.createElement('script');
	ga.type = 'text/javascript';
	ga.async = true;
	ga.src = 'https://ssl.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(ga, s);
})();

var manifest_version = chrome.app.getDetails().version;
var now = Date.now();
var _gaq = _gaq || [];

_gaq.push(['_setAccount', 'UA-227184866-3']);
_gaq.push(['_trackPageview']);
_gaq.push(['_trackEvent', "background", 'version', manifest_version]);


chrome.runtime.onInstalled.addListener(function (details)
{
	//InstallTime & UUID
    setInstallTime();
    setUUID();

    console.log(details.reason);

	if (details.reason == "install") {
        gaq_install();
	}
	if (details.reason == "chrome_update") {
		gaq_chrome_update();
	}
	if (details.reason == "update") {
		gaq_update();
	}
});




function gaq_update()
{
	_gaq.push(['_trackEvent', "background", 'update', manifest_version]);
}

function gaq_chrome_update()
{
	_gaq.push(['_trackEvent', "background", 'chrome_update', manifest_version]);
}

function gaq_install()
{
	_gaq.push(['_trackEvent', "background", 'install', manifest_version]);
}

function gaq_uninstall()
{
	_gaq.push(['_trackEvent', "background", 'uninstall', manifest_version]);
}



function setUUID()
{
    if (localStorage.ce_UUID === undefined)
    {
        localStorage.ce_UUID = generateUUID();
    }
}

function setInstallTime()
{
    if (localStorage.ce_installTime === undefined)
	{
        localStorage.ce_installTime = now;
	}
}

function generateUUID()
{
	var x = 2147483648;
	return Math.floor(Math.random() * x).toString(36) +
		Math.abs(Math.floor(Math.random() * x) ^ Date.now()).toString(36);
}
