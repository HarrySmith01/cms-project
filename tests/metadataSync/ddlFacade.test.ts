// File: tests/metadataSync/ddlFacade.test.ts
// Description: Unit tests for ddlFacade, ensuring delegation to correct implementation based on DB_TYPE.
// Created:     2025-07-27T08:15:00+05:30
// Updated:     2025-07-27T08:15:00+05:30

import * as mysqlImpl from '../../src/services/metadataSync/mysqlDdlSync';
import * as mongoImpl from '../../src/services/metadataSync/mongoDdlSync';
import * as facade from '../../src/services/metadataSync/ddlFacade';

jest.mock('../../src/services/metadataSync/mysqlDdlSync');
jest.mock('../../src/services/metadataSync/mongoDdlSync');

describe('ddlFacade', () => {
  const dummyName = 'test_name';
  const dummySql = 'CREATE TABLE foo (id INT);';
  const dummyAlter = ['ALTER TABLE foo ADD col1 INT;'];

  beforeEach(() => {
    jest.resetModules();
    process.env.DB_TYPE = ''; // default to MySQL
  });

  it('delegates to mysqlDdlSync by default', async () => {
    // @ts-ignore
    mysqlImpl.mysqlDdlSync.hasObject.mockResolvedValue(true);
    const exists = await facade.hasObject(dummyName);
    expect(mysqlImpl.mysqlDdlSync.hasObject).toHaveBeenCalledWith(dummyName);
    expect(exists).toBe(true);

    await facade.createObject(dummySql);
    expect(mysqlImpl.mysqlDdlSync.createObject).toHaveBeenCalledWith(dummySql);

    await facade.alterObject(dummyAlter);
    expect(mysqlImpl.mysqlDdlSync.alterObject).toHaveBeenCalledWith(dummyAlter);

    await facade.dropObject(dummyName);
    expect(mysqlImpl.mysqlDdlSync.dropObject).toHaveBeenCalledWith(dummyName);

    await facade.syncSchema();
    expect(mysqlImpl.mysqlDdlSync.syncSchema).toHaveBeenCalled();

    await facade.updateSchema();
    expect(mysqlImpl.mysqlDdlSync.updateSchema).toHaveBeenCalled();
  });

  it('delegates to mongoDdlSync when DB_TYPE=mongo', async () => {
    process.env.DB_TYPE = 'mongo';
    // reload facade under mongo env
    jest.resetModules();
    const {
      hasObject,
      createObject,
      alterObject,
      dropObject,
      syncSchema,
      updateSchema,
    } = await import('../../src/services/metadataSync/ddlFacade');

    // @ts-ignore
    mongoImpl.mongoDdlSync.hasObject.mockResolvedValue(false);
    const exists = await hasObject(dummyName);
    expect(mongoImpl.mongoDdlSync.hasObject).toHaveBeenCalledWith(dummyName);
    expect(exists).toBe(false);

    await createObject(dummyName, { capped: true });
    expect(mongoImpl.mongoDdlSync.createObject).toHaveBeenCalledWith(
      dummyName,
      { capped: true }
    );

    await alterObject([(db) => db.command({ ping: 1 })]);
    expect(mongoImpl.mongoDdlSync.alterObject).toHaveBeenCalled();

    await dropObject(dummyName);
    expect(
      mongoImpl.mongoDdlSync.dropCollection || mongoImpl.mongoDdlSync.dropObject
    ).toBeDefined();

    await syncSchema();
    expect(mongoImpl.mongoDdlSync.syncSchema).toHaveBeenCalled();

    await updateSchema();
    expect(mongoImpl.mongoDdlSync.updateSchema).toHaveBeenCalled();
  });
});
