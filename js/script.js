/*global UAParser, navigator*/

(function (doc, win, docEl) {
	var uaParser = new UAParser(),
		wrapper = doc.getElementById('details'),
		url = doc.getElementById('url'),
		ua = navigator.userAgent,
		logs = '',
		w = screen.width,
		h = screen.height,
		docW = docEl.clientWidth,
		docH = docEl.clientHeight,
		color = win.screen.colorDepth,
		hash = doc.location.hash,
		log,
		uaDetails;

	function log(msg, icon) {
		if (icon) {
			logs += '<li><span aria-hidden="true" class="icon-' + icon + '"></span>' + msg + '</li>';
		} else {
			logs += '<li>' + msg + '</li>';
		}
	}

	function gimme() {
		wrapper.innerHTML = logs;
		logs = '';
	}

	function getFlashVersion() {
		try {
			try {
  				var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
  				try { axo.AllowScriptAccess = 'always'; }
  				catch(e) { return '6,0,0'; }
			} catch(e) {}
			return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];

		} catch(e) {
			try {
					if(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
					return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
  				}		
			} catch(e) {}
		}
		
		return '0';
	}

	function localStorageEnabeled() {
		var mod = 'localStorage';
		try {
        	localStorage.setItem(mod, mod);
        	localStorage.removeItem(mod);
        	return 'true';
    	} catch(e) {
        	return 'false';
    	}
	}

	function cookiesEnabled() {
		document.cookie = "cookietest=1";
		var ret = document.cookie.indexOf("cookietest=") != -1;
		document.cookie = "cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT";
		return ret;
	}

	uaParser.setUA(ua);
	uaDetails = uaParser.getResult();

	if (hash) {
		hash = hash.replace(/%20/g, ' ').split(':');
		log('<h2>OS</h2> ' + hash[1]);
		log('<h2>Browser</h2> ' + hash[2] + ' ' + hash[3], 'earth');
		log('<h2>Browserengine</h2> ' + hash[4]);
		log('<h2>Browser Dimensions</h2> ' + hash[5], 'browser');
		log('<h2>Device Dimensions</h2> ' + hash[6], 'screen');
		log('<h2>Color Depth</h2> ' + hash[7], 'palette');
		log('<h2>Flash</h2> Version:' + hash[8], 'flash');
		log('<h2>Cookies</h2> ' + hash[9]);
		log('<h2>Adblock</h2> ' + hash[10]);
		log('<h2>Zoomlevel</h2> ' + hash[11]);
	} else {
		log('<h2>OS</h2> ' + uaDetails.os.name + ' (' + uaDetails.os.version + ')');
		log('<h2>Browser</h2> ' + uaDetails.browser.name + ' ' + uaDetails.browser.major + ' (' + uaDetails.browser.version + ')', 'earth');
		log('<h2>Browserengine</h2> ' + uaDetails.engine.name);
		log('<h2>Browser Dimensions</h2> ' + docW + ' x ' + docH, 'browser');
		log('<h2>Device Dimensions</h2> ' + w + ' x ' + h, 'screen');
		log('<h2>Color Depth</h2> ' + color, 'palette');
		if (getFlashVersion() ===  '0') {
			log('<h2>Flash</h2> false', 'flash');
		} else {
			log('<h2>Flash</h2> Version:' + getFlashVersion().split(',').shift(), 'flash');
		}
		log('<h2>Cookies</h2> ' + cookiesEnabled());
		log('<h2>Adblock</h2> ' + adblock);
		log('<h2>Zoomlevel</h2> ' + detectZoom.zoom());
		doc.location.hash = ':' + uaDetails.os.name + ' (' + uaDetails.os.version + ')' + ':' + uaDetails.browser.name + ':' + uaDetails.browser.major + ' (' + uaDetails.browser.version + ')' + ':' + uaDetails.engine.name + ':' + docW + ' x ' + docH + ':' + w + ' x ' + h + ':' + color + ':' + getFlashVersion().split(',').shift() + ':' + cookiesEnabled() + ':' + adblock + ':' + detectZoom.zoom();
	}

	gimme();

})(document, window, document.documentElement);