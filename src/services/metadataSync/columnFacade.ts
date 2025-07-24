// File: src/services/metadataSync/columnFacade.ts
// Description: Delegates column DDL to MySQL or Mongo implementations.
// Created:     2025-07-27T11:00:00+05:30
// Updated:     2025-07-27T12:00:00+05:30

import {
  ColumnDefCore as MySqlColumnDefCore,
  hasColumn as mysqlHasColumn,
  createColumn as mysqlCreateColumn,
  alterColumn as mysqlAlterColumn,
  dropColumn as mysqlDropColumn,
} from './mysqlColumnSync';
import {
  ColumnDefCore as MongoColumnDefCore,
  hasColumn as mongoHasColumn,
  createColumn as mongoCreateColumn,
  alterColumn as mongoAlterColumn,
  dropColumn as mongoDropColumn,
} from './mongoColumnSync';

type ColumnDefCore = MySqlColumnDefCore | MongoColumnDefCore;

/** Pick the right implementation based on DB_TYPE */
const isMongo = process.env.DB_TYPE === 'mongo';

/** Does this column exist? */
export function hasColumn(def: ColumnDefCore, conn?: any): Promise<boolean> {
  return isMongo
    ? mongoHasColumn(def as MongoColumnDefCore, conn)
    : mysqlHasColumn(def as MySqlColumnDefCore, conn);
}

/** Add a column */
export function createColumn(def: ColumnDefCore, conn?: any): Promise<void> {
  return isMongo
    ? mongoCreateColumn(def as MongoColumnDefCore, conn)
    : mysqlCreateColumn(def as MySqlColumnDefCore, conn);
}

/** Alter an existing column */
export function alterColumn(def: ColumnDefCore, conn?: any): Promise<void> {
  return isMongo
    ? mongoAlterColumn(def as MongoColumnDefCore, conn)
    : mysqlAlterColumn(def as MySqlColumnDefCore, conn);
}

/** Drop a column */
export function dropColumn(
  def: Pick<ColumnDefCore, 'tableName' | 'columnName'>,
  conn?: any
): Promise<void> {
  return isMongo
    ? mongoDropColumn(
        def as Pick<MongoColumnDefCore, 'tableName' | 'columnName'>,
        conn
      )
    : mysqlDropColumn(
        def as Pick<MySqlColumnDefCore, 'tableName' | 'columnName'>,
        conn
      );
}
