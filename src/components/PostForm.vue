<template>
  <div class="post-form">
    <el-input type="textarea" v-model="newPost" placeholder="写下你的观点..."></el-input>
    <el-button type="primary" @click="submitPost">发布</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import request from '@/utils/request'

const newPost = ref('')

// 发帖操作
const submitPost = async () => {
  if (!newPost.value.trim()) return
  await request.post('/discussions/post', { content: newPost.value })
  newPost.value = ''  // 清空输入框
  emit('postCreated')  // 通知父组件刷新帖子列表
}
</script>

<style scoped>
.post-form {
  margin-top: 20px;
}

.post-form el-input {
  margin-bottom: 10px;
}
</style>
