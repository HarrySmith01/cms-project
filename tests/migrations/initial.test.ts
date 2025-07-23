// Path: tests/migrations/initial.test.ts
// Description: Verifies initial migration runs against MySQL test database.
// Created: 2025-07-23T17:10:00+05:30
// Updated: 2025-07-26T10:30:00+05:30

import { MikroORM } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import ormConfig from '../../mikro-orm.config'; // adjust path if needed
import 'dotenv/config';

describe('initial migration', () => {
  it('should generate and run without errors on MySQL test DB', async () => {
    const orm = await MikroORM.init({
      ...ormConfig,
      driver: MySqlDriver,
      // dbName lives in ormConfig.dbName (loaded from DB_NAME in .env.test)
      migrations: {
        ...ormConfig.migrations,
        transactional: false,
      },
    });
    await orm.getMigrator().up();
    await orm.close(true);
  }, 30000);
});
