# excludes.js
Provides an automatic redirect to an URL of your choice upon encountering an obsolete browser.

Standards tested are requiring `IE >= 11`, `document.addEventListener`, and, optionally, `document.currentScript`.

Tested in Chrome, Firefox, Safari, IE6+, etc. via BrowserStack.

Use like: `<script src = 'excludes.js' redirect = 'YOUR_URL_HERE'></script>`
Add that before your other scripts.

For W3C / HTML5 compatibility, `data-redirect` is also supported. If both 'redirect` and `data-redirect` are specified, `data-redirect` is used.

