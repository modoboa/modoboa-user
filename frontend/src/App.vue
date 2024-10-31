<template>
  <v-app>
    <NavBar v-if="!!NavBar" :menu-items="[]" />
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
    <UserMenu
      v-if="!!UserMenu"
      :user="authUser"
      remote
    />
  </v-app>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
const UserMenu = defineAsyncComponent(
  () => import("remote/user-menu")
);
const NavBar = defineAsyncComponent(() => import('remote/navbar'))

const authUser = computed(() => authStore.authUser)

authStore.fetchUser()
</script>
