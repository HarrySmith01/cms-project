// Path: scripts/db-setup.ts
// Description: Reads NODE_ENV (default “development”), loads .env, creates MySQL & MongoDB databases (with at least one collection) if missing.
// Created: 2025-07-23T12:00:00+05:30
// Updated: 2025-07-26T14:00:00+00:00

import { config as loadEnv } from 'dotenv';
import mysql from 'mysql2/promise';
import { MongoClient } from 'mongodb';

// 1) load the right .env file based on NODE_ENV
const env = process.env.NODE_ENV || 'development';
loadEnv({ path: `.env.${env}` });

async function main() {
  // 2) MySQL setup
  if (process.env.DB_TYPE !== 'mongo') {
    const mysqlDbs: string[] = [];
    if (env === 'production') {
      mysqlDbs.push(process.env.DB_NAME!);
    } else if (env === 'test') {
      mysqlDbs.push(process.env.TEST_DB_NAME!);
    } else {
      mysqlDbs.push(process.env.DB_NAME!, process.env.TEST_DB_NAME!);
    }

    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    for (const db of mysqlDbs) {
      if (!db) continue;
      await conn.query(`CREATE DATABASE IF NOT EXISTS \`${db}\``);
      console.log(`✅ MySQL database ready: ${db}`);
    }
    await conn.end();
  } else {
    console.log('⚙️  DB_TYPE=mongodb → skipping MySQL setup');
  }

  // 3) MongoDB setup (create at least one collection so the DB shows up)
  if (process.env.DB_TYPE === 'mongo' || process.env.DB_TYPE === 'mongodb') {
    const mongoUrl = process.env.MONGO_URL!;
    const name =
      env === 'test'
        ? process.env.DB_NAME! // for Mongo we’ll use DB_NAME for all envs
        : process.env.DB_NAME!;

    const client = new MongoClient(mongoUrl);
    await client.connect();
    const db = client.db(name);

    // ensure the DB exists by creating a placeholder collection
    const coll = db.collection('__init__');
    await coll.insertOne({ created: new Date() });
    // (optional) keep this collection so GUIs will list the DB
    console.log(`✅ MongoDB database ready: ${name}`);

    await client.close();
  } else {
    console.log('⚙️  DB_TYPE=mysql → skipping MongoDB setup');
  }

  process.exit(0);
}

main().catch((err) => {
  console.error('❌ db-setup failed:', err);
  process.exit(1);
});
