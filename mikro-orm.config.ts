// mikro-orm.config.ts
/**
 * File: mikro-orm.config.ts
 * Description: MikroORM configuration with dual-DB support (MySQL | MongoDB),
 *              now selecting embedded relations for Mongo collections.
 * Created:    2025-07-22T10:00:00+05:30
 * Updated:    2025-07-24T09:45:00+05:30
 */

/* eslint-disable */

import { config as loadEnv } from 'dotenv';
import { defineConfig } from '@mikro-orm/mysql';
import { MySqlDriver } from '@mikro-orm/mysql';
import { MongoDriver } from '@mikro-orm/mongodb';
// import { DictionarySubscriber } from './src/subscribers/DictionarySubscriber';

//
// 1) Load the correct .env file based on NODE_ENV
//
export const env = process.env.NODE_ENV ?? 'development';
loadEnv({ path: `.env.${env}` });

//
// 2) Determine database type
//
export const dbType = process.env.DB_TYPE === 'mongo' ? 'mongo' : 'mysql';
export const isMongo = dbType === 'mongo';

//
// 3) Relation strategy: embed docs for Mongo, leave undefined for MySQL
//
const relationStrategy = isMongo ? ('embedded' as const) : undefined;

const config = defineConfig({
  // Allow CLI to load TS directly
  tsNode: true,

  // Driver selection
  // @ts-expect-error Driver signature mismatch accepted for dual-DB support
  driver: isMongo ? MongoDriver : MySqlDriver,

  //
  // 4) Database connection options
  //
  dbName: isMongo ? undefined : process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,

  // MongoDB connection string
  clientUrl: isMongo ? process.env.MONGO_URL : undefined,

  //
  // 5) Relation mapping
  //
  relations: relationStrategy, // <-- NEW

  //
  // 6) Logging & debug
  //
  debug: true,
  logger: (msg) => console.log(msg),

  //
  // 7) Entity paths
  //
  entities: ['./dist/entities/**/*.js'],
  entitiesTs: ['./src/entities/**/*.ts'],

  //
  // 8) Migrations & seeders
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

// Default export
export default config;
