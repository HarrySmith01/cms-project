// File: src/entities/SysUserGrmember.ts
// Description: Entity for group membership (sys_user_grmember table).
// Created: 2025-07-23T07:00:00+05:30
// Updated: 2025-07-23T07:00:00+05:30

import {
  Entity, PrimaryKey, Property, ManyToOne,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { SysUser } from './SysUser';
import { SysUserGroup } from './SysUserGroup';

@Entity({ tableName: 'sys_user_grmember' })
export class SysUserGrmember {
  @PrimaryKey({ type: 'uuid' })
    sys_id: string = v4();

  @ManyToOne(() => SysUser)
    user!: SysUser;

  @ManyToOne(() => SysUserGroup)
    group!: SysUserGroup;

  @Property({ type: 'number', default: 0 })
    points: number = 0;

  @Property({ type: 'string', length: 40, nullable: true })
    scrum_role?: string;

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
