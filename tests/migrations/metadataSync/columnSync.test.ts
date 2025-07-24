// File: tests/migrations/metadataSync/columnSync.test.ts
// Description: Smoke-test for columnSync helpers. Ensures a clean table by
//              dropping it first, then recreating, adding column, verifying,
//              and finally cleaning up.
// Created:     2025-07-24T11:40:00+05:30
// Updated:     2025-07-24T12:05:00+05:30

/* eslint-disable import/first */
// force relational driver
/* eslint-enable  import/first */

import { Connection } from '@mikro-orm/core';
import { initTestOrm, closeTestOrm } from '../../_utils/ormTestHarness';
import * as columnSync from '../../../src/services/metadataSync/columnSync';

process.env.DB_TYPE = 'mysql';

const TABLE = 'x_test';
let conn: Connection;

beforeAll(async () => {
  const orm = await initTestOrm();
  conn = orm.em.getConnection();

  // 🔄 Ensure a clean slate every run
  await conn.execute(`DROP TABLE IF EXISTS \`${TABLE}\`;`);

  // 1️⃣ Create disposable table
  await conn.execute(
    `CREATE TABLE \`${TABLE}\` (
       id INT PRIMARY KEY AUTO_INCREMENT
     );`
  );

  // 2️⃣ Add column via columnSync
  await columnSync.createColumn(
    {
      tableName: TABLE,
      columnName: 'foo',
      type: 'int',
      nullable: true,
    },
    conn
  );
});

afterAll(async () => {
  // 🔚 Clean up
  await columnSync.dropColumn({ tableName: TABLE, columnName: 'foo' }, conn);
  await conn.execute(`DROP TABLE IF EXISTS \`${TABLE}\`;`);
  await closeTestOrm();
});

test('hasColumn detects existence', async () => {
  const exists = await columnSync.hasColumn(
    { tableName: TABLE, columnName: 'foo' },
    conn
  );
  expect(exists).toBe(true);
});
