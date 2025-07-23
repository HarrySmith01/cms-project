/* eslint-disable import/prefer-default-export, object-curly-newline */
/**
 * File: src/entities/SysMetadata.ts
 * Description: Stores high-level metadata about tables and columns in the CMS.
 * Created: 2025-07-23T09:00:00+05:30
 * Updated: 2025-07-23T17:00:00+05:30
 */
import {
  Entity,
  Property,
  PrimaryKey,
  ManyToOne,
  Index,
} from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { SysScope } from './SysScope';
import { SysPackage } from './SysPackage';

@Entity({ tableName: 'sys_metadata' })
export class SysMetadata {
  /** Primary key (UUID) */
  @PrimaryKey({ type: 'uuid' })
  @Index()
    sys_id: string = uuid();

  /** Reference to application scope */
  @ManyToOne(() => SysScope, { nullable: false })
  @Index()
    sys_scope!: SysScope;

  /** Name of the class/table this metadata describes */
  @Property()
    sys_class_name!: string;

  /** When the metadata record was created */
  @Property()
    sys_created_on: Date = new Date();

  /** User who created this metadata record */
  @Property()
    sys_created_by!: string;

  /** Display name for this metadata record */
  @Property()
    sys_name!: string;

  /** Owning package/application (optional) */
  @ManyToOne(() => SysPackage, { nullable: true })
  @Index()
    sys_package?: SysPackage;

  /** Protection policy identifier */
  @Property()
    sys_policy!: string;

  /** Name of the update set this metadata belongs to */
  @Property()
    sys_update_name!: string;

  /** When the metadata record was last updated */
  @Property({ onUpdate: () => new Date() })
    sys_updated_on: Date = new Date();

  /** User who last updated this metadata record */
  @Property()
    sys_updated_by!: string;

  /** Count of modifications to this record */
  @Property({ default: 0 })
    sys_mod_count: number = 0;
}
