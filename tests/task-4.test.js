const fs = require('fs');
const assert = require('assert');

const gitignore = fs.readFileSync('.gitignore', 'utf8');
const lines = gitignore.split(/\r?\n/).map(l => l.trim());

// Gemfile.lock must not be ignored
assert(!lines.includes('Gemfile.lock'), 'Gemfile.lock should not be in .gitignore');

// Secrets and editor artifacts must be ignored
const requiredPatterns = ['.env', '.env.*', '*.key', '*.pem', '*.cert', '.vscode/', '.idea/'];
for (const pattern of requiredPatterns) {
  assert(lines.includes(pattern), `Missing ignore pattern in .gitignore: ${pattern}`);
}

console.log('Task 4 assertions passed!');
