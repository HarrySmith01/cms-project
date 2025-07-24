// File: tests/metadataSync/aclSync.test.ts
// Description: End-to-end test for table creation/deletion via admin panel,
//              verifying that ACLs are created and removed correctly.
// Created: 2025-07-26T12:30:00+05:30
// Updated: 2025-07-26T12:30:00+05:30

import { v4 as uuid } from 'uuid';
import { initTestOrm, closeTestOrm, getOrm } from '../_utils/ormTestHarness';
import * as tableSync from '../../src/services/metadataSync/tableSync';
import {
  createAclsForTable,
  deleteAclsForTable,
} from '../../src/services/metadataSync/aclSync';
import {
  SysSecurityOperation,
  SysUserRole,
  SysSecurityAcl,
  SysSecurityAclRole,
} from '../../src/entities';

describe('Admin-panel table + ACL workflow', () => {
  const tableName = 'test_table_acl';
  let em = null;
  let conn = null;
  let adminRole: SysUserRole;
  const ops = new Map<string, SysSecurityOperation>();
  const crud = ['create', 'read', 'write', 'delete'] as const;
  const orderMap: Record<(typeof crud)[number], number> = {
    create: 10,
    read: 20,
    write: 30,
    delete: 40,
  };

  beforeAll(async () => {
    await initTestOrm();
    const orm = getOrm();
    em = orm.em.fork();
    conn = em.getConnection();

    // ensure our CRUD operations exist
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
      ops.set(name, op);
    }

    // create a test role (admin)
    adminRole = await em.findOne(SysUserRole, { name: 'admin_test' });
    if (!adminRole) {
      adminRole = em.create(SysUserRole, {
        sys_id: uuid(),
        name: 'admin_test',
        description: 'Temporary admin for ACL tests',
        elevated_privilege: true,
      });
      em.persist(adminRole);
    }

    await em.flush();
  });

  afterAll(async () => {
    await closeTestOrm();
  });

  it('creates table and then ACLs when called via admin panel flow', async () => {
    // 1️⃣ Create the table
    await tableSync.createTable(
      {
        tableName,
        engine: 'InnoDB',
        charset: 'utf8mb4',
        audited: true,
      },
      conn
    );
    expect(await tableSync.hasTable(tableName, conn)).toBe(true);

    // 2️⃣ Create ACLs for that table + role
    await createAclsForTable(em, tableName, adminRole);

    // 3️⃣ Verify record-level ACLs + links
    for (const opName of crud) {
      const op = ops.get(opName)!;
      const recordAcl = await em.findOne(SysSecurityAcl, {
        name: `${tableName}.None`,
        operation: op,
      });
      expect(recordAcl).toBeDefined();

      const link = await em.findOne(SysSecurityAclRole, {
        acl: recordAcl,
        role: adminRole,
      });
      expect(link).toBeDefined();

      // 4️⃣ Verify field-level ACLs & links for read/write
      if (opName === 'read' || opName === 'write') {
        const fieldAcl = await em.findOne(SysSecurityAcl, {
          name: `${tableName}.*`,
          operation: op,
        });
        expect(fieldAcl).toBeDefined();

        const fldLink = await em.findOne(SysSecurityAclRole, {
          acl: fieldAcl,
          role: adminRole,
        });
        expect(fldLink).toBeDefined();
      }
    }
  });

  it('deletes ACLs and drops table when called via admin panel delete flow', async () => {
    // 1️⃣ Delete the ACLs
    await deleteAclsForTable(em, tableName);

    // 2️⃣ Verify no ACLs remain for this table
    const remainingAcls = await em.find(SysSecurityAcl, {
      name: { $like: `${tableName}.%` },
    });
    expect(remainingAcls).toHaveLength(0);

    const remainingLinks = await em.find(SysSecurityAclRole, {
      role: adminRole,
    });
    expect(remainingLinks).toHaveLength(0);

    // 3️⃣ Drop the table
    await tableSync.dropTable(tableName, conn);
    expect(await tableSync.hasTable(tableName, conn)).toBe(false);
  });
});
