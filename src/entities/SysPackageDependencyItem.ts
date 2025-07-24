// File: src/entities/SysPackageDependencyItem.ts
// Description: MikroORM entity for the sys_package_dependency_item table, storing individual dependency items.
// Created:     2025-07-27T03:25:00+05:30
// Updated:     2025-07-27T03:25:00+05:30

import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { SysPackageDependencyM2M } from './SysPackageDependencyM2M';

@AclResource('sys_package_dependency_item')
@Entity({ tableName: 'sys_package_dependency_item' })
export class SysPackageDependencyItem extends Packaged(BaseEntity) {
  /** Reference to the parent package dependency M2M record */
  @ManyToOne(() => SysPackageDependencyM2M)
  package_dependency!: SysPackageDependencyM2M;

  /** Document ID or other item detail reference */
  @Property({ length: 32 })
  document_id!: string;

  /** Name of the item’s table */
  @Property({ length: 80 })
  table_name!: string;
}
