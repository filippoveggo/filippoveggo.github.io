const fs = require('fs');
const assert = require('assert');

const head = fs.readFileSync('_includes/head.html', 'utf8');
const theme = fs.readFileSync('_sass/_theme.scss', 'utf8');

const SRI_HASH = 'sha384-qrALq7+6jBOZIQsNnT6xGkMDru64qD6uTlDra39xrt2SoXl4pO3FX6Roz/RpR/BS';

// Check SRI on Font Awesome elements in _includes/head.html
assert(head.includes(`integrity="${SRI_HASH}"`), 'Missing Font Awesome integrity hash');
assert(head.includes('crossorigin="anonymous"'), 'Missing crossorigin attribute for Font Awesome');

// Check CSP and Referrer Policy in _includes/head.html
assert(head.includes('http-equiv="Content-Security-Policy"'), 'Missing CSP meta tag');
assert(head.includes("default-src 'self'"), 'Missing default-src directive in CSP');
assert(head.includes("https://www.googletagmanager.com"), 'Missing GTM in script/connect/img-src in CSP');
assert(head.includes('name="referrer" content="strict-origin-when-cross-origin"'), 'Missing referrer policy meta tag');

// Check _sass/_theme.scss removed unpinned @font-face blocks
assert(!theme.includes('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/webfonts/fa-brands-400.woff2'), 'fa-brands @font-face not removed');
assert(!theme.includes('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/webfonts/fa-regular-400.woff2'), 'fa-regular @font-face not removed');
assert(!theme.includes('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/webfonts/fa-solid-900.woff2'), 'fa-solid @font-face not removed');

console.log('Task 1 assertions passed!');
