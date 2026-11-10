const fs = require('fs');
const assert = require('assert');

const home = fs.readFileSync('_layouts/home.html', 'utf8');
const pageHeader = fs.readFileSync('_includes/page_header.html', 'utf8');
const aboutHeader = fs.readFileSync('_includes/about_header.html', 'utf8');
const about = fs.readFileSync('_layouts/about.html', 'utf8');
const post = fs.readFileSync('_layouts/post.html', 'utf8');
const footer = fs.readFileSync('_includes/footer.html', 'utf8');

assert(pageHeader.includes('data-i18n="hero.status"'), 'Missing data-i18n in page_header.html');
assert(pageHeader.includes('data-i18n="hero.explore"'), 'Missing data-i18n in page_header.html');
assert(home.includes('data-i18n="portfolio.title"'), 'Missing data-i18n in home.html');
assert(aboutHeader.includes('data-i18n="about.breadcrumb.about"'), 'Missing data-i18n in about_header.html');
assert(about.includes('data-i18n="about.title.whoiam"'), 'Missing data-i18n in about.html');
assert(post.includes('data-i18n="post.back"'), 'Missing data-i18n in post.html');
assert(footer.includes('data-i18n="footer.desc"'), 'Missing data-i18n in footer.html');

console.log('i18n attributes assertions passed!');
