// tests/mikro-config.test.ts
/* eslint-disable @typescript-eslint/no-require-imports, import/no-unresolved */
/**
 * tests/mikro-config.test.ts
 * Validates the exported dbType from mikro-orm.config.ts.
 */

describe('MikroORM Config dbType', () => {
  beforeEach(() => {
    jest.resetModules(); // clear cache so require() re-evaluates process.env
  });

  it('defaults to "mysql" when DB_TYPE is empty or invalid', () => {
    process.env.DB_TYPE = '';
    // eslint-disable-next-line global-require
    let { dbType } = require('../mikro-orm.config');
    expect(dbType).toBe('mysql');

    process.env.DB_TYPE = 'somethingElse';
    jest.resetModules();
    // eslint-disable-next-line global-require
    ({ dbType } = require('../mikro-orm.config'));
    expect(dbType).toBe('mysql');
  });

  it('returns "mongo" when DB_TYPE="mongo"', () => {
    process.env.DB_TYPE = 'mongo';
    // eslint-disable-next-line global-require
    const { dbType } = require('../mikro-orm.config');
    expect(dbType).toBe('mongo');
  });
});
