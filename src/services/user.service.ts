// File: src/services/user.service.ts
// Description: User management services including registration, login (with JWT generation), and account lock/unlock logic.
//              Reads SALT_ROUNDS and MAX_LOGIN_ATTEMPTS from sys_properties.
// Created: 2025-07-25 02:30 IST
// Updated: 2025-07-26 16:00 IST

import { EntityManager } from '@mikro-orm/core';
import bcrypt from 'bcrypt';
import { tableCrud } from '../utils/tableCrud';
import { metadataCache } from '../utils/metadataCache';
import { SysUser } from '../entities/SysUser';
import { generateTokens } from './auth.service';

async function getProperty(
  em: EntityManager,
  name: string,
  defaultValue: string
): Promise<string> {
  const [prop] = (await tableCrud.read(em, 'SysProperty', { name })) as Array<{
    name: string;
    value: string;
  }>;
  return prop?.value ?? defaultValue;
}

export class UserService {
  /**
   * Register a new user with hashed password.
   */
  static async register(
    em: EntityManager,
    userData: Partial<SysUser>
  ): Promise<SysUser> {
    await metadataCache.ensureCache(em);

    // fetch salt rounds from properties (defaults to "10")
    const saltRoundsStr = await getProperty(em, 'user.saltRounds', '10');
    const saltRounds = parseInt(saltRoundsStr, 10);

    const hashed = await bcrypt.hash(userData.password!, saltRounds);
    const payload = { ...userData, password: hashed };
    const user = await tableCrud.create(em, 'SysUser', payload);
    return user as SysUser;
  }

  /**
   * Login a user, enforce lockout on failures, and return JWT tokens.
   */
  static async login(
    em: EntityManager,
    userName: string,
    password: string
  ): Promise<{ user: SysUser; accessToken: string; refreshToken: string }> {
    await metadataCache.ensureCache(em);

    // fetch max attempts from properties (default "5")
    const maxAttemptsStr = await getProperty(em, 'user.maxLoginAttempts', '5');
    const maxAttempts = parseInt(maxAttemptsStr, 10);

    const [user] = (await tableCrud.read(em, 'SysUser', {
      user_name: userName,
    })) as SysUser[];
    if (!user) {
      throw new Error('Invalid credentials');
    }
    if (user.locked_out) {
      throw new Error('Account is locked');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const attempts = (user.login_attempts ?? 0) + 1;
      const updatePayload: any = {
        sys_id: user.sys_id,
        login_attempts: attempts,
      };
      if (attempts >= maxAttempts) {
        updatePayload.locked_out = true;
      }
      await tableCrud.update(em, 'SysUser', updatePayload);
      throw new Error(
        attempts >= maxAttempts
          ? 'Account locked due to too many failed login attempts'
          : 'Invalid credentials'
      );
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
    const updated = await tableCrud.update(em, 'SysUser', {
      sys_id: sysId,
      locked_out: false,
      login_attempts: 0,
    });
    return updated as SysUser;
  }
}

export default UserService;
