// File: src/entities/SubscriptionEntitlement.ts
// Description: Placeholder for subscription entitlement details for licensing and feature access.
// Created:     2025-07-27T01:20:00+05:30
// Updated:     2025-07-27T01:20:00+05:30

import { Entity } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';

@AclResource('sys_subscription_entitlement')
@Entity({ tableName: 'sys_subscription_entitlement' })
export class SubscriptionEntitlement extends Packaged(BaseEntity as any) {
  // TODO: add real entitlement fields (e.g., feature_code, subscriptions)
}
