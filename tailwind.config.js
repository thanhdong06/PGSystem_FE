import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',  // San Francisco on macOS & iOS
          'BlinkMacSystemFont', // Chrome on macOS
          '"Segoe UI"', // Windows
          'Roboto', // Android
          '"Helvetica Neue"', // Old macOS versions
          'Arial', // Generic fallback
          'sans-serif',
        ],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark"],
  },
};
