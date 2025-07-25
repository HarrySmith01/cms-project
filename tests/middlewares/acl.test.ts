// File: tests/middlewares/acl.test.ts
// Description: Unit tests for ACL enforcement middleware using `script` and `advanced` fields.
// Created:     2025-07-27T10:45 IST
// Updated:     2025-07-25T19:45 IST

import request from 'supertest';
import express, { Request, Response } from 'express';
import { VM } from 'vm2';
import { MikroORM } from '@mikro-orm/core';
import { aclMiddleware } from '../../src/middlewares/acl.middleware';
import { tableCrud } from '../../src/utils/tableCrud';
import { metadataCache } from '../../src/utils/metadataCache';

jest.mock('../../src/utils/tableCrud');
jest.mock('../../src/utils/metadataCache');
jest.mock('vm2');

// Stub MikroORM.init to avoid real DB calls in tests
const mockEm = {} as any;
const mockOrm = {
  em: { fork: () => mockEm },
  close: jest.fn().mockResolvedValue(undefined),
};
jest.spyOn(MikroORM, 'init').mockResolvedValue(mockOrm);

interface AclRule {
  sys_id: string;
  table_name: string;
  operation: string; // e.g. 'get', 'post'
  script: string; // JS expression returning true/false
  advanced: boolean; // whether to evaluate the script
  order: number;
  active: boolean;
}

// helper to build an app with a protected route
function buildApp(rules: AclRule[]) {
  const app = express();
  (metadataCache.ensureCache as jest.Mock).mockResolvedValue(undefined);
  (tableCrud.read as jest.Mock).mockResolvedValue(rules);

  // stub user on request
  app.use((req, _res, next) => {
    (req as any).user = { sys_id: 'u1', roles: [] };
    next();
  });

  app.use(aclMiddleware);
  app.get('/test', (req: Request, res: Response) => res.json({ ok: true }));
  return app;
}

describe('aclMiddleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('allows when advanced=false (no script eval)', async () => {
    const rules: AclRule[] = [
      {
        sys_id: 'r1',
        table_name: 'test',
        operation: 'get',
        script: '',
        advanced: false,
        order: 1,
        active: true,
      },
    ];
    const res = await request(buildApp(rules)).get('/test');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  it('allows when script evaluates to true', async () => {
    (VM as jest.MockedClass<typeof VM>).mockImplementation(
      () => ({ run: () => true }) as any
    );
    const rules: AclRule[] = [
      {
        sys_id: 'r2',
        table_name: 'test',
        operation: 'get',
        script: 'true;',
        advanced: true,
        order: 1,
        active: true,
      },
    ];
    const res = await request(buildApp(rules)).get('/test');
    expect(res.status).toBe(200);
  });

  it('denies when script evaluates to false', async () => {
    (VM as jest.MockedClass<typeof VM>).mockImplementation(
      () => ({ run: () => false }) as any
    );
    const rules: AclRule[] = [
      {
        sys_id: 'r3',
        table_name: 'test',
        operation: 'get',
        script: 'false;',
        advanced: true,
        order: 1,
        active: true,
      },
    ];
    const res = await request(buildApp(rules)).get('/test');
    expect(res.status).toBe(403);
    expect(res.body).toEqual({ message: 'Access denied by ACL' });
  });

  it('denies when no rule grants access', async () => {
    const res = await request(buildApp([])).get('/test');
    expect(res.status).toBe(403);
    expect(res.body).toEqual({ message: 'Access denied by ACL' });
  });
});
