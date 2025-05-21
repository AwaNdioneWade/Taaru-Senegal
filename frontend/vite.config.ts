import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/client/assets'),
      '@client': path.resolve(__dirname, './src/client'),
      '@tailor': path.resolve(__dirname, './src/tailor'),
      '@admin': path.resolve(__dirname, './src/admin')
    }
  }
})
