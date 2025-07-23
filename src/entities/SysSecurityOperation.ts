// File: src/entities/SysSecurityOperation.ts
// Description: Entity for ACL operations definitions (sys_security_operation table).
// Created: 2025-07-23T02:30:00+05:30
// Updated: 2025-07-23T02:30:00+05:30

import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { SysUser } from './SysUser';

@Entity({ tableName: 'sys_security_operation' })
export class SysSecurityOperation {
  @PrimaryKey({ type: 'uuid' })
  sys_id: string = v4();

  @Property({ type: 'string', length: 40 })
  name!: string;

  @Property({ type: 'string', length: 4000, nullable: true })
  description?: string;

  @Property({ type: 'number' })
  order!: number;

  @Property({ type: 'boolean' })
  active: boolean = true;

  // Audit fields
  @Property({ type: 'date' })
  sys_created_on: Date = new Date();

  @ManyToOne(() => SysUser, { nullable: true })
  sys_created_by?: SysUser;

  @Property({ type: 'date', onUpdate: () => new Date() })
  sys_updated_on: Date = new Date();

  @ManyToOne(() => SysUser, { nullable: true })
  sys_updated_by?: SysUser;

  @Property({ type: 'number', default: 0 })
  sys_mod_count: number = 0;
}
