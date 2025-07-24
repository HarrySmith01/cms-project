// File: src/services/metadataSync/ddlFacade.ts
// Description: Facade for DDL sync; delegates to MySQL or Mongo implementation based on DB_TYPE.
// Created:     2025-07-27T07:55:00+05:30
// Updated:     2025-07-27T07:55:00+05:30

import { mysqlDdlSync } from './mysqlDdlSync';
import { mongoDdlSync } from './mongoDdlSync';

const dbType = process.env.DB_TYPE === 'mongo' ? 'mongo' : 'mysql';

const impl = dbType === 'mongo' ? mongoDdlSync : mysqlDdlSync;

/**
 * Check if a table/collection exists.
 */
export const hasObject = (name: string) => impl.hasObject(name);

/**
 * Create a new table/collection.
 */
export const createObject = (...args: any[]) => impl.createObject(...args);

/**
 * Alter an existing table/collection.
 */
export const alterObject = (payload: any) => impl.alterObject(payload);

/**
 * Drop a table/collection.
 */
export const dropObject = (name: string) => impl.dropObject(name);

/**
 * Sync the full schema (initial).
 */
export const syncSchema = () => impl.syncSchema();

/**
 * Update the schema to match entities.
 */
export const updateSchema = () => impl.updateSchema();
