<!-- src/views/TeacherDiscussions.vue -->
<template>
  <div class="teacher-discussions h-full">
    <!-- 只保留子路由渲染入口 -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
// 无需额外逻辑
</script>

<style scoped>
.teacher-discussions {
  /* 如果需要全高撑开，可保留 */
  height: 100%;
}
</style>
