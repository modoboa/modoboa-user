<template>
  <v-app>
    <NavBar v-if="!!NavBar" :menu-items="layoutStore.leftMenuItems" />
    <TopMenu
      v-if="!!TopMenu"
      :user="authUser"
      remote
    />
    <v-main>
      <v-container fluid>
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <div v-show="true">
              <component :is="Component" />
            </div>
          </transition>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useAuthStore, useLayoutStore } from '@/stores'

const authStore = useAuthStore()
const layoutStore = useLayoutStore()
const TopMenu = defineAsyncComponent(
  () => import('remote/top-menu')
)

const NavBar = defineAsyncComponent(() => import('remote/navbar'))

const authUser = computed(() => authStore.authUser)

authStore.fetchUser()
</script>
