// src/entities/BusinessCalendar.ts
// Description: Defines named business calendars, their types, labels, hierarchy, and time zone.
// Created: 2025-07-25TXX:XX:XX+05:30
// Updated: 2025-07-25TXX:XX:XX+05:30

import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';

@Entity({ tableName: 'business_calendar' })
export class BusinessCalendar {
  @PrimaryKey()
  sys_id!: string;

  @Property({ length: 40, nullable: true })
  cal_type?: string;

  @Property({ length: 1000, nullable: true })
  description?: string;

  @Property({ length: 32, nullable: true })
  sys_domain?: string;

  @Property({ length: 255, nullable: true })
  sys_domain_path?: string;

  @Property({ type: 'boolean', default: false })
  is_legacy_schedule: boolean = false;

  @Property({ length: 80 })
  label!: string;

  @Property({ length: 80, nullable: true })
  calendar_name?: string;

  @ManyToOne(() => BusinessCalendar, { nullable: true })
  parent?: BusinessCalendar;

  @Property({ length: 80, nullable: true })
  plural_label?: string;

  @Property({ length: 40, nullable: true })
  time_zone?: string;

  // audit fields (manually included instead of via BaseEntity)
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
