/*global UAParser, navigator*/

(function(doc, win, docEl) {
    var wrapper = doc.getElementById('details'),
        ua = navigator.userAgent,
        logs = '',
        w = screen.width,
        h = screen.height,
        docW = docEl.clientWidth,
        docH = docEl.clientHeight,
        color = win.screen.colorDepth,
        hash = doc.location.hash,
        email = document.getElementById('email'),
        twitter = document.getElementById('twitter'),
        share = document.getElementById('share'),
        shareUrl = document.getElementById('shareurl'),
        log,
        uaDetails;

    function log(msg) {
        logs += '<li>' + msg + '</li>';
    }

    function gimme() {
        wrapper.innerHTML = logs;
        logs = '';
    }

    function getFlashVersion() {
        try {
            try {
                var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
                try { axo.AllowScriptAccess = 'always'; } catch (e) { return '6,0,0'; }
            } catch (e) {}
            return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];

        } catch (e) {
            try {
                if (navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) {
                    return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
                }
            } catch (e) {}
        }

        return '0';
    }

    function getBrowserLanguage() {
        return (navigator.language || navigator.userLanguage) || 'default';
    }

    function localStorageEnabeled() {
        var mod = 'localStorage';
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return 'available';
        } catch (e) {
            return 'not available';
        }
    }

    function cookiesEnabled() {
        document.cookie = "cookietest=1";
        var ret = document.cookie.indexOf("cookietest=") != -1;
        document.cookie = "cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT";
        if (ret) {
            return 'available';
        } else {
            return 'not available';
        }
    }

    function getPixelRatio() {
        var dpr = win.devicePixelRatio || (win.screen.deviceXDPI / win.screen.logicalXDPI) || 1;

        return dpr;
    }

    function getDeviceOrientation() {
        if (window.orientation && window.DeviceOrientationEvent || window.OrientationEvent || typeof window.onorientationchange != 'undefined') {
            if (Math.abs(window.orientation) === 90) {
                return 'landscape';
            } else {
                return 'portrait';
            }
        }
        // If we can't get a value assume landscape
        return 'probably landscape';
    }


    if (hash) {
        hash = hash.replace(/%20/g, ' ').split(':');
        log('<h2>OS</h2> ' + hash[1]);
        log('<h2>Browser</h2> ' + hash[2] + ' ' + hash[3]);
        log('<h2>Browserengine</h2> ' + hash[4]);
        log('<h2>Browser Dimensions</h2> ' + hash[5]);
        log('<h2>Device Dimensions</h2> ' + hash[6]);
        log('<h2>Device Orientation</h2> ' + hash[7]);
        log('<h2>Color Depth</h2> ' + hash[8]);
        if (hash[9] === '0') {
            log('<h2>Flash</h2> not availabe');
        } else {
            log('<h2>Flash</h2> Version: ' + hash[9]);
        }
        log('<h2>Cookies</h2> ' + hash[10]);
        log('<h2>LocalStorage</h2> ' + hash[11]);
        log('<h2>Adblock Plugin</h2> ' + hash[12]);
        log('<h2>Browser Language</h2> ' + hash[13]);
        log('<h2>Pixel Ratio</h2> ' + hash[14]);
        log('<h2>CSS Resolution</h2> ' + hash[15] + 'dpi');
        log('<h2>User Agent</h2> <small>' + hash[16] + '</small>');
        log('<h2>Description</h2> ' + hash[17]);
    } else {
        log('<h2>OS</h2> ' + platform.os + '');
        log('<h2>Browser</h2> ' + platform.name + ' (' + platform.version + ')');
        log('<h2>Browserengine</h2> ' + platform.layout);
        log('<h2>Browser Dimensions</h2> ' + docW + ' x ' + docH);
        log('<h2>Device Dimensions</h2> ' + w + ' x ' + h);
        log('<h2>Device Orientation</h2> ' + getDeviceOrientation());
        log('<h2>Color Depth</h2> ' + color);
        if (getFlashVersion() === '0') {
            log('<h2>Flash</h2> not availabe');
        } else {
            log('<h2>Flash</h2> Version: ' + getFlashVersion().split(',').shift());
        }
        log('<h2>Cookies</h2> ' + cookiesEnabled());
        log('<h2>LocalStorage</h2> ' + localStorageEnabeled());
        log('<h2>Adblock Plugin</h2> ' + adblock);
        log('<h2>Browser Language</h2> ' + getBrowserLanguage());
        log('<h2>Pixel Ratio</h2> ' + getPixelRatio());
        log('<h2>CSS Resolution</h2> ' + res.dpi() + 'dpi, ' + res.dppx() + 'dppx, ' + res.dpcm() + 'dpcm');
        log('<h2>User Agent</h2> <small>' + navigator.userAgent + '</small>');
        log('<h2>Description</h2> ' + platform.description);
        doc.location.hash = ':' + platform.os + ':' + platform.name + ':' + platform.version + ':' + platform.layout + ':' + docW + ' x ' + docH + ':' + w + ' x ' + h + ':' + getDeviceOrientation() + ':' + color + ':' + getFlashVersion().split(',').shift() + ':' + cookiesEnabled() + ':' + localStorageEnabeled() + ':' + adblock + ':' + getBrowserLanguage() + ':' + getPixelRatio() + ':' + res.dpi() + 'dpi, ' + res.dppx() + 'dppx, ' + res.dpcm() + 'dpcm' + ':' + navigator.userAgent + ':' + platform.description;
    }
    var alldetails = document.location.href.replace(/ /g, '').replace('#', '%23');
    twitter.href = 'https://twitter.com/intent/tweet?text=My browser details:&url=' + alldetails + '&via=justmarkup';
    email.href = 'mailto:?subject=My browser details&body=Here are my details: ' + alldetails + '&via=justmarkup';
    share.style.display = 'inline-block';
    shareUrl.textContent = document.location.href;
    gimme();

})(document, window, document.documentElement);