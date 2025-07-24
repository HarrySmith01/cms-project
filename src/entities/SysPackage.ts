// File: src/entities/SysPackage.ts
// Description: The “package” or application container for all app files.
// Created:     2025-07-27T03:10:00+05:30
// Updated:     2025-07-27T03:10:00+05:30

import { Entity, Property, Index } from '@mikro-orm/core';
import { BaseEntity, AclResource } from './BaseEntity';

@AclResource('sys_package')
@Entity({ tableName: 'sys_package' })
export class SysPackage extends BaseEntity {
  /** Marker for collection records (always false) */
  @Property({ default: false })
  collection: boolean = false;

  /** Active flag (inherited default true) */

  /** System class name override (always “sys_package”) */
  @Property({ nullable: false })
  sys_class_name: string = 'sys_package';

  /** Source ID (falls back to sys_id if blank) */
  @Property({ length: 255, nullable: true })
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
  @Property({ length: 255, nullable: true })
  package_json?: string;

  /** Subscription category */
  @Property({ length: 40, nullable: true })
  license_category?: string;

  /** Subscription model */
  @Property({ length: 40, nullable: true })
  license_model?: string;

  /** Enforcement level */
  @Property({ length: 40, nullable: true })
  enforce_license?: string;

  /** Trackable flag */
  @Property({ default: false })
  trackable: boolean = false;

  /** Version string */
  @Property({ length: 40, nullable: true })
  version?: string;
}
