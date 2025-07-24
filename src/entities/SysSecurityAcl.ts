// File: src/entities/SysSecurityAcl.ts
// Description: Entity for ACL rule definitions (sys_security_acl table) with all dictionary fields.
// Created:     2025-07-27T04:55:00+05:30
// Updated:     2025-07-27T04:55:00+05:30

import {
  Entity,
  Property,
  ManyToOne,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { SysUser } from './SysUser';
import { SysSecurityOperation } from './SysSecurityOperation';
import { SysSecurityAttribute } from './SysSecurityAttribute';
import { SysSecurityAclRole } from './SysSecurityAclRole';

@AclResource('sys_security_acl')
@Entity({ tableName: 'sys_security_acl' })
export class SysSecurityAcl extends Packaged(BaseEntity) {
  /** Composite name (table.field.operation) */
  @Property({ length: 255 })
  name!: string;

  /** True if rule is active */
  @Property()
  active: boolean = true;

  /** If true, admins bypass this ACL */
  @Property()
  admin_overrides: boolean = true;

  /** Marks rule as “advanced” */
  @Property()
  advanced: boolean = false;

  /** Condition script block */
  @Property({ type: 'text', nullable: true })
  condition?: string;

  /** Applies-to script block */
  @Property({ type: 'text', nullable: true })
  applies_to?: string;

  /** Controlled-by references (denormalized list) */
  @Property({ type: 'text', nullable: true })
  controlled_by_refs?: string;

  /** Decision type: allow, deny, etc. */
  @Property({ length: 40 })
  decision_type!: string;

  /** Human-readable description */
  @Property({ type: 'text', nullable: true })
  description?: string;

  /** Local vs existing flag */
  @Property({ length: 40 })
  local_or_existing!: string;

  /** Script block to execute */
  @Property({ type: 'text', nullable: true })
  script?: string;

  /** Reference to CRUD operation */
  @ManyToOne(() => SysSecurityOperation)
  operation!: SysSecurityOperation;

  /** Reference to a security attribute (optional) */
  @ManyToOne(() => SysSecurityAttribute, { nullable: true })
  security_attribute?: SysSecurityAttribute;

  /** Type of ACL (record/field) */
  @Property({ length: 40 })
  type!: string;

  /** All roles this ACL applies to */
  @OneToMany(() => SysSecurityAclRole, (role) => role.acl)
  roles = new Collection<SysSecurityAclRole>(this);
}
