// tests/code-quality.test.js
const { execSync } = require('child_process');
const assert = require('assert');
try {
  execSync('npm run lint', { stdio: 'pipe' });
  assert.ok(true, 'Linting passed');
} catch (e) {
  assert.fail('Linting failed');
}
