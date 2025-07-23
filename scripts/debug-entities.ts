// scripts/debug-entities.ts
// @ts-nocheck
/**
 * Quick script to discover which entities MikroORM can load.
 * Created: 2025-07-23T12:30:00+05:30
 * Updated: 2025-07-23T13:15:00+05:30
 */

import 'dotenv/config';
import { MikroORM, EntityMetadata } from '@mikro-orm/core';
import config from '../mikro-orm.config';

(async () => {
  try {
    const orm = await MikroORM.init(config);
    console.log('✅  Loaded entities:');
    const all = orm.getMetadata().getAll();

    if (Array.isArray(all)) {
      all.forEach((meta: EntityMetadata) => {
        console.log('   –', meta.className);
      });
    } else if (all instanceof Map) {
      for (const [name] of all) {
        console.log('   –', name);
      }
    } else {
      Object.values(all).forEach((meta: any) => {
        console.log('   –', meta.className);
      });
    }

    await orm.close(true);
  } catch (e) {
    console.error('❌  Error during entity discovery:');
    console.error(e);
    process.exit(1);
  }
})();
