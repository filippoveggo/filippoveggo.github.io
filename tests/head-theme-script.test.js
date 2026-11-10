const fs = require('fs');
const assert = require('assert');

const head = fs.readFileSync('_includes/head.html', 'utf8');

assert(head.includes('localStorage.getItem'), 'Missing localStorage check in head.html');
assert(head.includes('data-theme'), 'Missing data-theme attribute assignment in head.html');
assert(head.includes('prefers-color-scheme'), 'Missing system color scheme fallback in head.html');

console.log('Head theme script assertions passed!');
