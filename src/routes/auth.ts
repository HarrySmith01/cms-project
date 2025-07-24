// File: src/routes/auth.ts
/**
 * Description: Defines authentication endpoints: local login, OAuth2 callback, logout, and token refresh.
 * Created: July 25, 2025 01:05 IST
 * Updated: July 25, 2025 12:00 IST
 */

import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { MikroORM } from '@mikro-orm/core';
import { refreshAccessToken } from '../services/auth.service';
import ormConfig from '../../mikro-orm.config';

const router = Router();

// POST /api/auth/login — Local (Basic) authentication
router.post(
  '/login',
  passport.authenticate('local', { session: true }),
  (req: Request, res: Response) => res.json({ user: req.user })
);

// GET /api/auth/oauth2 — initiate OAuth2 flow
router.get('/oauth2', passport.authenticate('oauth2', { session: true }));

// GET /api/auth/oauth2/callback — handle OAuth2 provider callback
router.get(
  '/oauth2/callback',
  passport.authenticate('oauth2', { failureRedirect: '/login', session: true }),
  (req: Request, res: Response) => res.redirect('/')
);

// POST /api/auth/logout — terminate session
router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.json({ message: 'Logged out' });
  });
});

// POST /api/auth/refresh — refresh JWT tokens
router.post('/refresh', async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  try {
    // Initialize ORM and fork EM for this request
    const orm = await MikroORM.init(ormConfig);
    const em = orm.em.fork();

    const tokens = await refreshAccessToken(em, refreshToken);
    return res.json(tokens);
  } catch (err) {
    return res
      .status(401)
      .json({ message: 'Invalid or expired refresh token' });
  }
});

export default router;
