// File: src/entities/SysUserGrmember.ts
// Description: Entity for group membership (sys_user_grmember table).
// Created:     2025-07-27T06:15:00+05:30
// Updated:     2025-07-27T06:15:00+05:30

import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { SysUser } from './SysUser';
import { SysUserGroup } from './SysUserGroup';

@AclResource('sys_user_grmember')
@Entity({ tableName: 'sys_user_grmember' })
export class SysUserGrmember extends Packaged(BaseEntity) {
  /** User reference */
  @ManyToOne(() => SysUser)
  user!: SysUser;

  /** Group reference */
  @ManyToOne(() => SysUserGroup)
  group!: SysUserGroup;

  /** Points awarded for membership (optional) */
  @Property({ default: 0 })
  points: number = 0;

  /** Scrum role within group (optional) */
  @Property({ length: 40, nullable: true })
  scrum_role?: string;
}
