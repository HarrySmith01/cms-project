/* eslint-disable import/prefer-default-export, object-curly-newline */
/**
 * File: src/entities/SysRemoteUpdateSet.ts
 * Description: Maps the sys_remote_update_set table for remotely retrieved update sets.
 * Created: 2025-07-23T17:00:00+05:30
 * Updated: 2025-07-23T18:45:00+05:30
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
import { SysUpdateSet } from './SysUpdateSet';
import { SysUpdateSetSource } from './SysUpdateSetSource';

@Entity({ tableName: 'sys_remote_update_set' })
export class SysRemoteUpdateSet {
  /** Primary key (UUID) */
  @PrimaryKey({ type: 'uuid' })
  @Index()
  sys_id: string = uuid();

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

  /** When this record was loaded locally */
  @Property()
  sys_created_on: Date = new Date();

  /** Who created the record locally */
  @Property()
  sys_created_by: string;

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

  /** Parent remote set (for nesting) */
  @ManyToOne(() => SysRemoteUpdateSet, { nullable: true })
  parent?: SysRemoteUpdateSet;

  /** Release date */
  @Property({ nullable: true })
  release_date?: Date;

  /** Remote base update set reference */
  @ManyToOne(() => SysRemoteUpdateSet, { nullable: true })
  remote_base_update_set?: SysRemoteUpdateSet;

  /** Remote parent ID (string) */
  @Property({ nullable: true })
  remote_parent_id?: string;

  /** Remote sys_id reference (self-FK) */
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

  /** Last updated locally */
  @Property({ onUpdate: () => new Date() })
  sys_updated_on: Date = new Date();

  /** Who last updated locally */
  @Property({ nullable: true })
  sys_updated_by?: string;

  /** Modification count */
  @Property({ default: 0 })
  sys_mod_count: number = 0;
}
