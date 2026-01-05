import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin'; // <--- Импортируем плагин
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default defineConfig(
    includeIgnoreFile(gitignorePath),
    js.configs.recommended,
    ...ts.configs.recommended,
    ...svelte.configs['flat/recommended'], // Явно указываем flat config

    // === БЛОК 1: Настройка Stylistic (замена Prettier для JS/TS) ===
    {
        plugins: {
            '@stylistic': stylistic,
        },
        rules: {
            // Отступы: 4 пробела (можешь поменять на 2)
            '@stylistic/indent': ['error', 4],

            // Точки с запятой всегда
            '@stylistic/semi': ['error', 'always'],

            // Одинарные кавычки
            '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],

            // Запятые в многострочных объектах/массивах
            '@stylistic/comma-dangle': ['error', 'always-multiline'],

            // Пробелы внутри фигурных скобок { foo }
            '@stylistic/object-curly-spacing': ['error', 'always'],

            // Убираем лишние пробелы в конце строк
            '@stylistic/no-trailing-spaces': 'error',

            // ВАЖНО: Мы НЕ включаем правило max-len, поэтому длина строки не ограничена
        },
    },

    // === БЛОК 2: Настройка Svelte (HTML и атрибуты) ===
    {
        files: ['**/*.svelte'],
        rules: {
            // Отступы в HTML. Важно: число должно совпадать с JS (4)
            'svelte/indent': ['error', { indent: 4 }],

            // === СВОБОДА ОТ PRETTIER ===

            // Отключаем принудительный перенос атрибутов.
            // Теперь ты сам решаешь: всё в одну строку или лесенкой.
            'svelte/max-attributes-per-line': 'off',

            // Не требовать переноса закрывающей скобки >
            'svelte/html-closing-bracket-new-line': 'off',

            // Не требовать переноса первого атрибута
            'svelte/first-attribute-linebreak': 'off',

            // Разрешаем самозакрывающиеся теги, где угодно
            'svelte/html-self-closing': 'off',
        },
    },

    // === БЛОК 3: Глобальные настройки (твои исходные) ===
    {
        languageOptions: { globals: { ...globals.browser, ...globals.node } },

        rules: {
            'no-undef': 'off',
        },
    },

    // === БЛОК 4: Парсер для TypeScript в Svelte ===
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
