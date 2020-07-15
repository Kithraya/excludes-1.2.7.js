/** 
	Excludes obsolete browsers (IE < 11), unsupported addEventListener etc. from entering the page 
    by redirecting to a specified URL before your code runs
    MIT license. https://github.com/Kithraya/excludes 
    Tested in IE6+, Chrome, Firefox, Edge, Opera 10.6+, etc.
*/

// dropping support for IE5-10 leaves ~5 out of every 1000 clients high and dry. Acceptable.
// https://caniuse.com/#feat=queryselector
// https://caniuse.com/#feat=addeventlistener
// https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
// add document.currentScript ?
// add document.visiblityState?

(function(win, doc, undefined) { // keep the global namespace unpolluted by wrapping in an IIFE

	var version = "1.2.6";
	var obsolete = false;
	
	var is_default_IE11 = !!( !document['currentScript'] && window.msCrypto );

	// msCrypto (with the prefix) is only defined in IE11 in IE11 document mode (for now). (Yes, I checked via Browserstack)
	// Source: https://developer.mozilla.org/en-US/docs/Web/API/Window/crypto 
	// Shoutout to https://stackoverflow.com/users/5807141/j-j for the overlooked comment on msCrypto:
	// https://stackoverflow.com/questions/21825157/internet-explorer-11-detection
	// And document.currentScript is not defined in any version of IE, but all versions of Edge support it.
	// so we combine the checks to future proof it.
	// By default, IE11 does not interpret conditional compilation, so `@_jscript_version` is `undefined`. 
	// But if IE11's documentMode has been changed from the default, "is_default_IE11" will return `false`,
	// and `@_jscript_version` will return "11". (Yep, textbook Microsoft)
	
	// Check for IE < 11 via conditional compilation
	var jscript_version = Number( new Function("/*@cc_on return @_jscript_version; @*/") ) || undefined;
	/// values: 5?: IE5, 5.5?: IE5.5, 5.6/5.7: IE6/7, 5.8: IE8, 9: IE9, 10: IE10, 11*: (IE11 older doc mode), undefined: IE11 / NOT IE
	
	if ( jscript_version || !document.addEventListener || !document.querySelectorAll || !window.matchMedia ) { obsolete = true; }
	// (We do not allow IE11 operating in older document modes, else code may still break)
	
	var did_throw = (function() { 
		try { 
			eval('Boolean, Date, Element, Error, Event, Function, Image, Math, Navigator, Node, Window'); 
			var i = new Image(100,100); // image constructor

		} catch (e) { return true; } return false; 
	})();
	// required DOM interfaces: new Error(), new Date(), Element.prototype, Event.prototype, Node.nodeType, Navigator.userAgent
	
	if (did_throw) { obsolete = true }
	// to exclude IE 11 period, regardless of document mode, uncomment the following line: 
	///	if (is_default_IE11 || jscript_version === 11 ) { obsolete = true; }
	
	// the dom isnt necessarily loaded by the time this happens.
	var scripts = document.getElementsByTagName('script');
	var attr, i, elem, allow;
	//obsolete = true; //
	if (obsolete) {
		for (i=0; i < scripts.length; i++) { // backwards scripts?
			elem = scripts[i];
			if (elem.getAttribute) { 
				// `getAttribute` is not foolproof in every situation but it's usable for our purposes here
				attr = elem.getAttribute('data-redirect') || elem.getAttribute('redirect') || 
				       elem.getAttribute('data-fallback') || elem.getAttribute('fallback') || false;
				
				//var force = elem.getAttribute('force');
				if (attr) {
					window.location.href = attr; break;
				}
			} else {
				 // attr = elem['data-redirect'];
				window.location.href = 'https://google.co.uk'; 
				// if you actually find a browser where `getAttribute` isn't supported, let me know
			}
		}
	}

})(window, document);
