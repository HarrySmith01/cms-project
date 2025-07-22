// tools/check-risks.js
/* eslint-disable @typescript-eslint/no-require-imports, no-console */
/**
 * tools/check-risks.js
 * Prints the list of top-level dependencies from package.json to verify against docs/risks.md.
 * Created: July 22, 2025, 07:55 PM IST
 * Updated: July 22, 2025, 08:00 PM IST
 */

const pkg = require('../package.json');

console.log('Top-level dependencies in package.json:');
Object.entries(pkg.dependencies).forEach(([name, version]) => {
  console.log(`- ${name}: ${version}`);
});
