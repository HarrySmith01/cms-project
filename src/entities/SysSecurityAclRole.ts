// src/entities/SysSecurityAclRole.ts
// Description: M2M table linking ACL rules to roles (sys_security_acl_role).
// Created: 2025-07-22T17:00:00+05:30
// Updated: 2025-07-25TXX:XX:XX+05:30

import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { SysSecurityAcl } from './SysSecurityAcl';
import { SysUserRole } from './SysUserRole';

@Entity({ tableName: 'sys_security_acl_role' })
export class SysSecurityAclRole {
  @PrimaryKey({ type: 'uuid' })
  sys_id: string = v4();

  /** Which ACL rule */
  // @ManyToOne(() => SysSecurityAcl, { nullable: false, onDelete: 'cascade' })
  @ManyToOne(() => SysSecurityAcl, {
    nullable: false,
    onDelete: 'cascade',
  } as unknown)
  acl!: SysSecurityAcl;

  /** Which role is granted that ACL */
  // @ManyToOne(() => SysUserRole, { nullable: false, onDelete: 'cascade' })
  @ManyToOne(() => SysUserRole, {
    nullable: false,
    onDelete: 'cascade',
  } as unknown)
  role!: SysUserRole;

  /** When this mapping was created */
  @Property({ type: 'date' })
  sys_created_on: Date = new Date();
}
