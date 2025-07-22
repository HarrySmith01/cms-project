// jest.config.cjs
/**
 * Jest configuration for CMS Project tests.
 * Created: July 22, 2025 12:50 PM IST
 * Updated: July 22, 2025 06:00 PM IST
 */
module.exports = {
  rootDir: '.', // ensure Jest uses the repo root
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/tests/**/*.test.ts', '**/tests/**/*.spec.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { isolatedModules: true }],
  },
};
