const path = require('path')

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended', // Make sure to put it last, so it gets the chance to override other configs
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'only-error'],
  env: {
    'browser': true,
    'es6': true,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, '.')],
      },
    },
  },
  'overrides': [
    {
      'files': ['**/*.test.js', '**/*.test.ts'],
      'env': {
        'jest': true,
      },
    },
  ],
  rules: {
    'no-var': 'error',
    'import/no-extraneous-dependencies': 'error',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../*'],
            message: 'Use absolute paths when importing from parent directory',
          },
        ],
      },
    ],
    'no-restricted-modules': [
      'error',
      {
        patterns: ['../*'],
      },
    ],
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'no-shadow': 'off',
    'import/newline-after-import': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'newline-before-return': 'error',
  },
}
