/* eslint-disable class-methods-use-this */
// src/subscribers/TableSubscriber.ts
// Description: Subscribes to SysDbObject CRUD and enqueues minimal table-schema jobs.
// Created: 2025-07-25T17:35:00+05:30
// Updated: 2025-07-25T17:35:00+05:30

import {
  EntitySubscriberInterface,
  EventSubscriber,
  FlushEventArgs,
  RemoveEventArgs,
} from '@mikro-orm/core';
import { SysDbObject } from '../entities/SysDbObject';
import { tableQueue } from '../queues/tableQueue';

@EventSubscriber()
export class TableSubscriber implements EntitySubscriberInterface<SysDbObject> {
  getSubscribedEntities(): string[] {
    return [SysDbObject.name];
  }

  async afterCreate(event: FlushEventArgs<SysDbObject>): Promise<void> {
    await tableQueue.add('ddl', { action: 'create', objId: event.entity.id });
  }

  async afterUpdate(event: FlushEventArgs<SysDbObject>): Promise<void> {
    await tableQueue.add('ddl', { action: 'update', objId: event.entity.id });
  }

  async afterRemove(event: RemoveEventArgs<SysDbObject>): Promise<void> {
    if (!event.entity) return;
    await tableQueue.add('ddl', { action: 'delete', objId: event.entity.id });
  }
}
