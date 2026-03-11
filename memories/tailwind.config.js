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
          100: '#f9fafb',
          200: '#e5e7eb',
          500: '#6b7280',
          900: '#111827',
        },
        blue: {
          200: '#eff6ff',
          400: '#2563eb',
          600: '#1e3a5f',
        },
        yellow: {
          100: '#fff7e7',
          600: '#FDE291FF',
          900: '#EFC41CFF',
        },
      },
    },
  },
  plugins: [],
};
