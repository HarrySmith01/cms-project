// File: src/queues/tableQueue.ts
// Description: BullMQ queue + worker for SysDbObject (table) schema jobs.
//              Refactored to use ddlFacade for DDL operations and remove tableSync.
// Created:     2025-07-27T08:45:00+05:30
// Updated:     2025-07-27T08:45:00+05:30

import { Queue, Worker } from 'bullmq';
import { MikroORM } from '@mikro-orm/core';
import { SysDbObject } from '../entities/SysDbObject';
import {
  createObject,
  alterObject,
  dropObject,
  syncSchema,
} from '../services/metadataSync/ddlFacade';
import { createAclsForTable } from '../services/metadataSync/aclSync';
import { logSchemaError } from '../services/metadataSync/logSchemaError';

export const tableQueue = new Queue('table-schema-jobs', {
  connection: { url: process.env.REDIS_URL },
});

type JobPayload = { action: 'create' | 'update' | 'delete'; objId: string };

new Worker(
  tableQueue.name,
  async (job) => {
    const { action, objId } = job.data as JobPayload;

    // fork a fresh ORM + EM per job
    const orm = await MikroORM.init();
    const em = orm.em.fork();

    try {
      const obj = await em.findOneOrFail(SysDbObject, objId);

      // build the table definition for DDL
      const def = {
        tableName: obj.name,
        extends: obj.extends ?? undefined,
        engine: obj.engine ?? undefined,
        charset: obj.charset ?? undefined,
        audited: obj.audited ?? false,
      };

      // 1) ensure schema generator is in sync for create/update
      if (action === 'create' || action === 'update') {
        // initial sync or incremental update
        await syncSchema();
      }

      // 2) ACL generation for 'create'
      if (action === 'create' && obj.create_access_controls && obj.user_role) {
        await createAclsForTable(em, def.tableName, obj.user_role);
      }

      // 3) handle drop
      if (action === 'delete') {
        await dropObject(def.tableName);
      }
    } catch (err) {
      await logSchemaError(err as Error, job.data);
      throw err;
    } finally {
      await orm.close(true);
    }
  },
  {
    connection: { url: process.env.REDIS_URL },
    concurrency: 1,
  }
);
