// File: src/entities/SysUserHasRole.ts
// Description: Entity for direct user-role assignments (sys_user_has_role table).
// Created: 2025-07-23T07:15:00+05:30
// Updated: 2025-07-23T07:15:00+05:30

import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { SysUser } from './SysUser';
import { SysUserRole } from './SysUserRole';
import { SysUserGroup } from './SysUserGroup';

@Entity({ tableName: 'sys_user_has_role' })
export class SysUserHasRole {
  @PrimaryKey({ type: 'uuid' })
  sys_id: string = v4();

  /** User receiving the role */
  @ManyToOne(() => SysUser)
  user!: SysUser;

  /** Role assigned */
  @ManyToOne(() => SysUserRole)
  role!: SysUserRole;

  /** Group or system that granted this role */
  @ManyToOne(() => SysUserGroup, { nullable: true })
  granted_by?: SysUserGroup;

  /** If this assignment is included in another role */
  @ManyToOne(() => SysUserRole, { nullable: true })
  included_in_role?: SysUserRole;

  /** If this assignment is included via a contained role */
  @ManyToOne(() => SysUserRole, { nullable: true })
  included_in_role_instance?: SysUserRole;

  /** Number of levels inherited */
  @Property({ type: 'number', nullable: true })
  inh_count?: number;

  /** Inheritance map (serialized) */
  @Property({ type: 'string', length: 255, nullable: true })
  inh_map?: string;

  /** True if role is inherited */
  @Property({ type: 'boolean' })
  inherited: boolean = false;

  /** Assignment state (e.g. 'active') */
  @Property({ type: 'string', length: 40 })
  state: string = 'active';

  // Audit fields
  @Property({ type: 'date' })
  sys_created_on: Date = new Date();

  @Property({ type: 'string', nullable: true })
  sys_created_by?: string;

  @Property({ type: 'date', onUpdate: () => new Date() })
  sys_updated_on: Date = new Date();

  @Property({ type: 'string', nullable: true })
  sys_updated_by?: string;

  @Property({ type: 'number', default: 0 })
  sys_mod_count: number = 0;
}
