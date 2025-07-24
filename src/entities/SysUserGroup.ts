// File: src/entities/SysUserGroup.ts
// Description: Entity for user groups (sys_user_group table), with its members and group‐role assignments.
// Created:     2025-07-27T06:25:00+05:30
// Updated:     2025-07-27T06:25:00+05:30

import {
  Entity,
  Property,
  ManyToOne,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { CmnCostCenter } from './CmnCostCenter';
import { SysUser } from './SysUser';
import { SysUserGrmember } from './SysUserGrmember';
import { SysGroupHasRole } from './SysGroupHasRole';

@AclResource('sys_user_group')
@Entity({ tableName: 'sys_user_group' })
export class SysUserGroup extends Packaged(BaseEntity as any) {
  /** Group name */
  @Property({ length: 80 })
  name!: string;

  /** Active flag */
  @Property()
  active: boolean = true;

  /** Average daily FTE */
  @Property({ type: 'integer', nullable: true })
  average_daily_fte?: number;

  /** Cost center reference */
  @ManyToOne(() => CmnCostCenter, { nullable: true })
  cost_center?: CmnCostCenter;

  /** Long description */
  @Property({ length: 1000, nullable: true })
  description?: string;

  /** Exclude manager from members */
  @Property()
  exclude_manager: boolean = false;

  /** Contact email */
  @Property({ length: 100, nullable: true })
  email?: string;

  /** Hourly rate */
  @Property({ type: 'decimal', precision: 12, scale: 2 })
  hourly_rate: number = 0;

  /** Include member records automatically */
  @Property()
  include_members: boolean = false;

  /** Default assignee user */
  @ManyToOne(() => SysUser, { nullable: true })
  default_assignee?: SysUser;

  /** Group manager */
  @ManyToOne(() => SysUser, { nullable: true })
  manager?: SysUser;

  /** Parent group (hierarchy) */
  @ManyToOne(() => SysUserGroup, { nullable: true })
  parent?: SysUserGroup;

  /** Points (for workload, etc.) */
  @Property({ type: 'integer', nullable: true })
  points?: number;

  /** Source system */
  @Property({ length: 255, nullable: true })
  source?: string;

  /** Arbitrary type label */
  @Property({ length: 1024, nullable: true })
  type?: string;

  /** Vendor list (CSV) */
  @Property({ length: 1024, nullable: true })
  vendors?: string;

  /** Membership list (sys_user_grmember) */
  @OneToMany(() => SysUserGrmember, (grm) => grm.group)
  members = new Collection<SysUserGrmember>(this);

  /** Group‐based role assignments (sys_group_has_role) */
  @OneToMany(() => SysGroupHasRole, (ghr) => ghr.group)
  groupRoles = new Collection<SysGroupHasRole>(this);
}
