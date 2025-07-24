// File: src/utils/orm-init.ts
// Description: Singleton MikroORM bootstrap so other modules can reuse the
//              same ORM/connection without re-initialising each time.
// Created: 2025-07-25T19:10:00+05:30
// Updated: 2025-07-25T19:10:00+05:30

import 'reflect-metadata'; // required by MikroORM
import { MikroORM } from '@mikro-orm/core';
import config from '../../mikro-orm.config'; // adjust path if your config lives elsewhere

let ormInstance: MikroORM | null = null;

/**
 * Initialise (lazy) and return the singleton MikroORM instance.
 * Usage:
 *   const orm = await ormInit();
 *   orm.em.getConnection()…
 */
export async function ormInit(): Promise<MikroORM> {
  if (!ormInstance) {
    ormInstance = await MikroORM.init(config);
  }
  return ormInstance;
}

/**
 * Convenience export (may be undefined until ormInit() is awaited).
 * Only use after calling ormInit() at least once in app bootstrap.
 */
export const orm = new Proxy<Partial<MikroORM>>({} as MikroORM, {
  get(_, prop) {
    if (!ormInstance) throw new Error('Call ormInit() before using orm');
    // @ts-expect-error – dynamic Proxy typing
    return ormInstance[prop];
  },
});
