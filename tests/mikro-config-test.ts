// C:\Users\Pubg\Documents\cms-project\tests\mikro-config-test.ts
// Description: Simple test to verify MikroORM configuration type
// Created: July 22, 2025, 10:05 AM IST
// Updated: July 22, 2025, 10:05 AM IST
import config from '../mikro-orm.config';
console.assert(
  config.type === 'mysql' || config.type === 'mongo',
  'Invalid DB type'
);
console.log('MikroORM config verified');
