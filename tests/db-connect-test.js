// Path: tests/db-connect-test.js
// Description: Attempts connections to MySQL (WAMP) and local MongoDB.
// Created: 2025-07-23T17:00:00+05:30
// Updated: 2025-07-23T17:00:00+05:30

require('dotenv').config();
const mysql = require('mysql2/promise');
const { MongoClient } = require('mongodb');

async function testMySQL() {
  const config = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
  };
  const conn = await mysql.createConnection(config);
  await conn.query('SELECT 1');
  await conn.end();
  console.log('✅ MySQL connection successful');
}

async function testMongo() {
  const client = new MongoClient(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  await client.db().admin().ping();
  await client.close();
  console.log('✅ MongoDB connection successful');
}

module.exports = { testMySQL, testMongo };

if (require.main === module) {
  (async () => {
    try {
      await testMySQL();
      await testMongo();
      process.exit(0);
    } catch (err) {
      console.error('❌ Connection error:', err.message);
      process.exit(1);
    }
  })();
}
