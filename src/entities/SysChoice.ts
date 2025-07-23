// src/entities/SysChoice.ts
// Description: Entity for sys_choice table.
// Created: 2025-07-25TXX:XX:XX+05:30
// Updated: 2025-07-25TXX:XX:XX+05:30

import {
  Entity, PrimaryKey, Property, Index,
} from '@mikro-orm/core';

@Entity({ tableName: 'sys_choice' })
@Index({
  properties: ['element', 'name', 'language'],
  options: { unique: true },
})
export class SysChoice {
  @PrimaryKey({ type: 'uuid' })
    sys_id!: string;

  @Property({ length: 100 })
    element!: string;

  @Property({ length: 100 })
    name!: string;

  @Property({ length: 100 })
    label!: string;

  @Property({ length: 40 })
    value!: string;

  @Property({ type: 'number', default: 0 })
    sequence: number = 0;

  @Property({ length: 40 })
    language!: string;

  @Property({ type: 'boolean', default: true })
    active: boolean = true;

  @Property({ type: 'date', onCreate: () => new Date() })
    sys_created_on: Date = new Date();

  @Property({ length: 40, nullable: true })
    sys_created_by?: string;

  @Property({ type: 'date', onUpdate: () => new Date() })
    sys_updated_on: Date = new Date();

  @Property({ length: 40, nullable: true })
    sys_updated_by?: string;

  @Property({ type: 'number', default: 0 })
    sys_mod_count: number = 0;
}
