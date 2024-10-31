import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      // component: () => import('@/layouts/default/DefaultLayout.vue'),
      children: [
        // {
        //   path: '',
        //   name: 'Login',
        //   component: () => import('@/views/login/LoginView.vue'),
        // },
        {
          path: 'logged',
          name: 'LoginCallback',
          component: () => defineAsyncComponent(() => import('remote/auth-callback')),
        },
      ],
    },
    {
      path: '/contacts',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'ContactList',
          component: () => import('../views/contacts/AddressBook.vue'),
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth !== undefined) {
    const previousPage = window.location.href
    sessionStorage.setItem('previousPage', previousPage)
    const authStore = useAuthStore()
    if (!authStore.authUser) {
      await authStore.initialize()
    }
    authStore.validateAccess()
    // if (to.meta.allowedRoles !== undefined) {
    //   if (to.meta.allowedRoles.indexOf(authStore.authUser.role) === -1) {
    //     next({ name: 'Dashboard' })
    //     return
    //   }
    // }
    // if (to.meta.requiresMailbox && !authStore.authUser.mailbox) {
    //   next({ name: 'Dashboard' })
    // }
  }
  next()
})

export default router
