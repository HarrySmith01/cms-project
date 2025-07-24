// File: src/services/metadataSync/mongoColumnSync.ts
// Description: MongoDB column helpers (stub – collections are schemaless).
// Created:     2025-07-27T11:00:00+05:30
// Updated:     2025-07-27T11:00:00+05:30

import { Db } from 'mongodb';
import { getMongoDb } from '../../utils/dbContext';

export interface ColumnDefCore {
  tableName: string;
  columnName: string;
  type?: string;
  nullable?: boolean;
  default?: any;
}

/** No-op in Mongo: you can't create or drop schema at the collection level */
export async function hasColumn(def: ColumnDefCore): Promise<boolean> {
  // Mongo is schemaless; always return true
  return true;
}

export async function createColumn(def: ColumnDefCore, db?: Db): Promise<void> {
  // nothing to do: collections accept any fields
}

export async function alterColumn(def: ColumnDefCore, db?: Db): Promise<void> {
  // nothing to do
}

export async function dropColumn(
  def: Pick<ColumnDefCore, 'tableName' | 'columnName'>,
  db?: Db
): Promise<void> {
  // nothing to do
}
