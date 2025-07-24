// File: src/entities/BusinessCalendar.ts
// Description: Defines named business calendars, their types, labels, hierarchy, and time zone.
// Created:     2025-07-26T22:10:00+05:30
// Updated:     2025-07-26T22:10:00+05:30

import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';

@AclResource('business_calendar')
@Entity({ tableName: 'business_calendar' })
export class BusinessCalendar extends Packaged(BaseEntity as any) {
  /** Calendar type (optional) */
  @Property({ length: 40, nullable: true })
  cal_type?: string;

  /** Detailed description */
  @Property({ length: 1000, nullable: true })
  description?: string;

  /** Domain reference (optional) */
  @Property({ length: 32, nullable: true })
  sys_domain?: string;

  /** Domain path (optional) */
  @Property({ length: 255, nullable: true })
  sys_domain_path?: string;

  /** Legacy schedule flag */
  @Property({ type: 'boolean', default: false })
  is_legacy_schedule: boolean = false;

  /** Display label */
  @Property({ length: 80 })
  label!: string;

  /** Internal calendar name */
  @Property({ length: 80, nullable: true })
  calendar_name?: string;

  /** Parent calendar for hierarchy */
  @ManyToOne(() => BusinessCalendar, { nullable: true })
  parent?: BusinessCalendar;

  /** Plural form of the label */
  @Property({ length: 80, nullable: true })
  plural_label?: string;

  /** Time zone identifier */
  @Property({ length: 40, nullable: true })
  time_zone?: string;
}
