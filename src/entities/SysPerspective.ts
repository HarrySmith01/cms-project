// src/entities/SysPerspective.ts
// Description: Represents perspective configurations in the system.
// Created: 2025-07-25TXX:XX:XX+05:30
// Updated: 2025-07-25TXX:XX:XX+05:30

import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'sys_perspective' })
export class SysPerspective {
  @PrimaryKey()
  sys_id!: string;

  @Property({ length: 40, nullable: true })
  application?: string;

  @Property({ length: 40, nullable: true })
  applications?: string;

  @Property({ length: 40, nullable: true })
  name?: string;

  @Property({ type: 'number', nullable: true })
  order?: number;

  @Property({ length: 40, nullable: true })
  roles?: string;

  // audit fields
  @Property({ type: 'datetime', nullable: true })
  sys_created_on?: Date;

  @Property({ length: 40, nullable: true })
  sys_created_by?: string;

  @Property({ type: 'datetime', nullable: true })
  sys_updated_on?: Date;

  @Property({ length: 40, nullable: true })
  sys_updated_by?: string;

  @Property({ type: 'number', nullable: true })
  sys_mod_count?: number;
}
