// File: src/services/metadataSync/mysqlDdlSync.ts
// Description: DDL sync implementation for MySQL using MikroORM SchemaGenerator and raw SQL.
// Created:     2025-07-27T07:20:00+05:30
// Updated:     2025-07-27T07:20:00+05:30

import { SqlEntityManager, SchemaGenerator } from '@mikro-orm/core';
import { getSqlEm } from '../../utils/dbContext';

export class MysqlDdlSync {
  private em: SqlEntityManager;

  private generator: SchemaGenerator;

  constructor() {
    this.em = getSqlEm();
    this.generator = this.em.getSchemaGenerator();
  }

  /**
   * Check if an object (table) exists in the current schema.
   */
  async hasObject(tableName: string): Promise<boolean> {
    const [row] = await this.em.getConnection().execute<{ cnt: number }>(
      `SELECT COUNT(*) AS cnt
         FROM information_schema.tables
        WHERE table_schema = ?
          AND table_name   = ?`,
      [process.env.DB_NAME, tableName]
    );
    return Number(row.cnt) > 0;
  }

  /**
   * Create a new table based on the given SQL snippet or table definition.
   */
  async createObject(sql: string): Promise<void> {
    // Directly execute provided CREATE TABLE statement
    await this.em.getConnection().execute(sql);
  }

  /**
   * Alter an existing table using a list of raw SQL statements.
   */
  async alterObject(alterSql: string[]): Promise<void> {
    for (const stmt of alterSql) {
      await this.em.getConnection().execute(stmt);
    }
  }

  /**
   * Drop an object (table) if it exists.
   */
  async dropObject(tableName: string): Promise<void> {
    await this.em
      .getConnection()
      .execute(`DROP TABLE IF EXISTS \`${tableName}\`;`);
  }

  /**
   * Generate the full schema for all entities (for initial sync).
   */
  async syncSchema(): Promise<void> {
    await this.generator.createSchema();
  }

  /**
   * Update the database schema to match current entities (migrations-like).
   */
  async updateSchema(): Promise<void> {
    await this.generator.updateSchema();
  }
}

export const mysqlDdlSync = new MysqlDdlSync();
