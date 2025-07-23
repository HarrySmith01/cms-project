// C:\Users\Pubg\Documents\cms-project\tests\mikro-config-test.ts
// Description: Simple test to verify MikroORM configuration type
// Created: July 22, 2025, 10:05 AM IST
// Updated: July 26, 2025, 10:30 AM IST

import { dbType } from '../mikro-orm.config';

console.assert(
  dbType === 'mysql' || dbType === 'mongo',
  `Invalid DB type "${dbType}"`
);
console.log('MikroORM config verified:', dbType);
