const fs = require('fs');
const path = require('path');
const assert = require('assert');

// 1. Extract TRANSLATIONS dictionary from liquid-glass.js
const jsContent = fs.readFileSync('assets/js/liquid-glass.js', 'utf8');
const match = jsContent.match(/const TRANSLATIONS = ({[\s\S]*?\n  });/);
assert(match, 'Failed to extract TRANSLATIONS object from assets/js/liquid-glass.js');

let TRANSLATIONS;
try {
  TRANSLATIONS = eval('(' + match[1] + ')');
} catch (e) {
  assert.fail('Error parsing TRANSLATIONS: ' + e.message);
}

// 2. Scan all HTML files in _layouts and _includes for data-i18n
const htmlFiles = [];
function findHtmlFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findHtmlFiles(fullPath);
    } else if (entry.name.endsWith('.html')) {
      htmlFiles.push(fullPath);
    }
  }
}

findHtmlFiles('_layouts');
findHtmlFiles('_includes');

const usedKeys = new Set();
const keyRegex = /data-i18n="([^"]+)"/g;

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = keyRegex.exec(content)) !== null) {
    usedKeys.add(m[1]);
  }
}

console.log(`Found ${usedKeys.size} distinct i18n keys across ${htmlFiles.length} template files.`);

// 3. Verify each key exists and has non-empty en and it
for (const key of usedKeys) {
  assert(TRANSLATIONS[key], `Missing translation key: "${key}" in TRANSLATIONS`);
  assert(typeof TRANSLATIONS[key].en === 'string' && TRANSLATIONS[key].en.length > 0, `Key "${key}" has invalid or empty English string`);
  assert(typeof TRANSLATIONS[key].it === 'string' && TRANSLATIONS[key].it.length > 0, `Key "${key}" has invalid or empty Italian string`);
}

// 4. Verify Theme tokens in _sass/_theme.scss
const scss = fs.readFileSync('_sass/_theme.scss', 'utf8');
assert(scss.includes('[data-theme="light"]'), 'SCSS missing [data-theme="light"] block');
assert(scss.includes('--bg-deep: #f5f5f7;'), 'SCSS missing light bg-deep');
assert(scss.includes('--text-primary: #1d1d1f;'), 'SCSS missing light text-primary');

// 5. Verify Head FOUC script
const head = fs.readFileSync('_includes/head.html', 'utf8');
assert(head.includes('data-theme'), 'head.html missing data-theme assignment');
assert(head.includes('localStorage.getItem(\'theme\')'), 'head.html missing localStorage read');

// 6. Verify Navigation buttons
const nav = fs.readFileSync('_includes/nav.html', 'utf8');
assert(nav.includes('id="theme-toggle-btn"'), 'nav.html missing #theme-toggle-btn');
assert(nav.includes('id="lang-toggle-btn"'), 'nav.html missing #lang-toggle-btn');
assert(nav.includes('id="mobile-theme-toggle-btn"'), 'nav.html missing #mobile-theme-toggle-btn');
assert(nav.includes('id="mobile-lang-toggle-btn"'), 'nav.html missing #mobile-lang-toggle-btn');

console.log('All E2E Theme & i18n checks passed successfully!');
