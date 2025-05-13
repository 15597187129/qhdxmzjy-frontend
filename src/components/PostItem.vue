<template>
  <el-card class="post-item">
    <p>{{ post.content }}</p>
    <small>{{ post.username }} 发表于 {{ post.createdAt }}</small>
  </el-card>
</template>

<script setup>
defineProps({
  post: Object
})
</script>

<style scoped>
.post-item {
  margin-bottom: 10px;
}
</style>
