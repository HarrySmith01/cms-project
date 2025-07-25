// File: src/routes/auth.ts
// Full Path: src/routes/auth.ts
// Description: Defines authentication endpoints: registration, login (with JWT), OAuth2, logout, and token refresh.
// Created: 2025-07-25 01:05 IST
// Updated: 2025-07-25 15:00 IST

import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { MikroORM } from '@mikro-orm/core';
import ormConfig from '../../mikro-orm.config';
import { refreshAccessToken } from '../services/auth.service';
import UserService from '../services/user.service';

const router = Router();

// POST /api/auth/register — User registration
router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orm = await MikroORM.init(ormConfig);
      const em = orm.em.fork();
      const user = await UserService.register(em, req.body);
      return res.status(201).json(user);
    } catch (err) {
      return next(err);
    }
  }
);

// POST /api/auth/login — Login with JWT generation
router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userName, password } = req.body;
      const orm = await MikroORM.init(ormConfig);
      const em = orm.em.fork();
      const { user, accessToken, refreshToken } = await UserService.login(
        em,
        userName,
        password
      );
      return res.json({ user, accessToken, refreshToken });
    } catch (err) {
      return next(err);
    }
  }
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
