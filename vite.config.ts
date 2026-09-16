import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

const THREE_PACKAGES = new Set([
  'three', 'three-stdlib', 'three-mesh-bvh', 'react-reconciler', 'zustand', 'its-fine', 'suspend-react',
  'maath', 'camera-controls', 'stats-gl', 'meshline', '@monogrid/gainshader', '@use-gesture/react',
  '@use-gesture/core', 'detect-gpu', 'hls.js',
])
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
          // three.js e tudo que so o 3D usa: fica fora da carga inicial (o Kermit e lazy).
          if (THREE_PACKAGES.has(pkg) || pkg.startsWith('@react-three/') || pkg.startsWith('troika-')) {
            return 'vendor-three'
          }
          if (pkg === 'gsap') return 'vendor-gsap'
          if (pkg === 'lenis') return 'vendor-lenis'
          // O React inteiro aqui. A regra antiga excluia node_modules/react, o bundler
          // colocava o React dentro do pacote do three e toda pagina baixava os dois.
          if (REACT_PACKAGES.has(pkg)) return 'vendor-react'
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
