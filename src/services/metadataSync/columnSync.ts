// File: src/services/metadataSync/columnSync.ts
// Description: Central helpers to check, add, alter, and drop columns on MySQL
//              tables.  Designed for use by both CLI importers (no connection
//              passed) and the async dictionary queue-worker (connection passed).
// Created: 2025-07-25T16:45:00+05:30
// Updated: 2025-07-25T16:45:00+05:30

import { Connection } from '@mikro-orm/core';
import { orm as sharedOrm } from '../../utils/orm-init';

/** Minimal shape required to run DDL */
export interface ColumnDefCore {
  tableName: string;
  columnName: string;
  type?: string;
  nullable?: boolean;
  default?: string | number | boolean | null;
}

/**
 * Resolve a usable Connection:
 *  • If caller passes one (e.g. from queue-worker), use that.
 *  • Otherwise fall back to the singleton ORM initialised via orm-init.
 */
function getConn(conn?: Connection): Connection {
  if (conn) return conn;
  if (!sharedOrm.isInitialized()) {
    throw new Error(
      'Shared MikroORM instance not initialised. ' +
        'Either initialise orm before calling columnSync, or pass a Connection.'
    );
  }
  return sharedOrm.em.getConnection();
}

/**
 * Does this column already exist?
 */
export async function hasColumn(
  def: ColumnDefCore,
  conn?: Connection
): Promise<boolean> {
  const c = getConn(conn);
  const result = await c.execute(
    `SELECT COUNT(*) AS cnt
       FROM information_schema.columns
      WHERE table_schema = ?
        AND table_name   = ?
        AND column_name  = ?`,
    [process.env.MYSQL_DATABASE, def.tableName, def.columnName]
  );
  // @ts-expect-error – driver returns array of rows not typed here
  return Number(result[0]?.cnt ?? 0) > 0;
}

/**
 * Generate the SQL fragment for column definition.
 */
function buildColumnFragment(def: ColumnDefCore): string {
  const nullable = def.nullable ? '' : ' NOT NULL';
  const defVal =
    def.default !== undefined && def.default !== null
      ? ` DEFAULT ${typeof def.default === 'string' ? `'${def.default}'` : def.default}`
      : '';
  return `\`${def.columnName}\` ${def.type ?? 'text'}${nullable}${defVal}`;
}

/**
 * ADD COLUMN … (assumes column does not already exist)
 */
export async function createColumn(
  def: ColumnDefCore,
  conn?: Connection
): Promise<void> {
  const c = getConn(conn);
  const frag = buildColumnFragment(def);
  const sql = `ALTER TABLE \`${def.tableName}\` ADD COLUMN ${frag};`;
  await c.execute(sql);
}

/**
 * MODIFY COLUMN … (assumes column exists and definition needs change)
 */
export async function alterColumn(
  def: ColumnDefCore,
  conn?: Connection
): Promise<void> {
  const c = getConn(conn);
  const frag = buildColumnFragment(def);
  const sql = `ALTER TABLE \`${def.tableName}\` MODIFY COLUMN ${frag};`;
  await c.execute(sql);
}

/**
 * DROP COLUMN …
 */
export async function dropColumn(
  def: Pick<ColumnDefCore, 'tableName' | 'columnName'>,
  conn?: Connection
): Promise<void> {
  const c = getConn(conn);
  const sql = `ALTER TABLE \`${def.tableName}\` DROP COLUMN \`${def.columnName}\`;`;
  await c.execute(sql);
}
