/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui'

export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
		fontFamily: {
			primary: 'Titillium Web, sans-serif',
		},
		fontWeight: {
			light: 300,
			normal: 400,
			medium: 600,
			bold: 700,
			extraBold: 900,
		},
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
					primary: '#242629',
					secondary: '#0e0e0e',
					accent: '#19a7ce',
					neutral: '#202124',
					white: '#0e0e0e',
					black: '#f6f1f1',
				},
			},
			'dark',
			'cupcake',
		],
	},
}
