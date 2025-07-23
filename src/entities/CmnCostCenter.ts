// File: src/entities/CmnCostCenter.ts
// Description: Represents cost centers used for financial or organizational segmentation.
// Created: 2025-07-25T00:00:00+05:30
// Updated: 2025-07-23T19:45:00+05:30

import {
  Entity, PrimaryKey, Property, ManyToOne,
} from '@mikro-orm/core';
import { SysUser } from './SysUser';
import { CmnLocation } from './CmnLocation';
import { SysUserGroup } from './SysUserGroup';

@Entity({ tableName: 'cmn_cost_center' })
export class CmnCostCenter {
  /** Primary key */
  @PrimaryKey()
    sys_id!: string;

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

  /** Created-by user sys_id */
  @Property({ length: 40, nullable: true })
    sys_created_by?: string;

  /** Created-on timestamp */
  @Property({ type: 'datetime', nullable: true })
    sys_created_on?: Date;

  /** Updated-by user sys_id */
  @Property({ length: 40, nullable: true })
    sys_updated_by?: string;

  /** Updated-on timestamp */
  @Property({ type: 'datetime', nullable: true })
    sys_updated_on?: Date;

  /** Modification count */
  @Property({ type: 'number', nullable: true })
    sys_mod_count?: number;
}
