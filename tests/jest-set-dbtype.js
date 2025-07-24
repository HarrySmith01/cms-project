// tests/jest-set-dbtype.js
/**
 * Jest global setup – forces relational driver for test runs.
 * Mongo-specific suites can still override by setting
 *   process.env.DB_TYPE = 'mongo'
 * **before** importing MikroORM config.
 */

process.env.DB_TYPE = 'mysql';
