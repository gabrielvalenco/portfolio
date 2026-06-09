import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three') || id.includes('@react-three')) {
            return 'vendor-three'
          }
          if (id.includes('gsap')) {
            return 'vendor-gsap'
          }
          if (id.includes('lenis')) {
            return 'vendor-lenis'
          }
          if (id.includes('react-router') || id.includes('react-dom') || (id.includes('/react/') && !id.includes('node_modules/react/'))) {
            return 'vendor-react'
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
