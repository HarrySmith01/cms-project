# CMS Project

[![CI](https://github.com/HarrySmith01/cms-project/actions/workflows/ci.yml/badge.svg)](https://github.com/HarrySmith01/cms-project/actions)

## Project Structure

See [docs/project-structure.md](docs/project-structure.md) for the project folder structure.

## Code Quality

Run `npm run lint` to check code with ESLint.  
Run `npm run format` to format code with Prettier.

## Redis Setup

Configure Redis via `.env` with `REDIS_URL=redis://localhost:6379` for caching and job queues.

## Risk Management

See our full [Risks and Dependencies](docs/risks.md) register for a breakdown of libraries, versions, and mitigations.

## Project Structure Creation (project-structure.md)

node tests\generate-structure.js

## Lint Find and Fix

npm run lint
npm run lint -- --fix

# Generate one “baseline” migration that creates all tables/indexes/fks

npx mikro-orm migration:create --initial

# Compare your current entities against the last migration,

# Preview SQL diff (no file output):

npx mikro-orm migration:create --dump

# Preview SQL diff (no file output):

npx mikro-orm migration:create --dump

# Compare your current entities against the last migration,

# then scaffold a new migration containing only the diffs

npx mikro-orm migration:create

# Actually emit a new migration file:

npx mikro-orm migration:create

# Show the SQL that “up” would execute (no commit)

npx mikro-orm schema:update --dump

# Run pending migrations against your configured database:

# Ensure your .env has DB_TYPE, DB_HOST, DB_USER, DB_PASSWORD, etc.

npx mikro-orm migration:up

# Rollback Migration:

npx mikro-orm migration:down

## Entity Reference

| Entity                 | File                                 | Description                                              |
| ---------------------- | ------------------------------------ | -------------------------------------------------------- |
| **SysUser**            | `src/entities/SysUser.ts`            | Stores user accounts and credentials (sys_user table).   |
| **SysUserGroup**       | `src/entities/SysUserGroup.ts`       | Defines user groups (sys_user_group table).              |
| **SysUserRole**        | `src/entities/SysUserRole.ts`        | Defines roles/permissions bundles (sys_user_role table). |
| **SysUserGrmember**    | `src/entities/SysUserGrmember.ts`    | M2M: Users ↔ Groups (sys_user_grmember table).          |
| **SysUserHasRole**     | `src/entities/SysUserHasRole.ts`     | M2M: Users ↔ Roles (sys_user_has_role table).           |
| **SysGroupHasRole**    | `src/entities/SysGroupHasRole.ts`    | M2M: Groups ↔ Roles (sys_group_has_role table).         |
| **SysSecurityAcl**     | `src/entities/SysSecurityAcl.ts`     | ACL definitions for tables/fields/operations.            |
| **SysSecurityAclRole** | `src/entities/SysSecurityAclRole.ts` | M2M: ACL rules ↔ Roles (sys_security_acl_role table).   |

# Docker Commands

# Note: Docker, MySql , Mongo DB must need to be installed

# 1. Start services in detached mode

docker-compose up -d

# 2. Verify containers are running

docker-compose ps

# 3. (Optional) View MySQL logs

docker-compose logs -f mysql

# 4. (Optional) View MongoDB logs

docker-compose logs -f mongodb

# 5. Stop Docker

docker-compose down

# Other Doker Command

docker version
docker compose version
docker compose up -d

See [Database Setup docs](docs/database-setup.md) for full instructions.

# 1. Check Git Status

git status

# 2. Stage every changed file

git add .

# 3. Commit with a descriptive message

git commit -m "ci: add db:setup script and update CI workflow"

# 4. Push to your develop branch

git push origin develop
