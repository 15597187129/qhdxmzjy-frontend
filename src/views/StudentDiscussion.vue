<template>
  <div class="student-discussion">
    <!-- 顶部导航 -->
    <Navbar />

    <!-- 左侧讨论组列表 -->
    <div class="group-panel">
      <GroupList
          v-model:selected="currentGroupId"
          @joined="onJoined"
      />
    </div>

    <!-- 右侧聊天区域 / 占位文案 -->
    <div class="chat-panel">
      <!-- 已选组：渲染聊天面板 -->
      <ChatPanel
          v-if="currentGroupId !== null"
          :groupId="currentGroupId"
          @left="currentGroupId = null"
      />

      <!-- 未选组：显示引导文案 -->
      <div v-else class="no-group-placeholder">
        <p>🚀 欢迎来到互动讨论</p>
        <p>请从左侧选择或加入一个讨论组，开始你的发言吧！</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import GroupList from '@/components/GroupList.vue'
import ChatPanel from '@/components/ChatPanel.vue'

/** 当前选中的讨论组 ID，null 表示未选 */
const currentGroupId = ref<number|null>(null)

/** 加入成功后自动选中该组 */
function onJoined(id: number) {
  currentGroupId.value = id
}
</script>

<style scoped>
.student-discussion {
  display: flex;
  margin-top: 60px;
  /* 全屏减去顶部 navbar (约 64px) */
  height: calc(100vh - 64px);
  padding: 24px;
  gap: 16px;
  background: #f5f7fa;
  overflow: hidden; /* 锁定整体上下滚动 */
}

.group-panel {
  flex: 1;
  min-width: 240px;
  overflow-y: auto; /* 左侧列表可滚动 */
}

.chat-panel {
  flex: 3;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden; /* 只让内部 ChatPanel 滚动 */
}

/* 未选组时的占位文案 */
.no-group-placeholder {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 16px;
  text-align: center;
}
.no-group-placeholder p:first-child {
  font-size: 20px;
  margin-bottom: 8px;
}
</style>
