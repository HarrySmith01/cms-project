// File: src/entities/SysSecurityAclRole.ts
// Description: M2M table linking ACL rules to roles (sys_security_acl_role).
// Created:     2025-07-27T05:05:00+05:30
// Updated:     2025-07-27T14:00 IST

import { Entity, ManyToOne } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { SysSecurityAcl } from './SysSecurityAcl';
import { SysUserRole } from './SysUserRole';

// Workaround: ensure BaseEntity mixin compatibility under MikroORM 6.x
const SysSecurityAclRoleBase = Packaged(BaseEntity as any);

@AclResource('sys_security_acl_role')
@Entity({ tableName: 'sys_security_acl_role' })
export class SysSecurityAclRole extends SysSecurityAclRoleBase {
  /** ACL rule reference */
  @ManyToOne(() => SysSecurityAcl, { nullable: false })
  acl!: SysSecurityAcl;

  /** Role granted that ACL */
  @ManyToOne(() => SysUserRole, { nullable: false })
  role!: SysUserRole;
}
