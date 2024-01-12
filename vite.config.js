import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isDevelopment = process.env.NODE_ENV !== 'production';

export default defineConfig({
  plugins: [react()],
  server: isDevelopment ? {
    https: {
      // key: fs.readFileSync('C:/Users/prosh/Desktop/localSSL/localhost-key.pem'),
      // cert: fs.readFileSync('C:/Users/prosh/Desktop/localSSL/localhost.pem')
      key: fs.readFileSync('/Users/moonlight/Desktop/Mich/ssl/localhost-key.pem'),
      cert: fs.readFileSync('/Users/moonlight/Desktop/Mich/ssl/localhost.pem')
    }
  } : {}
});