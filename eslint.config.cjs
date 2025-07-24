// eslint.config.cjs
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-require-imports */
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
  recommendedConfig: true,
});

module.exports = [
  { ignores: ['node_modules/**', 'dist/**', 'coverage/**'] },

  ...compat.extends('airbnb-base', 'plugin:@typescript-eslint/recommended'),

  {
    languageOptions: {
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
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
      indent: ['error', 2, { SwitchCase: 1 }],
      'max-len': [
        'error',
        { code: 100, ignoreComments: true, ignoreStrings: true },
      ],
      'import/extensions': [
        'error',
        'ignorePackages',
        { js: 'never', ts: 'never' },
      ],
      'import/no-unresolved': [
        'error',
        { commonjs: true, amd: true, ignore: ['\\.ts$'] },
      ],
      'import/prefer-default-export': 'off',
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
      'class-methods-use-this': 'off',
      'no-await-in-loop': 'off',
      'max-classes-per-file': ['error', 5],
      'no-plusplus': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern:
            '^(SysCompany|SysDepartment|SysLocation|SysSecurityAclRole|OneToMany)$',
        },
      ],
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'no-underscore-dangle': 'off',
    },
  },

  // **FULLY RELAX everything under src/** so only real code is linted**
  {
    files: ['src/**/*'],
    rules: {
      'no-restricted-syntax': 'off',
      'implicit-arrow-linebreak': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/extensions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'class-methods-use-this': 'off',
      'no-await-in-loop': 'off',
      'no-new': 'off',
      'max-len': 'off',
      'no-plusplus': 'off',
      'max-classes-per-file': 'off',
      'no-underscore-dangle': 'off',
      'import/prefer-default-export': 'off',
    },
  },
];
