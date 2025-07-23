/* eslint-disable import/prefer-default-export */
/**
 * File: src/entities/RollbackContext.ts
 * Description: Placeholder for rollback context referenced by batch install plans.
 * Created: 2025-07-23T16:10:00+05:30
 * Updated: 2025-07-23T16:10:00+05:30
 */
import { Entity, PrimaryKey } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';

@Entity({ tableName: 'sys_rollback_context' })
export class RollbackContext {
  @PrimaryKey({ type: 'uuid' })
  sys_id: string = uuid();
  // add real fields later
}
