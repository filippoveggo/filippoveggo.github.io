const fs = require('fs');
const assert = require('assert');

const scss = fs.readFileSync('_sass/_theme.scss', 'utf8');

// Assert light theme selector exists
assert(scss.includes('[data-theme="light"]'), 'Missing [data-theme="light"] selector in _sass/_theme.scss');

// Assert required light theme tokens
const requiredTokens = [
  '--bg-deep: #f5f5f7;',
  '--bg-spatial: #ffffff;',
  '--glass-surface: rgba(255, 255, 255, 0.72);',
  '--glass-border: rgba(0, 0, 0, 0.08);',
  '--text-primary: #1d1d1f;',
  '--text-secondary: #424245;',
  '--text-tertiary: #6e6e73;',
  '--accent-blue: #0071e3;'
];

requiredTokens.forEach(token => {
  assert(scss.includes(token), `Missing light theme token: ${token}`);
});

console.log('Theme tokens assertions passed!');
