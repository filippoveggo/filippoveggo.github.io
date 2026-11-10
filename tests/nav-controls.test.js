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

// Assert theme toggle icons (Moon for dark, Sun for light)
assert(nav.includes('icon-theme-moon'), 'Missing moon icon on theme toggle');
assert(nav.includes('icon-theme-sun'), 'Missing sun icon on theme toggle');

// Assert NO text description on mobile theme toggle
assert(!nav.includes('data-i18n="nav.theme"'), 'Mobile theme toggle should not have text description');

// Assert single flag switcher with vector SVGs
assert(nav.includes('flag-it'), 'Missing Italian flag icon');
assert(nav.includes('flag-en'), 'Missing UK/English flag icon');

// Assert duplicate mail icon button is removed in favor of primary Contact CTA
assert(!nav.includes('aria-label="Send Email"'), 'Navbar should not have duplicate standalone mail icon button');
assert(nav.includes('nav-cta-btn'), 'Navbar must retain primary Contact CTA button');

console.log('Nav controls assertions passed!');
