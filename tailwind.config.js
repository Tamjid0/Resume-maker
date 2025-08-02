/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4361ee',
        'primary-dark': '#3f37c9',
        secondary: '#3f37c9',
        accent: '#4cc9f0',
        light: '#f8f9fa',
        dark: '#212529',
        gray: '#6c757d',
        'light-gray': '#e9ecef',
      },
      fontFamily: {
        sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
    },
  },
  plugins: [],
}