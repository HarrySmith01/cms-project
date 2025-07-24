// File: src/entities/CmnSchedule.ts
// Description: Represents advanced schedule definitions for documents or jobs.
// Created:     2025-07-26T23:40:00+05:30
// Updated:     2025-07-26T23:40:00+05:30

import { Entity, Property } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';

@AclResource('cmn_schedule')
@Entity({ tableName: 'cmn_schedule' })
export class CmnSchedule extends Packaged(BaseEntity) {
  /** Document reference (optional) */
  @Property({ length: 40, nullable: true })
  document?: string;

  /** Key within the document (optional) */
  @Property({ length: 32, nullable: true })
  document_key?: string;

  /** Human-readable schedule name */
  @Property({ length: 80 })
  name!: string;

  /** Read-only flag */
  @Property({ type: 'boolean', default: false })
  read_only: boolean = false;

  /** Schedule type (optional) */
  @Property({ length: 40, nullable: true })
  type?: string;
}
