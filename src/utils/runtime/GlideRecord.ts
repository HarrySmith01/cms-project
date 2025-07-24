// src/runtime/GlideRecord.ts
// Description: Provides a dynamic query builder and CRUD interface (GlideRecord-like) using metadata-driven schemas
// Created: 2025-07-24T14:00:00+05:30
// Updated: 2025-07-25T10:00:00+05:30

import { EntityManager } from '@mikro-orm/core';
// Update the import path to the correct location of metadataCache
import { metadataCache } from '../metadataCache';
import { DynamicRecord } from './DynamicRecord';

interface QueryCondition {
  field: string;
  operator: string;
  value: unknown;
}

export class GlideRecord {
  private table: string;

  private cache: metadataCache;

  private em: EntityManager;

  private conditions: QueryCondition[] = [];

  private limitCount?: number;

  private offsetCount?: number;

  constructor(table: string, cache: metadataCache, em: EntityManager) {
    this.table = table;
    this.cache = cache;
    this.em = em;
  }

  /**
   * Adds a query condition: field operator value
   * Example: addQuery('name', '=', 'Ravi')
   */
  addQuery(field: string, operator: string, value: unknown): this {
    this.conditions.push({ field, operator, value });
    return this;
  }

  /**
   * Sets pagination: limit and offset
   */
  setLimit(limit: number, offset = 0): this {
    this.limitCount = limit;
    this.offsetCount = offset;
    return this;
  }

  /**
   * Executes the query and returns DynamicRecord instances
   */
  async query(): Promise<DynamicRecord[]> {
    const where: Record<string, unknown> = {};
    this.conditions.forEach((cond) => {
      switch (cond.operator) {
        case '=':
          where[cond.field] = cond.value;
          break;
        case 'in':
          where[cond.field] = { $in: cond.value };
          break;
        case 'ilike':
          where[cond.field] = { $ilike: cond.value };
          break;
        default:
          where[cond.field] = cond.value;
      }
    });

    const repo = this.em.getRepository(this.table);
    const [entities] = await repo.findAndCount(where, {
      limit: this.limitCount,
      offset: this.offsetCount,
    });

    return entities.map((e) => new DynamicRecord(this.table, this.cache, e));
  }

  /**
   * Retrieves a single record (first match)
   */
  async queryOne(): Promise<DynamicRecord | null> {
    this.setLimit(1, 0);
    const results = await this.query();
    return results[0] || null;
  }

  /**
   * Inserts a new record, returns the created DynamicRecord
   */
  async insert(data: Record<string, unknown>): Promise<DynamicRecord> {
    const tableMeta = this.cache.getTable(this.table);
    if (!tableMeta) {
      throw new Error(`Table ${this.table} is not defined in metadata.`);
    }
    const repo = this.em.getRepository(this.table);
    const result = await repo.nativeInsert({ ...data });
    const sysId =
      typeof result === 'object' && 'insertId' in result
        ? (result as { insertId: unknown }).insertId
        : result;
    const raw = await repo.findOneOrFail({ sys_id: sysId });
    return new DynamicRecord(this.table, this.cache, raw);
  }

  /**
   * Updates records matching current conditions with given data
   */
  async update(data: Record<string, unknown>): Promise<number> {
    const repo = this.em.getRepository(this.table);
    const where = Object.fromEntries(
      this.conditions.map((cond) => [cond.field, cond.value])
    );
    return repo.nativeUpdate(where as Record<string, unknown>, data);
  }

  /**
   * Deletes records matching current conditions
   */
  async delete(): Promise<number> {
    const repo = this.em.getRepository(this.table);
    const where = Object.fromEntries(
      this.conditions.map((cond) => [cond.field, cond.value])
    );
    return repo.nativeDelete(where as Record<string, unknown>);
  }
}
