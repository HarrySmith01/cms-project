// File: src/utils/runtime/MetadataCache.ts
/**
 * Description: Caches table, column, and metadata definitions from sys_db_object,
 *              sys_dictionary, and sys_metadata, supporting inheritance.
 * Created: July 24, 2025 14:30 IST
 * Updated: July 25, 2025 11:30 IST
 */

import { EntityManager } from '@mikro-orm/core';
import { SysDbObject } from '../../entities/SysDbObject';
import { SysDictionary } from '../../entities/SysDictionary';
import { SysMetadata } from '../../entities/SysMetadata';

export class MetadataCache {
  private em: EntityManager;

  private tables = new Map<string, SysDbObject>();

  private columns = new Map<string, SysDictionary[]>();

  private metas = new Map<string, SysMetadata[]>();

  constructor(em: EntityManager) {
    this.em = em;
  }

  /** Load all metadata into in-memory maps */
  async load(): Promise<void> {
    const [tbls, cols, metas] = await Promise.all([
      this.em.find(SysDbObject, {}),
      this.em.find(SysDictionary, {}),
      this.em.find(SysMetadata, {}),
    ]);

    // Key by table name
    tbls.forEach((t) => {
      // t.name should be string
      this.tables.set((t as any).name, t);
    });

    // Group columns by table
    cols.forEach((c) => {
      const tableName = (c as any).sys_class_name as string;
      const arr = this.columns.get(tableName) || [];
      arr.push(c);
      this.columns.set(tableName, arr);
    });

    // Group metadata by table
    metas.forEach((m) => {
      const tableName = (m as any).sys_class_name as string;
      const arr = this.metas.get(tableName) || [];
      arr.push(m);
      this.metas.set(tableName, arr);
    });
  }

  /** Get the SysDbObject for a table */
  getTable(tableName: string): SysDbObject | undefined {
    return this.tables.get(tableName);
  }

  /**
   * Recursively collect SysDictionary entries for a table,
   * including inherited entries from its `super_class` parent.
   */
  getColumns(tableName: string): SysDictionary[] {
    const own = this.columns.get(tableName) || [];
    const parent = (this.tables.get(tableName) as any)?.super_class
      ?.name as string;
    if (parent) {
      return [...this.getColumns(parent), ...own];
    }
    return own;
  }

  /** Get all SysMetadata entries for a table */
  getMetadata(tableName: string): SysMetadata[] {
    return this.metas.get(tableName) || [];
  }
}
