<template>
  <div id="app">
    <router-view></router-view>
    <ErrorHandler />
    <PermissionDebugger v-if="isDevelopment" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import ErrorHandler from './components/ErrorHandler.vue';
import PermissionDebugger from './components/PermissionDebugger.vue';

const authStore = useAuthStore();

const isDevelopment = computed(() => process.env.NODE_ENV === 'development')

onMounted(async () => {
  try {
    await authStore.init();
  } catch (error) {
    console.error('Failed to initialize auth store:', error);
  }
});
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  height: 100vh;
}
</style>