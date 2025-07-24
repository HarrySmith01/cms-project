// File: src/subscribers/DictionarySubscriber.ts
// Description: Subscribes to SysDictionary CRUD events and enqueues a minimal
//              job onto the BullMQ dictionary-schema queue (dictionaryQueue.ts).
// Created: 2025-07-23T11:00:00+05:30
// Updated: 2025-07-27T12:15:00+05:30

import {
  EntitySubscriberInterface,
  EventSubscriber,
  FlushEventArgs,
  RemoveEventArgs,
} from '@mikro-orm/core';
import { SysDictionary } from '../entities/SysDictionary';
import { dictionaryQueue } from '../queues/dictionaryQueue'; // ⬅ queue + worker combined

@EventSubscriber()
export class DictionarySubscriber
  implements EntitySubscriberInterface<SysDictionary>
{
  /** Entity this subscriber listens to */
  getSubscribedEntities(): string[] {
    return [SysDictionary.name];
  }

  /** After a new dictionary entry is created, enqueue a “create” job */
  async afterCreate(event: FlushEventArgs<SysDictionary>): Promise<void> {
    const dict = event.entity;
    await dictionaryQueue.add('ddl', {
      action: 'create',
      dictId: dict.sys_id,
    });
  }

  /** After an existing dictionary entry is updated, enqueue an “update” job */
  async afterUpdate(event: FlushEventArgs<SysDictionary>): Promise<void> {
    const dict = event.entity;
    await dictionaryQueue.add('ddl', {
      action: 'update',
      dictId: dict.sys_id,
    });
  }

  /** After a dictionary entry is deleted, enqueue a “delete” job */
  async afterDelete(event: RemoveEventArgs<SysDictionary>): Promise<void> {
    const dict = event.entity;
    if (!dict) return;
    await dictionaryQueue.add('ddl', {
      action: 'delete',
      dictId: dict.sys_id,
    });
  }
}
