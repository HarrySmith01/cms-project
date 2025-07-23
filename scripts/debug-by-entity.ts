// scripts/debug-by-entity.ts
// Description: Load each entity in isolation to find which one has a broken relation.
// Created: 2025-07-23T18:30:00+05:30
// Updated: 2025-07-23T19:15:00+05:30
// @ts-nocheck

import 'dotenv/config';
import * as glob from 'glob';
import path from 'path';
import { MikroORM } from '@mikro-orm/core';
import config from '../mikro-orm.config';

(async () => {
  const files = glob.sync(path.resolve(__dirname, '../src/entities/**/*.ts'));
  for (const file of files) {
    try {
      const mod = await import(file);
      for (const exp of Object.values(mod)) {
        if (typeof exp === 'function') {
          process.stdout.write(`Testing entity ${exp.name}… `);
          // try init with just that one entity
          await MikroORM.init({ ...config, entities: [exp] });
          console.log('OK');
        }
      }
    } catch (err: any) {
      console.error('\n❌  Failure loading file:', file);
      console.error('   Error:', err.message);
      console.error(err.stack);
      process.exit(1);
    }
  }
  console.log('\n🎉  All entities loaded successfully.');
  process.exit(0);
})();
