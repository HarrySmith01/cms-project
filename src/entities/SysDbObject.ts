/* eslint-disable import/prefer-default-export, object-curly-newline */
/**
 * File: src/entities/SysDbObject.ts
 * Description: Defines the sys_db_object table, storing table-level permissions and behavior.
 * Created: 2025-07-23T18:30:00+05:30
 * Updated: 2025-07-24T10:15:00+05:30
 */
import {
  Entity,
  Property,
  PrimaryKey,
  ManyToOne,
  Index,
} from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { SysGlideObject } from './SysGlideObject';
import { BatchInstallPlan } from './BatchInstallPlan'; // for number_ref
import { SysUserRole } from './SysUserRole'; // corrected import for user_role

@Entity({ tableName: 'sys_db_object' })
export class SysDbObject {
  /** Primary key (UUID) */
  @PrimaryKey({ type: 'uuid' })
  @Index()
    sys_id: string = uuid();

  /** Collection flag (always false here) */
  @Property({ default: false })
    collection: boolean = false;

  /** Table name reference */
  @ManyToOne(() => SysGlideObject, { nullable: false })
    name!: SysGlideObject;

  /** Accessible from (“public” / scope) */
  @Property({ length: 40, default: 'public' })
    access: string = 'public';

  /** Web services toggle */
  @Property({ default: true })
    ws_access: boolean = true;

  /** Client scripts toggle */
  @Property({ default: false })
    client_scripts_access: boolean = false;

  /** Configuration toggle */
  @Property({ default: false })
    configuration_access: boolean = false;

  /** New-fields toggle */
  @Property({ default: false })
    alter_access: boolean = false;

  /** UI actions toggle */
  @Property({ default: false })
    actions_access: boolean = false;

  /** Auto-number reference (uses BatchInstallPlan table to store numbering rules) */
  @ManyToOne(() => BatchInstallPlan, { nullable: true })
    number_ref?: BatchInstallPlan;

  /** Caller-access dropdown */
  @Property({ length: 40, nullable: true })
    caller_access?: string;

  /** Can create records */
  @Property({ default: false })
    create_access: boolean = false;

  /** Can delete records */
  @Property({ default: false })
    delete_access: boolean = false;

  /** Can read records */
  @Property({ default: true })
    read_access: boolean = true;

  /** Can update records */
  @Property({ default: false })
    update_access: boolean = false;

  /** Create access-control records */
  @Property({ default: false })
    create_access_controls: boolean = false;

  /** Extends table reference (self-M2O) */
  @ManyToOne(() => SysDbObject, { nullable: true })
    super_class?: SysDbObject;

  /** Whether this table is extendable */
  @Property({ default: false })
    is_extendable: boolean = false;

  /** Extension model (dropdown) */
  @Property({ length: 40, nullable: true })
    extension_model?: string;

  /** Filter extension script */
  @Property({ length: 255, nullable: true })
    filter_extension?: string;

  /** Documentation label */
  @Property({ length: 80, nullable: true })
    label?: string;

  /** Live-feed toggle */
  @Property({ default: false })
    live_feed_enabled: boolean = false;

  /** Provider-class name */
  @Property({ length: 100, nullable: true })
    provider_class?: string;

  /** Remote-table toggle */
  @Property({ default: false })
    scriptable_table: boolean = false;

  /** System-class code (internal) */
  @Property({ length: 40, nullable: true })
    sys_class_code?: string;

  /** System-class path (internal) */
  @Property({ length: 255, nullable: true })
    sys_class_path?: string;

  /** User-role reference for table ACL */
  @ManyToOne(() => SysUserRole, { nullable: true })
    user_role?: SysUserRole;

  // audit fields

  /** When this record was created */
  @Property()
    sys_created_on: Date = new Date();

  /** Who created this record */
  @Property()
    sys_created_by!: string;

  /** When this record was last updated */
  @Property({ onUpdate: () => new Date() })
    sys_updated_on: Date = new Date();

  /** Who last updated this record */
  @Property({ length: 40, nullable: true })
    sys_updated_by?: string;

  /** How many times this record was modified */
  @Property({ default: 0 })
    sys_mod_count: number = 0;
}
