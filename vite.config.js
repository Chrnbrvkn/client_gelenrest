import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('C:/Users/prosh/Desktop/localSSL/localhost-key.pem'),
      cert: fs.readFileSync('C:/Users/prosh/Desktop/localSSL/localhost.pem')
    }
  }
});
