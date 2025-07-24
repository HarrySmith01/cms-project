// File: src/utils/runtime/MetadataCache.ts
/**
 * Description: Caches table, column, and metadata definitions from sys_db_object,
 *              sys_dictionary, and sys_metadata, supporting inheritance.
 * Created: July 24, 2025 14:30 IST
 * Updated: July 25, 2025 08:50 IST
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
      const arr = this.columns.get(c.sys_class_name) || [];
      arr.push(c);
      this.columns.set(c.sys_class_name, arr);
    });
    metas.forEach((m) => {
      const arr = this.metas.get(m.sys_class_name) || [];
      arr.push(m);
      this.metas.set(m.sys_class_name, arr);
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
   * including inherited entries from parent tables.
   */
  getColumns(tableName: string): SysDictionary[] {
    const own = this.columns.get(tableName) || [];
    const parentName = this.tables.get(tableName)?.super_class?.name;
    if (parentName) {
      return [...this.getColumns(parentName), ...own];
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
