// Path: tests/migrations/initial.test.ts
// Description: Verifies initial migration runs against MySQL test database.
// Created: 2025-07-23T17:10:00+05:30
// Updated: 2025-07- ?? 2025

import { MikroORM } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import mysqlConfig from '../../mikro-orm.config'; // adjust if your config is named differently
import 'dotenv/config';

describe('initial migration', () => {
  it('should generate and run without errors on MySQL test DB', async () => {
    const orm = await MikroORM.init({
      ...mysqlConfig,
      driver: MySqlDriver,
      dbName: process.env.TEST_DB_NAME,
      migrations: { path: './migrations', transactional: false },
    });
    await orm.getMigrator().up();
    await orm.close();
  }, 30000);
});
