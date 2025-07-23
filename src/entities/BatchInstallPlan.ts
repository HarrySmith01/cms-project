// src/entities/BatchInstallPlan.ts
// Description: Defines the sys_batch_install_plan table for batch installation plans.
// Created: 2025-07-23T16:10:00+05:30
// Updated: 2025-07-23T18:00:00+05:30

import { Entity, Property, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { RollbackContext } from './RollbackContext';
import { SysUser } from './SysUser';

@Entity({ tableName: 'sys_batch_install_plan' })
export class BatchInstallPlan {
  /** Primary key (UUID) */
  @PrimaryKey({ type: 'uuid' })
  sys_id: string = uuid();

  /** When the plan was created */
  @Property({ type: 'date', onCreate: () => new Date() })
  sys_created_on: Date = new Date();

  /** Who created the plan */
  @ManyToOne(() => SysUser, { nullable: true })
  sys_created_by?: SysUser;

  /** Plan name */
  @Property({ unique: true })
  name!: string;

  /** Notes or comments */
  @Property({ type: 'text', nullable: true })
  notes?: string;

  /** Context used for rollback */
  @ManyToOne(() => RollbackContext, { nullable: true })
  rollback_context?: RollbackContext;

  /** Current state of the plan (e.g., ready) */
  @Property({ nullable: false })
  state!: string;

  // Audit fields

  @Property({ type: 'date', onUpdate: () => new Date() })
  sys_updated_on: Date = new Date();

  /** Who last updated the plan */
  @ManyToOne(() => SysUser, { nullable: true })
  sys_updated_by?: SysUser;

  /** Modification count */
  @Property({ type: 'number', default: 0 })
  sys_mod_count: number = 0;
}
