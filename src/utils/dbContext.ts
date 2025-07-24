// File: src/utils/dbContext.ts

import type { Db, MongoClient } from 'mongodb';
import { EntityManager, Connection } from '@mikro-orm/core';
import { orm } from './orm-init';

/**
 * Ensure MikroORM is initialized and return its EntityManager for SQL.
 */
export async function getSqlEm(): Promise<EntityManager> {
  if (!(orm as any).isInitialized) {
    await orm.init();
  }
  return orm.em.fork();
}

/**
 * Ensure MikroORM is initialized and return the native MongoDB Db instance.
 */
export async function getMongoDb(): Promise<Db> {
  if (!(orm as any).isInitialized) {
    await orm.init();
  }
  // @ts-expect-error accessing driver internals
  return (orm.driver as any).getConnection().getDb();
}

/**
 * Validate that required ENV vars are present for the selected DB_TYPE.
 */
export function validateEnv(): void {
  const required =
    process.env.DB_TYPE === 'mongo'
      ? ['MONGO_URL']
      : ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    throw new Error(`Missing required env vars: ${missing.join(', ')}`);
  }
}
