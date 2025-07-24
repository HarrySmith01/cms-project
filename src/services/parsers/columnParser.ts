/* eslint-disable @typescript-eslint/no-explicit-any */

// File: src/services/parsers/columnParser.ts
// Description: Parses XLSX or XML column definition files into ColumnDef objects used for importing to sys_dictionary.
// Created: 2025-07-24T02:45:00+05:30
// Updated: 2025-07-24T02:45:00+05:30

import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';
import { XMLParser } from 'fast-xml-parser';

/**
 * Column definition interface representing metadata for a database column.
 */
export interface ColumnDef {
  tableName: string; // parent table name
  columnName: string; // column name
  type: string; // SQL type, e.g. "varchar(255)"
  nullable: boolean;
  default?: string;
  label?: string;
  referenceTable?: string;
  // add more properties as needed
}

/**
 * Parse a single XLSX file into a ColumnDef[].
 * Assumes first sheet, header row matching ColumnDef keys; one row per column.
 */
function parseXlsx(filePath: string): ColumnDef[] {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows: any[] = xlsx.utils.sheet_to_json(sheet, { defval: null });

  return rows.map((row) => ({
    tableName: String(row.tableName || row.table_name),
    columnName: String(row.columnName || row.column_name),
    type: String(row.type),
    nullable: row.nullable != null ? Boolean(row.nullable) : false,
    default: row.default != null ? String(row.default) : undefined,
    label: row.label ? String(row.label) : undefined,
    referenceTable: row.referenceTable ? String(row.referenceTable) : undefined,
  }));
}

/**
 * Parse a single XML file into a ColumnDef[].
 * Expects root <columns><column>…</column></columns>.
 */
function parseXml(filePath: string): ColumnDef[] {
  const xmlData = fs.readFileSync(filePath, 'utf-8');
  const parser = new XMLParser({ ignoreAttributes: false });
  const jsonObj = parser.parse(xmlData);
  const columns = jsonObj.columns?.column;
  if (!columns) {
    throw new Error(
      `Invalid XML format, missing <columns><column> at ${filePath}`
    );
  }

  const items = Array.isArray(columns) ? columns : [columns];
  return items.map((col: any) => ({
    tableName: col.tableName || col.table_name,
    columnName: col.columnName || col.column_name,
    type: col.type,
    nullable: col.nullable === 'true' || col.nullable === true,
    default: col.default,
    label: col.label,
    referenceTable: col.referenceTable,
  }));
}

/**
 * Parses a column definition file (XLSX or XML) at the given path.
 * @param filePath Path to the .xlsx/.xml file.
 */
export function parseColumnFile(filePath: string): ColumnDef[] {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.xlsx' || ext === '.xls') {
    return parseXlsx(filePath);
  }
  if (ext === '.xml') {
    return parseXml(filePath);
  }
  throw new Error(`Unsupported file extension for column definition: ${ext}`);
}

/**
 * Load and parse all column definition files in a directory.
 * @param dirPath Path to the /definitions/columns directory.
 */
export function loadColumnDefs(dirPath: string): ColumnDef[] {
  const files = fs.readdirSync(dirPath);
  return files
    .filter((f) =>
      ['.xlsx', '.xls', '.xml'].includes(path.extname(f).toLowerCase())
    )
    .flatMap((f) => parseColumnFile(path.join(dirPath, f)));
}
