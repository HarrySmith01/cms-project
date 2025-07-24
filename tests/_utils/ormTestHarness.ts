// File: tests/_utils/ormTestHarness.ts
// Description: Shared MikroORM bootstrap + graceful teardown for Jest suites
// Created: 2025-07-25T20:40:00+05:30
// Updated: 2025-07-25T21:35:00+05:30

import { MikroORM } from '@mikro-orm/core';
import config from '../../mikro-orm.config';
import { ormInit as initSharedProxy } from '../../src/utils/orm-init';

let orm: MikroORM | null = null;

/**
 * Initialise (or reuse) the MikroORM instance for tests,
 * **and** register it in the global proxy used by columnSync / tableSync.
 */
export async function initTestOrm(): Promise<MikroORM> {
  if (orm) return orm;

  orm = await MikroORM.init({
    ...config,
    dbName: process.env.TEST_DB ?? 'cms_test', // isolated schema for CI
  });

  // Ensure database exists (no-op if already created)
  await orm.getSchemaGenerator().ensureDatabase();

  // Initialise the shared proxy so other helpers can access `orm`
  await initSharedProxy(); // ✅ prevents “Call ormInit() first”
  return orm;
}

/**
 * Close the ORM and release all connections.
 */
export async function closeTestOrm(): Promise<void> {
  if (orm) {
    await orm.close(true);
    orm = null;
  }
}

/**
 * Convenience getter that throws if initTestOrm() hasn’t been called.
 */
export function getOrm(): MikroORM {
  if (!orm) throw new Error('initTestOrm() must be called first');
  return orm;
}
