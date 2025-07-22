/* eslint-disable import/no-unresolved */
/**
 * tests/mikro-config.test.ts
 * Validates that the exported `dbType` matches process.env.DB_TYPE logic.
 */

describe('MikroORM Config dbType', () => {
  beforeEach(() => {
    jest.resetModules(); // clear cache so require() re-evaluates process.env
  });

  it('defaults to "mysql" when DB_TYPE is empty or invalid', () => {
    process.env.DB_TYPE = '';
    let { dbType } = require('../mikro-orm.config');
    expect(dbType).toBe('mysql');

    process.env.DB_TYPE = 'somethingElse';
    jest.resetModules();
    ({ dbType } = require('../mikro-orm.config'));
    expect(dbType).toBe('mysql');
  });

  it('returns "mongo" when DB_TYPE="mongo"', () => {
    process.env.DB_TYPE = 'mongo';
    const { dbType } = require('../mikro-orm.config');
    expect(dbType).toBe('mongo');
  });
});
