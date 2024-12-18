import { createPinia } from 'pinia'

export { useAuthStore } from 'remote/auth-store'
export { useContactsStore } from './contacts.store'
export { useLayoutStore } from './layout.store'

export default createPinia()
