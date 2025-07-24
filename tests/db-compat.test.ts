// tests/db-compat.test.ts
/**
 * File: tests/db-compat.test.ts
 * Description: Unit tests verifying that MikroORM config and runtime helpers
 *              switch correctly between MySQL (relational) and MongoDB
 *              (embedded) strategies.
 * Created:     2025-07-24T10:25:00+05:30
 * Updated:     2025-07-24T10:25:00+05:30
 */

import path from 'node:path';

const distConfigPath = path.resolve(__dirname, '../dist/mikro-orm.config');
const utilsPath = path.resolve(__dirname, '../src/utils/db-compat');

describe('DB compatibility helpers', () => {
  const originalDbType = process.env.DB_TYPE;

  afterEach(() => {
    jest.resetModules(); // clear require cache
    process.env.DB_TYPE = originalDbType ?? 'mysql';
  });

  it('uses embedded relations when DB_TYPE=mongo', () => {
    process.env.DB_TYPE = 'mongo';
    jest.resetModules();

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const cfg = require(distConfigPath).default;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const utils = require(utilsPath);

    expect(cfg.relations).toBe('embedded');
    expect(utils.isMongo).toBe(true);
    expect(utils.relationStrategy).toBe('embedded');
  });

  it('defaults to relational strategy when DB_TYPE=mysql', () => {
    process.env.DB_TYPE = 'mysql';
    jest.resetModules();

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const cfg = require(distConfigPath).default;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const utils = require(utilsPath);

    expect(cfg.relations).toBeUndefined();
    expect(utils.isMongo).toBe(false);
    expect(utils.relationStrategy).toBe('relational');
  });
});
