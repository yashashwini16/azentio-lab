import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        azentio: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc7fb',
          400: '#38a8f7',
          500: '#0e8ce9',
          600: '#026ec7',
          700: '#0357a1',
          800: '#074a85',
          900: '#0c3e6e',
          950: '#082849',
        },
        slate: {
          850: '#151e2e',
          925: '#0b111e',
          950: '#070b13',
        }
      },
    },
  },
  plugins: [],
};
export default config;
