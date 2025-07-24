// File: src/entities/SysRemoteUpdateSet.ts
// Description: Maps the sys_remote_update_set table for remotely retrieved update sets.
// Created:     2025-07-27T04:15:00+05:30
// Updated:     2025-07-27T04:15:00+05:30

import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { SysPackage } from './SysPackage';
import { SysUpdateSet } from './SysUpdateSet';
import { SysUpdateSetSource } from './SysUpdateSetSource';

@AclResource('sys_remote_update_set')
@Entity({ tableName: 'sys_remote_update_set' })
export class SysRemoteUpdateSet extends Packaged(BaseEntity) {
  /** Application this remote set belongs to */
  @ManyToOne(() => SysPackage, { nullable: true })
  application?: SysPackage;

  /** Name of the application */
  @Property({ nullable: true })
  application_name?: string;

  /** Scope of the application */
  @Property({ nullable: true })
  application_scope?: string;

  /** Version of the application */
  @Property({ nullable: true })
  application_version?: string;

  /** System class name (auto-calculated) */
  @Property({ nullable: true })
  sys_class_name?: string;

  /** Number of collisions detected */
  @Property({ type: 'integer', default: 0 })
  collisions: number = 0;

  /** Date committed on remote */
  @Property({ nullable: true })
  commit_date?: Date;

  /** Deletion marker */
  @Property({ type: 'integer', default: 0 })
  deleted: number = 0;

  /** Human-readable description */
  @Property({ nullable: true })
  description?: string;

  /** Number of inserted records */
  @Property({ type: 'integer', default: 0 })
  inserted: number = 0;

  /** Name of this remote set */
  @Property({ nullable: true })
  name?: string;

  /** Original sys_id on remote */
  @Property({ nullable: true })
  origin_sys_id?: string;

  /** Parent remote set for nesting */
  @ManyToOne(() => SysRemoteUpdateSet, { nullable: true })
  parent?: SysRemoteUpdateSet;

  /** Release date */
  @Property({ nullable: true })
  release_date?: Date;

  /** Remote base update set reference */
  @ManyToOne(() => SysRemoteUpdateSet, { nullable: true })
  remote_base_update_set?: SysRemoteUpdateSet;

  /** Remote parent ID */
  @Property({ nullable: true })
  remote_parent_id?: string;

  /** Remote sys_id reference */
  @Property({ nullable: true })
  remote_sys_id?: string;

  /** Current state (e.g., loaded) */
  @Property({ nullable: true })
  state?: string;

  /** Total summary count */
  @Property({ type: 'integer', default: 0 })
  summary: number = 0;

  /** Which local update set this maps to */
  @ManyToOne(() => SysUpdateSet, { nullable: true })
  update_set?: SysUpdateSet;

  /** Remote source endpoint */
  @ManyToOne(() => SysUpdateSetSource, { nullable: true })
  update_source?: SysUpdateSetSource;
}
