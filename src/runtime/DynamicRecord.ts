// src/runtime/DynamicRecord.ts
// Description: Proxy-based dynamic record that maps table columns and references at runtime and supports upsert via MikroORM
// Created: 2025-07-24T14:45:00+05:30
// Updated: 2025-07-25T12:00:00+05:30

import { EntityManager } from '@mikro-orm/core';
import { MetadataCache } from './MetadataCache';
import { SysDictionary } from '../entities/SysDictionary';

/**
 * Represents a single record of a dynamic table, with properties and references
 * resolved on-demand using metadata.
 * Use DynamicRecord.create() to instantiate.
 */
export class DynamicRecord {
  private data: Record<string, unknown>;

  private em: EntityManager;

  private cache: MetadataCache;

  private tableName: string;

  private constructor(
    tableName: string,
    initialData: Record<string, unknown>,
    cache: MetadataCache,
    em: EntityManager
  ) {
    this.tableName = tableName;
    this.data = { ...initialData };
    this.cache = cache;
    this.em = em;
  }

  /**
   * Factory method to return a Proxy-wrapped DynamicRecord instance.
   */
  static create(
    tableName: string,
    initialData: Record<string, unknown>,
    cache: MetadataCache,
    em: EntityManager
  ): DynamicRecord {
    const instance = new DynamicRecord(tableName, initialData, cache, em);
    return new Proxy(instance, {
      get: (target, prop: string | symbol, receiver) => {
        if (typeof prop === 'symbol' || prop in target) {
          return Reflect.get(target, prop, receiver);
        }
        const propName = String(prop);
        const column = cache
          .getColumns(tableName)
          .find(
            (c: SysDictionary) =>
              c.element === propName || `${propName}_id` === c.element
          );
        if (!column) {
          return undefined;
        }
        const rawValue = target.data[column.element];
        if (column.reference) {
          if (typeof rawValue !== 'string') {
            return null;
          }
          return em.findOne(column.reference, { sys_id: rawValue });
        }
        return rawValue;
      },
      set: (target, prop: string | symbol, value, receiver) => {
        if (typeof prop === 'symbol') {
          return Reflect.set(target, prop, value, receiver);
        }
        const propName = String(prop);
        const column = cache
          .getColumns(tableName)
          .find((c: SysDictionary) => c.element === propName);
        if (!column) {
          return false;
        }
        // eslint-disable-next-line no-param-reassign
        target.data[propName] = value;
        return true;
      },
    });
  }

  /**
   * Persist changes back to the database.
   * If sys_id exists, performs update; otherwise inserts a new record.
   */
  async save(): Promise<DynamicRecord> {
    const repo = this.em.getRepository(this.tableName);
    const sysId = this.data.sys_id;
    if (typeof sysId === 'string') {
      // Update existing
      await repo.nativeUpdate(
        { sys_id: sysId },
        this.data as Record<string, unknown>
      );
    } else {
      // Insert new record
      const insertResult = await repo.nativeInsert(
        this.data as Record<string, unknown>
      );
      const newId =
        typeof insertResult === 'object' && 'insertId' in insertResult
          ? (insertResult as { insertId: unknown }).insertId
          : insertResult;
      this.data.sys_id = newId as string;
    }
    // Refresh full record and update internal data
    const refreshed = await repo.findOneOrFail({
      sys_id: this.data.sys_id as string,
    });
    this.data = { ...(refreshed as Record<string, unknown>) };
    return this as unknown as DynamicRecord;
  }
}
