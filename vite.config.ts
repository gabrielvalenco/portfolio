import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

const REACT_PACKAGES = new Set(['react', 'react-dom', 'scheduler', 'react-router', 'react-router-dom'])

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
          // Vite entrega os ids com "/" mesmo no Windows.
          const pkg = id.match(/\/node_modules\/((?:@[^/]+\/)?[^/]+)\//)?.[1]
          if (!pkg) return
          // React e router num chunk proprio, cacheavel entre deploys.
          if (REACT_PACKAGES.has(pkg)) return 'vendor-react'
        },
      },
    },
  },
})
