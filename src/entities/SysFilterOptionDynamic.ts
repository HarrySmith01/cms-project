// File: src/entities/SysFilterOptionDynamic.ts
// Description: Entity for sys_filter_option_dynamic, storing dynamic filter options for fields.
// Created:     2025-07-27T02:15:00+05:30
// Updated:     2025-07-27T02:15:00+05:30

import { Entity, Property } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';

@AclResource('sys_filter_option_dynamic')
@Entity({ tableName: 'sys_filter_option_dynamic' })
export class SysFilterOptionDynamic extends Packaged(BaseEntity as any) {
  /** Available flag */
  @Property({ default: false })
  available_for_default!: boolean;

  /** Available as filter */
  @Property({ default: false })
  available_for_filter!: boolean;

  /** Available for reference qualifier */
  @Property({ default: false })
  available_for_ref_qual!: boolean;

  /** Field type (optional) */
  @Property({ length: 32, nullable: true })
  field_type?: string;

  /** Display label */
  @Property({ length: 40 })
  label!: string;

  /** Order in sequence */
  @Property({ default: 0 })
  order!: number;

  /** Script reference ID (optional) */
  @Property({ length: 32, nullable: true })
  script_reference_id?: string;

  /** Script reference table (optional) */
  @Property({ length: 80, nullable: true })
  script_reference_table?: string;

  /** Table to which this filter applies */
  @Property({ length: 80 })
  table!: string;

  /** Roles allowed (comma-separated, optional) */
  @Property({ length: 255, nullable: true })
  roles?: string;

  /** Schedule filter reference (optional) */
  @Property({ length: 32, nullable: true })
  filter_by_schedule?: string;

  /** Inline script (optional) */
  @Property({ length: 255, nullable: true })
  script?: string;

  /** Table containing filter (optional) */
  @Property({ length: 80, nullable: true })
  table_containing_filter?: string;
}
