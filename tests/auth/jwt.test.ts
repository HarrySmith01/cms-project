// File: tests/auth/jwt.test.ts
/**
 * Description: Unit tests for JWT-based session management: generateTokens and refreshAccessToken.
 * Created: July 25, 2025 12:30 IST
 * Updated: July 27, 2025 15:15 IST
 */

import jwt from 'jsonwebtoken';
import { EntityManager } from '@mikro-orm/core';
import * as authService from '../../src/services/auth.service';
import { tableCrud } from '../../src/utils/tableCrud';
import { metadataCache } from '../../src/utils/metadataCache';

jest.mock('jsonwebtoken');
jest.mock('../../src/utils/tableCrud');
jest.mock('../../src/utils/metadataCache');

describe('JWT session management', () => {
  const fakeUser = { sys_id: 'user-123' };
  const em = {} as EntityManager;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('generateTokens', () => {
    it('returns accessToken and refreshToken strings', () => {
      (jwt.sign as jest.Mock)
        .mockReturnValueOnce('access.token.value')
        .mockReturnValueOnce('refresh.token.value');

      const tokens = authService.generateTokens(fakeUser);

      expect(jwt.sign).toHaveBeenCalledTimes(2);
      expect(tokens).toEqual({
        accessToken: 'access.token.value',
        refreshToken: 'refresh.token.value',
      });
    });
  });

  describe('refreshAccessToken', () => {
    it('throws on invalid token', async () => {
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('bad');
      });

      await expect(
        authService.refreshAccessToken(em, 'bad.token')
      ).rejects.toThrow('Invalid or expired refresh token');
      expect(jwt.verify).toHaveBeenCalledWith(
        'bad.token',
        process.env.JWT_SECRET
      );
    });

    it('returns new tokens when refresh token is valid and user exists', async () => {
      const decoded = { sub: 'user-123' };
      (jwt.verify as jest.Mock).mockReturnValue(decoded);
      (metadataCache.ensureCache as jest.Mock).mockResolvedValue(undefined);
      (tableCrud.read as jest.Mock).mockResolvedValue([fakeUser]);
      // Mock jwt.sign to control generateTokens output
      (jwt.sign as jest.Mock)
        .mockReturnValueOnce('new.access')
        .mockReturnValueOnce('new.refresh');

      const tokens = await authService.refreshAccessToken(em, 'valid.token');

      expect(jwt.verify).toHaveBeenCalledWith(
        'valid.token',
        process.env.JWT_SECRET
      );
      expect(metadataCache.ensureCache).toHaveBeenCalledWith(em);
      expect(tableCrud.read).toHaveBeenCalledWith(em, 'SysUser', {
        sys_id: 'user-123',
      });
      expect(tokens).toEqual({
        accessToken: 'new.access',
        refreshToken: 'new.refresh',
      });
    });

    it('throws if user not found', async () => {
      const decoded = { sub: 'missing-user' };
      (jwt.verify as jest.Mock).mockReturnValue(decoded);
      (metadataCache.ensureCache as jest.Mock).mockResolvedValue(undefined);
      (tableCrud.read as jest.Mock).mockResolvedValue([]);

      await expect(
        authService.refreshAccessToken(em, 'valid.token')
      ).rejects.toThrow('User not found');
    });
  });
});
