/* eslint-disable import/prefer-default-export, object-curly-newline */
/**
 * File: src/entities/SysPackage.ts
 * Description: The “package” or application container for all app files.
 * Created: 2025-07-23T17:30:00+05:30
 * Updated: 2025-07-23T17:30:00+05:30
 */
import { Entity, Property, PrimaryKey, Index } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';

@Entity({ tableName: 'sys_package' })
export class SysPackage {
  /** Primary key (UUID) */
  @PrimaryKey({ type: 'uuid' })
  @Index()
  sys_id: string = uuid();

  /** Collection record marker (always the same) */
  @Property({ default: false })
  collection: boolean = false;

  /** Active flag */
  @Property({ default: true })
  active: boolean = true;

  /** System class name (always “sys_package”) */
  @Property({ nullable: false })
  sys_class_name: string = 'sys_package';

  /** When this package was created */
  @Property()
  sys_created_on: Date = new Date();

  /** Who created this package */
  @Property()
  sys_created_by!: string;

  /** Source ID (falls back to sys_id if blank) */
  @Property({ nullable: true })
  source?: string;

  /** IDE-created flag */
  @Property({ default: false })
  ide_created: boolean = false;

  /** Whether this package is licensable */
  @Property({ default: false })
  licensable: boolean = false;

  /** Human-readable name */
  @Property({ length: 100 })
  name!: string;

  /** Path to package.json (if an ES module) */
  @Property({ nullable: true, length: 255 })
  package_json?: string;

  /** Subscription category */
  @Property({ nullable: true, length: 40 })
  license_category?: string;

  /** Subscription model */
  @Property({ nullable: true, length: 40 })
  license_model?: string;

  /** Enforcement level */
  @Property({ nullable: true, length: 40 })
  enforce_license?: string;

  /** Trackable flag */
  @Property({ default: false })
  trackable: boolean = false;

  /** When this package was last updated */
  @Property({ onUpdate: () => new Date() })
  sys_updated_on: Date = new Date();

  /** Who last updated it */
  @Property()
  sys_updated_by!: string;

  /** Number of times it’s been modified */
  @Property({ default: 0 })
  sys_mod_count: number = 0;

  /** Version string */
  @Property({ nullable: true, length: 40 })
  version?: string;
}
