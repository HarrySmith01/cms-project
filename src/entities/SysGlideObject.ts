/* eslint-disable import/prefer-default-export, object-curly-newline */
/**
 * File: src/entities/SysGlideObject.ts
 * Description: Defines the sys_glide_object table, listing every table/view in the CMS.
 * Created: 2025-07-23T18:00:00+05:30
 * Updated: 2025-07-23T18:00:00+05:30
 */
import { Entity, Property, PrimaryKey, Index } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';

@Entity({ tableName: 'sys_glide_object' })
export class SysGlideObject {
  /** Primary key (UUID) */
  @PrimaryKey({ type: 'uuid' })
  @Index()
    sys_id: string = uuid();

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

  // audit fields
  /** When this definition was created */
  @Property()
    sys_created_on: Date = new Date();

  /** Who created this definition */
  @Property()
    sys_created_by!: string;

  /** Last update timestamp */
  @Property({ onUpdate: () => new Date() })
    sys_updated_on: Date = new Date();

  /** Who last updated this definition */
  @Property()
    sys_updated_by!: string;

  /** Number of updates applied */
  @Property({ default: 0 })
    sys_mod_count: number = 0;
}
