// File: src/entities/TimeSheetPolicy.ts
// Description: Defines rules and defaults for time sheet behavior and validation.
// Created:     2025-07-27T06:55:00+05:30
// Updated:     2025-07-27T06:55:00+05:30

import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { RateType } from './RateType';
import { SysUserGroup } from './SysUserGroup';

@AclResource('time_sheet_policy')
@Entity({ tableName: 'time_sheet_policy' })
export class TimeSheetPolicy extends Packaged(BaseEntity as any) {
  @Property({ default: false })
  allow_blank_time_cards: boolean = false;

  @Property({ default: false })
  allow_multiple_rate_types: boolean = false;

  @Property({ default: true })
  allow_recall: boolean = true;

  @Property({ default: false })
  auto_create_on_task_update: boolean = false;

  @Property({ default: true })
  auto_generate_time_cards: boolean = true;

  @Property({ default: false })
  auto_fill_from_time_worked: boolean = false;

  @Property({ default: false })
  is_default: boolean = false;

  @ManyToOne(() => RateType, { nullable: true })
  default_rate_type?: RateType;

  @ManyToOne(() => SysUserGroup, { nullable: true })
  sys_domain?: SysUserGroup;

  @Property({ nullable: true })
  max_hours_per_day?: number;

  @Property({ nullable: true })
  max_hours_per_week?: number;

  @Property({ length: 40 })
  name!: string;

  @Property({ length: 40, nullable: true })
  non_project_time_approver?: string;

  @ManyToOne(() => TimeSheetPolicy, { nullable: true })
  sys_overrides?: TimeSheetPolicy;

  @Property({ length: 40, nullable: true })
  project_time_approver?: string;

  @Property({ nullable: true })
  recall_period_allowed?: number;

  @Property({ default: false })
  update_resource_plan: boolean = false;

  @Property({ nullable: true })
  week_starts_on?: number;
}
