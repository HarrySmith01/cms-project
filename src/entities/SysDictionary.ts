// src/entities/SysDictionary.ts
// Description: MikroORM entity for the sys_dictionary table, mapping each column as provided
// Created: 2025-07-22 22:00:00
// Updated: 2025-07-22 23:00:00

import { Entity, Property, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { SysUser } from './SysUser';
import { SysDbObject } from './SysDbObject';
import { SysFilterOptionDynamic } from './SysFilterOptionDynamic';
import { SysGlideObject } from './SysGlideObject';

@Entity({ tableName: 'sys_dictionary' })
export class SysDictionary {
  /** Primary Key */
  @PrimaryKey({ type: 'uuid' })
  sys_id: string = v4();

  /** Column label */
  @Property({ type: 'string', length: 80 })
  column_label!: string;

  /** Column name */
  @Property({ type: 'string', length: 80 })
  element!: string;

  @Property({ type: 'boolean', default: false })
  active!: boolean;

  @Property({ type: 'boolean', default: false })
  array!: boolean;

  @Property({ type: 'boolean', default: false })
  array_denormalized!: boolean;

  @Property({ type: 'string', length: 1000, nullable: true })
  attributes?: string;

  @Property({ type: 'boolean', default: false })
  audit!: boolean;

  /** Calculated flag */
  @Property({ type: 'boolean', default: false })
  virtual!: boolean;

  @Property({ type: 'string', length: 8000, nullable: true })
  calculation?: string;

  @Property({ type: 'string', length: 40 })
  virtual_type!: string;

  @Property({ type: 'number', default: 0 })
  choice!: number;

  @Property({ type: 'string', length: 80, nullable: true })
  choice_field?: string;

  @Property({ type: 'string', length: 80, nullable: true })
  choice_table?: string;

  @Property({ type: 'boolean', default: false })
  display!: boolean;

  @Property({ type: 'boolean', default: false })
  dynamic_creation!: boolean;

  @Property({ type: 'string', length: 800, nullable: true })
  dynamic_creation_script?: string;

  // Reference to Dynamic Filter Options
  @ManyToOne(() => SysFilterOptionDynamic, { nullable: true })
  dynamic_default_value?: SysFilterOptionDynamic;

  @ManyToOne(() => SysFilterOptionDynamic, { nullable: true })
  dynamic_ref_qual?: SysFilterOptionDynamic;

  @Property({ type: 'boolean', default: false })
  element_reference!: boolean;

  @Property({ type: 'string', length: 40, nullable: true })
  foreign_database?: string;

  @Property({ type: 'string', length: 800, nullable: true })
  formula?: string;

  @Property({ type: 'string', length: 800, nullable: true })
  function_definition?: string;

  @Property({ type: 'boolean', default: false })
  function_field!: boolean;

  @Property({ type: 'boolean', default: false })
  mandatory!: boolean;

  @Property({ type: 'number', nullable: true })
  max_length?: number;

  @Property({ type: 'string', length: 80, nullable: true })
  next_element?: string;

  @Property({ type: 'boolean', default: false })
  primary!: boolean;

  @Property({ type: 'boolean', default: false })
  read_only!: boolean;

  @Property({ type: 'string', length: 255, nullable: true })
  read_roles?: string;

  // Reference to table definition
  @ManyToOne(() => SysDbObject)
  reference?: SysDbObject;

  @Property({ type: 'string', length: 20, nullable: true })
  reference_cascade_rule?: string;

  @Property({ type: 'boolean', default: false })
  reference_floats!: boolean;

  @Property({ type: 'string', length: 40, nullable: true })
  reference_key?: string;

  @Property({ type: 'string', length: 1000, nullable: true })
  reference_qual?: string;

  @Property({ type: 'string', length: 1000, nullable: true })
  reference_qual_condition?: string;

  @Property({ type: 'string', length: 10, nullable: true })
  reference_type?: string;

  @Property({ type: 'number', default: 0 })
  sizeclass!: number;

  @Property({ type: 'boolean', default: false })
  spell_check!: boolean;

  @Property({ type: 'boolean', default: false })
  staged!: boolean;

  @Property({ type: 'string', length: 80 })
  name!: string;

  @Property({ type: 'boolean', default: false })
  table_reference!: boolean;

  @Property({ type: 'boolean', default: false })
  text_index!: boolean;

  /** Reference to field class definition */
  @ManyToOne(() => SysGlideObject)
  internal_type!: SysGlideObject;

  @Property({ type: 'boolean', default: false })
  unique!: boolean;

  @Property({ type: 'boolean', default: false })
  use_dependent_field!: boolean;

  @Property({ type: 'boolean', default: false })
  use_dynamic_default!: boolean;

  @Property({ type: 'string', length: 40, nullable: true })
  use_reference_qualifier?: string;

  @Property({ type: 'string', length: 40, nullable: true })
  widget?: string;

  @Property({ type: 'string', length: 255, nullable: true })
  write_roles?: string;

  @Property({ type: 'boolean', default: false })
  xml_view!: boolean;

  // audit fields
  @Property({ onCreate: () => new Date() })
  sys_created_on: Date = new Date();

  @ManyToOne(() => SysUser)
  sys_created_by!: SysUser;

  @Property({ onUpdate: () => new Date(), nullable: true })
  sys_updated_on?: Date;

  @Property()
  sys_updated_by!: string;
}
