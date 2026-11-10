const fs = require('fs');
const assert = require('assert');
const { execSync } = require('child_process');

// 1. Audit report updated
const auditPath = 'C:/Users/filip/audits/my-project';
assert(fs.existsSync(auditPath), `Audit report missing at ${auditPath}`);
const auditContent = fs.readFileSync(auditPath, 'utf8');

assert(auditContent.includes('EXCELLENT / HARDENED'), 'Audit report overall posture not updated to EXCELLENT / HARDENED');
for (let i = 1; i <= 11; i++) {
  const secId = `SEC-${String(i).padStart(2, '0')}`;
  assert(auditContent.includes(secId), `Missing ${secId} in audit report`);
}
assert(auditContent.includes('REMEDIATED'), 'Remediation status missing in audit report');

// 2. Full test suite verification (task-1 through task-7)
for (let i = 1; i <= 7; i++) {
  if (i === 1 || i === 2 || i === 3 || i === 4 || i === 5 || i === 6 || i === 7) {
    execSync(`node tests/task-${i}.test.js`, { stdio: 'inherit' });
  }
}

console.log('Task 8 assertions passed! Full suite green.');
