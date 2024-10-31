// Plugins
import vuetify from './vuetify'
import router from '../router'
import pinia from '@/stores'
import gettext from './gettext'

export function registerPlugins(app) {
  app
    .use(vuetify)
    .use(pinia)
    .use(router)
    .use(gettext)
}
