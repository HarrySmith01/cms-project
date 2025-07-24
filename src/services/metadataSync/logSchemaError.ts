/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

// File: src/services/metadataSync/logSchemaError.ts
// Description: Helper to persist DDL-related errors into the sys_schema_error table
//              and optionally log to Winston.  Safe to call from anywhere
//              (worker or CLI); will spin up its own ORM if one isn’t provided.
// Created: 2025-07-25T17:50:00+05:30
// Updated: 2025-07-25T17:50:00+05:30

import { MikroORM, Connection } from '@mikro-orm/core';
import winston from 'winston';
import { orm as sharedOrm } from '../../utils/orm-init';

const logger = winston.createLogger({
  level: 'error',
  transports: [new winston.transports.Console()],
});

/**
 * Persist an error row and optionally log to Winston.
 *
 * @param err     The thrown Error
 * @param payload Whatever payload was being processed (will be JSON-stringified)
 * @param conn    Optional SQL Connection (use existing transaction if present)
 */
export async function logSchemaError(
  err: Error,
  payload: unknown,
  conn?: Connection
): Promise<void> {
  // Prefer existing connection if supplied (worker), otherwise open a new ORM
  if (conn) {
    await insertRow(conn);
    logger.error('DDL Error:', err);
    return;
  }

  // Stand-alone fallback
  const localOrm = await MikroORM.init();
  try {
    const c = localOrm.em.getConnection();
    await insertRow(c);
    logger.error('DDL Error:', err);
  } finally {
    await localOrm.close(true);
  }

  /** Inner helper that actually performs INSERT */
  async function insertRow(c: Connection) {
    await c.execute(
      `INSERT INTO sys_schema_error
         (id, dict_id, action, table_name, column_name, payload, error_message, stack, created_at)
       VALUES
         (UUID(), ?, ?, ?, ?, ?, ?, NOW())`,
      [
        // Attempt best-effort extraction
        (payload as any)?.dictId ?? null,
        (payload as any)?.action ?? null,
        (payload as any)?.table ?? null,
        (payload as any)?.column ?? null,
        JSON.stringify(payload),
        err.message,
        err.stack ?? '',
      ]
    );
  }
}
