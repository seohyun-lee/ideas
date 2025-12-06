/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './index.jsx', './game/**/*.{js,jsx}', './web/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'Pretendard', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
