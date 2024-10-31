import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'

import App from './App.vue'

let globalConfig

fetch(import.meta.env.BASE_URL + 'config.json').then((resp) => {
  resp.json().then(config => {
    globalConfig = config
    const app = createApp(App)
    registerPlugins(app)
    app.mount('#app')
    app.provide('$config', config)
  })
})

export const useGlobalConfig = () => globalConfig
