/* eslint-disable import/prefer-default-export, object-curly-newline */
/**
 * File: src/entities/SysPackageDependencyM2M.ts
 * Description: MikroORM entity for the sys_package_dependency_m2m table, linking packages to their dependencies.
 * Created: 2025-07-24T16:30:00+05:30
 * Updated: 2025-07-24T16:30:00+05:30
 */

import {
  Entity,
  Property,
  PrimaryKey,
  ManyToOne,
  Index,
} from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { SysPackage } from './SysPackage';

@Entity({ tableName: 'sys_package_dependency_m2m' })
export class SysPackageDependencyM2M {
  /** Primary key (UUID) */
  @PrimaryKey({ type: 'uuid' })
  @Index()
    sys_id: string = uuid();

  /** Parent package */
  @ManyToOne(() => SysPackage)
    sys_package!: SysPackage;

  /** Dependent package */
  @ManyToOne(() => SysPackage)
    dependency!: SysPackage;

  /** Minimum version required */
  @Property({ length: 40, nullable: true })
    min_version?: string;

  // audit fields

  /** When this record was created */
  @Property()
    sys_created_on: Date = new Date();

  /** Who created this record (user sys_id) */
  @Property({ length: 40 })
    sys_created_by!: string;

  /** When this record was last updated */
  @Property({ onUpdate: () => new Date(), nullable: true })
    sys_updated_on?: Date;

  /** Who last updated this record (user sys_id) */
  @Property({ length: 40, nullable: true })
    sys_updated_by?: string;

  /** Modification count */
  @Property({ default: 0 })
    sys_mod_count: number = 0;
}
