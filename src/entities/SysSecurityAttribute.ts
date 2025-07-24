// File: src/entities/SysSecurityAttribute.ts
// Description: Entity for security attributes (sys_security_attribute table).
// Created:     2025-07-27T05:15:00+05:30
// Updated:     2025-07-27T05:15:00+05:30

import { Entity, Property } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';

@AclResource('sys_security_attribute')
@Entity({ tableName: 'sys_security_attribute' })
export class SysSecurityAttribute extends Packaged(BaseEntity as any) {
  /** Unique attribute name */
  @Property({ length: 80, unique: true })
  name!: string;

  /** Display label */
  @Property({ length: 80 })
  label!: string;

  /** True if attribute is active */
  @Property()
  active: boolean = true;

  /** Human-readable description */
  @Property({ length: 255, nullable: true })
  description?: string;

  /** Condition expression (JSON or DSL) */
  @Property({ type: 'text', nullable: true })
  condition?: string;

  /** Attribute script block */
  @Property({ type: 'text', nullable: true })
  script?: string;

  /** Lookup table name (if any) */
  @Property({ length: 80, nullable: true })
  lookup_table?: string;

  /** Lookup table column name */
  @Property({ length: 80, nullable: true })
  lookup_table_column?: string;

  /** Attribute type (e.g. “string”, “number”) */
  @Property({ length: 40 })
  type!: string;

  /** True if this attribute is dynamic (computed at runtime) */
  @Property()
  is_dynamic: boolean = true;

  /** True if this attribute supports localization */
  @Property()
  is_localized: boolean = false;

  /** True if this is a built‐in system attribute */
  @Property()
  is_system: boolean = false;
}
