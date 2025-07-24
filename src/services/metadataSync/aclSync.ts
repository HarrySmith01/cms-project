// File: src/services/metadataSync/aclSync.ts
// Description: Helpers to create and delete ACLs for tables in CMS.
// Created:     2025-07-25T18:00:00+05:30
// Updated:     2025-07-26T15:30:00+05:30

import { EntityManager } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import {
  SysSecurityAcl,
  SysSecurityAclRole,
  SysSecurityOperation,
  SysUserRole,
} from '../../entities';

/**
 * Create and link all CRUD ACLs for the given table and role.
 */
export async function createAclsForTable(
  rootEm: EntityManager,
  table: string,
  role: SysUserRole
): Promise<void> {
  await rootEm.transactional(async (em) => {
    const crud: Array<'create' | 'read' | 'write' | 'delete'> = [
      'create',
      'read',
      'write',
      'delete',
    ];
    const ops = new Map<string, SysSecurityOperation>();

    // 1️⃣ fetch all operations (must be seeded)
    for (const opName of crud) {
      const op = await em.findOneOrFail(SysSecurityOperation, { name: opName });
      ops.set(opName, op);
    }

    // 2️⃣ for each op, ensure record‐level ACL and (for read/write) field‐level ACL,
    //    then link each to the given role
    for (const opName of crud) {
      const op = ops.get(opName)!;

      // — record ACL: table.None
      let rowAcl = await em.findOne(SysSecurityAcl, {
        name: `${table}.None`,
        operation: op,
      });
      if (!rowAcl) {
        rowAcl = em.create(SysSecurityAcl, {
          sys_id: uuid(),
          name: `${table}.None`,
          type: 'record',
          decision_type: 'allow',
          local_or_existing: 'local',
          operation: op,
          active: true,
        });
        em.persist(rowAcl);
      }
      // link record‐ACL → role
      if (!(await em.findOne(SysSecurityAclRole, { acl: rowAcl, role }))) {
        em.persist(
          em.create(SysSecurityAclRole, { sys_id: uuid(), acl: rowAcl, role })
        );
      }

      // — field‐level ACL: table.* (only for read/write)
      if (opName === 'read' || opName === 'write') {
        let fieldAcl = await em.findOne(SysSecurityAcl, {
          name: `${table}.*`,
          operation: op,
        });
        if (!fieldAcl) {
          fieldAcl = em.create(SysSecurityAcl, {
            sys_id: uuid(),
            name: `${table}.*`,
            type: 'field',
            decision_type: 'allow',
            local_or_existing: 'local',
            operation: op,
            active: true,
          });
          em.persist(fieldAcl);
        }
        // link field‐ACL → role
        if (!(await em.findOne(SysSecurityAclRole, { acl: fieldAcl, role }))) {
          em.persist(
            em.create(SysSecurityAclRole, {
              sys_id: uuid(),
              acl: fieldAcl,
              role,
            })
          );
        }
      }
    }
    // all changes flushed on transaction commit
  });
}

/**
 * Remove all ACLs (and their role links) for the given table.
 */
export async function deleteAclsForTable(
  rootEm: EntityManager,
  table: string
): Promise<void> {
  await rootEm.transactional(async (em) => {
    // find every ACL whose name starts with "table."
    const acls = await em.find(SysSecurityAcl, {
      name: { $like: `${table}.%` },
    });
    for (const acl of acls) {
      // first delete any links
      await em.nativeDelete(SysSecurityAclRole, { acl });
      // then delete the ACL itself
      await em.nativeDelete(SysSecurityAcl, { sys_id: acl.sys_id });
    }
    // transactional wrapper will flush & commit
  });
}
