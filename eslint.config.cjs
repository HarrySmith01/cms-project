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

  // 3) parser options and overrides
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts'],
          moduleDirectory: ['node_modules', 'src'],
        },
      },
    },
    rules: {
      // allow TS imports without extension
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          ts: 'never',
        },
      ],
      // suppress unresolved import errors for .ts modules
      'import/no-unresolved': [
        'error',
        {
          commonjs: true,
          amd: true,
          ignore: ['\\.ts$'],
        },
      ],
      // enforce 2-space indent
      indent: ['error', 2, { SwitchCase: 1 }],
      // enforce 100-char max but ignore comments & strings
      'max-len': [
        'error',
        {
          code: 100,
          ignoreComments: true,
          ignoreStrings: true,
        },
      ],
      // allow single named exports
      'import/prefer-default-export': 'off',
      // allow classes and types to be used before definition (for decorators/self-refs)
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: false,
          classes: false,
          variables: true,
          typedefs: false,
        },
      ],
      // relax unused-vars for certain imported stubs
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern:
            '^(SysCompany|SysDepartment|SysLocation|SysSecurityAclRole|OneToMany)$',
        },
      ],
    },
  },
];
