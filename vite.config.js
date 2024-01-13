import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isDevelopment = process.env.NODE_ENV !== 'production';

export default defineConfig({
  plugins: [react()],
  server: isDevelopment ? {
    https: {
      key: fs.readFileSync('localSSL/localhost-key.pem'),
      cert: fs.readFileSync('localSSL/localhost.pem')
    }
  } : {}
});