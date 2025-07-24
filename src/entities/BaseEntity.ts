// File: src/entities/BaseEntity.ts
// Description: Comprehensive abstract base class for all static entities.
//              Includes PK, audit fields, ACL metadata, package/scope mixin,
//              and optional DictionaryEntity mixin for dictionary tables.
// Created:     2025-07-26T11:30:00+05:30
// Updated:     2025-07-26T12:30 IST

import {
  PrimaryKey,
  Property,
  BeforeCreate,
  BeforeUpdate,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import {
  IsUUID,
  IsDate,
  IsOptional,
  IsBoolean,
  IsString,
  Min,
  validateOrReject,
} from 'class-validator';

/**
 * ACL decorator: tag your entity with its resource name
 */
export const ACL_METADATA = new Map<Function, string>();
export function AclResource(name: string) {
  return (ctor: Function) => {
    ACL_METADATA.set(ctor, name);
  };
}

/**
 * BaseEntity: all static entities should extend this.
 * Covers:
 *  - UUID PK
 *  - audit stamps & mod count
 *  - sys_class_name (optional)
 *  - active/protected flags
 *  - built-in validation (.validate())
 */
export abstract class BaseEntity {
  @PrimaryKey({ type: 'uuid' })
  @IsUUID()
  sys_id: string = v4();

  @Property()
  @IsDate()
  sys_created_on: Date = new Date();

  @Property({ length: 40, nullable: true })
  @IsOptional()
  @IsUUID()
  sys_created_by?: string;

  @Property({ onUpdate: () => new Date() })
  @IsDate()
  sys_updated_on: Date = new Date();

  @Property({ length: 40, nullable: true })
  @IsOptional()
  @IsUUID()
  sys_updated_by?: string;

  @Property({ default: 0 })
  @Min(0)
  sys_mod_count: number = 0;

  @Property({ length: 255, nullable: true })
  @IsOptional()
  @IsString()
  sys_class_name?: string;

  @Property({ type: 'boolean', default: true })
  @IsBoolean()
  active: boolean = true;

  @Property({ type: 'boolean', default: false })
  @IsBoolean()
  protected_record: boolean = false;

  @BeforeCreate()
  protected onCreate() {
    this.sys_created_on = new Date();
  }

  @BeforeUpdate()
  protected onUpdate() {
    this.sys_updated_on = new Date();
    this.sys_mod_count++;
  }

  /** Validate all decorated constraints before persisting */
  async validate() {
    await validateOrReject(this, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
  }
}

/**
 * Packaged mixin: for entities with sys_package and sys_scope fields
 */
type Constructor<T = {}> = new (...args: any[]) => T;
export function Packaged<TBase extends Constructor>(Base: TBase) {
  abstract class P extends Base {
    @Property({ length: 32, nullable: true })
    @IsOptional()
    @IsUUID()
    sys_package?: string;

    @Property({ length: 32, nullable: true })
    @IsOptional()
    @IsUUID()
    sys_scope?: string;
  }
  return P;
}

/**
 * DictionaryEntity mixin: for SysDictionary / SysDbObject entries
 */
export function DictionaryEntity<TBase extends Constructor>(Base: TBase) {
  abstract class D extends Base {
    @Property({ length: 100 })
    @IsString()
    column_label: string;

    @Property({ length: 50 })
    @IsString()
    element: string;

    @Property({ length: 255, nullable: true })
    @IsOptional()
    @IsString()
    default_value?: string;
  }
  return D;
}
