// File: tests/auth/passport.test.ts
/**
 * Description: Unit tests for Passport.js Local and OAuth2 strategies,
 *              with mocks hoisted before imports to avoid runtime decorator errors.
 * Created: July 25, 2025 09:00 IST
 * Updated: July 25, 2025 10:00 IST
 */

// Hoist mocks before any imports to prevent loading real modules with decorators
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import bcrypt from 'bcrypt';
import { setupPassport } from '../../src/services/auth.service';
import { tableCrud } from '../../src/utils/tableCrud';
import { metadataCache } from '../../src/utils/metadataCache';

jest.mock('../../src/utils/tableCrud');
jest.mock('../../src/utils/metadataCache');
jest.mock('bcrypt');

describe('Passport.js strategies', () => {
  const em: any = {};

  beforeAll(() => {
    setupPassport(em);
  });

  describe('LocalStrategy', () => {
    let strategy: LocalStrategy;

    beforeAll(() => {
      strategy = passport._strategy('local') as LocalStrategy;
      (metadataCache.ensureCache as jest.Mock).mockReset();
      (tableCrud.read as jest.Mock).mockReset();
      (bcrypt.compare as jest.Mock).mockReset();
    });

    test('fails when user not found', (done) => {
      (metadataCache.ensureCache as jest.Mock).mockResolvedValue(undefined);
      (tableCrud.read as jest.Mock).mockResolvedValue([]);
      strategy._verify('alice', 'password', (err, user, info) => {
        expect(err).toBeNull();
        expect(user).toBe(false);
        expect(info?.message).toBe('Incorrect username.');
        done();
      });
    });

    test('fails when password incorrect', (done) => {
      (metadataCache.ensureCache as jest.Mock).mockResolvedValue(undefined);
      (tableCrud.read as jest.Mock).mockResolvedValue([
        { sys_id: '1', password_hash: 'hash' },
      ]);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      strategy._verify('alice', 'wrongpwd', (err, user, info) => {
        expect(err).toBeNull();
        expect(user).toBe(false);
        expect(info?.message).toBe('Incorrect password.');
        done();
      });
    });

    test('succeeds with valid credentials', (done) => {
      const fakeUser = { sys_id: '1', password_hash: 'hash' };
      (metadataCache.ensureCache as jest.Mock).mockResolvedValue(undefined);
      (tableCrud.read as jest.Mock).mockResolvedValue([fakeUser]);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      strategy._verify('alice', 'correctpwd', (err, user, info) => {
        expect(err).toBeNull();
        expect(user).toBe(fakeUser);
        expect(info).toBeUndefined();
        done();
      });
    });
  });

  describe('OAuth2Strategy', () => {
    let oauth2: OAuth2Strategy;

    beforeAll(() => {
      oauth2 = passport._strategy('oauth2') as OAuth2Strategy;
      (metadataCache.ensureCache as jest.Mock).mockReset();
      (tableCrud.read as jest.Mock).mockReset();
      (tableCrud.create as jest.Mock).mockReset();
    });

    test('looks up existing user by external_id', (done) => {
      const profile = { id: 'ext-123', username: 'bob' } as any;
      const existingUser = { sys_id: '2', external_id: 'ext-123' };
      (metadataCache.ensureCache as jest.Mock).mockResolvedValue(undefined);
      (tableCrud.read as jest.Mock).mockResolvedValue([existingUser]);
      oauth2._verify('token', 'refresh', profile, (err, user) => {
        expect(err).toBeNull();
        expect(user).toBe(existingUser);
        done();
      });
    });

    test('creates new user if none found', (done) => {
      const profile = {
        id: 'ext-456',
        username: 'carol',
        displayName: 'Carol',
      } as any;
      const newUser = {
        sys_id: '3',
        external_id: 'ext-456',
        user_name: 'carol',
      };
      (metadataCache.ensureCache as jest.Mock).mockResolvedValue(undefined);
      (tableCrud.read as jest.Mock).mockResolvedValue([]);
      (tableCrud.create as jest.Mock).mockResolvedValue(newUser);
      oauth2._verify('token', 'refresh', profile, (err, user) => {
        expect(err).toBeNull();
        expect(user).toBe(newUser);
        done();
      });
    });
  });
});
