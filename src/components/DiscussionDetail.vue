<template>
  <div class="discussion-detail">
    <h2>{{ discussion.title }}</h2>
    <p>{{ discussion.description }}</p>

    <!-- 帖子展示区 -->
    <div class="post-list">
      <PostItem v-for="post in posts" :key="post.id" :post="post" />
    </div>

    <!-- 发帖区域 -->
    <PostForm @postCreated="fetchPosts" />

    <!-- 分页 -->
    <el-pagination :current-page="currentPage" :page-size="10" :total="totalPosts" @current-change="handlePageChange"></el-pagination>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import request from '@/utils/request'
import PostItem from './PostItem.vue'
import PostForm from './PostForm.vue'

const posts = ref([])  // 当前讨论组的帖子
const discussion = ref({})  // 当前讨论组信息
const currentPage = ref(1)
const totalPosts = ref(0)

// 获取讨论组信息和帖子
const fetchDiscussionDetails = async (discussionId) => {
  const discussionResponse = await request.get(`/discussions/${discussionId}`)
  discussion.value = discussionResponse.data
  fetchPosts(discussionId, currentPage.value)
}

const fetchPosts = async (discussionId, page) => {
  const response = await request.get(`/posts/${discussionId}?page=${page}&size=10`)
  posts.value = response.data.content
  totalPosts.value = response.data.totalElements
}

// 分页切换
const handlePageChange = (page) => {
  fetchPosts(discussion.value.id, page)
}

// 页面加载时获取讨论组信息
onMounted(() => {
  const discussionId = 1  // 替换为实际的讨论组ID
  fetchDiscussionDetails(discussionId)
})
</script>

<style scoped>
.discussion-detail {
  padding: 20px;
}

.post-list {
  margin-bottom: 20px;
}
</style>
