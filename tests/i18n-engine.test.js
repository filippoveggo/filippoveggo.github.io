const fs = require('fs');
const assert = require('assert');

const script = fs.readFileSync('assets/js/liquid-glass.js', 'utf8');

// Assert translations dictionary
assert(script.includes('const TRANSLATIONS ='), 'Missing TRANSLATIONS dictionary in liquid-glass.js');
assert(script.includes("'nav.about'"), 'Missing nav.about in TRANSLATIONS');
assert(script.includes("'hero.status'"), 'Missing hero.status in TRANSLATIONS');
assert(script.includes("'portfolio.title'"), 'Missing portfolio.title in TRANSLATIONS');
assert(script.includes("'about.title.whoiam'"), 'Missing about.title.whoiam in TRANSLATIONS');

// Assert functions
assert(script.includes('function setTheme(') || script.includes('const setTheme ='), 'Missing setTheme function');
assert(script.includes('function setLanguage(') || script.includes('const setLanguage ='), 'Missing setLanguage function');
assert(script.includes('function applyLanguage(') || script.includes('const applyLanguage ='), 'Missing applyLanguage function');

console.log('i18n engine assertions passed!');
