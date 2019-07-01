# excludes
Provides an automatic redirect to an URL of your choice upon encountering an obsolete browser.

Standards tested are requiring `IE >= 9`, `document.addEventListener`, and, optionally, `document.currentScript`.

Tested in Chrome, Firefox, Safari, IE6+

Use like: `<script src = 'excludes.js' get = 'YOUR_URL_HERE'></script>`

For W3C compatibility, `data-get` is also supported. If both `get` and `data-get` are specified, `data-get` is used.

