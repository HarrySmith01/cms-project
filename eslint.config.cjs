// eslint.config.cjs
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-require-imports */

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
  recommendedConfig: true,
});

module.exports = [
  // 1) ignore build output & deps
  {
    ignores: ['node_modules/**', 'dist/**', 'coverage/**'],
  },
  // 2) Airbnb base + TS plugin rules
  ...compat.extends('airbnb-base', 'plugin:@typescript-eslint/recommended'),
  // 3) parser options and any overrides
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      // your custom overrides...
    },
  },
];
