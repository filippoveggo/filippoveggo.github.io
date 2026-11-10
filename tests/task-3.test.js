const fs = require('fs');
const assert = require('assert');

const deployYaml = fs.readFileSync('.github/workflows/deploy.yml', 'utf8');

// Check SHA pins
const expectedPins = [
  'actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11',
  'actions/configure-pages@983d7736d9b0ae728b81ab479565c72886d7745b',
  'actions/jekyll-build-pages@0811904d9c614b184f4f346b0d91012674e2b101',
  'actions/upload-pages-artifact@56afc609e74202658d3ffba0e8f6dda462b719fa',
  'actions/deploy-pages@d6db90164ac5ed86f2b6aed7e0febac5b3c0c03e'
];

for (const pin of expectedPins) {
  assert(deployYaml.includes(pin), `Missing commit SHA pin: ${pin}`);
}

// Check unpinned actions are gone
assert(!deployYaml.includes('uses: actions/checkout@v4'), 'Found unpinned checkout@v4');
assert(!deployYaml.includes('uses: actions/configure-pages@v5'), 'Found unpinned configure-pages@v5');
assert(!deployYaml.includes('uses: actions/jekyll-build-pages@v1'), 'Found unpinned jekyll-build-pages@v1');
assert(!deployYaml.includes('uses: actions/upload-pages-artifact@v3'), 'Found unpinned upload-pages-artifact@v3');
assert(!deployYaml.includes('uses: actions/deploy-pages@v4'), 'Found unpinned deploy-pages@v4');

// Check timeouts
const timeoutMatches = deployYaml.match(/timeout-minutes:\s*10/g) || [];
assert.strictEqual(timeoutMatches.length, 2, 'Expected timeout-minutes: 10 on both jobs');

// Check top-level vs job-level permissions
assert(/permissions:\s*\n\s*contents:\s*read\s*\n\s*concurrency:/.test(deployYaml), 'Top-level permissions must only contain contents: read');
assert(/deploy:[\s\S]*permissions:\s*\n\s*pages:\s*write\s*\n\s*id-token:\s*write/.test(deployYaml), 'deploy job missing least-privilege permissions');

// Check dependabot.yml
assert(fs.existsSync('.github/dependabot.yml'), '.github/dependabot.yml does not exist');
const dependabotYaml = fs.readFileSync('.github/dependabot.yml', 'utf8');
assert(dependabotYaml.includes('github-actions'), 'dependabot missing github-actions ecosystem');
assert(dependabotYaml.includes('bundler'), 'dependabot missing bundler ecosystem');
assert(dependabotYaml.includes('weekly'), 'dependabot missing weekly schedule');

console.log('Task 3 assertions passed!');
