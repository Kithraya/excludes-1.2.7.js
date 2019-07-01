
// Excludes obsolete browsers (IE < 9), unsupported addEventListener etc. from entering the page. MIT license. https://github.com/Kithraya/excludes

// if obsolete, change window.location to URL

(function(win, undefined) { // keep the global namespace unpolluted by wrapping in an IIFE
	
	function hasAttribute(elem, attr) { return (('hasAttribute' in elem) ? elem.hasAttribute(attr) : (typeof elem[attr] !== 'undefined'));  } // elem[attr] notation works for IE6/7
	function getAttribute(elem, attr) {
			
		if (!hasAttribute(elem, attr)) { return null; } 
		var attr = (elem.getAttribute) ? elem.getAttribute(attr) : 0;
		
		if (typeof attr !== 'string') { // TODO: parse outerHTML. attr is an OBJECT if we query the style attribute in IE6/7, but we're not doing this anyway (yet).
			return null;
		}
		
		return attr;
	}
	
	var is_IE11 = !('currentScript' in document) && !!window.msCrypto ; // msCrypto (with the prefix) is only defined in IE11 (for now).
	// And document.currentScript is not defined in any version of IE, but all versions of Edge support it.
	// so we combine the checks to future proof it.
	
	var obsolete = (function(win,undefined) { // script tags are executed in the order they appear.
		var t = true;
		var isOldIE = (function() { // handy conditional compilation
			var version = new Function("/*@cc_on return @_jscript_version; @*/")(); // "5.6/7": IE6, "5.7": IE7, "5.8": IE8, "9":IE9, "10": IE10
			return !!(version && parseInt( version, 10 ) < 9);
			})();
		if (isOldIE || !document.addEventListener) { return t } // require IE > 8 and addEventListener support.
		
		// Technically just checking for addEventListener invalidates IE <= 8, but if you wanted to also exclude
		// IE9 and 10, change the version number to 11: parseInt( version, 10 ) < 11.
		// to exclude IE11, check for is_IE11
		// you can add more custom logic here if required, but remember to return a Boolean
		
	})(win);
	
	var scripts = document.getElementsByTagName('script');
	var attr, i, elem;
	if (obsolete) {
		for (i=0; i < scripts.length; i++) {
			elem = scripts[i];
			attr = getAttribute(elem, 'data-get') || getAttribute(elem, 'get') || 
             		       getAttribute(elem, 'data-fallback') || getAttribute(elem, 'fallback') || false;
			if (attr) { 
				window.location.href = attr; break;
			}
			
			
		}
	}

})(window);
