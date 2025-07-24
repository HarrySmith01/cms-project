// File: src/entities/SysUserHasRole.ts
// Description: Entity for direct user-role assignments (sys_user_has_role table).
// Created:     2025-07-27T06:35:00+05:30
// Updated:     2025-07-27T06:35:00+05:30

import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { SysUser } from './SysUser';
import { SysUserRole } from './SysUserRole';
import { SysUserGroup } from './SysUserGroup';

@AclResource('sys_user_has_role')
@Entity({ tableName: 'sys_user_has_role' })
export class SysUserHasRole extends Packaged(BaseEntity as any) {
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
  @Property({ nullable: true })
  inh_count?: number;

  /** Inheritance map (serialized) */
  @Property({ length: 255, nullable: true })
  inh_map?: string;

  /** True if role is inherited */
  @Property()
  inherited: boolean = false;

  /** Assignment state (e.g. 'active') */
  @Property({ length: 40 })
  state: string = 'active';
}
