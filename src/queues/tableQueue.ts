/* eslint-disable no-new */

// src/queues/tableQueue.ts
// Description: BullMQ queue + worker for SysDbObject (table) schema jobs.
// Created: 2025-07-25T17:35:00+05:30
// Updated: 2025-07-25T17:35:00+05:30

import { Queue, Worker } from 'bullmq';
import { MikroORM } from '@mikro-orm/core';
import { SysDbObject } from '../entities/SysDbObject';
import * as tableSync from '../services/metadataSync/tableSync';
import { logSchemaError } from '../services/metadataSync/logSchemaError';

export const tableQueue = new Queue('table-schema-jobs', {
  connection: { url: process.env.REDIS_URL },
});

type JobPayload = { action: 'create' | 'update' | 'delete'; objId: string };

new Worker(
  tableQueue.name,
  async (job) => {
    const { action, objId } = job.data as JobPayload;

    const orm = await MikroORM.init();
    const em = orm.em.fork();
    const conn = em.getConnection();

    try {
      const obj = await em.findOneOrFail(SysDbObject, objId);

      // Build TableDefCore for DDL helpers
      const def = {
        tableName: obj.name,
        extends: obj.extends ?? undefined,
        engine: obj.engine ?? undefined,
        charset: obj.charset ?? undefined,
        audited: obj.audited ?? false,
      };

      await conn.begin();

      if (action === 'create') {
        await tableSync.createTable(def, conn);
      } else if (action === 'update') {
        await tableSync.alterTable(def, conn);
      } else {
        await tableSync.dropTable(obj.name, conn);
      }

      await conn.commit();
    } catch (err) {
      await conn.rollback();
      await logSchemaError(err as Error, job.data);
      throw err;
    } finally {
      await orm.close(true);
    }
  },
  { connection: { url: process.env.REDIS_URL }, concurrency: 1 }
);
