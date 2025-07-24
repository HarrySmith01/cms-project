// File: src/entities/LdapServerConfig.ts
// Description: Represents LDAP server configurations used for directory integrations.
// Created:     2025-07-27T00:20:00+05:30
// Updated:     2025-07-27T00:20:00+05:30

import { Entity, Property } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';

@AclResource('ldap_server_config')
@Entity({ tableName: 'ldap_server_config' })
export class LdapServerConfig extends Packaged(BaseEntity) {
  /** Display name for this LDAP config */
  @Property({ length: 40 })
  name!: string;

  /** Active flag (inherited from BaseEntity) */

  /** Perform authentication */
  @Property({ default: true })
  authenticate: boolean = true;

  /** Listen for directory changes */
  @Property({ default: false })
  listener: boolean = false;

  /** Enable paging */
  @Property({ default: true })
  paging: boolean = true;

  /** Use SSL/TLS */
  @Property({ default: false })
  ssl: boolean = false;

  /** Connection timeout in ms */
  @Property({ type: 'number', nullable: true })
  connect_timeout?: number;

  /** Polling interval in ms */
  @Property({ type: 'number', nullable: true })
  listen_interval?: number;

  /** Read timeout in ms */
  @Property({ type: 'number', nullable: true })
  read_timeout?: number;

  /** Attributes to fetch (comma-separated) */
  @Property({ length: 800, nullable: true })
  attributes?: string;

  /** Distinguished name field */
  @Property({ length: 80, nullable: true })
  dn_field?: string;

  /** Distinguished name */
  @Property({ length: 100, nullable: true })
  dn?: string;

  /** Bind password */
  @Property({ length: 255, nullable: true })
  password?: string;

  /** Mapping configuration */
  @Property({ length: 32, nullable: true })
  map?: string;

  /** MID server identifier */
  @Property({ length: 32, nullable: true })
  mid_server?: string;

  /** LDAP server URL */
  @Property({ length: 1000, nullable: true })
  server_url?: string;

  /** Relative DN */
  @Property({ length: 100, nullable: true })
  rdn?: string;

  /** System identifier */
  @Property({ length: 100, nullable: true })
  system_id?: string;

  /** Vendor name */
  @Property({ length: 40, nullable: true })
  vendor?: string;
}
