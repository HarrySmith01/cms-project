export default [
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    env: { node: true, es2021: true },
    extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {},
  },
];
