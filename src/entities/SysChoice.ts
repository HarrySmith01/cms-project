// File: src/entities/SysChoice.ts
// Description: Entity for sys_choice table, storing choice list entries.
// Created:     2025-07-27T01:30:00+05:30
// Updated:     2025-07-27T01:30:00+05:30

import { Entity, Property, ManyToMany, Index } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';

@Entity({ tableName: 'sys_choice' })
@Index({
  properties: ['element', 'name', 'language'],
  options: { unique: true },
})
@AclResource('sys_choice')
export class SysChoice extends Packaged(BaseEntity) {
  /** Field name this choice applies to */
  @Property({ length: 100 })
  element!: string;

  /** Choice list name */
  @Property({ length: 100 })
  name!: string;

  /** Display label for this choice */
  @Property({ length: 100 })
  label!: string;

  /** Stored value */
  @Property({ length: 40 })
  value!: string;

  /** Sort order */
  @Property({ default: 0 })
  sequence: number = 0;

  /** Language code */
  @Property({ length: 40 })
  language!: string;
}
