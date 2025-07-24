/* eslint-disable @typescript-eslint/no-explicit-any */

// File: src/services/parsers/tableParser.ts
// Description: Parses XLSX or XML table definition files into TableDef objects used for importing to sys_db_object.
// Created: 2025-07-24T02:15:00+05:30
// Updated: 2025-07-24T02:15:00+05:30

import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';
import { XMLParser } from 'fast-xml-parser';

/**
 * Table definition interface representing metadata for a database table.
 */
export interface TableDef {
  tableName: string;
  label: string;
  description?: string;
  extends?: string;
  engine?: string;
  charset?: string;
  audited?: boolean;
  // add more properties as needed
}

/**
 * Parse a single XLSX file into a TableDef.
 * Assumes first sheet with header row containing matching keys.
 */
function parseXlsx(filePath: string): TableDef {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows: any[] = xlsx.utils.sheet_to_json(sheet, { defval: null });

  if (!rows.length) {
    throw new Error(`No data found in XLSX file: ${filePath}`);
  }

  // Take first row as definition
  const row = rows[0];
  return {
    tableName: String(row.tableName || row.table_name),
    label: String(row.label || ''),
    description: row.description ? String(row.description) : undefined,
    extends: row.extends ? String(row.extends) : undefined,
    engine: row.engine ? String(row.engine) : undefined,
    charset: row.charset ? String(row.charset) : undefined,
    audited: row.audited != null ? Boolean(row.audited) : undefined,
  };
}

/**
 * Parse a single XML file into a TableDef.
 * Expects root <table> with child elements matching TableDef keys.
 */
function parseXml(filePath: string): TableDef {
  const xmlData = fs.readFileSync(filePath, 'utf-8');
  const parser = new XMLParser({ ignoreAttributes: false });
  const jsonObj = parser.parse(xmlData);
  const tbl = jsonObj.table || jsonObj.Table;

  if (!tbl) {
    throw new Error(`Invalid XML format, missing <table> root: ${filePath}`);
  }

  return {
    tableName: tbl.tableName || tbl.table_name,
    label: tbl.label,
    description: tbl.description,
    extends: tbl.extends,
    engine: tbl.engine,
    charset: tbl.charset,
    audited: tbl.audited != null ? tbl.audited === 'true' : undefined,
  };
}

/**
 * Parses a table definition file (XLSX or XML) at the given path.
 * @param filePath Absolute or relative path to the definition file.
 * @returns TableDef object representing the metadata.
 */
export function parseTableFile(filePath: string): TableDef {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.xlsx' || ext === '.xls') {
    return parseXlsx(filePath);
  }
  if (ext === '.xml') {
    return parseXml(filePath);
  }
  throw new Error(`Unsupported file extension for table definition: ${ext}`);
}

/**
 * Load and parse all table definition files in a directory.
 * @param dirPath Path to the /definitions/tables directory.
 */
export function loadTableDefs(dirPath: string): TableDef[] {
  const files = fs.readdirSync(dirPath);
  return files
    .filter((f) =>
      ['.xlsx', '.xls', '.xml'].includes(path.extname(f).toLowerCase())
    )
    .map((f) => parseTableFile(path.join(dirPath, f)));
}
