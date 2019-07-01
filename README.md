# excludes
Provides an automatic redirect upon encountering an obsolete browser.

Standards tested are requiring `IE >= 9`, `document.addEventListener`.

Tested in Chrome, Firefox, Safari, IE6+

Use like: `<script src = 'excludes.js' get = 'fallback.html'></script>`

For W3C compatibility, `data-get` is also supported. If both are specified, `data-get` is used.

