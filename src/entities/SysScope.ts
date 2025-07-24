// File: src/entities/SysScope.ts
// Description: Defines the sys_scope table, holding application namespace and related settings.
// Created:     2025-07-27T04:45:00+05:30
// Updated:     2025-07-27T04:45:00+05:30

import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { GswContent } from './GswContent';
import { SubscriptionEntitlement } from './SubscriptionEntitlement';
import { Subscription } from './Subscription';

@AclResource('sys_scope')
@Entity({ tableName: 'sys_scope' })
export class SysScope extends Packaged(BaseEntity) {
  /** Flags whether scoped admin features are enabled */
  @Property({ default: false })
  scoped_administration: boolean = false;

  /** Can edit this application in Studio */
  @Property({ default: true })
  can_edit_in_studio: boolean = true;

  /** Reference to guided setup content */
  @ManyToOne(() => GswContent, { nullable: true })
  guided_setup_guid?: GswContent;

  /** JavaScript mode (e.g., es6, es_latest) */
  @Property({ nullable: true })
  js_level?: string;

  /** Logo image path or ID */
  @Property({ nullable: true })
  logo?: string;

  /** Whether this scope is private */
  @Property({ default: false })
  private: boolean = false;

  /** String flag for runtime access tracking */
  @Property({ nullable: true })
  runtime_access_tracking?: string;

  /** Restrict table choices within this scope */
  @Property({ default: false })
  restrict_table_access: boolean = false;

  /** The scope name/identifier (unique) */
  @Property({ unique: true })
  scope!: string;

  /** Short description of this scope */
  @Property({ type: 'text', nullable: true })
  short_description?: string;

  /** Reference to subscription entitlement */
  @ManyToOne(() => SubscriptionEntitlement, { nullable: true })
  subscription_entitlement?: SubscriptionEntitlement;

  /** Reference to subscription license */
  @ManyToOne(() => Subscription, { nullable: true })
  license?: Subscription;

  /** Template identifier or name */
  @Property({ nullable: true })
  template?: string;

  /** Vendor name */
  @Property({ nullable: true })
  vendor?: string;

  /** Vendor prefix */
  @Property({ nullable: true })
  vendor_prefix?: string;
}
