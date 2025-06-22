import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

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
    allowedHosts: ['magic.red-ark.com', 'localhost', '127.0.0.1'],
    // Décommentez ces lignes si vous avez vos propres certificats SSL
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'certs/key.pem')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'certs/cert.pem'))
    // }
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: ['magic.red-ark.com', 'localhost', '127.0.0.1']
  }
});