<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { checkAuth } from '@/components/useAuth'

// 页面首次加载时检查登录状态
onMounted(() => {
  checkAuth()
})

// 路由切换后也重新检查
const route = useRoute()
watch(() => route.fullPath, () => {
  checkAuth()
})
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow-x: hidden;
}
</style>
