import { fileURLToPath, URL } from 'node:url'
import { copyFileSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    {
      name: 'copy-cname',
      closeBundle() {
        // Copy CNAME file to dist for GitHub Pages custom domain
        const cnamePath = resolve(__dirname, '../CNAME')
        const distPath = resolve(__dirname, 'dist/CNAME')
        try {
          copyFileSync(cnamePath, distPath)
        } catch (err) {
          // CNAME might not exist, that's okay
        }
        
        // Copy index.html to 404.html for GitHub Pages SPA routing
        // This allows direct access to routes like /blog to work
        const indexPath = resolve(__dirname, 'dist/index.html')
        const notFoundPath = resolve(__dirname, 'dist/404.html')
        try {
          copyFileSync(indexPath, notFoundPath)
        } catch (err) {
          console.warn('Could not create 404.html:', err)
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
