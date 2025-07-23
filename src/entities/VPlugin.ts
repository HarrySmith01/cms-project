/* eslint-disable import/prefer-default-export, object-curly-newline */
/**
 * File: src/entities/VPlugin.ts
 * Description: Maps the v_plugin table (system plugins) with core fields and inter-plugin dependencies.
 * Created: 2025-07-23T14:30:00+05:30
 * Updated: 2025-07-23T14:30:00+05:30
 */
import {
  Entity,
  Property,
  PrimaryKey,
  ManyToOne,
  ManyToMany,
  Collection,
  Index,
} from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { GswContent } from './GswContent';

@Entity({ tableName: 'v_plugin' })
export class VPlugin {
  /** Primary key (UUID) */
  @PrimaryKey({ type: 'uuid' })
  @Index()
    sys_id: string = uuid();

  /** External plugin ID */
  @Property()
    id!: string;

  /** Human-readable name */
  @Property({ type: 'text' })
    name!: string;

  /** Available version string */
  @Property({ nullable: true })
    available_version?: string;

  /** Should block install? */
  @Property({ default: false })
    block_install: boolean = false;

  /** Text definition of the plugin */
  @Property({ type: 'text', nullable: true })
    definition?: string;

  /** Translated description HTML */
  @Property({ type: 'text', nullable: true })
    description?: string;

  /** Entitlement category */
  @Property({ nullable: true })
    entitled?: string;

  /** Demo data included? */
  @Property({ default: false })
    has_demo_data: boolean = false;

  /** Help URL */
  @Property({ nullable: true })
    help?: string;

  /** Is licensable? */
  @Property({ default: false })
    licensable: boolean = false;

  /** File system or registry path */
  @Property({ nullable: true })
    path?: string;

  /** Plugin indicators JSON or comma list */
  @Property({ type: 'text', nullable: true })
    indicators?: string;

  /** Plugin provider name */
  @Property({ nullable: true })
    provider?: string;

  /** Security/scope */
  @Property({ nullable: true })
    scope?: string;

  /** Plugin state */
  @Property({ nullable: true })
    state?: string;

  /** Active flag (string-based status) */
  @Property({ nullable: true })
    active?: string;

  /** License category for plugin */
  @Property({ nullable: true })
    license_category?: string;

  /** License model */
  @Property({ nullable: true })
    license_model?: string;

  /** Plugin version */
  @Property({ nullable: true })
    version?: string;

  /** Relation: Guided setup configuration */
  @ManyToOne(() => GswContent, { nullable: true })
    guided_setup_guid?: GswContent;

  /** Plugins this one requires (self-M2M) */
  @ManyToMany(() => VPlugin, (plugin) => plugin.requiredBy, { owner: true })
    requires = new Collection<VPlugin>(this);

  /** Reverse side of requires */
  @ManyToMany(() => VPlugin, (plugin) => plugin.requires)
    requiredBy = new Collection<VPlugin>(this);
}
