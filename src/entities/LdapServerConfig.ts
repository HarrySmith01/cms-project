// src/entities/LdapServerConfig.ts
// Description: Represents LDAP server configurations used for directory integrations.
// Created: 2025-07-25TXX:XX:XX+05:30
// Updated: 2025-07-25TXX:XX:XX+05:30

import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'ldap_server_config' })
export class LdapServerConfig {
  @PrimaryKey()
  sys_id!: string;

  @Property({ length: 40 })
  name!: string;

  @Property({ default: true })
  active: boolean = true;

  @Property({ type: 'boolean', default: true })
  authenticate: boolean = true;

  @Property({ type: 'boolean', default: false })
  listener: boolean = false;

  @Property({ type: 'boolean', default: true })
  paging: boolean = true;

  @Property({ type: 'boolean', default: false })
  ssl: boolean = false;

  @Property({ type: 'number', nullable: true })
  connect_timeout?: number;

  @Property({ type: 'number', nullable: true })
  listen_interval?: number;

  @Property({ type: 'number', nullable: true })
  read_timeout?: number;

  @Property({ length: 800, nullable: true })
  attributes?: string;

  @Property({ length: 80, nullable: true })
  dn_field?: string;

  @Property({ length: 100, nullable: true })
  dn?: string;

  @Property({ length: 255, nullable: true })
  password?: string;

  @Property({ length: 32, nullable: true })
  map?: string;

  @Property({ length: 32, nullable: true })
  mid_server?: string;

  @Property({ length: 1000, nullable: true })
  server_url?: string;

  @Property({ length: 100, nullable: true })
  rdn?: string;

  @Property({ length: 100, nullable: true })
  system_id?: string;

  @Property({ length: 40, nullable: true })
  vendor?: string;

  @Property({ type: 'datetime', nullable: true })
  sys_created_on?: Date;

  @Property({ length: 40, nullable: true })
  sys_created_by?: string;

  @Property({ type: 'datetime', nullable: true })
  sys_updated_on?: Date;

  @Property({ length: 40, nullable: true })
  sys_updated_by?: string;

  @Property({ type: 'number', nullable: true })
  sys_mod_count?: number;
}
