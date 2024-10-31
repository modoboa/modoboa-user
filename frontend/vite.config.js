import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

import { federation } from '@module-federation/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    vueDevTools(),
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    ViteFonts({
      google: {
        families: [
          {
            name: 'Roboto',
            styles: 'wght@100;300;400;500;700;900',
          },
        ],
      },
    }),
    federation({
      name: 'host',
      remotes: {
        remote: {
          type: 'module',
          name: 'remote',
          entry: 'https://localhost:3000/remoteEntry.js',
          entryGlobalName: 'remote',
          shareScope: 'default',
        }
      },
      filename: 'remoteEntry.js',
      shared: ['vue', 'pinia', 'vue-router', 'vue3-gettext']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target:
          process.env.DOCKER == 'yes'
            ? 'https://api:8000'
            : 'https://127.0.0.1:8000',
        secure: false,
      },
    }
  },
})
