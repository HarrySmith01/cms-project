// File: src/seeders/InitialSeeder.ts
import { Seeder } from '@mikro-orm/seeder';
import { EntityManager } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import { SysUser } from '../entities/SysUser';
import { SysUserRole } from '../entities/SysUserRole';
import { SysUserHasRole } from '../entities/SysUserHasRole';
import { SysSecurityAcl } from '../entities/SysSecurityAcl';
import { SysSecurityAclRole } from '../entities/SysSecurityAclRole';
import { SysSecurityOperation } from '../entities/SysSecurityOperation';
import { SysProperty } from '../entities/SysProperty';

/* ------------------------------------------------------------------ */
/* helpers                                                            */
/* ------------------------------------------------------------------ */

async function getOrCreateRole(
  em: EntityManager,
  name: string,
  description: string,
  elevated = false
) {
  let role = await em.findOne(SysUserRole, { name });

  if (!role) {
    role = em.create(SysUserRole, {
      sys_id: uuid(),
      name,
      description,
      elevated_privilege: elevated,
    });
    em.persist(role);
  }
  return role;
}

async function upsertUser(
  em: EntityManager,
  userName: string,
  display: string,
  email: string,
  role: SysUserRole
) {
  const pwdHash = await bcrypt.hash('default_password', 10);
  let user = await em.findOne(SysUser, { user_name: userName });

  if (!user) {
    user = em.create(SysUser, {
      sys_id: uuid(),
      user_name: userName,
      name: display,
      email,
      active: true,
      password: pwdHash,
    });
    em.persist(user);
  }

  if (!(await em.findOne(SysUserHasRole, { user, role }))) {
    em.persist(
      em.create(SysUserHasRole, {
        sys_id: uuid(),
        user,
        role,
        inherited: false,
      })
    );
  }
  return user;
}

/** link ACL → role (creates + persists row if missing) */
async function linkRole(
  em: EntityManager,
  acl: SysSecurityAcl,
  role: SysUserRole
) {
  let link = await em.findOne(SysSecurityAclRole, { acl, role });
  if (!link) {
    link = em.create(SysSecurityAclRole, { sys_id: uuid(), acl, role });
    em.persist(link);
  }
  return link;
}

/* ------------------------------------------------------------------ */
/* Seeder                                                             */
/* ------------------------------------------------------------------ */

export class InitialSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    /* 1️⃣  Roles ------------------------------------------------------- */
    const superAdmin = await getOrCreateRole(
      em,
      'super_admin',
      'Super Administrator',
      true
    );
    const admin = await getOrCreateRole(em, 'admin', 'Administrator', true);
    const userRole = await getOrCreateRole(em, 'user', 'Regular User');
    await getOrCreateRole(em, 'guest', 'Guest / Anonymous');

    /* 2️⃣  Users ------------------------------------------------------- */
    const superAdminUser = await upsertUser(
      em,
      'superadmin',
      'Super Administrator',
      'root@example.com',
      superAdmin
    );
    await upsertUser(em, 'admin', 'Administrator', 'admin@example.com', admin);
    await upsertUser(em, 'john.doe', 'John Doe', 'john@example.com', userRole);

    /* 3️⃣  CRUD operations -------------------------------------------- */
    const crud: Array<'create' | 'read' | 'write' | 'delete'> = [
      'create',
      'read',
      'write',
      'delete',
    ];
    const orderMap = {
      create: 10,
      read: 20,
      write: 30,
      delete: 40,
    } as const;
    const opMap = new Map<string, SysSecurityOperation>();

    for (const name of crud) {
      let op = await em.findOne(SysSecurityOperation, { name });
      if (!op) {
        op = em.create(SysSecurityOperation, {
          sys_id: uuid(),
          name,
          order: orderMap[name],
          active: true,
        });
        em.persist(op);
      }
      opMap.set(name, op);
    }

    /* 4️⃣  ACLs -------------------------------------------------------- */
    const adminExcludes = new Set(['sys_db_object', 'sys_dictionary']);

    const tables = Object.values(em.getMetadata().getAll())
      .filter((m) => !m.embeddable && !m.abstract)
      .map((m) => m.collection);

    /** fetch-or-create an ACL */
    const ensureAcl = async (
      name: string,
      type: 'record' | 'field',
      op: SysSecurityOperation,
      condition?: string | null
    ) => {
      let acl = await em.findOne(SysSecurityAcl, { name, operation: op });
      if (!acl) {
        acl = em.create(SysSecurityAcl, {
          sys_id: uuid(),
          name,
          type,
          decision_type: 'allow',
          local_or_existing: 'local',
          admin_overrides: true,
          operation: op,
          active: true,
          condition: condition ?? null,
        });
        em.persist(acl);
      }
      return acl;
    };

    /* 4-A  Global ACLs (*.* and *.None) ------------------------------- */
    for (const op of opMap.values()) {
      const row = await ensureAcl('*.None', 'record', op);
      const fld = await ensureAcl('*.*', 'field', op);
      await linkRole(em, row, superAdmin);
      await linkRole(em, fld, superAdmin);
    }

    /* 4-B  Per-table ACLs -------------------------------------------- */
    for (const table of tables) {
      for (const opName of crud) {
        const op = opMap.get(opName)!;

        /* row (table.None) */
        const rowAcl = await ensureAcl(
          `${table}.None`,
          'record',
          op,
          table === 'sys_user' && opName === 'read' ? 'owner' : null
        );

        /* field wildcard (table.*) for read / write */
        let fldAcl: SysSecurityAcl | undefined;
        if (opName === 'read' || opName === 'write') {
          fldAcl = await ensureAcl(
            `${table}.*`,
            'field',
            op,
            table === 'sys_user' && opName === 'read' ? 'owner' : null
          );
        }

        /* ── role links ─────────────────────────────────────────────── */
        const acls = fldAcl ? [rowAcl, fldAcl] : [rowAcl];

        for (const acl of acls) {
          await linkRole(em, acl, superAdmin);

          if (!adminExcludes.has(table)) {
            await linkRole(em, acl, admin);
          }

          if (table === 'sys_user' && opName === 'read') {
            await linkRole(em, acl, userRole);
          }
        }
      }
    }

    /* 5️⃣  System property ------------------------------------------- */
    if (!(await em.findOne(SysProperty, { name: 'system.timezone' }))) {
      em.persist(
        em.create(SysProperty, {
          sys_id: uuid(),
          name: 'system.timezone',
          value: 'UTC',
          type: 'string',
          sys_created_by: superAdminUser,
          is_private: false,
          ignore_cache: false,
        })
      );
    }

    /* 6️⃣  Flush once ------------------------------------------------- */
    await em.flush();
  }
}
