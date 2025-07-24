// File: src/entities/SysUpdateSet.ts
// Description: Maps the sys_update_set table, tracking batches of record changes.
// Created:     2025-07-27T05:35:00+05:30
// Updated:     2025-07-27T05:35:00+05:30

import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { SysPackage } from './SysPackage';
import { SysUser } from './SysUser';
import { BatchInstallPlan } from './BatchInstallPlan';
import { SysRemoteUpdateSet } from './SysRemoteUpdateSet';

@AclResource('sys_update_set')
@Entity({ tableName: 'sys_update_set' })
export class SysUpdateSet extends Packaged(BaseEntity as any) {
  /** Application this update set belongs to */
  @ManyToOne(() => SysPackage, { nullable: true })
  application?: SysPackage;

  /** Base batch on another update set */
  @ManyToOne(() => SysUpdateSet, { nullable: true })
  base_update_set?: SysUpdateSet;

  /** Plan for batch installation */
  @ManyToOne(() => BatchInstallPlan, { nullable: true })
  batch_install_plan?: BatchInstallPlan;

  /** User who completed this set */
  @ManyToOne(() => SysUser, { nullable: true })
  completed_by?: SysUser;

  /** When the set was completed */
  @Property({ nullable: true })
  completed_on?: Date;

  /** Flag this as the default set */
  @Property({ default: false })
  is_default: boolean = false;

  /** Human-readable description */
  @Property({ nullable: true })
  description?: string;

  /** Date of install */
  @Property({ nullable: true })
  install_date?: Date;

  /** Source of the installation */
  @Property({ nullable: true })
  installed_from?: string;

  /** If merged into another set */
  @ManyToOne(() => SysUpdateSet, { nullable: true })
  merged_to?: SysUpdateSet;

  /** Name of the update set */
  @Property()
  name!: string;

  /** Original sys_id from which this was cloned */
  @Property({ nullable: true })
  origin_sys_id?: string;

  /** Parent update set (for nesting) */
  @ManyToOne(() => SysUpdateSet, { nullable: true })
  parent?: SysUpdateSet;

  /** Public release date */
  @Property({ nullable: true })
  release_date?: Date;

  /** Remote update set reference */
  @ManyToOne(() => SysRemoteUpdateSet, { nullable: true })
  remote_sys_id?: SysRemoteUpdateSet;

  /** Current state (e.g. in progress, complete) */
  @Property({ nullable: true })
  state?: string;
}
