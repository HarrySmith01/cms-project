// File: src/entities/SnHrIntegrationsSource.ts
// Description: Stores integration source configurations for inbound/outbound HR data exchanges.
// Created:     2025-07-27T01:05:00+05:30
// Updated:     2025-07-27T01:05:00+05:30

import { Entity, Property } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';

@AclResource('sn_hr_integrations_source')
@Entity({ tableName: 'sn_hr_integrations_source' })
export class SnHrIntegrationsSource extends Packaged(BaseEntity as any) {
  /** Display name for this integration source */
  @Property({ length: 100 })
  name!: string;

  /** Active flag (inherited from BaseEntity) */

  /** Endpoint URL for integration */
  @Property({ length: 100, nullable: true })
  endpoint_url?: string;

  /** Inbound username */
  @Property({ length: 40, nullable: true })
  username_inbound?: string;

  /** Inbound password */
  @Property({ length: 255, nullable: true })
  user_password_inbound?: string;

  /** Outbound username */
  @Property({ length: 40, nullable: true })
  username_outbound?: string;

  /** Outbound password */
  @Property({ length: 255, nullable: true })
  user_password_outbound?: string;

  /** Use REST protocol */
  @Property({ default: false })
  rest: boolean = false;

  /** Use SOAP protocol */
  @Property({ default: true })
  soap: boolean = true;

  /** Use session token for auth */
  @Property({ default: false })
  use_session_token: boolean = false;

  /** API version */
  @Property({ length: 40, nullable: true })
  version?: string;

  /** Domain identifier */
  @Property({ length: 32, nullable: true })
  sys_domain?: string;

  /** List of basic auth profiles (comma-separated) */
  @Property({ length: 1024, nullable: true })
  basic_auth_profile_list?: string;

  /** List of OAuth entity profiles (comma-separated) */
  @Property({ length: 1024, nullable: true })
  oauth_entity_profile_list?: string;

  /** Number of retry attempts for outbound push */
  @Property({ length: 40, default: '3' })
  outbound_push_retry_cnt: string = '3';
}
