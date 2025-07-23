// File: src/entities/SysUser.ts
// Description: Entity for user accounts and credentials (sys_user table).
// Created: 2025-07-23T05:15:00+05:30
// Updated: 2025-07-25TXX:XX:XX+05:30

import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { SysUserGrmember } from './SysUserGrmember';
import { SysUserHasRole } from './SysUserHasRole';
import { CmnBuilding } from './CmnBuilding';
import { CoreCompany } from './CoreCompany';
import { CmnCostCenter } from './CmnCostCenter';
import { CmnDepartment } from './CmnDepartment';
import { SnHrIntegrationsSource } from './SnHrIntegrationsSource';
import { LdapServerConfig } from './LdapServerConfig';
import { CmnLocation } from './CmnLocation';
import { SysPerspective } from './SysPerspective';
import { CmnSchedule } from './CmnSchedule';
import { TimeSheetPolicy } from './TimeSheetPolicy';
import { SysUserGroup } from './SysUserGroup';

@Entity({ tableName: 'sys_user' })
export class SysUser {
  @PrimaryKey({ type: 'uuid' })
    sys_id: string = v4();

  @Property({ length: 80, unique: true })
    user_name!: string;

  @Property({ length: 50, nullable: true }) prefix?: string;

  @Property({ length: 50, nullable: true }) first_name?: string;

  @Property({ length: 50, nullable: true }) middle_name?: string;

  @Property({ length: 50, nullable: true }) last_name?: string;

  @Property({ length: 100, nullable: true, unique: true }) email?: string;

  @Property({ length: 100, nullable: true }) employee_number?: string;

  @Property() active: boolean = true;

  @Property({ length: 255, nullable: true }) password?: string;

  @Property() password_needs_reset: boolean = false;

  @Property({ length: 100, nullable: true }) correlation_id?: string;

  @Property({ length: 3, nullable: true }) country?: string;

  @Property({ length: 40, nullable: true }) city?: string;

  @Property({ length: 255, nullable: true }) street?: string;

  @Property({ length: 40, nullable: true }) state?: string;

  @Property({ length: 40, nullable: true }) zip?: string;

  @Property({ length: 20, nullable: true }) phone?: string;

  @Property({ length: 20, nullable: true }) mobile_phone?: string;

  @Property({ length: 20, nullable: true }) home_phone?: string;

  @Property({ length: 20, nullable: true }) fax?: string;

  @Property() locked_out: boolean = false;

  @Property() vip: boolean = false;

  @Property() web_service_access_only: boolean = false;

  // — foreign keys —

  @ManyToOne(() => CmnBuilding, { nullable: true }) building?: CmnBuilding;

  @ManyToOne(() => CoreCompany, { nullable: true }) company?: CoreCompany;

  @ManyToOne(() => CmnCostCenter, { nullable: true })
    cost_center?: CmnCostCenter;

  @ManyToOne(() => CmnDepartment, { nullable: true })
    department?: CmnDepartment;

  @ManyToOne(() => SnHrIntegrationsSource, { nullable: true })
    hr_integration_source?: SnHrIntegrationsSource;

  @ManyToOne(() => LdapServerConfig, { nullable: true })
    ldap_server?: LdapServerConfig;

  @ManyToOne(() => CmnLocation, { nullable: true }) location?: CmnLocation;

  @ManyToOne(() => SysPerspective, { nullable: true })
    default_perspective?: SysPerspective;

  @ManyToOne(() => CmnSchedule, { nullable: true }) schedule?: CmnSchedule;

  @ManyToOne(() => TimeSheetPolicy, { nullable: true })
    time_sheet_policy?: TimeSheetPolicy;

  @ManyToOne(() => SysUserGroup, { nullable: true }) sys_domain?: SysUserGroup;

  @Property({ length: 255, nullable: true }) sys_domain_path?: string;

  @Property({ nullable: true }) last_login_time?: Date;

  @Property({ nullable: true }) last_login?: Date;

  @Property({ length: 151, nullable: true }) name?: string; // display name

  // — audit —

  @Property() sys_created_on: Date = new Date();

  @Property({ length: 40, nullable: true }) sys_created_by?: string;

  @Property({ onUpdate: () => new Date() }) sys_updated_on: Date = new Date();

  @Property({ length: 40, nullable: true }) sys_updated_by?: string;

  @Property({ default: 0 }) sys_mod_count: number = 0;

  // — relations —

  /** direct group memberships (sys_user_grmember) */
  @OneToMany(() => SysUserGrmember, (grm) => grm.user)
    groups = new Collection<SysUserGrmember>(this);

  /** direct user–role assignments (sys_user_has_role) */
  @OneToMany(() => SysUserHasRole, (ur) => ur.user)
    userRoles = new Collection<SysUserHasRole>(this);

  // ← **no** groupRoles here, since sys_user has no mappedBy back-reference to sys_group_has_role
}
