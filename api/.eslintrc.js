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
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'signature',

          // Fields
          'public-static-field',
          'protected-static-field',
          'private-static-field',

          'public-static-get',
          'public-static-set',
          'protected-static-get',
          'protected-static-set',
          'private-static-get',
          'private-static-set',

          'public-static-method',
          'protected-static-method',
          'private-static-method',

          'public-abstract-field',
          'protected-abstract-field',
          'private-abstract-field',

          'public-field',
          'protected-field',
          'private-field',

          'public-abstract-get',
          'public-abstract-set',
          'protected-abstract-get',
          'protected-abstract-set',
          'private-abstract-get',
          'private-abstract-get',

          'public-get',
          'public-set',
          'protected-get',
          'protected-set',
          'private-get',
          'private-set',

          'public-abstract-method',
          'protected-abstract-method',
          'private-abstract-method',

          'constructor',

          'public-method',
          'protected-method',
          'private-method',
        ],
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/semi': ['error', 'never'],
  },
  ignorePatterns: ['node_modules', 'dist'],
}
