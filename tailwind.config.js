/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F2EDE4',
        sidebar: '#2C1F14',
        primary: '#7C4F2F',
        primaryHover: '#5C3820',
        card: '#FFFFFF',
        border: '#E2D9CC',
        textMain: '#1A1209',
        textSub: '#7A6A58',
        accent: {
          green: '#4A7C59',
          blue: '#4A6B8A',
          orange: '#C4622D',
          teal: '#3D7A7A',
          brown: '#8B6340',
          purple: '#7B5EA7',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
      }
    },
  },
  plugins: [],
}
