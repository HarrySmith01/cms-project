// File: src/entities/SysSecurityAclRole.ts
// Description: M2M table linking ACL rules to roles (sys_security_acl_role).
// Created:     2025-07-27T05:05:00+05:30
// Updated:     2025-07-27T05:05:00+05:30

import { Entity, ManyToOne } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { SysSecurityAcl } from './SysSecurityAcl';
import { SysUserRole } from './SysUserRole';

@AclResource('sys_security_acl_role')
@Entity({ tableName: 'sys_security_acl_role' })
export class SysSecurityAclRole extends Packaged(BaseEntity) {
  /** ACL rule reference */
  @ManyToOne(() => SysSecurityAcl, { nullable: false, onDelete: 'cascade' })
  acl!: SysSecurityAcl;

  /** Role granted that ACL */
  @ManyToOne(() => SysUserRole, { nullable: false, onDelete: 'cascade' })
  role!: SysUserRole;
}
