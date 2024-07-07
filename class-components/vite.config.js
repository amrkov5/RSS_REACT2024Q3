import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/RSS_REACT2024Q3/',
  plugins: [react()],
  resolve: {
    alias: '@: /src',
  },
});
