// src/entities/CoreCompany.ts
// Description: Entity for core_company table schema
// Created: 2025-07-25T16:00:00+05:30
// Updated: 2025-07-25TXX:XX:XX+05:30

import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { SysUser } from './SysUser';
import { SysChoice } from './SysChoice';

@Entity({ tableName: 'core_company' })
export class CoreCompany {
  @PrimaryKey({ type: 'uuid' })
  sys_id: string = v4();

  @Property({ type: 'string', length: 255, nullable: true })
  apple_icon?: string;

  @Property({ type: 'boolean' })
  ua_assessed: boolean = false;

  @ManyToOne(() => SysChoice, { nullable: true })
  assessment_risk_rating?: SysChoice;

  @Property({ type: 'string', length: 255, nullable: true })
  banner_image?: string;

  @Property({ type: 'string', length: 4000, nullable: true })
  banner_text?: string;

  @Property({ type: 'string', length: 1024, nullable: true })
  business_owners?: string;

  @Property({ type: 'string', length: 50, nullable: true })
  city?: string;

  @Property({ type: 'string', length: 255, nullable: true })
  country?: string;

  @Property({ type: 'date', nullable: true })
  contract_start_date?: Date;

  @Property({ type: 'date', nullable: true })
  coordinates_retrieved_on?: Date;

  @Property({ type: 'string', length: 255, nullable: true })
  duns_number?: string;

  @Property({ type: 'boolean' })
  customer: boolean = false;

  @Property({
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: true,
  })
  discount?: number;

  @Property({ type: 'string', length: 4000, nullable: true })
  ecovadis_assessment_status?: string;

  @ManyToOne(() => SysChoice, { nullable: true })
  engagement_risk_rating?: SysChoice;

  @Property({ type: 'string', length: 255, nullable: true })
  fax_phone?: string;

  @Property({ type: 'date', nullable: true })
  fiscal_year?: Date;

  @Property({ type: 'boolean' })
  sn_vrm_vendor_fourth_party: boolean = false;

  @Property({ type: 'string', length: 255, nullable: true })
  hash?: string;

  @ManyToOne(() => SysChoice, { nullable: true })
  industry?: SysChoice;

  @Property({ type: 'string', length: 2000, nullable: true })
  justification?: string;

  @Property({ type: 'date', nullable: true })
  ua_last_assessment_date?: Date;

  @Property({ type: 'date', nullable: true })
  ua_last_managed_date?: Date;

  @Property({ type: 'string', length: 1000, nullable: true })
  lat_long_error?: string;

  @Property({ type: 'float', nullable: true })
  latitude?: number;

  @Property({ type: 'float', nullable: true })
  longitude?: number;

  @Property({ type: 'boolean' })
  manufacturer: boolean = false;

  @Property({
    type: 'decimal',
    precision: 20,
    scale: 2,
    nullable: true,
  })
  market_cap?: number;

  @Property({ type: 'string', length: 80 })
  name!: string;

  @Property({ type: 'boolean' })
  canonical: boolean = false;

  @Property({ type: 'string', length: 4000, nullable: true })
  notes?: string;

  @Property({ type: 'int', nullable: true })
  num_employees?: number;

  @Property({ type: 'date', nullable: true })
  overridden_on?: Date;

  @ManyToOne(() => SysChoice, { nullable: true })
  overridden_risk_rating?: SysChoice;

  @Property({ type: 'boolean' })
  override_risk_rating: boolean = false;

  @ManyToOne(() => CoreCompany, { nullable: true })
  parent?: CoreCompany;

  @Property({ type: 'string', length: 255, nullable: true })
  phone?: string;

  @Property({ type: 'boolean' })
  primary: boolean = false;

  @Property({
    type: 'decimal',
    precision: 20,
    scale: 2,
    nullable: true,
  })
  profits?: number;

  @Property({ type: 'boolean' })
  publicly_traded: boolean = false;

  @Property({ type: 'string', length: 40, nullable: true })
  rank_tier?: string;

  @Property({
    type: 'decimal',
    precision: 20,
    scale: 2,
    nullable: true,
  })
  revenue_per_year?: number;

  @ManyToOne(() => SysChoice, { nullable: true })
  external_risk_rating?: SysChoice;

  @ManyToOne(() => SysChoice, { nullable: true })
  risk_rating?: SysChoice;

  @ManyToOne(() => SysChoice, { nullable: true })
  risk_tier?: SysChoice;

  @Property({ type: 'string', length: 100, nullable: true })
  scoring_rule?: string;

  @ManyToOne(() => SysChoice, { nullable: true })
  scoring_rule_ref?: SysChoice;

  @Property({ type: 'string', length: 255, nullable: true })
  state?: string;

  @Property({ type: 'string', length: 255, nullable: true })
  status?: string;

  @Property({ type: 'string', length: 255, nullable: true })
  stock_price?: string;

  @Property({ type: 'string', length: 255, nullable: true })
  stock_symbol?: string;

  @Property({ type: 'string', length: 255, nullable: true })
  street?: string;

  @ManyToOne(() => SysChoice, { nullable: true })
  child_vendor_risk_rating?: SysChoice;

  @ManyToOne(() => SysUser, { nullable: true })
  contact?: SysUser;

  @ManyToOne(() => SysUser, { nullable: true })
  vendor_manager?: SysUser;

  @Property({ type: 'boolean' })
  sn_vrm_vendor_third_party: boolean = true;

  @Property({ type: 'string', length: 255, nullable: true })
  vendor_tier?: string;

  @Property({
    type: 'decimal',
    precision: 20,
    scale: 2,
    nullable: true,
  })
  sn_tprm_annual_spend?: number;

  @Property({ type: 'string', length: 255, nullable: true })
  banner_image_light?: string;

  @Property({ type: 'date' })
  sys_created_on: Date = new Date();

  @Property({ type: 'string', nullable: true })
  sys_created_by?: string;

  @Property({ type: 'date', onUpdate: () => new Date() })
  sys_updated_on: Date = new Date();

  @Property({ type: 'string', nullable: true })
  sys_updated_by?: string;

  @Property({ type: 'number', default: 0 })
  sys_mod_count: number = 0;
}
