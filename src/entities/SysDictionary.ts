// File: src/entities/SysDictionary.ts
// Description: MikroORM entity for the sys_dictionary table, mapping each column and inheriting audit, ACL, and package/scope.
// Created:     2025-07-27T01:50:00+05:30
// Updated:     2025-07-27T01:50:00+05:30

import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import {
  DictionaryEntity,
  Packaged,
  BaseEntity,
  AclResource,
} from './BaseEntity';
import { SysUser } from './SysUser';
import { SysDbObject } from './SysDbObject';
import { SysFilterOptionDynamic } from './SysFilterOptionDynamic';
import { SysGlideObject } from './SysGlideObject';

@AclResource('sys_dictionary')
@Entity({ tableName: 'sys_dictionary' })
export class SysDictionary extends DictionaryEntity(
  Packaged(BaseEntity as any)
) {
  /** Active flag (inherited from BaseEntity) */
  /** Denormalized array flag */
  @Property({ default: false })
  array: boolean = false;

  @Property({ default: false })
  array_denormalized: boolean = false;

  @Property({ length: 1000, nullable: true })
  attributes?: string;

  @Property({ default: false })
  audit: boolean = false;

  @Property({ default: false })
  virtual: boolean = false;

  @Property({ length: 8000, nullable: true })
  calculation?: string;

  @Property({ length: 40 })
  virtual_type!: string;

  @Property({ default: 0 })
  choice: number = 0;

  @Property({ length: 80, nullable: true })
  choice_field?: string;

  @Property({ length: 80, nullable: true })
  choice_table?: string;

  @Property({ default: false })
  display: boolean = false;

  @Property({ default: false })
  dynamic_creation: boolean = false;

  @Property({ length: 800, nullable: true })
  dynamic_creation_script?: string;

  @ManyToOne(() => SysFilterOptionDynamic, { nullable: true })
  dynamic_default_value?: SysFilterOptionDynamic;

  @ManyToOne(() => SysFilterOptionDynamic, { nullable: true })
  dynamic_ref_qual?: SysFilterOptionDynamic;

  @Property({ default: false })
  element_reference: boolean = false;

  @Property({ length: 40, nullable: true })
  foreign_database?: string;

  @Property({ length: 800, nullable: true })
  formula?: string;

  @Property({ length: 800, nullable: true })
  function_definition?: string;

  @Property({ default: false })
  function_field: boolean = false;

  @Property({ default: false })
  mandatory: boolean = false;

  @Property({ type: 'number', nullable: true })
  max_length?: number;

  @Property({ length: 80, nullable: true })
  next_element?: string;

  @Property({ default: false })
  primary: boolean = false;

  @Property({ default: false })
  read_only: boolean = false;

  @Property({ length: 255, nullable: true })
  read_roles?: string;

  @ManyToOne(() => SysDbObject, { nullable: true })
  reference?: SysDbObject;

  @Property({ length: 20, nullable: true })
  reference_cascade_rule?: string;

  @Property({ default: false })
  reference_floats: boolean = false;

  @Property({ length: 40, nullable: true })
  reference_key?: string;

  @Property({ length: 1000, nullable: true })
  reference_qual?: string;

  @Property({ length: 1000, nullable: true })
  reference_qual_condition?: string;

  @Property({ length: 10, nullable: true })
  reference_type?: string;

  @Property({ default: 0 })
  sizeclass: number = 0;

  @Property({ default: false })
  spell_check: boolean = false;

  @Property({ default: false })
  staged: boolean = false;

  @Property({ length: 80 })
  name!: string;

  @Property({ default: false })
  table_reference: boolean = false;

  @Property({ default: false })
  text_index: boolean = false;

  @ManyToOne(() => SysGlideObject, { nullable: true })
  internal_type?: SysGlideObject;

  @Property({ default: false })
  unique: boolean = false;

  @Property({ default: false })
  use_dependent_field: boolean = false;

  @Property({ default: false })
  use_dynamic_default: boolean = false;

  @Property({ length: 40, nullable: true })
  use_reference_qualifier?: string;

  @Property({ length: 40, nullable: true })
  widget?: string;

  @Property({ length: 255, nullable: true })
  write_roles?: string;

  @Property({ default: false })
  xml_view: boolean = false;
}
