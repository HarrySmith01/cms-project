// File: src/routes/dynamicRouter.ts
// Description: Central API router that mounts public routes, applies ACL enforcement, and mounts feature routers.
// Created: July 25, 2025 03:30 IST
// Updated: 2025-07-27 10:30 IST

import { Router } from 'express';
import { aclMiddleware } from '../middlewares/acl.middleware';
import authRouter from './auth';
// import userRouter from './user';  // ← remove until you add src/routes/user.ts
// import contentRouter from './content';  // other future routers

const router = Router();

// 1. Public routes (no ACL)
router.use('/auth', authRouter);

// 2. ACL enforcement for all subsequent routes
router.use(aclMiddleware);

// 3. Protected routes
// router.use('/users', userRouter);
// router.use('/content', contentRouter);
// …add additional protected routers here

export default router;
