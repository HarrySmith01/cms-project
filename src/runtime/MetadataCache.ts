// src/runtime/MetadataCache.ts
// Description: Caches table, column, and metadata definitions from sys_db_object, sys_dictionary, and sys_metadata,
//              and supports inheritance of dictionary entries from parent tables.
// Created: 2025-07-24T14:30:00+05:30
// Updated: 2025-07-25T09:00:00+05:30

import { EntityManager } from '@mikro-orm/core';
import { SysDbObject } from '../entities/SysDbObject';
import { SysDictionary } from '../entities/SysDictionary';
import { SysMetadata } from '../entities/SysMetadata';

export class MetadataCache {
  private em: EntityManager;

  private tables = new Map<string, SysDbObject>();

  private columns = new Map<string, SysDictionary[]>();

  private metas = new Map<string, SysMetadata[]>();

  constructor(em: EntityManager) {
    this.em = em;
  }

  /**
   * Load all metadata into in-memory maps.
   */
  async load(): Promise<void> {
    const [tbls, cols, metas] = await Promise.all([
      this.em.find(SysDbObject, {}),
      this.em.find(SysDictionary, {}),
      this.em.find(SysMetadata, {}),
    ]);

    tbls.forEach((t) => this.tables.set(t.name, t));

    cols.forEach((c) => {
      const table = c.sys_class_name;
      const arr = this.columns.get(table) || [];
      arr.push(c);
      this.columns.set(table, arr);
    });

    metas.forEach((m) => {
      const table = m.sys_class_name;
      const arr = this.metas.get(table) || [];
      arr.push(m);
      this.metas.set(table, arr);
    });
  }

  /**
   * Get the SysDbObject for a table.
   */
  getTable(tableName: string): SysDbObject | undefined {
    return this.tables.get(tableName);
  }

  /**
   * Recursively collect SysDictionary entries for a table,
   * including those inherited from its parent hierarchy.
   */
  getColumns(tableName: string): SysDictionary[] {
    const own = this.columns.get(tableName) || [];
    const parent = this.tables.get(tableName)?.super_class?.name;
    if (parent) {
      return [...this.getColumns(parent), ...own];
    }
    return own;
  }

  /**
   * Get all SysMetadata entries for a table.
   */
  getMetadata(tableName: string): SysMetadata[] {
    return this.metas.get(tableName) || [];
  }
}
