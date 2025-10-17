module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['ui-serif', 'Georgia'],
      },
      fontSize: {
        xs: ['12px', '20px'],
        sm: ['14px', '22px'],
        base: ['16px', '24px'],
        medium: ['20px', '30px'],
        lg: ['24px', '38px'],
        xl: ['30px', '44px'],
        '2xl': ['36px', '54px'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        black: '#191911',
        neutral: {
          50: '#fffefa',
        },
      },
    },
  },
  plugins: [],
};
