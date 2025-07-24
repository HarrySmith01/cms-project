// File: src/entities/SysProperty.ts
// Description: MikroORM entity for the sys_properties table, storing runtime configuration properties.
// Created:     2025-07-27T04:00:00+05:30
// Updated:     2025-07-27T04:00:00+05:30

import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { SysUser } from './SysUser';

@AclResource('sys_properties')
@Entity({ tableName: 'sys_properties' })
export class SysProperty extends Packaged(BaseEntity) {
  /** Property name (unique) */
  @Property({ length: 100, unique: true })
  name!: string;

  /** Value of the property */
  @Property({ length: 800, nullable: true })
  value?: string;

  /** Human-readable description */
  @Property({ length: 512, nullable: true })
  description?: string;

  /** Dropdown choices, if this is a choice list */
  @Property({ length: 512, nullable: true })
  choices?: string;

  /** Value suffix, e.g. units */
  @Property({ length: 100, nullable: true })
  suffix?: string;

  /** Property type (string/integer/boolean/etc.) */
  @Property({ length: 40, default: 'string' })
  type: string = 'string';

  /** Whether this property is private */
  @Property({ default: false })
  is_private: boolean = false;

  /** Skip caching this property */
  @Property({ default: false })
  ignore_cache: boolean = false;

  /** Roles allowed to read this property */
  @Property({ length: 255, nullable: true })
  read_roles?: string;

  /** Roles allowed to write this property */
  @Property({ length: 255, nullable: true })
  write_roles?: string;

  /** Who created this record */
  @ManyToOne(() => SysUser)
  sys_created_by!: SysUser;

  /** Who last updated this record */
  @ManyToOne(() => SysUser, { nullable: true })
  sys_updated_by?: SysUser;
}
