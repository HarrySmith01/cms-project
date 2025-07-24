// File: jest.config.cjs
/**
 * Jest configuration for CMS Project tests.
 * Created : July 22, 2025 06:30 PM IST
 * Updated : July 26, 2025 12:15 PM IST – add console‐capture setup and custom logger reporter
 */

module.exports = {
  rootDir: '.',
  preset: 'ts-jest',
  testEnvironment: 'node',

  // Ensure both TS & CommonJS test files are recognised
  moduleFileExtensions: ['ts', 'js', 'cjs'],

  // Test file globs
  testMatch: ['**/tests/**/*.test.ts', '**/tests/**/*.spec.ts'],

  // Transform TS & CJS via ts-jest
  transform: {
    '^.+\\.(ts|cjs)$': ['ts-jest', { isolatedModules: true }],
  },

  /**-----------------------------------------------------------
   * Force relational DB driver before tests load
   *----------------------------------------------------------*/
  setupFiles: ['<rootDir>/tests/jest-set-dbtype.js'],

  /**-----------------------------------------------------------
   * After-env setup: intercept all console.* into timestamped log
   *----------------------------------------------------------*/
  setupFilesAfterEnv: ['<rootDir>/tests/jest-setup-console.js'],

  /**-----------------------------------------------------------
   * Reporters: default + your custom file‐logging reporter
   *----------------------------------------------------------*/
  reporters: ['default', '<rootDir>/tests/logger-reporter.js'],
};
