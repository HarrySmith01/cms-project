// src/entities/CmnBuilding.ts
// Description: Entity for facilities (cmn_building table).
// Created: 2025-07-25T15:30:00+05:30
// Updated: 2025-07-25T15:30:00+05:30

import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { SysUser } from './SysUser';
import { CmnLocation } from './CmnLocation';

@Entity({ tableName: 'cmn_building' })
export class CmnBuilding {
  @PrimaryKey({ type: 'uuid' })
  sys_id: string = v4();

  @ManyToOne(() => SysUser, { nullable: true })
  contact?: SysUser;

  @Property({ type: 'number', nullable: true })
  floors?: number;

  @ManyToOne(() => CmnLocation, { nullable: true })
  location?: CmnLocation;

  @Property({ type: 'string', length: 100 })
  name!: string;

  @Property({ type: 'string', length: 4000, nullable: true })
  notes?: string;

  // Audit fields
  @Property({ type: 'date' })
  sys_created_on: Date = new Date();

  @Property({ type: 'string', nullable: true })
  sys_created_by?: string;

  @Property({ type: 'date', onUpdate: () => new Date() })
  sys_updated_on: Date = new Date();

  @ManyToOne(() => SysUser, { nullable: true })
  sys_updated_by?: SysUser;

  @Property({ type: 'number', default: 0 })
  sys_mod_count: number = 0;
}
