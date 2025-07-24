// File: src/services/auth.service.ts
/**
 * Description: Sets up Passport.js strategies for Local (Basic) and OAuth2 authentication,
 *              integrating with the dynamic-table CRUD layer (tableCrud) and metadata cache.
 * Created: July 25, 2025 00:10 IST
 * Updated: July 25, 2025 06:30 IST
 */

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import bcrypt from 'bcrypt';
import { EntityManager } from '@mikro-orm/core';
import { tableCrud } from '../utils/tableCrud';
import { metadataCache } from '../utils/metadataCache';

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

  // Session serialization
  passport.serializeUser((user: any, done) => {
    done(null, user.sys_id);
  });

  // Session deserialization
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
