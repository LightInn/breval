/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	theme: {
		fontFamily: {
			body: ['"Be Vietnam Pro"', 'sans-serif'],
			display: ['"Noto Serif Display"', 'serif'],
			'varela-round': ['"Varela Round"', 'sans-serif'],
			'new-font': ['"New Font Family"', 'sans-serif'], // Pa7fa
		},
		extend: {
			colors: {
				slate: {
					900: '#151715',
					1000: '#000101',
				},
				glow: {
					500: '#ffc6d3',
					600: '#ff99b1',
				},
				light: '#ffffff', // P2f6b
				accent: '#ff99b1',
				gray: '#d3d3d3', // P85c2
				'dynamic-vibrant': 'var(--vibrant)',
				'dynamic-muted': 'var(--muted)',
				'dynamic-vibrant-light': 'var(--vibrant-light)',
				'dynamic-muted-light': 'var(--muted-light)',
				'dynamic-vibrant-dark': 'var(--vibrant-dark)',
				'dynamic-muted-dark': 'var(--muted-dark)',
			},
			brightness: {
				10: '.10',
				25: '.25',
			},
			spacing: {
				112: '28rem',
				128: '32rem',
			},
			borderWidth: {
				20: '20px',
				40: '40px',
			},
			skew: {
				17: '17deg',
				20: '20deg',
				24: '24deg',
				28: '28deg',
				30: '30deg',
				32: '32deg',
			},
			backgroundImage: {
				'sakura-tree': 'url(/sakura_tree_outline.webp)',
				'dynamic-bg': 'var(--bg-img)',
			},

			fontFamily: {
				mr: ['var(--font-mr)'],
				in: ['var(--font-in)'],
			},
			animation: {
				roll: 'roll 24s linear infinite',
			},
			keyframes: {
				roll: {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(-100%)' },
				},
			},
			screens: {
				sxl: '1180px',
				// @media (min-width: 1180px){...}
				xs: '480px',
				// @media (min-width: 480px){...}
			},
		},
	},

	plugins: [],
}
