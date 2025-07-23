/* eslint-disable */
/**
 * File: mikro-orm.config.ts
 * Description: Configuration for MikroORM with MySQL/MongoDB dual-DB support.
 * Created: 2025-07-22T10:00:00+05:30
 * Updated: 2025-07-25T21:30:00+05:30
 */

import 'dotenv/config';
// 👇 use the MySQL-specific defineConfig helper
import { defineConfig } from '@mikro-orm/mysql';
import { MySqlDriver } from '@mikro-orm/mysql';
import { MongoDriver } from '@mikro-orm/mongodb';
// import { DictionarySubscriber } from './src/subscribers/DictionarySubscriber';

export const dbType = process.env.DB_TYPE === 'mongo' ? 'mongo' : 'mysql';

export default defineConfig({
  // allow CLI to load TS directly
  tsNode: true,

  // driver selection
  // @ts-expect-error: driver signature mismatch is acceptable
  driver: dbType === 'mongo' ? MongoDriver : MySqlDriver,

  dbName: 'cms',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || 'localhost',

  // MongoDB connection string (if using Mongo)
  clientUrl:
    dbType === 'mongo'
      ? process.env.MONGO_URL || 'mongodb://localhost:27017/cms'
      : undefined,

  // debug logging for CLI
  debug: true,
  logger: (msg) => console.log(msg),

  // runtime entities (compiled JS)
  entities: ['./dist/entities/**/*.js'],

  // CLI entities (TS sources)
  entitiesTs: ['./src/entities/**/*.ts'],

  // migrations
  migrations: {
    path: './migrations',
    // ignore .d.ts files
    glob: '!(*.d).{js,ts}',
  },

  // seeders
  seeder: {
    path: './src/seeders',
    defaultSeeder: 'DatabaseSeeder',
  },

  // subscribers: [DictionarySubscriber], // re-enable when ready
});
