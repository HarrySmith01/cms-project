// File: src/utils/migrationFacade.ts

import { Connection } from '@mikro-orm/core';
import * as fs from 'fs';
import * as path from 'path';
import { ddlFacade } from '../services/metadataSync/ddlFacade';
import { getSqlEm } from './dbContext';

/**
 * Discover all TS migration classes in migrations/, import them,
 * and execute their `up()` method via ddlFacade for SQL or mongoDdlSync for Mongo.
 */
export async function runMigrations(): Promise<void> {
  const em = await getSqlEm();
  const conn: Connection = em.getConnection();
  const migrationsDir = path.resolve(__dirname, '../migrations');
  const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith('.ts'));

  for (const file of files.sort()) {
    const fullPath = path.join(migrationsDir, file);
    const mod = await import(fullPath);
    const MigrationClass = mod.default;

    // Only proceed if default export is a constructor function
    if (typeof MigrationClass === 'function') {
      const migration = new MigrationClass();
      if (typeof migration.up === 'function') {
        await conn.begin();
        try {
          await migration.up(conn, ddlFacade);
          await conn.commit();
        } catch (err) {
          await conn.rollback();
          throw err;
        }
      }
    }
  }
}
