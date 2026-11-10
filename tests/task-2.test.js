const fs = require('fs');
const assert = require('assert');

const instagramPost = fs.readFileSync('_posts/2019-12-01-registro-elettronico.markdown', 'utf8');
const figmaPost = fs.readFileSync('_posts/2026-01-11-CWBI-website.md', 'utf8');
const postLayout = fs.readFileSync('_layouts/post.html', 'utf8');

// 1. Instagram script removed
assert(!instagramPost.includes('//www.instagram.com/embed.js'), 'Unsanboxed Instagram embed script still present');

// 2. Figma iframe sandbox & loading attributes
const iframeMatches = figmaPost.match(/<iframe[^>]*>/g) || [];
assert.strictEqual(iframeMatches.length, 2, 'Expected 2 Figma iframes');
for (const iframe of iframeMatches) {
  assert(iframe.includes('sandbox="allow-scripts allow-same-origin allow-popups"'), 'Missing or incorrect sandbox attribute in Figma iframe');
  assert(iframe.includes('loading="lazy"'), 'Missing loading="lazy" in Figma iframe');
}

// 3. Disqus jsonify filter
assert(postLayout.includes('this.page.url = {{ page.url | absolute_url | jsonify }};'), 'Disqus this.page.url not using jsonify');
assert(postLayout.includes('this.page.identifier = {{ page.url | absolute_url | jsonify }};'), 'Disqus this.page.identifier not using jsonify');

console.log('Task 2 assertions passed!');
