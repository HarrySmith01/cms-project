// File: src/services/user.service.ts
// Description: User management services including registration, login (with JWT generation), and account lock/unlock logic.
// Created: 2025-07-25 02:30 IST
// Updated: 2025-07-25 19:05 IST

import { EntityManager } from '@mikro-orm/core';
import bcrypt from 'bcrypt';
import { tableCrud } from '../utils/tableCrud';
import { metadataCache } from '../utils/metadataCache';
import { SysUser } from '../entities/SysUser';
import { generateTokens } from './auth.service';

export class UserService {
  private static SALT_ROUNDS = 10;

  private static MAX_LOGIN_ATTEMPTS = 5;

  /**
   * Register a new user with hashed password.
   */
  static async register(
    em: EntityManager,
    userData: Partial<SysUser>
  ): Promise<SysUser> {
    await metadataCache.ensureCache(em);
    const hashed = await bcrypt.hash(userData.password!, this.SALT_ROUNDS);
    // build a new payload instead of mutating userData
    const payload = {
      ...userData,
      password: hashed,
    };
    const user = await tableCrud.create(em, 'SysUser', payload);
    return user;
  }

  /**
   * Login a user, enforce lockout on repeated failures, and return JWTs.
   */
  static async login(
    em: EntityManager,
    userName: string,
    password: string
  ): Promise<{ user: SysUser; accessToken: string; refreshToken: string }> {
    await metadataCache.ensureCache(em);
    const user = (await tableCrud.read(em, 'SysUser', {
      user_name: userName,
    })) as SysUser;
    if (!user) {
      throw new Error('Invalid credentials');
    }
    if (user.locked_out) {
      throw new Error('Account is locked');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const attempts = (user.login_attempts ?? 0) + 1;
      if (attempts >= this.MAX_LOGIN_ATTEMPTS) {
        await tableCrud.update(em, 'SysUser', {
          sys_id: user.sys_id,
          locked_out: true,
          login_attempts: attempts,
        });
        throw new Error('Account locked due to too many failed login attempts');
      } else {
        await tableCrud.update(em, 'SysUser', {
          sys_id: user.sys_id,
          login_attempts: attempts,
        });
        throw new Error('Invalid credentials');
      }
    }
    // reset attempts on successful login
    if (user.login_attempts && user.login_attempts > 0) {
      await tableCrud.update(em, 'SysUser', {
        sys_id: user.sys_id,
        login_attempts: 0,
      });
    }

    // Generate JWT tokens
    const { accessToken, refreshToken } = generateTokens(user);

    return { user, accessToken, refreshToken };
  }

  /**
   * Unlock a locked user account and reset login attempts.
   */
  static async unlockAccount(
    em: EntityManager,
    sysId: string
  ): Promise<SysUser> {
    await metadataCache.ensureCache(em);
    const user = (await tableCrud.update(em, 'SysUser', {
      sys_id: sysId,
      locked_out: false,
      login_attempts: 0,
    })) as SysUser;
    return user;
  }
}

export default UserService;
