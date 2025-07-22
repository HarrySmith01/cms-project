// C:\Users\Pubg\Documents\cms-project\tests\mikro-config.test.ts
// Description: Unit tests for MikroORM configuration switching between MySQL and MongoDB
// Created: July 22, 2025, 10:05 AM IST
// Updated: July 22, 2025, 10:05 AM IST
import config from '../mikro-orm.config';
describe('MikroORM Config', () => {
  it('loads mysql by default', () => {
    process.env.DB_TYPE = '';
    expect(config.type).toBe('mysql');
  });
  it('switches to mongo', () => {
    process.env.DB_TYPE = 'mongo';
    expect(config.type).toBe('mongo');
  });
});
