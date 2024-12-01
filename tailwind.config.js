/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        beige: {
          100: '#f5f5dc', // Custom beige color (you can adjust the hex code)
        },
      },
    },
  },
  plugins: [],
};
