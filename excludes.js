
// Excludes obsolete browsers (IE < 9), unsupported addEventListener etc. from entering the page. MIT license. https://github.com/Kithraya/excludes

// if obsolete, change window.location to URL

(function(win, undefined) { // keep the global namespace unpolluted
	
	function hasAttribute(elem, attr) { return (('hasAttribute' in elem) ? elem.hasAttribute(attr) : (typeof elem[attr] !== 'undefined'));  } // elem[attr] notation works for IE6/7
	function getAttribute(elem, attr) {
			
		if (!hasAttribute(elem, attr)) { return null; } 
		var attr = (elem.getAttribute) ? elem.getAttribute(attr) : 0;
		
		if (typeof attr !== 'string') { // TODO: parse outerHTML. attr is an OBJECT if we query the style attribute in IE6/7, but we're not doing this anyway.
			return null;
		}
		
		return attr;
	}
	
	var obsolete = (function(win,undefined) { // script tags are executed in the order they appear.
		var t = true;
		var isOldIE = (function() { 
			var version = new Function("/*@cc_on return @_jscript_version; @*/")(); // "5.6/7": IE6, "5.7": IE7, "5.8": IE8, "9":IE9, "10": IE10
			return !!(version && parseInt( version, 10 ) < 9);
			})();
		if (isOldIE || !document.addEventListener) { return t } // require IE > 8 and addEventListener support.
		
		// you can add custom logic here if required, just return a truthy value.
		
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
