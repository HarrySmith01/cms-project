// File: scripts/debug-entity-load.ts
// Description: Iterates over each discovered entity metadata and attempts to load each one individually,
//              printing out exactly which entity fails in bulk discovery.
// Created: 2025-07-23T19:40:00+05:30
// Updated: 2025-07-26T10:00:00+05:30

import 'dotenv/config';
import { MikroORM, EntityMetadata } from '@mikro-orm/core';
import config from '../mikro-orm.config';

(async () => {
  try {
    const orm = await MikroORM.init(config as any);
    // getAll() returns a Dictionary, so convert to array:
    const allMetaDict = orm.getMetadata().getAll();
    const metas: EntityMetadata<any>[] = Object.values(allMetaDict);
    console.log(
      `🔍 Discovered ${metas.length} entities. Testing one by one...`
    );

    for (const meta of metas) {
      const cls = meta.className;
      try {
        // Force initialization for this entity metadata
        orm.getMetadata().get(cls);
        console.log(`✅  ${cls}`);
      } catch (err: any) {
        console.error(`❌  Failed on ${cls}:`, err.message);
        process.exit(1);
      }
    }

    console.log('🎉  All entities loaded individually without error.');
    await orm.close(true);
    process.exit(0);
  } catch (e: any) {
    console.error('🔴 Bulk discovery error:', e);
    process.exit(1);
  }
})();
