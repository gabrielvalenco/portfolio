import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

const REACT_PACKAGES = new Set(['react', 'react-dom', 'scheduler', 'react-router', 'react-router-dom'])

/** Embute o CSS no HTML: o navegador nao espera um arquivo extra antes de pintar. */
function inlineCss(): Plugin {
  return {
    name: 'inline-css',
    enforce: 'post',
    generateBundle(_, bundle) {
      const html = bundle['index.html']
      if (!html || html.type !== 'asset') return
      let src = String(html.source)
      for (const [name, file] of Object.entries(bundle)) {
        if (file.type !== 'asset' || !name.endsWith('.css')) continue
        const base = name.split('/').pop()!
        const link = new RegExp(`<link[^>]*href="[^"]*${base}"[^>]*>`)
        if (!link.test(src)) continue
        src = src.replace(link, () => `<style>${String(file.source)}</style>`)
        delete bundle[name]
      }
      html.source = src
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), inlineCss()],
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
