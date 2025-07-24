// File: src/entities/CmnCostCenter.ts
// Description: Represents cost centers used for financial or organizational segmentation.
// Created:     2025-07-26T22:40:00+05:30
// Updated:     2025-07-26T22:40:00+05:30

import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { SysUser } from './SysUser';
import { CmnLocation } from './CmnLocation';
import { SysUserGroup } from './SysUserGroup';

@AclResource('cmn_cost_center')
@Entity({ tableName: 'cmn_cost_center' })
export class CmnCostCenter extends Packaged(BaseEntity) {
  /** Cost center name */
  @Property({ length: 100 })
  name!: string;

  /** Optional code */
  @Property({ length: 40, nullable: true })
  code?: string;

  /** Optional account number */
  @Property({ length: 40, nullable: true })
  account_number?: string;

  /** Manager reference */
  @ManyToOne(() => SysUser, { nullable: true })
  manager?: SysUser;

  /** Location reference */
  @ManyToOne(() => CmnLocation, { nullable: true })
  location?: CmnLocation;

  /** Parent cost center */
  @ManyToOne(() => CmnCostCenter, { nullable: true })
  parent?: CmnCostCenter;

  /** Domain (user group) reference */
  @ManyToOne(() => SysUserGroup, { nullable: true })
  sys_domain?: SysUserGroup;

  /** Domain path */
  @Property({ length: 255, nullable: true })
  sys_domain_path?: string;

  /** Valid-from timestamp */
  @Property({ type: 'datetime', nullable: true })
  valid_from?: Date;

  /** Valid-to timestamp */
  @Property({ type: 'datetime', nullable: true })
  valid_to?: Date;
}
