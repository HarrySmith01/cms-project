// File: src/entities/SysUpdateSetSource.ts
// Description: Maps the sys_update_set_source table, storing remote update set endpoints.
// Created:     2025-07-27T05:45:00+05:30
// Updated:     2025-07-27T05:45:00+05:30

import { Entity, Property } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';

@AclResource('sys_update_set_source')
@Entity({ tableName: 'sys_update_set_source' })
export class SysUpdateSetSource extends Packaged(BaseEntity) {
  /** Whether this source is active */
  @Property({ default: true })
  active: boolean = true;

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
}
