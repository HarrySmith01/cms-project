"use strict";
/* eslint-disable */
/**
 * File: mikro-orm.config.ts
 * Description: Configuration for MikroORM with MySQL/MongoDB dual-DB support.
 * Created: 2025-07-22T10:00:00+05:30
 * Updated: 2025-07-26T09:00:00+05:30
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMongo = exports.dbType = exports.env = void 0;
const dotenv_1 = require("dotenv");
const mysql_1 = require("@mikro-orm/mysql");
const mysql_2 = require("@mikro-orm/mysql");
const mongodb_1 = require("@mikro-orm/mongodb");
// import { DictionarySubscriber } from './src/subscribers/DictionarySubscriber';
//
// 1) load the right .env file based on NODE_ENV
//
exports.env = process.env.NODE_ENV ?? 'development';
(0, dotenv_1.config)({ path: `.env.${exports.env}` });
//
// 2) detect whether we’re on Mongo or MySQL
//
exports.dbType = process.env.DB_TYPE === 'mongo' ? 'mongo' : 'mysql';
exports.isMongo = exports.dbType === 'mongo';
const config = (0, mysql_1.defineConfig)({
    // allow CLI to load TS directly
    tsNode: true,
    // driver selection
    // @ts-expect-error: driver signature mismatch is acceptable
    driver: exports.isMongo ? mongodb_1.MongoDriver : mysql_2.MySqlDriver,
    //
    // 3) database name: always from DB_NAME in the chosen .env file
    //
    dbName: exports.isMongo ? undefined : process.env.DB_NAME,
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
    clientUrl: exports.isMongo ? process.env.MONGO_URL : undefined,
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
exports.default = config;
