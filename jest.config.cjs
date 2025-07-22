// jest.config.cjs
/**
 * Jest configuration for CMS Project tests.
 * Updated: July 22, 2025 06:30 PM IST
 */
module.exports = {
  rootDir: '.',
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'cjs'],
  testMatch: ['**/tests/**/*.test.ts', '**/tests/**/*.spec.ts'],
  transform: {
    '^.+\\.(ts|cjs)$': ['ts-jest', { isolatedModules: true }],
  },
};
