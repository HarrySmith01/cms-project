// src/entities/CmnSchedule.ts
// Description: Represents advanced schedule definitions for documents or jobs.
// Created: 2025-07-25TXX:XX:XX+05:30
// Updated: 2025-07-25TXX:XX:XX+05:30

import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'cmn_schedule' })
export class CmnSchedule {
  @PrimaryKey()
  sys_id!: string;

  @Property({ length: 40, nullable: true })
  document?: string;

  @Property({ length: 32, nullable: true })
  document_key?: string;

  @Property({ length: 80 })
  name!: string;

  @Property({ type: 'boolean', default: false })
  read_only: boolean = false;

  @Property({ length: 40, nullable: true })
  type?: string;

  // audit fields
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
