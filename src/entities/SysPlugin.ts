// File: src/entities/SysPlugin.ts
// Description: Maps the sys_plugins table with core fields and bidirectional M2M to Guided Setup Content.
// Created:     2025-07-27T03:55:00+05:30
// Updated:     2025-07-27T03:55:00+05:30

import {
  Entity,
  Property,
  ManyToOne,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { BatchInstallPlan } from './BatchInstallPlan';
import { GswContent } from './GswContent';

@AclResource('sys_plugins')
@Entity({ tableName: 'sys_plugins' })
export class SysPlugin extends Packaged(BaseEntity) {
  /** Reference to Batch Installation Plan */
  @ManyToOne(() => BatchInstallPlan, { nullable: true })
  batch_install_plan?: BatchInstallPlan;

  /** When the plugin was installed */
  @Property({ nullable: true })
  install_date?: Date;

  /** Arbitrary parent identifier */
  @Property({ nullable: true })
  parent?: string;

  /** Contents that list this plugin as a dependency */
  @ManyToMany(() => GswContent, (content) => content.dependent_on_plugins)
  gswContents = new Collection<GswContent>(this);

  /** Contents that list this plugin’s ID explicitly */
  @ManyToMany(() => GswContent, (content) => content.dependent_on_plugins_ids)
  explicitDependentOnContents = new Collection<GswContent>(this);

  /** Contents that implicitly depend on this plugin */
  @ManyToMany(
    () => GswContent,
    (content) => content.implicit_plugin_dependencies
  )
  implicitDependentOnContents = new Collection<GswContent>(this);
}
