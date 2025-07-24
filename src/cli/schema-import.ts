/* eslint-disable no-console */
// File: src/cli/schema-import.ts
// Description: CLI entry → `npm run import:tables` / `import:columns`
// Created: 2025-07-24T03:00:00+05:30
// Updated: 2025-07-25T20:05:00+05:30

import 'reflect-metadata';
import { ormInit } from '../utils/orm-init'; // ← fixed path
import { importAllTables } from '../services/tableImporter';
import { importAllColumns } from '../services/columnImporter';

(async () => {
  await ormInit(); // bootstrap ORM once

  const mode = process.argv[2];
  switch (mode) {
    case 'tables':
      console.log('⏳ Importing tables …');
      await importAllTables();
      console.log('✅ Tables imported.');
      break;

    case 'columns':
      console.log('⏳ Importing columns …');
      await importAllColumns();
      console.log('✅ Columns imported.');
      break;

    default:
      console.error('Usage: import tables|columns');
      process.exit(1);
  }

  process.exit(0);
})();
