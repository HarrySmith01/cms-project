/* eslint-disable @typescript-eslint/no-explicit-any */

// File: src/services/tableImporter.ts
// Description: Import table definitions into sys_db_object and sync physical tables.
// Created: 2025-07-24T03:10:00+05:30
// Updated: 2025-07-25T19:25:00+05:30

import path from 'path';
import { orm } from '../utils/orm-init';
import { TableDef, loadTableDefs } from './parsers/tableParser';
// import * as tableSync from './metadataSync/tableSync'; // <<— fixed path

/**
 * Recursively ensure parent tables exist, upsert sys_db_object, sync DDL.
 */
export async function bootstrapTable(def: TableDef): Promise<void> {
  const { em } = orm;

  // 1️⃣ Recursion for extends
  if (def.extends) {
    const parentDef = loadTableDefs(
      path.resolve(__dirname, '../../definitions/tables')
    ).find((d) => d.tableName === def.extends);
    if (!parentDef) throw new Error(`Parent def not found: ${def.extends}`);
    await bootstrapTable(parentDef);
  }

  // 2️⃣ Upsert sys_db_object
  const repo = em.getRepository('SysDbObject');
  let obj = await repo.findOne({ name: def.tableName });

  if (obj) {
    Object.assign(obj, {
      label: def.label,
      description: def.description,
      extends: def.extends,
      engine: def.engine,
      charset: def.charset,
      audited: def.audited,
    });
  } else {
    obj = repo.create({
      name: def.tableName,
      label: def.label,
      description: def.description,
      extends: def.extends,
      engine: def.engine,
      charset: def.charset,
      audited: def.audited,
    });
  }
  await repo.persistAndFlush(obj);

  // 3️⃣ DDL sync
  if (await tableSync.hasTable(def.tableName)) {
    await tableSync.alterTable(def);
  } else {
    await tableSync.createTable(def);
  }
}

/**
 * Import every table file in `/definitions/tables` transactionally.
 */
/* eslint-disable no-restricted-syntax, no-await-in-loop */
export async function importAllTables(): Promise<void> {
  const defsDir = path.resolve(__dirname, '../../definitions/tables');
  const defs = loadTableDefs(defsDir);

  for (const def of defs) {
    await orm.em.transactional(async () => {
      await bootstrapTable(def);
    });
  }
}
/* eslint-enable no-restricted-syntax, no-await-in-loop */
