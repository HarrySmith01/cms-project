/* eslint-disable @typescript-eslint/no-explicit-any */

// File: src/utils/typeMapper.ts
// Description: Convert high-level “internal_type” + length/precision flags into
//              concrete MySQL column types.  Used by parsers, diff logic, tests.
// Created: 2025-07-25T18:25:00+05:30
// Updated: 2025-07-25T18:25:00+05:30

export interface DictSnapshot {
  internal_type: string; // e.g. 'string', 'number', …
  max_length?: number;
  precision?: number; // for decimal
  scale?: number; // for decimal
}

/**
 * Map an internal dictionary type to a concrete MySQL column definition.
 * Falls back to TEXT if unknown.
 */
export function mapToSqlType(snap: DictSnapshot): string {
  switch (snap.internal_type) {
    case 'string':
      return `varchar(${snap.max_length ?? 255})`;

    case 'text':
      return 'text';

    case 'number':
      return 'int';

    case 'bigint':
      return 'bigint';

    case 'decimal':
      return `decimal(${snap.precision ?? 18},${snap.scale ?? 2})`;

    case 'boolean':
      return 'boolean';

    case 'date':
      return 'date';

    case 'datetime':
      return 'timestamp';

    case 'json':
      return 'json';

    case 'reference':
      return 'char(32)';

    default:
      return 'text';
  }
}

/** Convenience helper used by worker to build ColumnSpec-like objects */
export function buildColumnSpec(
  snap: DictSnapshot & {
    element: string;
    mandatory: boolean;
    default_value?: any;
  }
) {
  return {
    name: snap.element,
    type: mapToSqlType(snap),
    nullable: !snap.mandatory,
    default: sanitizeDefault(snap.default_value),
  };
}

function sanitizeDefault(
  val: unknown
): string | number | boolean | null | undefined {
  if (val === undefined || val === null) return undefined;
  if (
    typeof val === 'string' ||
    typeof val === 'number' ||
    typeof val === 'boolean'
  )
    return val;
  return undefined; // reject JSON/object defaults for now
}
