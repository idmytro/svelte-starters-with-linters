import type { Config } from 'prettier';

const config: Config = {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'none',
	printWidth: undefined,
	plugins: [
		'prettier-plugin-svelte',
		'prettier-plugin-css-order',
		'prettier-plugin-packagejson'
	],
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
