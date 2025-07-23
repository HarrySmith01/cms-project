// src/entities/CmnDepartment.ts
// Description: Represents departments within a company for org structure & HR references.
// Created:   2025-07-25TXX:XX:XX+05:30
// Updated:   2025-07-25TXX:XX:XX+05:30

import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { CoreCompany } from './CoreCompany';
import { CmnCostCenter } from './CmnCostCenter';
import { SysUser } from './SysUser';
import { SnHrIntegrationsSource } from './SnHrIntegrationsSource';

@Entity({ tableName: 'cmn_department' })
export class CmnDepartment {
  @PrimaryKey()
  sys_id!: string;

  @Property({ length: 100 })
  name!: string;

  @Property({ length: 40, nullable: true })
  id?: string;

  @Property({ length: 40, nullable: true })
  code?: string;

  @Property({ length: 1000, nullable: true })
  description?: string;

  @Property({ length: 100, nullable: true })
  correlation_id?: string;

  // let Mikro infer an INTEGER
  @Property({ type: 'integer', nullable: true })
  head_count?: number;

  @ManyToOne(() => CoreCompany, { nullable: true })
  company?: CoreCompany;

  @ManyToOne(() => CmnCostCenter, { nullable: true })
  cost_center?: CmnCostCenter;

  @ManyToOne(() => SysUser, { nullable: true })
  dept_head?: SysUser;

  @ManyToOne(() => SysUser, { nullable: true })
  primary_contact?: SysUser;

  @ManyToOne(() => CmnDepartment, { nullable: true })
  parent?: CmnDepartment;

  @ManyToOne(() => SnHrIntegrationsSource, { nullable: true })
  source?: SnHrIntegrationsSource;

  @Property({ type: 'datetime', nullable: true })
  sys_created_on?: Date;

  @Property({ length: 40, nullable: true })
  sys_created_by?: string;

  @Property({ type: 'datetime', nullable: true })
  sys_updated_on?: Date;

  @Property({ length: 40, nullable: true })
  sys_updated_by?: string;

  // also an INTEGER
  @Property({ type: 'integer', nullable: true })
  sys_mod_count?: number;
}
