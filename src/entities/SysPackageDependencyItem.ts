/* eslint-disable import/prefer-default-export, object-curly-newline */
/**
 * File: src/entities/SysPackageDependencyItem.ts
 * Description: MikroORM entity for the sys_package_dependency_item table, storing individual dependency items.
 * Created: 2025-07-24T16:45:00+05:30
 * Updated: 2025-07-24T16:45:00+05:30
 */

import {
  Entity,
  Property,
  PrimaryKey,
  ManyToOne,
  Index,
} from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { SysPackageDependencyM2M } from './SysPackageDependencyM2M';

@Entity({ tableName: 'sys_package_dependency_item' })
export class SysPackageDependencyItem {
  /** Primary key (UUID) */
  @PrimaryKey({ type: 'uuid' })
  @Index()
    sys_id: string = uuid();

  /** Reference to the parent package dependency M2M record */
  @ManyToOne(() => SysPackageDependencyM2M)
    package_dependency!: SysPackageDependencyM2M;

  /** Document ID or other item detail reference */
  @Property({ length: 32 })
    document_id!: string;

  /** Name of the item’s table */
  @Property({ length: 80 })
    table_name!: string;

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
