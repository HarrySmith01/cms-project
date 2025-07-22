// C:\Users\Pubg\Documents\cms-project\mikro-orm.config.ts
// Description: Configuration file for MikroORM to support MySQL and MongoDB with dual DB setup, fixed deprecation by using driver class
// Created: July 22, 2025, 10:00 AM IST
// Updated: July 22, 2025, 10:20 AM IST

import { defineConfig } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql'; // For MySQL
import { MongoDriver } from '@mikro-orm/mongodb'; // For MongoDB

const dbType = process.env.DB_TYPE || 'mysql';
const driver = dbType === 'mysql' ? MySqlDriver : MongoDriver;

export default defineConfig({
  driver,
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
