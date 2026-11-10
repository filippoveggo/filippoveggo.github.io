const fs = require('fs');
const assert = require('assert');
const { execSync } = require('child_process');

// 1. Check style.css has no unpinned external @font-face
const css = fs.readFileSync('assets/css/style.css', 'utf8');
assert(!css.includes('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/webfonts'), 'style.css still contains unpinned Font Awesome webfonts');

// 2. Check head.html CSP contains GTM in frame-src and GA in img-src
const head = fs.readFileSync('_includes/head.html', 'utf8');
assert(/frame-src[^;]*https:\/\/www\.googletagmanager\.com/.test(head), 'CSP frame-src missing https://www.googletagmanager.com');
assert(/img-src[^;]*https:\/\/www\.google-analytics\.com/.test(head), 'CSP img-src missing https://www.google-analytics.com');
assert(/img-src[^;]*https:\/\/analytics\.google\.com/.test(head), 'CSP img-src missing https://analytics.google.com');

// 3. Check robots.txt is tracked in git
const gitStatus = execSync('git status --porcelain robots.txt', { encoding: 'utf8' }).trim();
assert(gitStatus === '' || !gitStatus.startsWith('??'), 'robots.txt is untracked in git');

console.log('Final review fixes assertions passed!');
