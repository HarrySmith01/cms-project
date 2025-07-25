// File: src/app.ts
/**
 * Description: Bootstraps the Express application: loads config, initializes ORM,
 *              sets up middleware (parsing, security, sessions), configures Passport,
 *              mounts routes, and starts the server.
 * Created: July 25, 2025 00:20 IST
 * Updated: 2025-07-27 10:00 IST
 */

import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { MikroORM, EntityManager } from '@mikro-orm/core';
import ormConfig from '../mikro-orm.config';
import { setupPassport } from './services/auth.service';
// Auth routes are now mounted in dynamicRouter
import dynamicRouter from './routes/dynamicRouter';

async function createApp() {
  // 1. Initialize ORM
  const orm = await MikroORM.init(ormConfig);
  const em: EntityManager = orm.em.fork();

  // 2. Create Express app
  const app = express();

  // 3. Security & parsing middleware
  app.use(helmet());
  app.use(
    cors({ origin: process.env.CORS_ORIGIN?.split(','), credentials: true })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  // 4. Session & Passport setup
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'change_this_secret',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.NODE_ENV === 'production' },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // 5. Configure Passport strategies
  setupPassport(em);

  // 6. Mount all API routes under /api via dynamicRouter
  app.use('/api', dynamicRouter);

  return { app, orm };
}

// 7. Start the server
createApp()
  .then(({ app }) => {
    const port = parseInt(process.env.PORT || '3000', 10);
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Failed to start application:', err);
    process.exit(1);
  });
