// File: src/entities/SysGroupHasRole.ts
// Description: Entity for group‐based role assignments (sys_group_has_role table).
// Created: 2025-07-23T07:30:00+05:30
// Updated: 2025-07-23T07:30:00+05:30

import {
  Entity, PrimaryKey, Property, ManyToOne,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { SysUserGroup } from './SysUserGroup';
import { SysUserRole } from './SysUserRole';

@Entity({ tableName: 'sys_group_has_role' })
export class SysGroupHasRole {
  @PrimaryKey({ type: 'uuid' })
    sys_id: string = v4();

  /** Group receiving the role */
  @ManyToOne(() => SysUserGroup)
    group!: SysUserGroup;

  /** Role assigned to the group */
  @ManyToOne(() => SysUserRole)
    role!: SysUserRole;

  /** Who granted the role (group context) */
  @ManyToOne(() => SysUserGroup, { nullable: true })
    granted_by?: SysUserGroup;

  /** True if the role is inherited */
  @Property({ type: 'boolean' })
    inherits: boolean = true;

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
