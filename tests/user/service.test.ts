// File: tests/user/service.test.ts
// Description: Unit tests for UserService (register, login, unlock).
// Created: 2025-07-25 17:50 IST
// Updated: 2025-07-25 17:50 IST

import bcrypt from 'bcrypt';
import { EntityManager } from '@mikro-orm/core';
import { UserService } from '../../src/services/user.service';
import { tableCrud } from '../../src/utils/tableCrud';
import { metadataCache } from '../../src/utils/metadataCache';
import { generateTokens } from '../../src/services/auth.service';

// Mock dependencies
jest.mock('../../src/utils/tableCrud');
jest.mock('../../src/utils/metadataCache');
jest.mock('bcrypt');
jest.mock('../../src/services/auth.service');

const mockEm = {} as EntityManager;

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (metadataCache.ensureCache as jest.Mock).mockResolvedValue(undefined);
  });

  describe('register', () => {
    it('hashes password and creates a user', async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (tableCrud.create as jest.Mock).mockResolvedValue({
        sys_id: '1',
        user_name: 'test',
        password: 'hashedPassword',
      });

      const user = await UserService.register(mockEm, {
        user_name: 'test',
        password: 'pass',
      });

      expect(metadataCache.ensureCache).toHaveBeenCalledWith(mockEm);
      expect(bcrypt.hash).toHaveBeenCalledWith('pass', 10);
      expect(tableCrud.create).toHaveBeenCalledWith(mockEm, 'SysUser', {
        user_name: 'test',
        password: 'hashedPassword',
      });
      expect(user).toEqual({
        sys_id: '1',
        user_name: 'test',
        password: 'hashedPassword',
      });
    });
  });

  describe('login', () => {
    it('successfully logs in and returns tokens', async () => {
      const userStub = {
        sys_id: '1',
        user_name: 'test',
        password: 'hashed',
        login_attempts: 0,
        locked_out: false,
      };
      (tableCrud.read as jest.Mock).mockResolvedValue(userStub);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (generateTokens as jest.Mock).mockReturnValue({
        accessToken: 'acc',
        refreshToken: 'ref',
      });

      const result = await UserService.login(mockEm, 'test', 'pass');

      expect(metadataCache.ensureCache).toHaveBeenCalledWith(mockEm);
      expect(tableCrud.read).toHaveBeenCalledWith(mockEm, 'SysUser', {
        user_name: 'test',
      });
      expect(bcrypt.compare).toHaveBeenCalledWith('pass', 'hashed');
      expect(generateTokens).toHaveBeenCalledWith(userStub);
      expect(result).toEqual({
        user: userStub,
        accessToken: 'acc',
        refreshToken: 'ref',
      });
    });

    it('locks account after max failed attempts', async () => {
      const userStub = {
        sys_id: '1',
        user_name: 'test',
        password: 'hashed',
        login_attempts: 4,
        locked_out: false,
      };
      (tableCrud.read as jest.Mock).mockResolvedValue(userStub);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(UserService.login(mockEm, 'test', 'wrong')).rejects.toThrow(
        'Account locked due to too many failed login attempts'
      );

      expect(tableCrud.update).toHaveBeenCalledWith(mockEm, 'SysUser', {
        sys_id: '1',
        locked_out: true,
        login_attempts: 5,
      });
    });
  });

  describe('unlockAccount', () => {
    it('resets lock and attempts', async () => {
      const updatedUser = {
        sys_id: '1',
        locked_out: false,
        login_attempts: 0,
      } as any;
      (tableCrud.update as jest.Mock).mockResolvedValue(updatedUser);

      const result = await UserService.unlockAccount(mockEm, '1');

      expect(metadataCache.ensureCache).toHaveBeenCalledWith(mockEm);
      expect(tableCrud.update).toHaveBeenCalledWith(mockEm, 'SysUser', {
        sys_id: '1',
        locked_out: false,
        login_attempts: 0,
      });
      expect(result).toEqual(updatedUser);
    });
  });
});
