/* eslint-disable import/prefer-default-export, object-curly-newline */
/**
 * File: src/entities/SysUpdateSet.ts
 * Description: Maps the sys_update_set table, tracking batches of record changes.
 * Created: 2025-07-23T15:30:00+05:30
 * Updated: 2025-07-23T17:45:00+05:30
 */
import {
  Entity,
  Property,
  PrimaryKey,
  ManyToOne,
  Index,
} from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { SysPackage } from './SysPackage';
import { SysUser } from './SysUser';
import { BatchInstallPlan } from './BatchInstallPlan';
import { SysRemoteUpdateSet } from './SysRemoteUpdateSet';

@Entity({ tableName: 'sys_update_set' })
export class SysUpdateSet {
  /** Primary key (UUID) */
  @PrimaryKey({ type: 'uuid' })
  @Index()
  sys_id: string = uuid();

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

  /** Creation timestamp */
  @Property()
  sys_created_on: Date = new Date();

  /** Creator of the update set */
  @Property()
  sys_created_by: string;

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

  /** Remote update set reference (now points to SysRemoteUpdateSet) */
  @ManyToOne(() => SysRemoteUpdateSet, { nullable: true })
  remote_sys_id?: SysRemoteUpdateSet;

  /** Current state (e.g. in progress, complete) */
  @Property({ nullable: true })
  state?: string;

  /** Last updated timestamp */
  @Property({ onUpdate: () => new Date() })
  sys_updated_on: Date = new Date();

  /** Last updater */
  @Property({ nullable: true })
  sys_updated_by?: string;

  /** Modification count */
  @Property({ default: 0 })
  sys_mod_count: number = 0;
}
