// src/entities/TimeSheetPolicy.ts
// Description: Defines rules and defaults for time sheet behavior and validation.
// Created: 2025-02-11T09:55:45+00:00
// Updated: 2025-02-11T09:55:47+00:00

import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { RateType } from './RateType';
import { SysUserGroup } from './SysUserGroup';

@Entity({ tableName: 'time_sheet_policy' })
export class TimeSheetPolicy {
  @PrimaryKey()
  sys_id!: string;

  @Property({ type: 'boolean', default: false })
  allow_blank_time_cards: boolean = false;

  @Property({ type: 'boolean', default: false })
  allow_multiple_rate_types: boolean = false;

  @Property({ type: 'boolean', default: true })
  allow_recall: boolean = true;

  @Property({ type: 'boolean', default: false })
  auto_create_on_task_update: boolean = false;

  @Property({ type: 'boolean', default: true })
  auto_generate_time_cards: boolean = true;

  @Property({ type: 'boolean', default: false })
  auto_fill_from_time_worked: boolean = false;

  @Property({ type: 'boolean', default: false })
  is_default: boolean = false;

  @ManyToOne(() => RateType, { nullable: true })
  default_rate_type?: RateType;

  @ManyToOne(() => SysUserGroup, { nullable: true })
  sys_domain?: SysUserGroup;

  @Property({ type: 'number', nullable: true })
  max_hours_per_day?: number;

  @Property({ type: 'number', nullable: true })
  max_hours_per_week?: number;

  @Property({ length: 40 })
  name!: string;

  @Property({ length: 40, nullable: true })
  non_project_time_approver?: string;

  @ManyToOne(() => TimeSheetPolicy, { nullable: true })
  sys_overrides?: TimeSheetPolicy;

  @Property({ length: 40, nullable: true })
  project_time_approver?: string;

  @Property({ type: 'number', nullable: true })
  recall_period_allowed?: number;

  @Property({ type: 'boolean', default: false })
  update_resource_plan: boolean = false;

  @Property({ type: 'number', nullable: true })
  week_starts_on?: number;

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
