<!-- docs/risks.md -->
<!--
  Description: Risk register and dependency graph for CMS project
  Created: July 22, 2025, 07:45 PM IST
  Updated: July 22, 2025, 07:45 PM IST
-->

# Risks and Dependencies

## Dependency Graph

| Library            | Version | Purpose                     | Dependencies                               |
| ------------------ | ------- | --------------------------- | ------------------------------------------ |
| @mikro-orm/core    | 6.4.16  | ORM                         | @mikro-orm/mysql, @mikro-orm/mongodb, etc. |
| @mikro-orm/mysql   | 6.4.16  | MySQL driver for MikroORM   | @mikro-orm/core                            |
| @mikro-orm/mongodb | 6.4.16  | MongoDB driver for MikroORM | @mikro-orm/core                            |
| express            | ^5.1.0  | HTTP API framework          | —                                          |
| react              | 19.1.0  | Frontend UI                 | —                                          |
| passport           | ^0.7.0  | Authentication middleware   | express                                    |
| node-redis         | ^5.6.0  | Redis client for caching    | redis server                               |
| bullmq             | 5.56.5  | Job queue                   | redis server                               |
| jest               | 29.7.0  | Testing framework           | ts-jest, node                              |
| ts-jest            | 29.2.0  | TypeScript support for Jest | jest, typescript                           |

## Risks

- **Risk**: Email service rate limits (e.g. SendGrid free tier)

  - **Mitigation**: Implement Redis-backed counters and fallback to Mailgun or Nodemailer.

- **Risk**: Incompatibility between MySQL and MongoDB schemas

  - **Mitigation**: Strict schema definitions in MikroORM, automated migrations, and dual-DB tests in Phase 2.

- **Risk**: Third-party package deprecations or breaking changes

  - **Mitigation**: Regular `npm audit`, use lockfile pinning, and maintain a dependency-upgrade schedule.

- **Risk**: CI/CD performance for large test suites

  - **Mitigation**: Isolate unit vs. integration tests, parallelize where possible, and cache npm deps in GitHub Actions.

- **Risk**: Secrets leakage (.env files in repo)
  - **Mitigation**: `.env` in `.gitignore`, use GitHub Secrets for CI, and rotate credentials regularly.
