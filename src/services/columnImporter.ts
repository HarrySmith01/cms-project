/* eslint-disable @typescript-eslint/no-explicit-any */

// File: src/services/columnImporter.ts
// Description: Import column definitions into sys_dictionary and sync physical columns.
// Created: 2025-07-24T03:30:00+05:30
// Updated: 2025-07-25T19:25:00+05:30

import path from 'path';
import { orm } from '../utils/orm-init';
import { ColumnDef, loadColumnDefs } from './parsers/columnParser';
import * as columnSync from './metadataSync/columnSync'; // <<— fixed path

/**
 * Upsert SysDictionary row and sync DB column via columnSync.
 */
export async function importColumn(def: ColumnDef): Promise<void> {
  const { em } = orm;

  // 1️⃣ Upsert sys_dictionary
  const repo = em.getRepository('SysDictionary');
  let dict = await repo.findOne({
    tableName: def.tableName,
    columnName: def.columnName,
  });

  if (dict) {
    Object.assign(dict, {
      type: def.type,
      nullable: def.nullable,
      defaultValue: def.default,
      label: def.label,
      referenceTable: def.referenceTable,
    });
  } else {
    dict = repo.create({
      tableName: def.tableName,
      columnName: def.columnName,
      type: def.type,
      nullable: def.nullable,
      defaultValue: def.default,
      label: def.label,
      referenceTable: def.referenceTable,
    });
  }
  await repo.persistAndFlush(dict);

  // 2️⃣ DDL sync
  if (await columnSync.hasColumn(def)) {
    await columnSync.alterColumn(def);
  } else {
    await columnSync.createColumn(def);
  }
}

/**
 * Import every column file in `/definitions/columns` transactionally.
 */
/* eslint-disable no-restricted-syntax, no-await-in-loop */
export async function importAllColumns(): Promise<void> {
  const defsDir = path.resolve(__dirname, '../../definitions/columns');
  const defs = loadColumnDefs(defsDir);

  for (const def of defs) {
    await orm.em.transactional(async () => {
      await importColumn(def);
    });
  }
}
/* eslint-enable no-restricted-syntax, no-await-in-loop */
