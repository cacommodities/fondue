/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './*.html',
    './src/**/*.{html,js,ts,jsx,tsx}',
    './node_modules/@cac/react-utils/dist/**/*.js',
    './node_modules/@cac/forest-ui/dist/**/*.js'
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
    }

  },
  plugins: [require('daisyui')]
}
