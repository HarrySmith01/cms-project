// File: src/entities/SysSecurityOperation.ts
// Description: Entity for ACL operations definitions (sys_security_operation table).
// Created:     2025-07-27T05:25:00+05:30
// Updated:     2025-07-27T05:25:00+05:30

import { Entity, Property } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';

@AclResource('sys_security_operation')
@Entity({ tableName: 'sys_security_operation' })
export class SysSecurityOperation extends Packaged(BaseEntity) {
  /** Operation name (e.g., create, read, update, delete) */
  @Property({ length: 40 })
  name!: string;

  /** Human-readable description */
  @Property({ length: 800, nullable: true })
  description?: string;

  /** Sort order for operations */
  @Property()
  order!: number;

  /** Active flag (inherited default true) */
}
