// File: src/config/MikroColumnNaming.ts
// Description: Custom MikroORM naming strategy to override default foreign key suffix behavior.
//              Ensures reference fields use original name (e.g., role instead of role_sys_id).
// Created: 2025-07-27 22:35 IST
// Updated: 2025-07-27 23:30 IST

import { UnderscoreNamingStrategy } from '@mikro-orm/core';

export default class MikroColumnNaming extends UnderscoreNamingStrategy {
  /**
   * Override join column name used for foreign keys.
   * Prevents adding "_id" or "_sys_id" suffixes.
   */
  joinColumnName(propertyName: string): string {
    return propertyName;
  }

  /**
   * Optional: override pivot table FK column names too.
   */
  joinKeyColumnName(prop: string): string {
    return prop;
  }

  /**
   * Optional: override FK constraint names if needed.
   */
  foreignKeyName(entityName: string, propertyName: string): string {
    return `${entityName.toLowerCase()}_${propertyName}_fk`;
  }
}
