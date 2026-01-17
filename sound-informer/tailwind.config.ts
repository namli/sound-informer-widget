import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  prefix: 'si-',
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
