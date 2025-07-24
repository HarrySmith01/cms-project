// File: src/entities/CmnDepartment.ts
// Description: Represents departments within a company for org structure & HR references.
// Created:     2025-07-26T22:55:00+05:30
// Updated:     2025-07-26T22:55:00+05:30

import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { CoreCompany } from './CoreCompany';
import { CmnCostCenter } from './CmnCostCenter';
import { SysUser } from './SysUser';
import { SnHrIntegrationsSource } from './SnHrIntegrationsSource';

@AclResource('cmn_department')
@Entity({ tableName: 'cmn_department' })
export class CmnDepartment extends Packaged(BaseEntity as any) {
  /** Department name */
  @Property({ length: 100 })
  name!: string;

  /** External ID (optional) */
  @Property({ length: 40, nullable: true })
  id?: string;

  /** Department code (optional) */
  @Property({ length: 40, nullable: true })
  code?: string;

  /** Detailed description */
  @Property({ length: 1000, nullable: true })
  description?: string;

  /** Correlation identifier (optional) */
  @Property({ length: 100, nullable: true })
  correlation_id?: string;

  /** Head count */
  @Property({ type: 'integer', nullable: true })
  head_count?: number;

  /** Associated company */
  @ManyToOne(() => CoreCompany, { nullable: true })
  company?: CoreCompany;

  /** Cost center reference */
  @ManyToOne(() => CmnCostCenter, { nullable: true })
  cost_center?: CmnCostCenter;

  /** Department head */
  @ManyToOne(() => SysUser, { nullable: true })
  dept_head?: SysUser;

  /** Primary contact user */
  @ManyToOne(() => SysUser, { nullable: true })
  primary_contact?: SysUser;

  /** Parent department */
  @ManyToOne(() => CmnDepartment, { nullable: true })
  parent?: CmnDepartment;

  /** HR integration source */
  @ManyToOne(() => SnHrIntegrationsSource, { nullable: true })
  source?: SnHrIntegrationsSource;
}
