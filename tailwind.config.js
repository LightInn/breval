module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
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
					500: '#ffc6d3',
					600: '#ff99b1',
				},
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
		},
	},

	plugins: [],
}
