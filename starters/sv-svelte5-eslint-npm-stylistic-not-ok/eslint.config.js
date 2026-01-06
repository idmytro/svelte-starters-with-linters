import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default defineConfig(
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],

  // === Stylistic (JS/TS форматирование) ===
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      // ОТСТУПЫ: 2 ПРОБЕЛА
      '@stylistic/indent': ['error', 2],

      // Остальные правила стиля
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/no-trailing-spaces': 'error',

      // Запрещаем принудительные переносы (нет max-len)
    },
  },

  // === Svelte (HTML форматирование) ===
  {
    files: ['**/*.svelte'],
    rules: {
      // ОТСТУПЫ В HTML: 2 ПРОБЕЛА (Синхронизировано с JS)
      'svelte/indent': ['error', { indent: 2 }],

      // Отключаем навязывание переносов атрибутов
      'svelte/max-attributes-per-line': 'off',
      'svelte/first-attribute-linebreak': 'off',
      'svelte/html-closing-bracket-new-line': 'off',
      'svelte/html-self-closing': 'off',
    },
  },

  // === Глобальные настройки ===
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      'no-undef': 'off',
    },
  },

  // === TypeScript Parser для Svelte ===
  {
    files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte'],
        parser: ts.parser,
        svelteConfig,
      },
    },
  },
);
