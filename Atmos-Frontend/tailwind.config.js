/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui'

export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				mylight: {
					primary: '#f6f1f1',
					secondary: '#afd3e2',
					accent: '#19a7ce',
					neutral: '#e3fafc',
					white: '#ffffff',
					black: '#0e0e0e',
				},
				mydark: {
					primary: '#f6f1f1',
					secondary: '#afd3e2',
					accent: '#19a7ce',
					neutral: '#e3fafc',
					white: '#ffffff',
					black: '#0e0e0e',
				},
			},
			'dark',
			'cupcake',
		],
	},
}
