// File: src/entities/CoreCompany.ts
// Description: Entity for core_company table schema.
// Created:     2025-07-26T23:55:00+05:30
// Updated:     2025-07-26T23:55:00+05:30

import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { SysUser } from './SysUser';
import { SysChoice } from './SysChoice';

@AclResource('core_company')
@Entity({ tableName: 'core_company' })
export class CoreCompany extends Packaged(BaseEntity as any) {
  @Property({ length: 255, nullable: true })
  apple_icon?: string;

  @Property()
  ua_assessed: boolean = false;

  @ManyToOne(() => SysChoice, { nullable: true })
  assessment_risk_rating?: SysChoice;

  @Property({ length: 255, nullable: true })
  banner_image?: string;

  @Property({ length: 800, nullable: true })
  banner_text?: string;

  @Property({ length: 1024, nullable: true })
  business_owners?: string;

  @Property({ length: 50, nullable: true })
  city?: string;

  @Property({ length: 255, nullable: true })
  country?: string;

  @Property({ type: 'date', nullable: true })
  contract_start_date?: Date;

  @Property({ type: 'date', nullable: true })
  coordinates_retrieved_on?: Date;

  @Property({ length: 255, nullable: true })
  duns_number?: string;

  @Property()
  customer: boolean = false;

  @Property({
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: true,
  })
  discount?: number;

  @Property({ length: 800, nullable: true })
  ecovadis_assessment_status?: string;

  @ManyToOne(() => SysChoice, { nullable: true })
  engagement_risk_rating?: SysChoice;

  @Property({ length: 255, nullable: true })
  fax_phone?: string;

  @Property({ type: 'date', nullable: true })
  fiscal_year?: Date;

  @Property()
  sn_vrm_vendor_fourth_party: boolean = false;

  @Property({ length: 255, nullable: true })
  hash?: string;

  @ManyToOne(() => SysChoice, { nullable: true })
  industry?: SysChoice;

  @Property({ length: 800, nullable: true })
  justification?: string;

  @Property({ type: 'date', nullable: true })
  ua_last_assessment_date?: Date;

  @Property({ type: 'date', nullable: true })
  ua_last_managed_date?: Date;

  @Property({ length: 1000, nullable: true })
  lat_long_error?: string;

  @Property({ type: 'float', nullable: true })
  latitude?: number;

  @Property({ type: 'float', nullable: true })
  longitude?: number;

  @Property()
  manufacturer: boolean = false;

  @Property({
    type: 'decimal',
    precision: 20,
    scale: 2,
    nullable: true,
  })
  market_cap?: number;

  @Property({ length: 80 })
  name!: string;

  @Property()
  canonical: boolean = false;

  @Property({ length: 800, nullable: true })
  notes?: string;

  @Property({ type: 'int', nullable: true })
  num_employees?: number;

  @Property({ type: 'date', nullable: true })
  overridden_on?: Date;

  @ManyToOne(() => SysChoice, { nullable: true })
  overridden_risk_rating?: SysChoice;

  @Property()
  override_risk_rating: boolean = false;

  @ManyToOne(() => CoreCompany, { nullable: true })
  parent?: CoreCompany;

  @Property({ length: 255, nullable: true })
  phone?: string;

  @Property()
  primary: boolean = false;

  @Property({
    type: 'decimal',
    precision: 20,
    scale: 2,
    nullable: true,
  })
  profits?: number;

  @Property()
  publicly_traded: boolean = false;

  @Property({ length: 40, nullable: true })
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

  @Property({ length: 100, nullable: true })
  scoring_rule?: string;

  @ManyToOne(() => SysChoice, { nullable: true })
  scoring_rule_ref?: SysChoice;

  @Property({ length: 255, nullable: true })
  state?: string;

  @Property({ length: 255, nullable: true })
  status?: string;

  @Property({ length: 255, nullable: true })
  stock_price?: string;

  @Property({ length: 255, nullable: true })
  stock_symbol?: string;

  @Property({ length: 255, nullable: true })
  street?: string;

  @ManyToOne(() => SysChoice, { nullable: true })
  child_vendor_risk_rating?: SysChoice;

  @ManyToOne(() => SysUser, { nullable: true })
  contact?: SysUser;

  @ManyToOne(() => SysUser, { nullable: true })
  vendor_manager?: SysUser;

  @Property()
  sn_vrm_vendor_third_party: boolean = true;

  @Property({ length: 255, nullable: true })
  vendor_tier?: string;

  @Property({
    type: 'decimal',
    precision: 20,
    scale: 2,
    nullable: true,
  })
  sn_tprm_annual_spend?: number;

  @Property({ length: 255, nullable: true })
  banner_image_light?: string;
}
