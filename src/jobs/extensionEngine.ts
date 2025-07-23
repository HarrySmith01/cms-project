// src/jobs/extensionEngine.ts
// Description: Job to propagate SysDictionary changes (create/update/delete) to all descendant tables' physical schema only.
// Created: 2025-07-23 11:00:00
// Updated: 2025-07-24 14:00:00

import { MikroORM } from '@mikro-orm/core';
import { SysDbObject } from '../entities/SysDbObject';
import { SysDictionary } from '../entities/SysDictionary';

/**
 * Enqueues or runs the extension job based on event type.
 */
export async function enqueueExtensionJob(
  eventType: 'create' | 'update' | 'delete',
  dictEntry: SysDictionary
): Promise<void> {
  // Direct execution for simplicity; can swap in BullMQ in future
  await runExtensionJob(eventType, dictEntry);
}

/**
 * Runs the extension job: finds all descendant tables and applies
 * only the DDL (create/alter/drop column) matching the dictionary change.
 */
export async function runExtensionJob(
  eventType: 'create' | 'update' | 'delete',
  dictEntry: SysDictionary
): Promise<void> {
  const orm = await MikroORM.init();
  const em = orm.em.fork();
  const generator = orm.getSchemaGenerator();

  // 1. Build parent→children map from sys_db_object
  const allTables = await em.find(SysDbObject, {});
  const parentMap = new Map<string, string[]>();
  allTables.forEach((obj) => {
    const parent = obj.super_class?.name;
    if (parent) {
      const list = parentMap.get(parent) ?? [];
      list.push(obj.name);
      parentMap.set(parent, list);
    }
  });

  // 2. Collect all descendants of the changed table
  const descendants = new Set<string>();
  function collect(name: string): void {
    (parentMap.get(name) ?? []).forEach((child) => {
      if (!descendants.has(child)) {
        descendants.add(child);
        collect(child);
      }
    });
  }
  collect(dictEntry.sys_class_name);

  const descendantArray = Array.from(descendants);

  // 3. Apply only the schema changes on each descendant in parallel
  await Promise.all(
    descendantArray.map(async (child) => {
      const columnSpec = {
        name: dictEntry.element,
        type: mapToSqlType(dictEntry),
        nullable: dictEntry.mandatory === false,
        default:
          typeof dictEntry.default_value === 'string' ||
          typeof dictEntry.default_value === 'number' ||
          typeof dictEntry.default_value === 'boolean'
            ? dictEntry.default_value
            : undefined,
      };

      if (eventType === 'create') {
        await generator.addColumn(child, columnSpec);
      } else if (eventType === 'update') {
        await generator.alterColumn(child, columnSpec);
      } else {
        await generator.dropColumn(child, dictEntry.element);
      }
    })
  );

  await em.flush();
  await orm.close(true);
}

/**
 * Maps a SysDictionary entry to a SQL column type string.
 */
function mapToSqlType(entry: SysDictionary): string {
  const internalType = entry.internal_type;
  const typeName =
    internalType !== null &&
    typeof internalType === 'object' &&
    'name' in internalType &&
    typeof (internalType as Record<string, unknown>).name === 'string'
      ? (internalType as Record<string, string>).name
      : '';

  switch (typeName) {
    case 'string':
      return `varchar(${entry.max_length ?? 255})`;
    case 'number':
      return 'int';
    case 'boolean':
      return 'boolean';
    case 'json':
      return 'json';
    default:
      return 'text';
  }
}
