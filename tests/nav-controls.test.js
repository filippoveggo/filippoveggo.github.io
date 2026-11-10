const fs = require('fs');
const assert = require('assert');

const nav = fs.readFileSync('_includes/nav.html', 'utf8');

// Assert desktop toggle controls
assert(nav.includes('id="theme-toggle-btn"'), 'Missing desktop theme toggle button in _includes/nav.html');
assert(nav.includes('id="lang-toggle-btn"'), 'Missing desktop language toggle button in _includes/nav.html');

// Assert mobile toggle controls
assert(nav.includes('id="mobile-theme-toggle-btn"'), 'Missing mobile theme toggle button in _includes/nav.html');
assert(nav.includes('id="mobile-lang-toggle-btn"'), 'Missing mobile language toggle button in _includes/nav.html');

// Assert accessibility attributes
assert(nav.includes('aria-label="Toggle theme"'), 'Missing aria-label on theme toggle');
assert(nav.includes('aria-label="Switch language"'), 'Missing aria-label on language toggle');

console.log('Nav controls assertions passed!');
