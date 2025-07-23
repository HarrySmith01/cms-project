// Path: scripts/db-setup.ts
// Description: Reads .env and creates MySQL & MongoDB databases if missing
// Created: 2025-07-23T12:00:00+05:30

import mysql from 'mysql2/promise';
import 'dotenv/config';

async function main() {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, TEST_DB_NAME } =
    process.env;

  // MySQL setup
  const conn = await mysql.createConnection({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
  });

  for (const db of [DB_NAME, TEST_DB_NAME]) {
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${db}\``);
    console.log(`✅ MySQL database ready: ${db}`);
  }
  await conn.end();

  // MongoDB does automatic initialization with root user in CI;
  // no manual database-creation step is needed for MongoDB in CI.

  process.exit(0);
}

main().catch((err) => {
  console.error('❌ db-setup failed:', err);
  process.exit(1);
});
