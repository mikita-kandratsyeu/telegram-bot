module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-typescript/base',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'file-progress', 'simple-import-sort'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'no-var': 'error',
    'no-debugger': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': ['error'],
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 1,
    'import/no-extraneous-dependencies': 'off',
    'prettier/prettier': ['error'],
    'file-progress/activate': 1,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
