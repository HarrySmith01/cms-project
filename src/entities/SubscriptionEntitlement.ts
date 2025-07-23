// src/entities/SubscriptionEntitlement.ts
import { Entity, PrimaryKey } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';

@Entity({ tableName: 'sys_subscription_entitlement' })
export class SubscriptionEntitlement {
  @PrimaryKey({ type: 'uuid' })
  sys_id: string = uuid();
  // TODO: add real fields here
}
