const fs = require('fs');
const assert = require('assert');

// 1. Deleted files must not exist
const deletedFiles = [
  'assets/js/picker.js',
  '_sass/ext/_fonts.scss',
  'googlee9da88a3d95c80d9.html',
  'sitemap.xml',
  'assets/font/fontello.eot',
  'assets/font/fontello.svg',
  'assets/font/fontello.ttf',
  'assets/font/fontello.woff',
  'assets/font/fontello.woff2'
];

for (const f of deletedFiles) {
  assert(!fs.existsSync(f), `File should be deleted: ${f}`);
}

// 2. Duplicate meta tag removed from _includes/head.html
const head = fs.readFileSync('_includes/head.html', 'utf8');
assert(!head.includes('name="google-site-verification"'), 'Duplicate google-site-verification meta tag still in _includes/head.html');

console.log('Task 7 assertions passed!');
