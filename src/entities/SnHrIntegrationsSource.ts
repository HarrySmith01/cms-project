// src/entities/SnHrIntegrationsSource.ts
// Description: Stores integration source configurations for inbound/outbound HR data exchanges.
// Created: 2025-07-25TXX:XX:XX+05:30
// Updated: 2025-07-25TXX:XX:XX+05:30

import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'sn_hr_integrations_source' })
export class SnHrIntegrationsSource {
  @PrimaryKey()
  sys_id!: string;

  @Property({ length: 100 })
  name!: string;

  @Property({ default: true })
  active: boolean = true;

  @Property({ length: 100, nullable: true })
  endpoint_url?: string;

  @Property({ length: 40, nullable: true })
  username_inbound?: string;

  @Property({ length: 255, nullable: true })
  user_password_inbound?: string;

  @Property({ length: 40, nullable: true })
  username_outbound?: string;

  @Property({ length: 255, nullable: true })
  user_password_outbound?: string;

  @Property({ type: 'boolean', default: false })
  rest: boolean = false;

  @Property({ type: 'boolean', default: true })
  soap: boolean = true;

  @Property({ type: 'boolean', default: false })
  use_session_token: boolean = false;

  @Property({ length: 40, nullable: true })
  version?: string;

  @Property({ length: 32, nullable: true })
  sys_domain?: string;

  @Property({ length: 1024, nullable: true })
  basic_auth_profile_list?: string;

  @Property({ length: 1024, nullable: true })
  oauth_entity_profile_list?: string;

  @Property({ length: 40, default: '3' })
  outbound_push_retry_cnt: string = '3';

  @Property({ type: 'datetime', nullable: true })
  sys_created_on?: Date;

  @Property({ type: 'datetime', nullable: true })
  sys_updated_on?: Date;

  @Property({ length: 40, nullable: true })
  sys_created_by?: string;

  @Property({ length: 40, nullable: true })
  sys_updated_by?: string;

  @Property({ type: 'number', nullable: true })
  sys_mod_count?: number;
}
