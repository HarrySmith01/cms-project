// File: src/utils/metadataCache.ts
/**
 * Description: Singleton wrapper around the runtime MetadataCache,
 *              providing an `ensureCache` method and delegating lookups.
 * Created: July 25, 2025 02:30 IST
 * Updated: July 25, 2025 08:50 IST
 */

import { EntityManager } from '@mikro-orm/core';
import { MetadataCache as RuntimeCache } from './runtime/MetadataCache';

class MetadataCacheWrapper {
  private cache?: RuntimeCache;

  /**
   * Ensure the runtime cache is initialized and loaded.
   * @param em EntityManager instance
   */
  async ensureCache(em: EntityManager): Promise<void> {
    if (!this.cache) {
      this.cache = new RuntimeCache(em);
      await this.cache.load();
    }
  }

  /** Delegate to RuntimeCache.getTable */
  getTable(tableName: string) {
    return this.cache?.getTable(tableName);
  }

  /** Delegate to RuntimeCache.getColumns */
  getColumns(tableName: string) {
    return this.cache?.getColumns(tableName) || [];
  }

  /** Delegate to RuntimeCache.getMetadata */
  getMetadata(tableName: string) {
    return this.cache?.getMetadata(tableName) || [];
  }
}

export const metadataCache = new MetadataCacheWrapper();
