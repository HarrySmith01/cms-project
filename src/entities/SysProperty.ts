/* eslint-disable import/prefer-default-export, object-curly-newline */
/**
 * File: src/entities/SysProperty.ts
 * Description: MikroORM entity for the sys_properties table, storing runtime configuration properties.
 * Created: 2025-07-24T15:30:00+05:30
 * Updated: 2025-07-24T15:30:00+05:30
 */

import {
  Entity,
  Property,
  PrimaryKey,
  ManyToOne,
  Index,
} from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { SysUser } from './SysUser';

@Entity({ tableName: 'sys_properties' })
export class SysProperty {
  /** Primary key (UUID) */
  @PrimaryKey({ type: 'uuid' })
  @Index()
  sys_id: string = uuid();

  /** Property name (unique) */
  @Property({ length: 100, unique: true })
  name!: string;

  /** Value of the property */
  @Property({ type: 'string', length: 4000, nullable: true })
  value?: string;

  /** Human-readable description */
  @Property({ type: 'string', length: 512, nullable: true })
  description?: string;

  /** Dropdown choices, if this is a choice list */
  @Property({ type: 'string', length: 512, nullable: true })
  choices?: string;

  /** Value suffix, e.g. units */
  @Property({ type: 'string', length: 100, nullable: true })
  suffix?: string;

  /** Property type (string/integer/boolean/etc.) */
  @Property({ type: 'string', length: 40, default: 'string' })
  type: string = 'string';

  /** Whether this property is private */
  @Property({ default: false })
  is_private: boolean = false;

  /** Skip caching this property */
  @Property({ default: false })
  ignore_cache: boolean = false;

  /** Roles allowed to read this property */
  @Property({ type: 'string', length: 255, nullable: true })
  read_roles?: string;

  /** Roles allowed to write this property */
  @Property({ type: 'string', length: 255, nullable: true })
  write_roles?: string;

  // audit fields

  /** When this record was created */
  @Property({ onCreate: () => new Date() })
  sys_created_on: Date = new Date();

  /** Who created this record */
  @ManyToOne(() => SysUser)
  sys_created_by!: SysUser;

  /** When this record was last updated */
  @Property({ onUpdate: () => new Date(), nullable: true })
  sys_updated_on?: Date;

  /** Who last updated this record */
  @ManyToOne(() => SysUser, { nullable: true })
  sys_updated_by?: SysUser;

  /** Modification count */
  @Property({ default: 0 })
  sys_mod_count: number = 0;
}
