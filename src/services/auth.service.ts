// File: src/services/auth.service.ts
/**
 * Description: Extends authentication service with JWT-based session management:
 *              generateTokens and refreshAccessToken using tableCrud and metadataCache,
 *              with separate error handling for invalid tokens vs. missing users.
 * Created: July 25, 2025 00:10 IST
 * Updated: July 27, 2025 14:45 IST
 */

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { EntityManager } from '@mikro-orm/core';
import { tableCrud } from '../utils/tableCrud';
import { metadataCache } from '../utils/metadataCache';

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '1d';
const JWT_SECRET = process.env.JWT_SECRET!;

export function setupPassport(em: EntityManager) {
  // Local (Basic) authentication
  passport.use(
    'local',
    new LocalStrategy(
      { usernameField: 'username', passwordField: 'password' },
      async (username, password, done) => {
        try {
          await metadataCache.ensureCache(em);
          const users = await tableCrud.read(em, 'SysUser', {
            user_name: username,
          });
          const user = users[0];
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          const match = await bcrypt.compare(password, user.password_hash);
          if (!match) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        } catch (err) {
          return done(err as Error);
        }
      }
    )
  );

  // OAuth2 authentication
  passport.use(
    'oauth2',
    new OAuth2Strategy(
      {
        authorizationURL: process.env.OAUTH2_AUTH_URL!,
        tokenURL: process.env.OAUTH2_TOKEN_URL!,
        clientID: process.env.OAUTH2_CLIENT_ID!,
        clientSecret: process.env.OAUTH2_CLIENT_SECRET!,
        callbackURL: process.env.OAUTH2_CALLBACK_URL!,
      },
      async (accessToken, refreshToken, profile: any, done) => {
        try {
          await metadataCache.ensureCache(em);
          const users = await tableCrud.read(em, 'SysUser', {
            external_id: profile.id,
          });
          let user = users[0];
          if (!user) {
            user = await tableCrud.create(em, 'SysUser', {
              user_name: profile.username || profile.displayName,
              external_id: profile.id,
            });
          }
          return done(null, user);
        } catch (err) {
          return done(err as Error);
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.sys_id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      await metadataCache.ensureCache(em);
      const users = await tableCrud.read(em, 'SysUser', { sys_id: id });
      return done(null, users[0] || null);
    } catch (err) {
      return done(err as Error);
    }
  });
}

/**
 * Generate access and refresh JWT tokens for the given user.
 */
export function generateTokens(user: any) {
  const payload = { sub: user.sys_id };
  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
  const refreshToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
  return { accessToken, refreshToken };
}

/**
 * Refresh the access token using a valid refresh token.
 * Separates JWT verification errors from missing-user errors.
 */
export async function refreshAccessToken(em: EntityManager, token: string) {
  // 1) Verify refresh token
  let decoded: { sub: string };
  try {
    decoded = jwt.verify(token, JWT_SECRET) as { sub: string };
  } catch {
    throw new Error('Invalid or expired refresh token');
  }

  // 2) Ensure metadata is loaded
  await metadataCache.ensureCache(em);

  // 3) Fetch the user
  const users = await tableCrud.read(em, 'SysUser', { sys_id: decoded.sub });
  const user = users[0];
  if (!user) {
    throw new Error('User not found');
  }

  // 4) Generate and return new tokens
  return generateTokens(user);
}
