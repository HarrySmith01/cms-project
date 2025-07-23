// File: src/entities/SysSecurityAttribute.ts
// Description: Entity for security attributes (sys_security_attribute table).
// Created: 2025-07-23T07:45:00+05:30
// Updated: 2025-07-23T07:45:00+05:30

import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ tableName: 'sys_security_attribute' })
export class SysSecurityAttribute {
  @PrimaryKey({ type: 'uuid' })
    sys_id: string = v4();

  /** Unique attribute name */
  @Property({ type: 'string', length: 80, unique: true })
    name!: string;

  /** Display label */
  @Property({ type: 'string', length: 80 })
    label!: string;

  /** True if attribute is active */
  @Property({ type: 'boolean' })
    active: boolean = true;

  /** Human-readable description */
  @Property({ type: 'string', length: 255, nullable: true })
    description?: string;

  /** Condition expression (JSON or DSL) */
  @Property({ type: 'text', nullable: true })
    condition?: string;

  /** Attribute script block */
  @Property({ type: 'text', nullable: true })
    script?: string;

  /** Lookup table name (if any) */
  @Property({ type: 'string', length: 80, nullable: true })
    lookup_table?: string;

  /** Lookup table column name */
  @Property({ type: 'string', length: 80, nullable: true })
    lookup_table_column?: string;

  /** Attribute type (e.g. “string”, “number”) */
  @Property({ type: 'string', length: 40 })
    type!: string;

  /** True if this attribute is dynamic (computed at runtime) */
  @Property({ type: 'boolean' })
    is_dynamic: boolean = true;

  /** True if this attribute supports localization */
  @Property({ type: 'boolean' })
    is_localized: boolean = false;

  /** True if this is a built‐in system attribute */
  @Property({ type: 'boolean' })
    is_system: boolean = false;

  // Audit fields

  /** When the attribute was created */
  @Property({ type: 'date' })
    sys_created_on: Date = new Date();

  /** Who created it */
  @Property({ type: 'string', nullable: true })
    sys_created_by?: string;

  /** When the attribute was last updated */
  @Property({ type: 'date', onUpdate: () => new Date() })
    sys_updated_on: Date = new Date();

  /** Who last updated it */
  @Property({ type: 'string', nullable: true })
    sys_updated_by?: string;

  /** Modification counter */
  @Property({ type: 'number', default: 0 })
    sys_mod_count: number = 0;
}
