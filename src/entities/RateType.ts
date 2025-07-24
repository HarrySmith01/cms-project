// File: src/entities/RateType.ts
// Description: Defines rate types for cost management and optional overrides.
// Created:     2025-07-27T00:40:00+05:30
// Updated:     2025-07-27T00:40:00+05:30

import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';

@AclResource('rate_type')
@Entity({ tableName: 'rate_type' })
export class RateType extends Packaged(BaseEntity as any) {
  /** Active flag (inherited from BaseEntity) */

  /** Description of the rate type */
  @Property({ length: 800, nullable: true })
  description?: string;

  /** Domain identifier (defaults to 'global') */
  @Property({ length: 32, default: 'global' })
  sys_domain: string = 'global';

  /** Rate type name */
  @Property({ length: 40 })
  name!: string;

  /** Overrides reference to another RateType */
  @ManyToOne(() => RateType, { nullable: true })
  sys_overrides?: RateType;
}
