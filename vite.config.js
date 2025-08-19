// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ADD THIS SERVER CONFIGURATION BLOCK
  server: {
    proxy: {
      // String shorthand for simple proxy
      '/api': {
        target: 'https://api.clarifai.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})