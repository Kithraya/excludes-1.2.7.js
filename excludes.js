/** Excludes obsolete browsers (IE < 11), unsupported addEventListener etc. from entering the page 
    by redirecting to a specified URL before your code runs
    MIT license. https://github.com/Kithraya/excludes 
    Tested in IE6+, Chrome, Firefox, Edge, Opera 10.6+, etc.
*/

// dropping support for IE5-10 leaves ~5 out of every 1000 clients high and dry. Acceptable.

(function(win, doc, undefined) { // keep the global namespace unpolluted by wrapping in an IIFE

	var version = "1.2.1";
	var obsolete = false;
	
	var is_IE11 = !!( !('currentScript' in document) && window.msCrypto);
	
	/*  msCrypto (with the prefix ms-) is only defined in IE11 (for now).
	    Source - https://developer.mozilla.org/en-US/docs/Web/API/Window/crypto
	    Shoutout to https://stackoverflow.com/users/5807141/j-j for the overlooked comment on msCrypto -
	    https://stackoverflow.com/questions/21825157/internet-explorer-11-detection
	    And document.currentScript is not defined in any version of IE, but all versions of Edge support it.
	    so we combine the checks to future proof it.
	    If documentMode has been changed from the default, `is_IE11` will be `false`, but `@_jscript_version` will return "11".
	*/

	var jscript_version = parseInt( new Function("/*@cc_on return @_jscript_version; @*/")() , 10); 
	
	// values before parseInt:
	// NOT IE: `undefined`, IE6: "5.6" or "5.7", IE7: "5.7", IE8: "5.8", IE9: "9", IE10: "10", IE11 in an older document mode: "11"

	/*  Conditional compilation (@cc_on) executes in IE only, and does not change with the document mode.
	    Browsers other than IE will interpret this as `new Function("")()` which is the same as `function()()` which is `undefined`. 
	    `parseInt(undefined)` returns `NaN` which is falsy
	    by default, IE11 will not interpret conditional compilations, unless IE11 is in an older document mode
	*/
	
	if ( jscript_version || !document.addEventListener ) { obsolete = true; }
	// Do not allow IE11 operating in older document modes, else code may still break
	
	// to exclude IE 11 period, regardless of document mode, uncomment the following line: 
	///	if (is_IE11 || jscript_version === 11 ) { obsolete = true; }
	
	var scripts = document.getElementsByTagName('script');
	var attr, i, elem, allow;
	if (obsolete) {
		for (i=0; i < scripts.length; i++) {
			elem = scripts[i];
			if (elem.getAttribute) { 
				// `getAttribute` is not foolproof in every situation but it's usable for our purposes here
				attr = elem.getAttribute('data-redirect') || elem.getAttribute('redirect') || 
				       elem.getAttribute('data-fallback') || elem.getAttribute('fallback') || false;
				if (attr) {
					window.location.href = attr; break;
				}
			} else {
				window.location.href = 'https://google.co.uk'; 
				// if you find a browser where `getAttribute` isn't supported, let me know
			}
		}
	}

})(window, document);
