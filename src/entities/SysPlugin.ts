/* eslint-disable import/prefer-default-export, object-curly-newline */
/**
 * File: src/entities/SysPlugin.ts
 * Description: Maps the sys_plugins table (ServiceNow system plugins)
 *              with core fields and bidirectional M2M to Guided Setup Content.
 * Created: 2025-07-24T10:30:00+05:30
 * Updated: 2025-07-24T10:30:00+05:30
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
import { BatchInstallPlan } from './BatchInstallPlan';
import { GswContent } from './GswContent';

@Entity({ tableName: 'sys_plugins' })
export class SysPlugin {
  /** Primary key (UUID) */
  @PrimaryKey({ type: 'uuid' })
  @Index()
    sys_id: string = uuid();

  /** Reference to Batch Installation Plan */
  @ManyToOne(() => BatchInstallPlan, { nullable: true })
    batch_install_plan?: BatchInstallPlan;

  /** When the plugin was installed */
  @Property({ nullable: true })
    install_date?: Date;

  /** Arbitrary parent identifier */
  @Property({ nullable: true })
    parent?: string;

  /**
   * Inverse relation: content items that list this plugin as a dependency
   * (dependent_on_plugins on GswContent side).
   */
  @ManyToMany(() => GswContent, (content) => content.dependent_on_plugins)
    gswContents = new Collection<GswContent>(this);

  /**
   * Inverse relation: content items that list this plugin’s ID explicitly
   * (dependent_on_plugins_ids on GswContent side).
   */
  @ManyToMany(() => GswContent, (content) => content.dependent_on_plugins_ids)
    explicitDependentOnContents = new Collection<GswContent>(this);

  /**
   * Inverse relation: content items that implicitly depend on this plugin
   * (implicit_plugin_dependencies on GswContent side).
   */
  @ManyToMany(
    () => GswContent,
    (content) => content.implicit_plugin_dependencies,
  )
    implicitDependentOnContents = new Collection<GswContent>(this);

  // Audit fields
  @Property()
    sys_created_on: Date = new Date();

  @Property({ nullable: true })
    sys_created_by?: string;

  @Property({ onUpdate: () => new Date() })
    sys_updated_on: Date = new Date();

  @Property({ nullable: true })
    sys_updated_by?: string;

  @Property({ default: 0 })
    sys_mod_count: number = 0;
}
