/* eslint-disable import/prefer-default-export, object-curly-newline */
/**
 * File: src/entities/GswContent.ts
 * Description: Defines the gsw_content table for Guided Setup Content,
 *              with bidirectional M2M relations to SysPlugin and proper
 *              ownership on self-referential implicit lists.
 * Created: 2025-07-23T12:45:00+05:30
 * Updated: 2025-07-24T11:30:00+05:30
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
import { SysPlugin } from './SysPlugin';

@Entity({ tableName: 'gsw_content' })
export class GswContent {
  /** Primary key (UUID) */
  @PrimaryKey({ type: 'uuid' })
  @Index()
    sys_id: string = uuid();

  /** Whether this content is active */
  @Property({ default: true })
    active: boolean = true;

  /** Contents this depends on (self-referential list) */
  @ManyToMany(() => GswContent, (content) => content.dependentOnMe, {
    owner: true,
  })
    dependent_on_contents = new Collection<GswContent>(this);

  /** Reverse side for self-ref */
  @ManyToMany(() => GswContent, (content) => content.dependent_on_contents)
    dependentOnMe = new Collection<GswContent>(this);

  /** Plugins this content depends on */
  @ManyToMany(() => SysPlugin, (plugin) => plugin.gswContents, { owner: true })
    dependent_on_plugins = new Collection<SysPlugin>(this);

  /** Explicit plugin-ID list */
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

  /**
   * Primary owning side for implicit self-dependency.
   * This is the one that manages the join table.
   */
  @ManyToMany(() => GswContent, (content) => content.implicitDependentOnMe, {
    owner: true,
  })
    implicit_dependent_on = new Collection<GswContent>(this);

  /**
   * Inverse side for implicit self-dependency.
   * mappedBy points back to the owning property above.
   */
  @ManyToMany(() => GswContent, (content) => content.implicit_dependent_on, {
    mappedBy: 'implicit_dependent_on',
  })
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
