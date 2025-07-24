// File: src/entities/SysGlideObject.ts
// Description: Defines the sys_glide_object table, listing every table/view in the CMS.
// Created:     2025-07-27T02:30:00+05:30
// Updated:     2025-07-27T02:30:00+05:30

import { Entity, Property, Index } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';

@AclResource('sys_glide_object')
@Entity({ tableName: 'sys_glide_object' })
export class SysGlideObject extends Packaged(BaseEntity) {
  /** Collection flag (always false for table registry) */
  @Property({ default: false })
  collection: boolean = false;

  /** Attributes JSON or comma list */
  @Property({ length: 255, nullable: true })
  attributes?: string;

  /** Class name (system class) */
  @Property({ length: 80, nullable: true })
  class_name?: string;

  /** Extends relationship (super class name) */
  @Property({ name: 'scalar_type', length: 40, nullable: true })
  scalar_type?: string;

  /** Translated label for the table/view */
  @Property({ length: 40, nullable: true })
  label?: string;

  /** Maximum scalar length (for fields like String) */
  @Property({ name: 'scalar_length', length: 40, nullable: true })
  scalar_length?: string;

  /** The actual table or view name */
  @Property({ length: 40 })
  name!: string;

  /** Whether lookup should use original value */
  @Property({ default: true })
  use_original_value: boolean = true;

  /** Show/hide toggle */
  @Property({ default: false })
  visible: boolean = false;
}
