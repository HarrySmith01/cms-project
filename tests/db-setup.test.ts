// Path: tests/db-setup.test.ts
// Description: Jest test to verify MySQL and MongoDB connectivity.
// Created: 2025-07-23T17:05:00+05:30
import { testMySQL, testMongo } from './db-connect-test';

describe('DB Environment Connectivity', () => {
  it('connects to MySQL without errors', async () => {
    await expect(testMySQL()).resolves.not.toThrow();
  }, 8000);

  it('connects to MongoDB without errors', async () => {
    await expect(testMongo()).resolves.not.toThrow();
  }, 8000);
});
