// File: src/entities/SysSchemaError.ts
// Description: Captures failed DDL operations so ops can review / retry.
// Created:     2025-07-27T04:30:00+05:30
// Updated:     2025-07-27T04:30:00+05:30

import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';
import { SysDictionary } from './SysDictionary';

@AclResource('sys_schema_error')
@Entity({ tableName: 'sys_schema_error' })
export class SysSchemaError extends Packaged(BaseEntity as any) {
  /** Optional reference to the dictionary row that triggered the failure */
  @ManyToOne(() => SysDictionary, { nullable: true })
  dict!: SysDictionary | null;

  /** The DDL action that failed */
  @Property()
  action!: 'create' | 'update' | 'delete';

  /** Table name involved */
  @Property({ length: 100, nullable: true })
  tableName?: string;

  /** Column name involved */
  @Property({ length: 100, nullable: true })
  columnName?: string;

  /** Full job payload */
  @Property({ type: 'json' })
  payload!: unknown;

  /** Error message */
  @Property({ type: 'text' })
  errorMessage!: string;

  /** Stack trace (optional) */
  @Property({ type: 'text', nullable: true })
  stack?: string;
}
