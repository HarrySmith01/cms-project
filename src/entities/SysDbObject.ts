// File: src/entities/SysDbObject.ts
// Description: Defines the sys_db_object table, storing table-level permissions and behavior.
//              Adds explicit 'name' string column for table name and proper SysGlideObject reference.
// Created:     2025-07-26T01:35:00+05:30
// Updated:     2025-07-25T17:10 IST

import { Entity, Property, ManyToOne, Index } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { SysGlideObject } from './SysGlideObject';
import { BatchInstallPlan } from './BatchInstallPlan';
import { SysUserRole } from './SysUserRole';

// Workaround: cast BaseEntity to 'any' so Packaged can accept it despite abstract.
const SysDbObjectBase = Packaged(BaseEntity as any);

@AclResource('sys_db_object')
@Entity({ tableName: 'sys_db_object' })
export class SysDbObject extends SysDbObjectBase {
  /** Table name (unique identifier for this DB object) */
  @Property({ length: 80, unique: true })
  name!: string;

  /** Reference to field-type metadata in sys_glide_object */
  @ManyToOne(() => SysGlideObject, {
    nullable: false,
    joinColumn: 'glide_object_sys_id',
  })
  glideObject!: SysGlideObject;

  /** Collection flag (always false here) */
  @Property({ default: false })
  collection: boolean = false;

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

  /** Auto-number reference */
  @ManyToOne(() => BatchInstallPlan, {
    nullable: true,
    joinColumn: 'number_ref_sys_id',
  })
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
  @ManyToOne(() => SysDbObject, {
    nullable: true,
    joinColumn: 'super_class_sys_id',
  })
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
  @ManyToOne(() => SysUserRole, {
    nullable: true,
    joinColumn: 'user_role_sys_id',
  })
  user_role?: SysUserRole;
}
