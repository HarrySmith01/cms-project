// File: src/services/metadataSync/mysqlColumnSync.ts
// Description: MySQL-only helpers to check, add, alter, and drop columns.
// Created:     2025-07-27T11:00:00+05:30
// Updated:     2025-07-27T11:00:00+05:30

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

/** Check whether shared ORM is initialized */
function sharedOrmInitialised(): boolean {
  if (!sharedOrm) return false;
  const flag = (sharedOrm as any).isInitialized;
  return typeof flag === 'function' ? flag.call(sharedOrm) : !!flag;
}

/** Resolve a usable Connection */
function getConn(conn?: Connection): Connection {
  if (conn) return conn;
  if (!sharedOrmInitialised()) {
    throw new Error(
      'Shared MikroORM instance not initialised. ' +
        'Either initialise orm before calling mysqlColumnSync, or pass a Connection.'
    );
  }
  return sharedOrm.em.getConnection();
}

/** Does this column already exist? */
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
    [process.env.DB_NAME, def.tableName, def.columnName]
  );
  // @ts-ignore
  return Number(result[0]?.cnt ?? 0) > 0;
}

/** Build SQL fragment for column definition */
function buildColumnFragment(def: ColumnDefCore): string {
  const nullable = def.nullable ? '' : ' NOT NULL';
  const defVal =
    def.default !== undefined && def.default !== null
      ? ` DEFAULT ${
          typeof def.default === 'string' ? `'${def.default}'` : def.default
        }`
      : '';
  return `\`${def.columnName}\` ${def.type ?? 'text'}${nullable}${defVal}`;
}

/** ADD COLUMN … */
export async function createColumn(
  def: ColumnDefCore,
  conn?: Connection
): Promise<void> {
  const c = getConn(conn);
  const frag = buildColumnFragment(def);
  const sql = `ALTER TABLE \`${def.tableName}\` ADD COLUMN ${frag};`;
  await c.execute(sql);
}

/** MODIFY COLUMN … */
export async function alterColumn(
  def: ColumnDefCore,
  conn?: Connection
): Promise<void> {
  const c = getConn(conn);
  const frag = buildColumnFragment(def);
  const sql = `ALTER TABLE \`${def.tableName}\` MODIFY COLUMN ${frag};`;
  await c.execute(sql);
}

/** DROP COLUMN … */
export async function dropColumn(
  def: Pick<ColumnDefCore, 'tableName' | 'columnName'>,
  conn?: Connection
): Promise<void> {
  const c = getConn(conn);
  const sql = `ALTER TABLE \`${def.tableName}\` DROP COLUMN \`${def.columnName}\`;`;
  await c.execute(sql);
}
