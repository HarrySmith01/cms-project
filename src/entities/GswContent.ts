// File: src/entities/GswContent.ts
// Description: Defines the gsw_content table for Guided Setup Content,
//              with bidirectional M2M relations to SysPlugin and self-referential lists.
// Created:     2025-07-26T23:55:00+05:30
// Updated:     2025-07-26T23:55:00+05:30

import {
  Entity,
  Property,
  ManyToOne,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { SysPlugin } from './SysPlugin';

@AclResource('gsw_content')
@Entity({ tableName: 'gsw_content' })
export class GswContent extends Packaged(BaseEntity as any) {
  /** Whether this content is active (inherited from BaseEntity) */

  /** Contents this depends on (self-referential list) */
  @ManyToMany(() => GswContent, (content) => content.dependentOnMe, {
    owner: true,
  })
  dependent_on_contents = new Collection<GswContent>(this);

  /** Reverse side for self-dependency */
  @ManyToMany(() => GswContent, (content) => content.dependent_on_contents)
  dependentOnMe = new Collection<GswContent>(this);

  /** Plugins this content depends on */
  @ManyToMany(() => SysPlugin, (plugin) => plugin.gswContents, { owner: true })
  dependent_on_plugins = new Collection<SysPlugin>(this);

  /** Explicit plugin-ID dependencies */
  @ManyToMany(() => SysPlugin, (plugin) => plugin.explicitDependentOnContents, {
    owner: true,
  })
  dependent_on_plugins_ids = new Collection<SysPlugin>(this);

  /** Plugins implicitly depended on */
  @ManyToMany(() => SysPlugin, (plugin) => plugin.implicitDependentOnContents, {
    owner: true,
  })
  implicit_plugin_dependencies = new Collection<SysPlugin>(this);

  /** HTML/translated description */
  @Property({ type: 'text', nullable: true })
  description?: string;

  /** Implicit self-dependency owning side */
  @ManyToMany(() => GswContent, (content) => content.implicitDependentOnMe, {
    owner: true,
  })
  implicit_dependent_on = new Collection<GswContent>(this);

  /** Implicit self-dependency inverse side */
  @ManyToMany(() => GswContent, (content) => content.implicit_dependent_on)
  implicitDependentOnMe = new Collection<GswContent>(this);

  /** Order in which this appears */
  @Property({ type: 'integer' })
  order!: number;

  /** Parent content item */
  @ManyToOne(() => GswContent, { nullable: true })
  parent?: GswContent;

  /** All parent IDs as collection */
  @ManyToMany(() => GswContent, (content) => content.childOf, { owner: true })
  parents = new Collection<GswContent>(this);

  /** Reverse for child-of relationship */
  @ManyToMany(() => GswContent, (content) => content.parents)
  childOf = new Collection<GswContent>(this);

  /** Root parent content item */
  @ManyToOne(() => GswContent, { nullable: true })
  root_parent?: GswContent;

  /** Whether this step can be skipped */
  @Property({ default: true })
  skippable: boolean = true;

  /** Whether this content can have child content */
  @Property({ default: false })
  supports_child_content: boolean = false;

  /** Display title (translated) */
  @Property({ type: 'text' })
  title!: string;

  /** Weight for ordering (float) */
  @Property({ type: 'float' })
  weight!: number;
}
