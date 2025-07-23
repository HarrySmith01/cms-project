/* eslint-disable import/prefer-default-export, object-curly-newline */
/**
 * File: src/entities/SysUpdateSetSource.ts
 * Description: Maps the sys_update_set_source table, storing remote update set endpoints.
 * Created: 2025-07-23T18:15:00+05:30
 * Updated: 2025-07-23T18:15:00+05:30
 */
import { Entity, Property, PrimaryKey, Index } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';

@Entity({ tableName: 'sys_update_set_source' })
export class SysUpdateSetSource {
  /** Primary key (UUID) */
  @PrimaryKey({ type: 'uuid' })
  @Index()
  sys_id: string = uuid();

  /** Whether this source is active */
  @Property({ default: true })
  active: boolean = true;

  /** Record creation timestamp */
  @Property()
  sys_created_on: Date = new Date();

  /** Creator of the record */
  @Property()
  sys_created_by: string;

  /** Remote instance identifier (URL or GUID) */
  @Property({ nullable: true })
  instance_id?: string;

  /** Human-readable name of the remote instance */
  @Property({ nullable: true })
  instance_name?: string;

  /** Logical name of this source */
  @Property({ nullable: true })
  name?: string;

  /** Encrypted password for two-way authentication */
  @Property({ nullable: true })
  password?: string;

  /** Short description or notes */
  @Property({ type: 'text', nullable: true })
  short_description?: string;

  /** Access URL for the remote instance */
  @Property({ nullable: true })
  url?: string;

  /** Authentication username */
  @Property({ nullable: true })
  username?: string;

  /** Type of the remote source (e.g., dev, test, prod) */
  @Property({ nullable: true })
  type?: string;

  /** Last‐updated timestamp */
  @Property({ onUpdate: () => new Date() })
  sys_updated_on: Date = new Date();

  /** Who last updated the record */
  @Property({ nullable: true })
  sys_updated_by?: string;

  /** Incremented on each change */
  @Property({ default: 0 })
  sys_mod_count: number = 0;
}
