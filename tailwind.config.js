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
          1000: '#000101',
          900: '#151715',
        },
        glow: {
          500: '#93ffbb',
          600: '#66ff9e',
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
