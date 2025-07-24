// File: src/entities/CmnLocation.ts
// Description: Represents physical or organizational locations within the system.
// Created:     2025-07-26T23:10:00+05:30
// Updated:     2025-07-26T23:10:00+05:30

import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { CoreCompany } from './CoreCompany';
import { SysUser } from './SysUser';
import { SnHrIntegrationsSource } from './SnHrIntegrationsSource';
import { SysUserGroup } from './SysUserGroup';

@AclResource('cmn_location')
@Entity({ tableName: 'cmn_location' })
export class CmnLocation extends Packaged(BaseEntity) {
  /** Location name */
  @Property({ length: 100 })
  name!: string;

  /** City name (optional) */
  @Property({ length: 40, nullable: true })
  city?: string;

  /** Associated company */
  @ManyToOne(() => CoreCompany, { nullable: true })
  company?: CoreCompany;

  /** Contact person for this location */
  @ManyToOne(() => SysUser, { nullable: true })
  contact?: SysUser;

  /** Timestamp when coordinates were last retrieved */
  @Property({ type: 'datetime', nullable: true })
  coordinates_retrieved_on?: Date;

  /** Correlation identifier (optional) */
  @Property({ length: 100, nullable: true })
  correlation_id?: string;

  /** Country name (optional) */
  @Property({ length: 40, nullable: true })
  country?: string;

  /** Flag indicating duplicate record */
  @Property({ type: 'boolean', default: false })
  duplicate: boolean = false;

  /** External system ID */
  @Property({ length: 40, nullable: true })
  sn_tmt_core_external_id?: string;

  /** Fax phone number (optional) */
  @Property({ length: 40, nullable: true })
  fax_phone?: string;

  /** Full descriptive name */
  @Property({ length: 255, nullable: true })
  full_name?: string;

  /** Error retrieving lat/long */
  @Property({ length: 1000, nullable: true })
  lat_long_error?: string;

  /** Latitude coordinate */
  @Property({ type: 'number', nullable: true })
  latitude?: number;

  /** Longitude coordinate */
  @Property({ type: 'number', nullable: true })
  longitude?: number;

  /** Source system for this record */
  @ManyToOne(() => SnHrIntegrationsSource, { nullable: true })
  source?: SnHrIntegrationsSource;

  /** Location source type */
  @Property({ length: 40, nullable: true })
  cmn_location_source?: string;

  /** Location type */
  @Property({ length: 40, nullable: true })
  cmn_location_type?: string;

  /** Managing user group */
  @ManyToOne(() => SysUserGroup, { nullable: true })
  managed_by_group?: SysUserGroup;

  /** Parent location for hierarchy */
  @ManyToOne(() => CmnLocation, { nullable: true })
  parent?: CmnLocation;

  /** Contact phone number (optional) */
  @Property({ length: 40, nullable: true })
  phone?: string;

  /** Primary location flag */
  @Property({ type: 'boolean', default: false })
  primary: boolean = false;

  /** Reference to another primary location */
  @ManyToOne(() => CmnLocation, { nullable: true })
  primary_location?: CmnLocation;

  /** State or province (optional) */
  @Property({ length: 40, nullable: true })
  state?: string;

  /** Stock room flag */
  @Property({ type: 'boolean', default: false })
  stock_room: boolean = false;

  /** Street address (optional) */
  @Property({ length: 255, nullable: true })
  street?: string;

  /** Time zone identifier */
  @Property({ length: 40, nullable: true })
  time_zone?: string;
}
