/* eslint-disable no-new, no-restricted-syntax, no-await-in-loop */
// File: src/queues/dictionaryQueue.ts
// Description: BullMQ queue + worker for asynchronous SysDictionary (column)
//              schema changes. Worker loads the dict record, resolves all
//              descendant tables, and calls columnSync.{create|alter|drop}
//              inside a single SQL transaction with error logging.
// Created: 2025-07-25T16:35:00+05:30
// Updated: 2025-07-25T19:40:00+05:30

import { Queue, Worker } from 'bullmq';
import { MikroORM } from '@mikro-orm/core';
import { SysDictionary } from '../entities/SysDictionary';
import { SysDbObject } from '../entities/SysDbObject';
import * as columnSync from '../services/metadataSync/columnSync';
import { logSchemaError } from '../services/metadataSync/logSchemaError';

export const dictionaryQueue = new Queue('dictionary-schema-jobs', {
  connection: { url: process.env.REDIS_URL },
});

/* ------------------------------------------------------------------ */
/* Helper: recursively collect all descendants                        */
/* ------------------------------------------------------------------ */

function collectDescendants(
  parent: string,
  childrenMap: Map<string, string[]>,
  out: Set<string>
): void {
  (childrenMap.get(parent) ?? []).forEach((child) => {
    if (!out.has(child)) {
      out.add(child);
      collectDescendants(child, childrenMap, out);
    }
  });
}

/* ------------------------------------------------------------------ */
/* Worker: sequential, transactional DDL                              */
/* ------------------------------------------------------------------ */

new Worker(
  dictionaryQueue.name,
  async (job) => {
    const { action, dictId } = job.data as {
      action: 'create' | 'update' | 'delete';
      dictId: string;
    };

    const orm = await MikroORM.init();
    const em = orm.em.fork();
    const conn = em.getConnection();

    try {
      /* 1️⃣ Load dict row */
      const dict = await em.findOneOrFail(SysDictionary, dictId);

      /* 2️⃣ Build parent→children map */
      const allObjs = await em.find(SysDbObject, {});
      const childMap = new Map<string, string[]>();
      allObjs.forEach((o) => {
        if (o.extends) {
          const arr = childMap.get(o.extends) ?? [];
          arr.push(o.name);
          childMap.set(o.extends, arr);
        }
      });

      /* 3️⃣ Collect owner + descendants */
      const targets = new Set<string>([dict.tableName]);
      collectDescendants(dict.tableName, childMap, targets);

      /* 4️⃣ ColumnDef skeleton */
      const baseDef = {
        columnName: dict.columnName,
        type: dict.columnType,
        nullable: !dict.mandatory,
        default: dict.defaultValue ?? undefined,
        label: dict.columnLabel,
        referenceTable: dict.reference,
      };

      /* 5️⃣ Transaction */
      await conn.begin();
      for (const tbl of targets) {
        if (action === 'create') {
          await columnSync.createColumn({ ...baseDef, tableName: tbl }, conn);
        } else if (action === 'update') {
          await columnSync.alterColumn({ ...baseDef, tableName: tbl }, conn);
        } else {
          await columnSync.dropColumn(
            { tableName: tbl, columnName: dict.columnName },
            conn
          );
        }
      }
      await conn.commit();
    } catch (err) {
      await conn.rollback();
      await logSchemaError(err as Error, job.data, conn);
      throw err; // so BullMQ can retry
    } finally {
      await orm.close(true);
    }
  },
  { connection: { url: process.env.REDIS_URL }, concurrency: 1 }
);
/* eslint-enable no-new, no-restricted-syntax, no-await-in-loop */
