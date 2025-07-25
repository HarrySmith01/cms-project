// File: src/middlewares/elevated.middleware.ts
// Description: Express middleware for elevated authentication on /api/meta/* endpoints.
//              Enforces IP whitelist (from sys_properties or .env) and 'security_admin' role.
// Created:     2025-07-25T19:55 IST
// Updated:     2025-07-25T20:30 IST

import { Request, Response, NextFunction } from 'express';
import { MikroORM } from '@mikro-orm/core';
import { tableCrud } from '../utils/tableCrud';
import { metadataCache } from '../utils/metadataCache';
import ormConfig from '../../mikro-orm.config';

/** Middleware to enforce elevated authentication for /api/meta/* endpoints.
    Step 1: Capture the true client IP (handles proxies).

    Step 2: Look up the allowed_ip_for_security_admin property in sys_properties:

        2A.i if active & non-empty → enforce that list

        2A.ii if inactive or empty → skip IP checks

        2B if no DB record but IP_WHITELIST exists in .env → enforce env list

        2C neither DB nor env → skip IP checks

    Step 3: If a whitelist array exists, deny any IP not in the list.

    Step 4: Require the user to have the security_admin role.

    Step 5: Success path.

    Step 6: Catch-all error handler.

Let me know when you’d like to attach this to your router (Task 2) or if you’d like any further tweaks!
* */

export async function elevatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // WORKFLOW STEP 0: Initialize ORM & EntityManager, load metadata
  const orm = await MikroORM.init(ormConfig);
  const em = orm.em.fork();
  await metadataCache.ensureCache(em);

  try {
    // WORKFLOW STEP 1: Determine client IP
    //   - Use X-Forwarded-For header if present, else req.ip
    const forwarded = (req.headers['x-forwarded-for'] as string) || '';
    const clientIp = forwarded.split(',')[0]?.trim() || req.ip;

    // WORKFLOW STEP 2: Retrieve whitelist property from DB
    //   if record exists (regardless of active flag), props.length > 0
    const props = (await tableCrud.read(em, 'SysProperties', {
      name: 'allowed_ip_for_security_admin',
    })) as Array<{ value: string; active: boolean }>;

    let whitelist: string[] | null;

    if (props.length > 0) {
      // WORKFLOW STEP 2A: Property exists in DB
      const prop = props[0];

      if (prop.active && prop.value.trim()) {
        // 2A.i: DB property is active AND has non-empty value
        // → use this list for IP checks
        //    parse comma-separated IPs into array
        whitelist = prop.value
          .split(',')
          .map((ip) => ip.trim())
          .filter(Boolean);
      } else {
        // 2A.ii: DB property is either inactive OR value is empty
        // → skip IP checking entirely
        whitelist = null;
      }
    } else if (process.env.IP_WHITELIST?.trim()) {
      // WORKFLOW STEP 2B: No DB property, but .env variable exists & non-empty
      // → parse and use that list
      whitelist = process.env.IP_WHITELIST.split(',')
        .map((ip) => ip.trim())
        .filter(Boolean);
    } else {
      // WORKFLOW STEP 2C: Neither DB property nor env var configured
      // → skip IP checking entirely
      whitelist = null;
    }

    // WORKFLOW STEP 3: Enforce IP whitelist (if one is defined)
    if (whitelist && whitelist.length > 0) {
      // 3A: whitelist defined, so client IP must appear in it
      if (!whitelist.includes(clientIp)) {
        await orm.close(true);
        return res.status(403).json({ message: 'IP not allowed' });
      }
      // else 3B: client IP is allowed → continue
    }
    // else 3C: no whitelist defined → skip IP enforcement

    // WORKFLOW STEP 4: Enforce elevated role
    //   only users with 'security_admin' in req.user.roles
    const userRoles: string[] = (req.user as any)?.roles || [];
    if (!userRoles.includes('security_admin')) {
      await orm.close(true);
      return res
        .status(403)
        .json({ message: 'User lacks security_admin role' });
    }

    // WORKFLOW STEP 5: All checks passed → grant access
    await orm.close(true);
    return next();
  } catch (err) {
    // WORKFLOW STEP 6: On error, close ORM and forward error
    await orm.close(true);
    return next(err);
  }
}
