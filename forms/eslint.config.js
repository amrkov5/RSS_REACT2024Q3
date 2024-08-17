import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactRecommendedConfig from 'eslint-plugin-react/configs/recommended.js';
import reactJSXConfig from 'eslint-plugin-react/configs/jsx-runtime.js';

export default tseslint.config({
  name: 'main config',
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    reactRecommendedConfig,
    reactJSXConfig,
    prettierRecommended,
  ],
  files: ['**/*.{ts,tsx}'],
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    prettier: prettier,
    react: react,
  },
  ignores: ['dist'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    sourceType: 'module',
  },

  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-console': 'error',
  },
});
