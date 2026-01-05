/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-html',
  ],
  plugins: [
    '@stylistic/stylelint-plugin',
  ],
  rules: {
    // Отключаем проверку длины строки в CSS
    'max-line-length': null,

    // Svelte-специфика
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }],
    'no-empty-source': null,
    'selector-class-pattern': null,

    // === Stylistic (CSS форматирование) ===

    // ОТСТУПЫ: 2 ПРОБЕЛА
    '@stylistic/indentation': 2,

    // Остальные правила
    '@stylistic/string-quotes': 'double',
    '@stylistic/block-opening-brace-space-before': 'always',
    '@stylistic/declaration-colon-space-after': 'always',
    '@stylistic/no-eol-whitespace': true,
    '@stylistic/rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.svelte'],
      customSyntax: 'postcss-html',
    },
  ],
};
