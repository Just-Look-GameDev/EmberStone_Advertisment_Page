import { fileURLToPath, URL } from 'node:url'
import { copyFileSync } from 'node:fs'
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
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
