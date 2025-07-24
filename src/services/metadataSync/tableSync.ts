// File: src/services/metadataSync/tableSync.ts
// Description: DDL helpers for MySQL tables (exists, create, alter, drop)
// Created: 2025-07-25T17:00:00+05:30
// Updated: 2025-07-25T19:50:00+05:30

import { Connection } from '@mikro-orm/core';
import { orm as sharedOrm } from '../../utils/orm-init';

export interface TableDefCore {
  tableName: string;
  extends?: string;
  engine?: string;
  charset?: string;
  audited?: boolean;
}

function conn(c?: Connection): Connection {
  if (c) return c;
  if (!sharedOrm.isInitialized()) {
    throw new Error(
      'ORM not initialised. Initialise orm or pass a Connection.'
    );
  }
  return sharedOrm.em.getConnection();
}

/* ------------------------------------------------------------------ */
/* Existence helpers                                                  */
/* ------------------------------------------------------------------ */

export async function hasTable(name: string, c?: Connection): Promise<boolean> {
  const rows = await conn(c).execute(
    `SELECT COUNT(*) AS cnt
       FROM information_schema.tables
      WHERE table_schema = ?
        AND table_name   = ?`,
    [process.env.MYSQL_DATABASE, name]
  );
  // @ts-expect-error driver returns untyped row objects
  return Number(rows[0]?.cnt ?? 0) > 0;
}

/* ------------------------------------------------------------------ */
/* CREATE                                                             */
/* ------------------------------------------------------------------ */

export async function createTable(
  def: TableDefCore,
  c?: Connection
): Promise<void> {
  const sql =
    `CREATE TABLE \`${def.tableName}\` (` +
    `  \`id\` CHAR(32) PRIMARY KEY${
      def.audited ? ', `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP' : ''
    }) ${def.engine ? `ENGINE=${def.engine} ` : ''}${
      def.charset ? `DEFAULT CHARSET=${def.charset}` : ''
    };`;
  await conn(c).execute(sql);
}

/* ------------------------------------------------------------------ */
/* ALTER                                                              */
/* ------------------------------------------------------------------ */

export async function alterTable(
  def: TableDefCore,
  c?: Connection
): Promise<void> {
  const database = process.env.MYSQL_DATABASE;
  const co = conn(c);

  // 1️⃣ current engine & charset
  const metaRows = (await co.execute(
    `SELECT ENGINE, TABLE_COLLATION
       FROM information_schema.tables
      WHERE table_schema = ? AND table_name = ?`,
    [database, def.tableName]
  )) as { ENGINE: string; TABLE_COLLATION: string }[];

  if (metaRows.length === 0) return; // table absent

  const currentEngine = metaRows[0].ENGINE;
  const currentCharset = metaRows[0].TABLE_COLLATION?.split('_')[0]; // utf8mb4_general_ci → utf8mb4

  // 2️⃣ audit column exists?
  const auditRows = await co.execute(
    `SELECT COUNT(*) AS cnt
       FROM information_schema.columns
      WHERE table_schema = ?
        AND table_name   = ?
        AND column_name  = 'created_at'`,
    [database, def.tableName]
  );
  // @ts-expect-error driver returns untyped row objects
  const auditExists = Number(auditRows[0]?.cnt ?? 0) > 0;

  // 3️⃣ build ALTER clauses
  const clauses: string[] = [];

  if (def.engine && def.engine !== currentEngine) {
    clauses.push(`ENGINE=${def.engine}`);
  }
  if (def.charset && def.charset !== currentCharset) {
    clauses.push(`DEFAULT CHARSET=${def.charset}`);
  }
  if (def.audited && !auditExists) {
    clauses.push('ADD COLUMN `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP');
  }
  if (!def.audited && auditExists) {
    clauses.push('DROP COLUMN `created_at`');
  }

  if (clauses.length === 0) return; // nothing to change
  await co.execute(`ALTER TABLE \`${def.tableName}\` ${clauses.join(', ')};`);
}

/* ------------------------------------------------------------------ */
/* DROP                                                               */
/* ------------------------------------------------------------------ */

export async function dropTable(name: string, c?: Connection): Promise<void> {
  await conn(c).execute(`DROP TABLE IF EXISTS \`${name}\`;`);
}
