// File: src/middlewares/acl.middleware.ts
// Description: Express middleware to enforce ACLs by querying SysSecurityAcl entries and
//              evaluating the `script` field when `advanced` is true, using a live DB connection.
// Created:     2025-07-26T17:00 IST
// Updated:     2025-07-25T19:10 IST

import { Request, Response, NextFunction } from 'express';
import { MikroORM } from '@mikro-orm/core';
import { VM } from 'vm2';
import { tableCrud } from '../utils/tableCrud';
import { metadataCache } from '../utils/metadataCache';
import ormConfig from '../../mikro-orm.config';

/**
 * ACL rule structure matching SysSecurityAcl entity columns.
 */
interface AclRule {
  sys_id: string;
  table_name: string;
  operation: string; // e.g. 'read', 'write', 'delete'
  script: string; // JS expression returning true/false
  advanced: boolean; // whether to evaluate the script
  order: number;
  active: boolean;
}

/**
 * Express middleware enforcing table-level ACLs.
 * - If rule.advanced is false => grant immediately.
 * - If rule.advanced is true and script is empty => grant.
 * - Otherwise, run script in VM; true => grant, false => deny.
 */
export async function aclMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // initialize ORM & EM
  const orm = await MikroORM.init(ormConfig);
  const em = orm.em.fork();
  await metadataCache.ensureCache(em);

  try {
    const tableName = req.baseUrl.replace('/api/', '') || '';
    const operation = req.method.toLowerCase();

    // fetch active ACL rules
    const rules = (await tableCrud.read(em, 'SysSecurityAcl', {
      table_name: tableName,
      operation,
      active: true,
    })) as AclRule[];

    // sort by defined order
    rules.sort((a, b) => a.order - b.order);

    // evaluate rules in sequence
    for (const rule of rules) {
      // non-advanced rule => immediate grant
      if (!rule.advanced) {
        await orm.close(true);
        return next();
      }

      // advanced but no script => grant
      if (!rule.script) {
        await orm.close(true);
        return next();
      }

      // run script in sandbox
      const vm = new VM({
        timeout: 100,
        sandbox: { user: req.user, params: req.params, body: req.body },
      });

      let result: unknown;
      try {
        result = vm.run(rule.script);
      } catch {
        // script error => deny
        await orm.close(true);
        return res.status(403).json({ message: 'Access denied by ACL' });
      }

      if (result === true) {
        await orm.close(true);
        return next();
      }

      if (result === false) {
        await orm.close(true);
        return res.status(403).json({ message: 'Access denied by ACL' });
      }
      // else continue to next rule
    }

    // no rule granted access => deny
    await orm.close(true);
    return res.status(403).json({ message: 'Access denied by ACL' });
  } catch (err) {
    await orm.close(true);
    return next(err);
  }
}
