// File: src/entities/CmnBuilding.ts
// Description: Entity for facilities (cmn_building table).
// Created:     2025-07-26T22:25:00+05:30
// Updated:     2025-07-26T22:25:00+05:30

import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { SysUser } from './SysUser';
import { CmnLocation } from './CmnLocation';

@AclResource('cmn_building')
@Entity({ tableName: 'cmn_building' })
export class CmnBuilding extends Packaged(BaseEntity as any) {
  /** Primary contact for the building */
  @ManyToOne(() => SysUser, { nullable: true })
  contact?: SysUser;

  /** Number of floors in the building */
  @Property({ type: 'number', nullable: true })
  floors?: number;

  /** Associated location */
  @ManyToOne(() => CmnLocation, { nullable: true })
  location?: CmnLocation;

  /** Building name */
  @Property({ length: 100 })
  name!: string;

  /** Additional notes or description */
  @Property({ length: 800, nullable: true })
  notes?: string;
}
