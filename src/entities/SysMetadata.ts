/* File: src/entities/SysMetadata.ts
 * Description: Stores high-level metadata about tables and columns in the CMS.
 * Created: 2025-07-23T09:00:00+05:30
 * Updated: 2025-07-23T18:15:00+05:30
 */
import { Entity, Property, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { SysScope } from './SysScope';
import { SysPackage } from './SysPackage';

@Entity({ tableName: 'sys_metadata' })
export class SysMetadata {
  /** Primary key (UUID) */
  @PrimaryKey({ type: 'uuid' })
  sys_id: string = uuid();

  /** Reference to application scope (indexed) */
  @ManyToOne(() => SysScope, { nullable: false, index: true })
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

  /** Owning package/application (optional, indexed) */
  @ManyToOne(() => SysPackage, { nullable: true, index: true })
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
