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
    		body: ['Be Vietnam Pro"', 'sans-serif'],
    		display: ['Noto Serif Display"', 'serif'],
    		'varela-round': ['Varela Round"', 'sans-serif']
    	},
    	extend: {
    		colors: {
    			slate: {
    				'900': '#151715',
    				'1000': '#000101'
    			},
    			glow: {
    				'500': '#ffc6d3',
    				'600': '#ff99b1'
    			},
    			light: '#f4faf7',
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			gray: '#706262',
    			'dynamic-vibrant': 'var(--vibrant)',
    			'dynamic-muted': 'var(--muted)',
    			'dynamic-vibrant-light': 'var(--vibrant-light)',
    			'dynamic-muted-light': 'var(--muted-light)',
    			'dynamic-vibrant-dark': 'var(--vibrant-dark)',
    			'dynamic-muted-dark': 'var(--muted-dark)',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		brightness: {
    			'10': '.10',
    			'25': '.25'
    		},
    		spacing: {
    			'112': '28rem',
    			'128': '32rem'
    		},
    		borderWidth: {
    			'20': '20px',
    			'40': '40px'
    		},
    		skew: {
    			'17': '17deg',
    			'20': '20deg',
    			'24': '24deg',
    			'28': '28deg',
    			'30': '30deg',
    			'32': '32deg'
    		},
    		backgroundImage: {
    			'sakura-tree': 'url(/home/sakura_tree_outline.webp)',
    			'dynamic-bg': 'var(--bg-img)'
    		},
    		fontFamily: {
    			mr: ['var(--font-mr)'],
    			in: ['var(--font-in)']
    		},
    		animation: {
    			roll: 'roll 24s linear infinite'
    		},
    		keyframes: {
    			roll: {
    				'0%': {
    					transform: 'translateX(100%)'
    				},
    				'100%': {
    					transform: 'translateX(-100%)'
    				}
    			}
    		},
    		screens: {
    			sxl: '1180px',
    			xs: '480px'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },

	plugins: [require("tailwindcss-animate")],
}
