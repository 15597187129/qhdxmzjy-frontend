<!-- 文件：src/views/StudentLayout.vue -->
<template>
  <div class="student-layout flex flex-col h-screen">
    <!-- 顶部导航 -->
    <Navbar />

    <!-- 主体 -->
    <div class="flex flex-1 overflow-hidden">
      <!-- (如果以后要加侧边栏可以在这里放 <aside>) -->

      <!-- 右侧内容 -->
      <main class="flex-1 overflow-hidden">
        <!-- 把子路由渲染到这里 -->
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
</script>

<style scoped>
.student-layout {
  background: #f6f8fb;
}
</style>
