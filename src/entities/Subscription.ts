// File: src/entities/Subscription.ts
// Description: Placeholder for subscription records managed by licensing and feature access.
// Created:     2025-07-27T01:15:00+05:30
// Updated:     2025-07-27T01:15:00+05:30

import { Entity } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';

@AclResource('sys_subscription')
@Entity({ tableName: 'sys_subscription' })
export class Subscription extends Packaged(BaseEntity as any) {
  // TODO: add real subscription fields (e.g., plan_id, user_count, expires_on)
}
