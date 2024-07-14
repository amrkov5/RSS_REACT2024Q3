import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/RSS_REACT2024Q3/',
  plugins: [react()],
  resolve: {
    alias: '@: /src',
  },
  test: {
    include: ['src/test/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    environment: 'jsdom',
    globals: true,
    setupFiles: 'src/test/setup.ts',
  },
});
