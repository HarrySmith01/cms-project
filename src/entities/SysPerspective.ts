// File: src/entities/SysPerspective.ts
// Description: Represents perspective configurations in the system.
// Created:     2025-07-27T03:45:00+05:30
// Updated:     2025-07-27T03:45:00+05:30

import { Entity, Property } from '@mikro-orm/core';
import { Packaged, BaseEntity, AclResource } from './BaseEntity';

@AclResource('sys_perspective')
@Entity({ tableName: 'sys_perspective' })
export class SysPerspective extends Packaged(BaseEntity) {
  /** Application identifier (optional) */
  @Property({ length: 40, nullable: true })
  application?: string;

  /** Applications list (optional) */
  @Property({ length: 40, nullable: true })
  applications?: string;

  /** Perspective name (optional) */
  @Property({ length: 40, nullable: true })
  name?: string;

  /** Display order (optional) */
  @Property({ type: 'number', nullable: true })
  order?: number;

  /** Roles allowed (comma-separated, optional) */
  @Property({ length: 40, nullable: true })
  roles?: string;
}
