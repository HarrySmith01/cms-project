// src/entities/SysSecurityAcl.ts
// Description: Entity for ACL rule definitions (sys_security_acl table) with all dictionary fields.
// Created: 2025-07-23T03:00:00+05:30
// Updated: 2025-07-25TXX:XX:XX+05:30

import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { SysUser } from './SysUser';
import { SysSecurityOperation } from './SysSecurityOperation';
import { SysSecurityAttribute } from './SysSecurityAttribute';
import { SysSecurityAclRole } from './SysSecurityAclRole';

@Entity({ tableName: 'sys_security_acl' })
export class SysSecurityAcl {
  /** Primary GUID */
  @PrimaryKey({ type: 'uuid' })
    sys_id: string = v4();

  /** Composite name (table.field.operation) */
  @Property({ type: 'string', length: 255 })
    name!: string;

  /** True if rule is active */
  @Property({ type: 'boolean' })
    active: boolean = true;

  /** If true, admins bypass this ACL */
  @Property({ type: 'boolean' })
    admin_overrides: boolean = true;

  /** Marks rule as “advanced” */
  @Property({ type: 'boolean' })
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
  @Property({ type: 'string', length: 40 })
    decision_type!: string;

  /** Human-readable description */
  @Property({ type: 'text', nullable: true })
    description?: string;

  /** Local vs existing flag */
  @Property({ type: 'string', length: 40 })
    local_or_existing!: string;

  /** Script block to execute */
  @Property({ type: 'text', nullable: true })
    script?: string;

  /** Reference to CRUD operation (create/read/update/delete) */
  @ManyToOne(() => SysSecurityOperation, { nullable: false })
    operation!: SysSecurityOperation;

  /** Reference to a security attribute (optional) */
  @ManyToOne(() => SysSecurityAttribute, { nullable: true })
    security_attribute?: SysSecurityAttribute;

  /** Type of ACL (record/field) */
  @Property({ type: 'string', length: 40 })
    type!: string;

  // Audit fields

  /** When record was created */
  @Property({ type: 'date' })
    sys_created_on: Date = new Date();

  /** Who created it */
  @ManyToOne(() => SysUser, { nullable: true, onDelete: 'set null' })
    sys_created_by?: SysUser;

  /** When record was last updated */
  @Property({ type: 'date', onUpdate: () => new Date() })
    sys_updated_on: Date = new Date();

  /** Who updated it last */
  @Property({ length: 40, nullable: true })
    sys_updated_by?: string;

  /** Modification counter */
  @Property({ type: 'number', default: 0 })
    sys_mod_count: number = 0;

  /** All roles this ACL applies to */
  @OneToMany(() => SysSecurityAclRole, (role) => role.acl)
    roles = new Collection<SysSecurityAclRole>(this);
}
