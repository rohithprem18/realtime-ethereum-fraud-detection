import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['lucide-react'],
    esbuildOptions: {
      sourcemap: false
    }
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        sourcemap: false
      }
    }
  },
  define: {
    'process.env': {}
  }
});
