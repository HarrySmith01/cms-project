// File: src/entities/SysUserRole.ts
// Description: Entity for roles (permissions bundles) corresponding to the sys_user_role table.
// Created:     2025-07-27T06:45:00+05:30
// Updated:     2025-07-27T06:45:00+05:30

import { Entity, Property } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';

@AclResource('sys_user_role')
@Entity({ tableName: 'sys_user_role' })
export class SysUserRole extends Packaged(BaseEntity as any) {
  /** Role name (unique) */
  @Property({ length: 100, unique: true })
  name!: string;

  /** Display suffix */
  @Property({ length: 100, nullable: true })
  suffix?: string;

  /** Human-readable description */
  @Property({ length: 1000, nullable: true })
  description?: string;

  /** Grantable flag (can this role be granted to others) */
  @Property()
  grantable: boolean = true;

  /** Scoped admin flag */
  @Property()
  scoped_admin: boolean = false;

  /** Delegate capability flag */
  @Property()
  can_delegate: boolean = true;

  /** Elevated privilege flag */
  @Property()
  elevated_privilege: boolean = false;

  /** Reference qualifier for assignment scope (stored as script) */
  @Property({ type: 'text', nullable: true })
  assignable_by?: string;

  /** Reference to an encryption context (UUID) */
  @Property({ length: 32, nullable: true })
  encryption_context?: string;

  /** Comma-separated list of included role names/IDs */
  @Property({ length: 255, nullable: true })
  includes_roles?: string;
}
