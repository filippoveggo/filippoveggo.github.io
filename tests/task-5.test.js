const fs = require('fs');
const assert = require('assert');

const home = fs.readFileSync('_layouts/home.html', 'utf8');
const image = fs.readFileSync('_includes/image.html', 'utf8');
const js = fs.readFileSync('assets/js/liquid-glass.js', 'utf8');

// 1. Home post.description escaped
assert(home.includes('{{ post.description | escape }}'), 'post.description in _layouts/home.html is not escaped');

// 2. Image include.description escaped
assert(image.includes('alt="{{ include.description | escape }}"'), 'image alt in _includes/image.html is not escaped');
assert(image.includes('<figcaption>{{ include.description | escape }}</figcaption>'), 'figcaption in _includes/image.html is not escaped');

// 3. JS querySelector guarded
assert(js.includes('try {') && js.includes('document.querySelector(targetId)'), 'querySelector in liquid-glass.js not wrapped in try-catch');

console.log('Task 5 assertions passed!');
