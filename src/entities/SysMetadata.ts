// File: src/entities/SysMetadata.ts
// Description: Stores high-level metadata about tables and columns in the CMS.
// Created:     2025-07-27T02:55:00+05:30
// Updated:     2025-07-27T02:55:00+05:30

import { Entity, Property, ManyToOne, Index } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { SysScope } from './SysScope';
import { SysPackage } from './SysPackage';

@AclResource('sys_metadata')
@Entity({ tableName: 'sys_metadata' })
export class SysMetadata extends Packaged(BaseEntity as any) {
  /** Reference to application scope */
  @ManyToOne(() => SysScope, { nullable: false })
  @Index()
  sys_scope!: SysScope;

  /** Display name for this metadata record */
  @Property()
  sys_name!: string;

  /** Protection policy identifier */
  @Property()
  sys_policy!: string;

  /** Name of the update set this metadata belongs to */
  @Property()
  sys_update_name!: string;

  /** Owning package/application (optional) */
  @ManyToOne(() => SysPackage, { nullable: true })
  @Index()
  sys_package?: SysPackage;
}
