// File: src/routes/dynamicRouter.ts
// Description: Central API router that mounts public routes, applies elevated authentication for meta,
//              then ACL enforcement for all other protected routes.
// Created: July 25, 2025 03:30 IST
// Updated: 2025-07-27 11:00 IST

import { Router } from 'express';
import { elevatedMiddleware } from '../middlewares/elevated.middleware';
import { aclMiddleware } from '../middlewares/acl.middleware';
import authRouter from './auth';
// import userRouter from './user';  // ← remove until you add src/routes/user.ts
// import contentRouter from './content';  // other future routers

const router = Router();

// 1. Public routes (no ACL or elevated auth)
router.use('/auth', authRouter);

// 2. Elevated authentication for meta endpoints
//    All routes under /api/meta/* will first pass through elevatedMiddleware
router.use('/meta', elevatedMiddleware);

// 3. ACL enforcement for all subsequent routes
router.use(aclMiddleware);

// 4. Protected routes
// router.use('/users', userRouter);
// router.use('/content', contentRouter);
// …add additional protected routers here

export default router;
