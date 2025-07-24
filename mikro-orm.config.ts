/* eslint-disable */
/**
 * File: mikro-orm.config.ts
 * Description: Configuration for MikroORM with MySQL/MongoDB dual-DB support.
 * Created: 2025-07-22T10:00:00+05:30
 * Updated: 2025-07-26T09:00:00+05:30
 */

import { config as loadEnv } from 'dotenv';
import { defineConfig } from '@mikro-orm/mysql';
import { MySqlDriver } from '@mikro-orm/mysql';
import { MongoDriver } from '@mikro-orm/mongodb';
// import { DictionarySubscriber } from './src/subscribers/DictionarySubscriber';

//
// 1) load the right .env file based on NODE_ENV
//
export const env = process.env.NODE_ENV ?? 'development';
loadEnv({ path: `.env.${env}` });

//
// 2) detect whether we’re on Mongo or MySQL
//
export const dbType = process.env.DB_TYPE === 'mongo' ? 'mongo' : 'mysql';
export const isMongo = dbType === 'mongo';

const config = defineConfig({
  // allow CLI to load TS directly
  tsNode: true,

  // driver selection
  // @ts-expect-error: driver signature mismatch is acceptable
  driver: isMongo ? MongoDriver : MySqlDriver,

  //
  // 3) database name: always from DB_NAME in the chosen .env file
  //
  dbName: isMongo ? undefined : process.env.DB_NAME,

  //
  // 4) MySQL connection settings
  //
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,

  //
  // 5) MongoDB connection string
  //
  clientUrl: isMongo ? process.env.MONGO_URL : undefined,

  //
  // 6) logging & debug
  //
  debug: true,
  logger: (msg) => console.log(msg),

  //
  // 7) where to find your entities
  //
  entities: ['./dist/entities/**/*.js'],
  entitiesTs: ['./src/entities/**/*.ts'],

  //
  // 8) migrations and seeders
  //
  migrations: {
    path: './migrations',
    glob: '!(*.d).{js,ts}',
  },
  seeder: {
    path: './src/seeders',
    defaultSeeder: 'DatabaseSeeder',
  },

  // subscribers: [DictionarySubscriber], // re-enable when ready
});

// Named-export the bits your tests need:
//export { dbType, isMongo, env };

// Default export remains the full config object:
export default config;
