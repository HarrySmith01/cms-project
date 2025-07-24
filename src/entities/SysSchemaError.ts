// File: src/entities/SysSchemaError.ts
// Description: Captures failed DDL operations so ops can review / retry.
// Created: 2025-07-25T18:10:00+05:30
// Updated: 2025-07-25T18:10:00+05:30

import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { SysDictionary } from './SysDictionary';

@Entity({ tableName: 'sys_schema_error' })
export class SysSchemaError {
  @PrimaryKey()
  id: string = uuid();

  /** Optional reference to the dictionary row that triggered the failure */
  @ManyToOne(() => SysDictionary, { nullable: true })
  dict!: SysDictionary | null;

  @Property()
  action!: 'create' | 'update' | 'delete';

  @Property({ nullable: true })
  tableName?: string;

  @Property({ nullable: true })
  columnName?: string;

  @Property({ type: 'json' })
  payload!: unknown; // full job payload

  @Property({ type: 'text' })
  errorMessage!: string;

  @Property({ type: 'text', nullable: true })
  stack?: string;

  @Property({ defaultRaw: 'CURRENT_TIMESTAMP' })
  createdAt: Date = new Date();
}
