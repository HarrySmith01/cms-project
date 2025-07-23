// File: src/entities/SysUserRole.ts
// Description: Entity for roles (permissions bundles) corresponding to the sys_user_role table.
// Created: 2025-07-23T04:15:00+05:30
// Updated: 2025-07-23T04:15:00+05:30

import {
  Entity, PrimaryKey, Property, ManyToOne,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { SysUser } from './SysUser';

@Entity({ tableName: 'sys_user_role' })
export class SysUserRole {
  /** Primary GUID */
  @PrimaryKey({ type: 'uuid' })
    sys_id: string = v4();

  /** Role name (unique) */
  @Property({ type: 'string', length: 100, unique: true })
    name!: string;

  /** Display suffix */
  @Property({ type: 'string', length: 100, nullable: true })
    suffix?: string;

  /** Human-readable description */
  @Property({ type: 'string', length: 1000, nullable: true })
    description?: string;

  /** Grantable flag (can this role be granted to others) */
  @Property({ type: 'boolean' })
    grantable: boolean = true;

  /** Scoped admin flag */
  @Property({ type: 'boolean' })
    scoped_admin: boolean = false;

  /** Delegate capability flag */
  @Property({ type: 'boolean' })
    can_delegate: boolean = true;

  /** Elevated privilege flag */
  @Property({ type: 'boolean' })
    elevated_privilege: boolean = false;

  /** Reference qualifier for assignment scope (stored as script) */
  @Property({ type: 'text', nullable: true })
    assignable_by?: string;

  /** Reference to an encryption context (UUID) */
  @Property({ type: 'string', length: 32, nullable: true })
    encryption_context?: string;

  /** Comma-separated list of included role names/IDs */
  @Property({ type: 'string', length: 255, nullable: true })
    includes_roles?: string;

  // Audit fields

  /** When record was created */
  @Property({ type: 'date' })
    sys_created_on: Date = new Date();

  /** Who created it (user sys_id) */
  @ManyToOne(() => SysUser, { nullable: true })
    sys_created_by?: SysUser;

  /** When record was last updated */
  @Property({ type: 'date', onUpdate: () => new Date() })
    sys_updated_on: Date = new Date();

  /** Who last updated it (user sys_id) */
  @ManyToOne(() => SysUser, { nullable: true })
    sys_updated_by?: SysUser;

  /** Modification counter */
  @Property({ type: 'number', default: 0 })
    sys_mod_count: number = 0;
}
