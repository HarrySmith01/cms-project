// src/entities/RateType.ts
// Description: Defines rate types for cost management and optional overrides.
// Created: 2025-07-25TXX:XX:XX+05:30
// Updated: 2025-07-25TXX:XX:XX+05:30

import {
  Entity, PrimaryKey, Property, ManyToOne,
} from '@mikro-orm/core';

@Entity({ tableName: 'rate_type' })
export class RateType {
  @PrimaryKey()
    sys_id!: string;

  @Property({ type: 'boolean', default: true })
    active: boolean = true;

  @Property({ length: 4000, nullable: true })
    description?: string;

  @Property({ length: 32, default: 'global' })
    sys_domain: string = 'global';

  @Property({ length: 40 })
    name!: string;

  @ManyToOne(() => RateType, { nullable: true })
    sys_overrides?: RateType;

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
