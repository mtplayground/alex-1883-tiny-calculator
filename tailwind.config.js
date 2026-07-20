/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#f6f4ef',
        ink: '#1f2933',
        muted: '#64707d',
        panel: '#ffffff',
        key: '#e7e2d8',
        'key-hover': '#ded7c9',
        operator: '#2f7d78',
        'operator-hover': '#276a66',
        display: '#20252c',
      },
      borderRadius: {
        control: '8px',
      },
      boxShadow: {
        flat: '0 1px 0 rgba(31, 41, 51, 0.08)',
      },
      spacing: {
        control: '4rem',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
      },
    },
  },
};
