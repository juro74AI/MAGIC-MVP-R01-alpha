import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'fs';
import { resolve } from 'path';

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
    https: {
      // Configuration HTTPS plus permissive
      rejectUnauthorized: false,
      // Utilise les certificats par défaut de Vite
    },
    allowedHosts: ['magic.red-ark.com', 'localhost', '127.0.0.1']
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    https: {
      rejectUnauthorized: false,
    },
    allowedHosts: ['magic.red-ark.com', 'localhost', '127.0.0.1']
  }
});