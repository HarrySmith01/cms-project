// File: src/entities/CmnLocation.ts
// Description: Represents physical or organizational locations within the system.
// Created: 2025-07-25TXX:XX:XX+05:30
// Updated: 2025-07-25T21:00:00+05:30

import {
  Entity, PrimaryKey, Property, ManyToOne,
} from '@mikro-orm/core';
import { CoreCompany } from './CoreCompany';
import { SysUser } from './SysUser';
import { SnHrIntegrationsSource } from './SnHrIntegrationsSource';
import { SysUserGroup } from './SysUserGroup';

// import { SysPhoneTerritory } from './SysPhoneTerritory';
// import { LifeCycleStage } from './LifeCycleStage';
// import { LifeCycleStageStatus } from './LifeCycleStageStatus';

@Entity({ tableName: 'cmn_location' })
export class CmnLocation {
  @PrimaryKey()
    sys_id!: string;

  @Property({ length: 100 })
    name!: string;

  @Property({ length: 40, nullable: true })
    city?: string;

  @ManyToOne(() => CoreCompany, { nullable: true })
    company?: CoreCompany;

  // @ManyToOne(() => Consumer, { nullable: true })
  // consumer?: Consumer;

  @ManyToOne(() => SysUser, { nullable: true })
    contact?: SysUser;

  @Property({ type: 'datetime', nullable: true })
    coordinates_retrieved_on?: Date;

  @Property({ length: 100, nullable: true })
    correlation_id?: string;

  @Property({ length: 40, nullable: true })
    country?: string;

  @Property({ type: 'boolean', default: false })
    duplicate: boolean = false;

  @Property({ length: 40, nullable: true })
    sn_tmt_core_external_id?: string;

  @Property({ length: 40, nullable: true })
    fax_phone?: string;

  @Property({ length: 255, nullable: true })
    full_name?: string;

  @Property({ length: 1000, nullable: true })
    lat_long_error?: string;

  @Property({ type: 'number', nullable: true })
    latitude?: number;

  @Property({ type: 'number', nullable: true })
    longitude?: number;

  // @ManyToOne(() => LifeCycleStage, { nullable: true })
  // life_cycle_stage?: LifeCycleStage;

  // @ManyToOne(() => LifeCycleStageStatus, { nullable: true })
  // life_cycle_stage_status?: LifeCycleStageStatus;

  @Property({ length: 40, nullable: true })
    cmn_location_source?: string;

  @Property({ length: 40, nullable: true })
    cmn_location_type?: string;

  @ManyToOne(() => SysUserGroup, { nullable: true })
    managed_by_group?: SysUserGroup;

  @ManyToOne(() => CmnLocation, { nullable: true })
    parent?: CmnLocation;

  @Property({ length: 40, nullable: true })
    phone?: string;

  // @ManyToOne(() => SysPhoneTerritory, { nullable: true })
  // phone_territory?: SysPhoneTerritory;

  @Property({ type: 'boolean', default: false })
    primary: boolean = false;

  @ManyToOne(() => CmnLocation, { nullable: true })
    primary_location?: CmnLocation;

  @ManyToOne(() => SnHrIntegrationsSource, { nullable: true })
    source?: SnHrIntegrationsSource;

  @Property({ length: 40, nullable: true })
    state?: string;

  @Property({ type: 'boolean', default: false })
    stock_room: boolean = false;

  @Property({ length: 255, nullable: true })
    street?: string;

  @Property({ length: 40, nullable: true })
    time_zone?: string;

  @Property({ type: 'datetime', nullable: true })
    sys_created_on?: Date;

  @Property({ length: 40, nullable: true })
    sys_created_by?: string;

  @Property({ type: 'datetime', nullable: true })
    sys_updated_on?: Date;

  @Property({ length: 40, nullable: true })
    sys_updated_by?: string;

  @Property({ type: 'number', nullable: true })
    sys_mod_count?: number;
}
