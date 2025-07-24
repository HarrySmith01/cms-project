// src/utils/db-compat.ts
/**
 * File: src/utils/db-compat.ts
 * Description: Runtime helpers for DB-specific behaviour.  Exposes
 *              `isMongo`, `relationStrategy`, and decorator wrappers so
 *              entities can switch between FK refs (MySQL) and embedded docs
 *              (Mongo) without duplicating logic.
 * Created:     2025-07-24T10:20:00+05:30
 * Updated:     2025-07-24T10:20:00+05:30
 */

import { ManyToOne, OneToMany, OneToOne } from '@mikro-orm/core';

export const isMongo = (process.env.DB_TYPE ?? 'mysql') === 'mongo';

/**
 * Either 'relational' (FK/refs) or 'embedded' (Mongo doc embed).
 */
export type RelationStrategy = 'relational' | 'embedded';
export const relationStrategy: RelationStrategy = isMongo
  ? 'embedded'
  : 'relational';

/**
 * Convenience: wrap MikroORM relation decorators so the same entity file
 * can embed relations when running on Mongo, but use classic refs on MySQL.
 *
 * Example:
 *   @Compat.ManyToOne(() => SysUserRole, { nullable: false })
 *   role!: SysUserRole;
 */
export const Compat = {
  ManyToOne: (targetFn: () => unknown, opts: Record<string, unknown> = {}) =>
    ManyToOne(targetFn, isMongo ? { ...opts, embedded: true } : opts),

  OneToMany: (mappedBy: string, opts: Record<string, unknown> = {}) =>
    OneToMany(mappedBy, isMongo ? { ...opts, embedded: true } : opts),

  OneToOne: (targetFn: () => unknown, opts: Record<string, unknown> = {}) =>
    OneToOne(targetFn, isMongo ? { ...opts, embedded: true } : opts),
};

/** Utility so tests can switch DB type on the fly. */
export const _overrideForTests = {
  setMongo(on = true) {
    (process.env as Record<string, unknown>).DB_TYPE = on ? 'mongo' : 'mysql';
  },
};
