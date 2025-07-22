// jest.config.cjs
/**
 * Jest configuration for CMS Project tests.
 * Created: July 22, 2025 12:50 PM IST
 * Updated: July 22, 2025 12:50 PM IST
 */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/tests/**/*.test.ts', '**/tests/**/*.spec.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { isolatedModules: true }],
  },
};
