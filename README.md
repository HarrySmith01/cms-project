# CMS Project

[![CI](https://github.com/HarrySmith01/cms-project/actions/workflows/ci.yml/badge.svg)](https://github.com/HarrySmith01/cms-project/actions)

## Project Structure

See [docs/project-structure.md](docs/project-structure.md) for the project folder structure.

## Prerequisites

- Node.js v24.x
- Docker & Docker Compose (for MySQL/MongoDB services)
- Redis (if using caching or job queues locally)
- A `.env` file in the project root (see [docs/database-setup.md](docs/database-setup.md))

## Quick Start

```bash
# 1. Install dependencies
npm ci

# 2. Create databases (development + test)
npm run db:setup:dev
npm run db:setup:test

# 3. Run in development mode (auto-reload)
npm run dev

# 4. Build for production
npm run build

# 5. Run production server
npm run prod

# Code Quality

# Lint all files (report only)
npm run lint

# Lint + auto-fix
npm run lint -- --fix

# Format all files
npm run format

# Migrations

# Create a new migration (scaffold diffs)
npm run migration:create

# Apply pending migrations
npm run migration:up

# Roll back the last migration
npm run migration:down

# Show migration status
npm run migration:status


npm run migration:up:dev
npm run migration:up:test
npm run migration:up:prod


# Testing

# Start server in test mode (NODE_ENV=test)
npm run test

# Run Jest tests without starting the server
npm run test:ci

# Run tests with coverage report
npm run test:cover

# Docker
# Start MySQL + MongoDB via docker-compose
docker-compose up -d

# View running containers
docker-compose ps

# View logs
docker-compose logs -f mysql
docker-compose logs -f mongodb

# Tear down
docker-compose down

# Git Workflow

# 1. Check what’s changed
git status

# 2. Stage all changes
git add .

# 3. Commit with a clear message
git commit -m "ci: add db:setup script and update CI workflow"

# 4. Push to your branch
git push origin develop

```

npm run docker:dev # Spin up MySQL+Mongo for development
npm run docker:test # Spin up MySQL+Mongo for testing
npm run docker:prod # Spin up MySQL+Mongo for production

npm run docker:stop:dev # Tear down dev stack
npm run docker:stop:test # Tear down test stack
npm run docker:stop:prod # Tear down prod stack

npm run db:setup:dev # Create dev & test DBs in MySQL
npm run db:setup:test # Create only test DB
npm run db:setup:prod # Create only prod DB

npm run migration:up:dev # Run dev migrations
npm run migration:down:test # Roll back test migration

npm run import:tables
npm run import:columns

# 1) One-time start (creates the PM2 processes)

pm2 start ecosystem.config.js

# 2) Check that both workers are online

pm2 ls # or: pm2 status

# 3) Tail live log output from both workers

pm2 logs # stream everything

# or individually:

pm2 logs dict-worker --lines 100 # last 100 lines
pm2 logs table-worker --lines 100

# 4) Restart workers after pulling new code

npm run build # re-compile TypeScript → dist
pm2 restart ecosystem.config.js # reload both

pm2 restart ecosystem.config.js
pm2 ls # dict-worker and table-worker should show “online”
