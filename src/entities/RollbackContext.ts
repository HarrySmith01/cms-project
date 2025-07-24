// File: src/entities/RollbackContext.ts
// Description: Placeholder for rollback context referenced by batch install plans.
// Created:     2025-07-27T00:55:00+05:30
// Updated:     2025-07-27T00:55:00+05:30

import { Entity } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';

@AclResource('sys_rollback_context')
@Entity({ tableName: 'sys_rollback_context' })
export class RollbackContext extends Packaged(BaseEntity as any) {
  // TODO: add real fields as needed
}
