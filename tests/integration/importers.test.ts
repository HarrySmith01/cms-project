// Description: End-to-end – run importers twice ⇒ second run does no DDL
import { initTestOrm } from '../_utils/ormTestHarness';
import { importAllTables } from '../../src/services/tableImporter';
import { importAllColumns } from '../../src/services/columnImporter';
import * as tableSync from '../../src/services/metadataSync/tableSync';

process.env.DB_TYPE = 'mysql';

beforeAll(async () => {
  await initTestOrm();
});

test('importAllTables/Columns are idempotent', async () => {
  await importAllTables();
  await importAllColumns();

  const spy = jest.spyOn(tableSync, 'createTable');
  await importAllTables(); // second pass
  expect(spy).not.toHaveBeenCalled();
});
