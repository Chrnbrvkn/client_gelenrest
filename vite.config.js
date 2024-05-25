import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isDevelopment = process.env.NODE_ENV !== 'production';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src',
    },
  },
  server: isDevelopment ? {
    https: {
      key: fs.readFileSync('localSSL/localhost-key.pem'),
      cert: fs.readFileSync('localSSL/localhost.pem')
    }
  } : {},
  proxy: {
    '/callback-modal': {
      target: 'http://localhost:3000', // адрес вашего локального сервера
      changeOrigin: true,
      secure: false,
    }
  }
});