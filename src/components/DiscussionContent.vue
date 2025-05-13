<template>
  <div class="discussion-content">
    <!-- 消息展示区域 -->
    <div class="message-list" ref="messageList">
      <div v-for="post in posts" :key="post.id" class="message-card">
        <el-card :body-style="{ padding: '10px' }">
          <div class="message-header">
            <el-avatar :src="post.userAvatar" size="small"></el-avatar>
            <span>{{ post.username }}</span>
            <span>{{ post.time }}</span>
          </div>
          <p>{{ post.content }}</p>
        </el-card>
      </div>
    </div>

    <!-- 输入框和发送按钮 -->
    <div class="message-input-container">
      <el-input v-model="newMessage" placeholder="输入消息..." class="message-input"></el-input>
      <el-button @click="sendMessage" class="send-button">发送</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ElCard, ElInput, ElButton, ElAvatar } from 'element-plus';
import axios from 'axios';

const selectedDiscussionId = ref<number | null>(null);
const posts = ref<Array<{ id: number; userAvatar: string; username: string; content: string; time: string }>>([]);
const newMessage = ref('');

// 获取讨论组的消息
const fetchPosts = async () => {
  if (selectedDiscussionId.value) {
    try {
      const response = await axios.get(`/discussions/${selectedDiscussionId.value}/posts`);
      posts.value = response.data.map((post: any) => ({
        id: post.id,
        userAvatar: post.userAvatar,
        username: post.username,
        content: post.content,
        time: post.time
      }));
    } catch (error) {
      console.error('获取消息失败:', error);
    }
  }
};

// 发送消息
const sendMessage = async () => {
  if (newMessage.value.trim()) {
    try {
      await axios.post('/discussions/post', { discussionId: selectedDiscussionId.value, content: newMessage.value });
      newMessage.value = '';  // 清空输入框
      fetchPosts();  // 刷新消息
    } catch (error) {
      console.error('发送消息失败:', error);
    }
  }
};

// 自动滚动到底部
watch(posts, () => {
  const messageList = document.querySelector('.message-list');
  if (messageList) {
    messageList.scrollTop = messageList.scrollHeight;
  }
});

// 页面加载时获取消息
fetchPosts();
</script>

<style scoped>
.discussion-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.message-list {
  max-height: 80%;
  overflow-y: auto;
}

.message-card {
  margin-bottom: 15px;
}

.message-input-container {
  display: flex;
  width: 100%;
  margin-top: 20px;
}

.message-input {
  flex: 1;
  margin-right: 10px;
}

.send-button {
  width: 100px;
}
</style>
