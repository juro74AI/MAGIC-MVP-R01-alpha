import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    // HTTPS désactivé pour éviter les erreurs SSL
    allowedHosts: ['magic.red-ark.com', 'localhost', '127.0.0.1']
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    // HTTPS désactivé pour éviter les erreurs SSL
    allowedHosts: ['magic.red-ark.com', 'localhost', '127.0.0.1']
  }
});