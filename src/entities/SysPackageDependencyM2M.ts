// File: src/entities/SysPackageDependencyM2M.ts
// Description: MikroORM entity for the sys_package_dependency_m2m table, linking packages to their dependencies.
// Created:     2025-07-27T03:35:00+05:30
// Updated:     2025-07-27T03:35:00+05:30

import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { SysPackage } from './SysPackage';

@AclResource('sys_package_dependency_m2m')
@Entity({ tableName: 'sys_package_dependency_m2m' })
export class SysPackageDependencyM2M extends Packaged(BaseEntity as any) {
  /** Parent package */
  @ManyToOne(() => SysPackage)
  sys_package!: SysPackage;

  /** Dependent package */
  @ManyToOne(() => SysPackage)
  dependency!: SysPackage;

  /** Minimum version required */
  @Property({ length: 40, nullable: true })
  min_version?: string;
}
