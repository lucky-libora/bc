module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'],
  root: true,
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
    jest: true,
  },
  rules: {
    'max-len': ['error', { code: 120 }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: 'if', next: '*' },
    ],
    semi: ['error', 'never'],
    'no-console': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    'no-restricted-imports': [
      'error',
      {
        name: '@mui/material',
      },
      {
        name: '@mui/icons-material',
      },
    ],
  },
  ignorePatterns: ['node_modules', 'dist'],
}
