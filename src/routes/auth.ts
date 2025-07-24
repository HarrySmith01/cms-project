// File: src/routes/auth.ts
/**
 * Description: Defines authentication endpoints: local login, OAuth2 callback, and logout,
 *              refactored to use full block bodies for arrow handlers (resolving implicit-arrow-linebreak).
 * Created: July 25, 2025 01:05 IST
 * Updated: July 25, 2025 07:30 IST
 */

import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';

const router = Router();

// POST /api/auth/login — Local (Basic) authentication
router.post(
  '/login',
  passport.authenticate('local', { session: true }),
  (req: Request, res: Response) =>
    // If authentication succeeded, user is in req.user
    res.json({ user: req.user })
);

// GET /api/auth/oauth2 — initiate OAuth2 flow
router.get('/oauth2', passport.authenticate('oauth2', { session: true }));

// GET /api/auth/oauth2/callback — handle OAuth2 provider callback
router.get(
  '/oauth2/callback',
  passport.authenticate('oauth2', { failureRedirect: '/login', session: true }),
  (req: Request, res: Response) =>
    // Successful OAuth2 login
    res.redirect('/')
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

export default router;
