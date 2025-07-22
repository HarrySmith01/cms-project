/* eslint-disable */
/**
 * C:\Users\Pubg\Documents\cms-project\mikro-orm.config.ts
 * Description: Configuration for MikroORM with MySQL/MongoDB dual-DB support.
 *              Loads .env via dotenv and exports `dbType` for tests.
 * Created: July 22, 2025 10:00 AM IST
 * Updated: July 22, 2025 07:30 PM IST
 */

import 'dotenv/config';
import { defineConfig } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import { MongoDriver } from '@mikro-orm/mongodb';

// export this for tests
export const dbType = process.env.DB_TYPE === 'mongo' ? 'mongo' : 'mysql';

export default defineConfig({
  // @ts-expect-error: driver signature mismatch in v6 is acceptable
  driver: dbType === 'mongo' ? MongoDriver : MySqlDriver,
  dbName: 'cms',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || 'localhost',
  clientUrl:
    dbType === 'mongo'
      ? process.env.MONGO_URL || 'mongodb://localhost:27017/cms'
      : undefined,
  entities: ['./dist/entities/*.js'],
  entitiesTs: ['./src/entities/*.ts'],
  migrations: { path: './migrations' },
  seeder: { path: './src/seeders' },
});
