// File: src/entities/BatchInstallPlan.ts
// Description: Defines the sys_batch_install_plan table for batch installation plans.
// Created:     2025-07-26T21:45:00+05:30
// Updated:     2025-07-26T21:50:00+05:30

import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { RollbackContext } from './RollbackContext';

@AclResource('sys_batch_install_plan')
@Entity({ tableName: 'sys_batch_install_plan' })
export class BatchInstallPlan extends Packaged(BaseEntity) {
  /** Plan name (unique) */
  @Property({ unique: true })
  name!: string;

  /** Notes or comments */
  @Property({ type: 'text', nullable: true })
  notes?: string;

  /** Context used for rollback */
  @ManyToOne(() => RollbackContext, { nullable: true })
  rollback_context?: RollbackContext;

  /** Current state of the plan (e.g., ready) */
  @Property()
  state!: string;
}
