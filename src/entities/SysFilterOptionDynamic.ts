// src/entities/SysFilterOptionDynamic.ts
// Description: MikroORM entity for the sys_filter_option_dynamic table, including all sys_metadata fields via inheritance
// Created: 2025-07-22 22:40:00
// Updated: 2025-07-22 22:40:00

import { Entity, Property, PrimaryKey } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { SysMetadata } from './SysMetadata';

@Entity({ tableName: 'sys_filter_option_dynamic' })
export class SysFilterOptionDynamic extends SysMetadata {
  /** Primary record identifier */
  @PrimaryKey({ type: 'uuid' })
  sys_id: string = v4();

  @Property({ type: 'boolean', default: false })
  active!: boolean;

  @Property({ type: 'boolean', default: false })
  available_for_default!: boolean;

  @Property({ type: 'boolean', default: false })
  available_for_filter!: boolean;

  @Property({ type: 'boolean', default: false })
  available_for_ref_qual!: boolean;

  @Property({ type: 'string', length: 32, nullable: true })
  field_type?: string;

  @Property({ type: 'string', length: 40 })
  label!: string;

  @Property({ type: 'number', default: 0 })
  order!: number;

  @Property({ type: 'string', length: 32, nullable: true })
  script_reference_id?: string;

  @Property({ type: 'string', length: 80, nullable: true })
  script_reference_table?: string;

  @Property({ type: 'string', length: 80 })
  table!: string;

  @Property({ type: 'string', length: 255, nullable: true })
  roles?: string;

  @Property({ type: 'string', length: 32, nullable: true })
  filter_by_schedule?: string;

  @Property({ type: 'string', length: 255, nullable: true })
  script?: string;

  @Property({ type: 'string', length: 80, nullable: true })
  table_containing_filter?: string;
}
