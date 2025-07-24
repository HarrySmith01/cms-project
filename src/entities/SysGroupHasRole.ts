// File: src/entities/SysGroupHasRole.ts
// Description: Entity for group‐based role assignments (sys_group_has_role table).
// Created:     2025-07-27T02:45:00+05:30
// Updated:     2025-07-27T02:45:00+05:30

import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { SysUserGroup } from './SysUserGroup';
import { SysUserRole } from './SysUserRole';

@AclResource('sys_group_has_role')
@Entity({ tableName: 'sys_group_has_role' })
export class SysGroupHasRole extends Packaged(BaseEntity) {
  /** Group receiving the role */
  @ManyToOne(() => SysUserGroup)
  group!: SysUserGroup;

  /** Role assigned to the group */
  @ManyToOne(() => SysUserRole)
  role!: SysUserRole;

  /** Who granted the role (optional group context) */
  @ManyToOne(() => SysUserGroup, { nullable: true })
  granted_by?: SysUserGroup;

  /** Indicates if the role is inherited */
  @Property()
  inherits: boolean = true;
}
