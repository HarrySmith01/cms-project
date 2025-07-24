// Description: Smoke-test for columnSync helpers (requires test DB)
import { initTestOrm, closeTestOrm } from '../../_utils/ormTestHarness';
import * as columnSync from '../../../src/services/metadataSync/columnSync';

beforeAll(async () => {
  await initTestOrm(); // spins up MikroORM test instance
  await columnSync.createColumn({
    tableName: 'x_test',
    columnName: 'foo',
    type: 'int',
    nullable: true,
  });
});

afterAll(async () => {
  await columnSync.dropColumn({ tableName: 'x_test', columnName: 'foo' });
});

test('hasColumn detects existence', async () => {
  const yes = await columnSync.hasColumn({
    tableName: 'x_test',
    columnName: 'foo',
  });
  expect(yes).toBe(true);
});
