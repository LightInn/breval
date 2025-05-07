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
		},
		extend: {
			colors: {
				slate: {
					900: '#151715',
					1000: '#000101',
				},
				glow: {
					100: '#ffc6cb',
					200: '#ffc6d3',
					300: '#ff9ba8',
					400: '#ea8fa7',
					500: '#ff99b1',
					600: '#cc7a8d',
					700: '#995b69',
					800: '#653c46',
					900: '#311d22',
				},
				light: '#e7ecea',
				accent: '#ff99b1',
				gray: '#706262',
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
				'scroll-down': 'scroll-down 2.5s ease-in-out infinite',
				'fade-in-up': 'fade-in-up 1s ease-out forwards',
				roll: 'roll 24s linear infinite',
				bounce: 'bounce 2s infinite',
				pulse: 'pulse 2s infinite',
			},
			keyframes: {
				roll: {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(-100%)' },
				},
				'scroll-down': {
					'0%': { opacity: '0', transform: 'translateY(-5px)' },
					'50%': { opacity: '1', transform: 'translateY(5px)' },
					'100%': { opacity: '0', transform: 'translateY(15px)' },
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
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
