// File: src/services/metadataSync/mongoDdlSync.ts
// Description: DDL sync implementation for MongoDB using MikroORM’s Mongo driver.
// Created:     2025-07-27T07:40:00+05:30
// Updated:     2025-07-27T07:40:00+05:30

import { MongoEntityManager } from '@mikro-orm/mongodb';
import { getMongoEm } from '../../utils/dbContext';

export class MongoDdlSync {
  private em: MongoEntityManager;

  constructor() {
    this.em = getMongoEm();
  }

  /**
   * Check if a collection exists in the database.
   */
  async hasObject(collectionName: string): Promise<boolean> {
    const names = await this.em
      .getDriver()
      .getConnection()
      .listCollections()
      .toArray();
    return names.some((coll) => coll.name === collectionName);
  }

  /**
   * Create a new collection with optional options.
   */
  async createObject(
    collectionName: string,
    options: object = {}
  ): Promise<void> {
    await this.em
      .getDriver()
      .getConnection()
      .createCollection(collectionName, options);
  }

  /**
   * Alter a collection (e.g., add indexes) via raw driver calls.
   * Expects an array of functions that receive the native Db.
   */
  async alterObject(actions: Array<(db: any) => Promise<void>>): Promise<void> {
    const db = this.em.getDriver().getConnection();
    for (const action of actions) {
      await action(db);
    }
  }

  /**
   * Drop a collection if it exists.
   */
  async dropObject(collectionName: string): Promise<void> {
    await this.em.getDriver().getConnection().dropCollection(collectionName);
  }

  /**
   * Generate schema for all registered entities (noop for Mongo in MikroORM).
   */
  async syncSchema(): Promise<void> {
    // MongoDB is schemaless; nothing to do here.
  }

  /**
   * Update schema--also noop for Mongo.
   */
  async updateSchema(): Promise<void> {
    // Schemaless
  }
}

export const mongoDdlSync = new MongoDdlSync();
