import type { Config } from 'prettier';

const config: Config = {
    useTabs: true,
    singleQuote: true,
    trailingComma: 'none',
    printWidth: undefined, /* same as 80 */
    plugins: ['prettier-plugin-svelte'],
    overrides: [
        {
            files: '*.svelte',
            options: {
                parser: 'svelte'
            }
        }
    ]
};

export default config;
