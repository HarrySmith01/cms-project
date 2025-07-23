/* eslint-disable class-methods-use-this */
// src/subscribers/DictionarySubscriber.ts
// Description: Subscriber to listen for SysDictionary create/update/delete and enqueue extension job
// Created: 2025-07-23T11:00:00+05:30
// Updated: 2025-07-25T14:00:00+05:30

import { EntitySubscriberInterface, FlushEventArgs } from '@mikro-orm/core';
import { SysDictionary } from '../entities/SysDictionary';
import { enqueueExtensionJob } from '../jobs/extensionEngine';

export class DictionarySubscriber
  implements EntitySubscriberInterface<SysDictionary>
{
  /**
   * Listen to SysDictionary entity changes
   */
  getSubscribedEntities(): string[] {
    return [SysDictionary.name];
  }

  /**
   * After a new dictionary entry is created, enqueue a 'create' job
   */
  async afterCreate(event: FlushEventArgs): Promise<void> {
    const dict = event.entity as SysDictionary;
    await enqueueExtensionJob('create', dict);
  }

  /**
   * After a dictionary entry is updated, enqueue an 'update' job
   */
  async afterUpdate(event: FlushEventArgs): Promise<void> {
    const dict = event.entity as SysDictionary;
    await enqueueExtensionJob('update', dict);
  }

  /**
   * After a dictionary entry is deleted, enqueue a 'delete' job
   */
  async afterDelete(event: FlushEventArgs): Promise<void> {
    const dict = event.entity as SysDictionary;
    await enqueueExtensionJob('delete', dict);
  }
}
