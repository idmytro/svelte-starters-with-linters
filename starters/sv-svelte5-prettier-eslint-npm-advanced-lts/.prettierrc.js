/* .prettierrc.js */

/** @type {import('prettier').Config} */
const config = {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'all' /* default */,
	printWidth: 80 /* default */,
	plugins: [
		'prettier-plugin-svelte',
		'prettier-plugin-css-order',
		'prettier-plugin-packagejson',
	],
	overrides: [
		{
			files: '*.svelte',
			options: {
				parser: 'svelte',
			},
		},
	],
};

export default config;
