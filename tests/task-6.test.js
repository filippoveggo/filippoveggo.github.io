const fs = require('fs');
const assert = require('assert');

// 1. Files must exist and be non-empty (>10KB)
const requiredImages = [
  'images/stem/home.png',
  'images/Artivism/home.png',
  'images/Artivism/community.png',
  'images/Artivism/profile.png'
];

for (const imgPath of requiredImages) {
  assert(fs.existsSync(imgPath), `Image file missing: ${imgPath}`);
  const stat = fs.statSync(imgPath);
  assert(stat.size > 10000, `Image file suspiciously small (${stat.size} bytes): ${imgPath}`);
}

// 2. Posts must reference local images, not i.imgur.com
const stemPost = fs.readFileSync('_posts/2019-11-07-stem_project.markdown', 'utf8');
const artivismPost = fs.readFileSync('_posts/2020-08-16-artivism-PWA.markdown', 'utf8');

assert(!stemPost.includes('i.imgur.com'), 'Imgur hotlink still present in stem post');
assert(stemPost.includes('{{ "/images/stem/home.png" | relative_url }}'), 'Missing localized stem image path');

assert(!artivismPost.includes('i.imgur.com'), 'Imgur hotlink still present in artivism post');
assert(artivismPost.includes('{{ "/images/Artivism/home.png" | relative_url }}'), 'Missing localized artivism home image path');
assert(artivismPost.includes('{{ "/images/Artivism/community.png" | relative_url }}'), 'Missing localized artivism community image path');
assert(artivismPost.includes('{{ "/images/Artivism/profile.png" | relative_url }}'), 'Missing localized artivism profile image path');

console.log('Task 6 assertions passed!');
