<template>
  <div :class="['message-item', { mine: isMine }]">
    <!-- 只显示用户名，已去掉角色 -->
    <div class="sender">{{ msg.username }}</div>
    <div class="bubble">
      <div class="content">{{ msg.content }}</div>
      <div class="time">{{ formattedTime }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import dayjs from 'dayjs'

interface Msg {
  id: number
  userId: number
  /** 改为可选 */
  username?: string
  content: string
  createdAt: string
}
const props = defineProps<{
  msg: Msg
  isMine: boolean
}>()

const formattedTime = computed(() =>
    dayjs(props.msg.createdAt).format('YYYY-MM-DD HH:mm')
)
const isMine = props.isMine
</script>

<style scoped>
.message-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  align-items: flex-start; /* 默认左对齐 */
}
.message-item.mine {
  align-items: flex-end;   /* “我自己”消息靠右 */
}

.sender {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #555;
}

.bubble {
  max-width: 70%;
  background: #e6f7ff;
  padding: 10px 14px;
  border-radius: 8px;
}
.message-item.mine .bubble {
  background: #d5f5e3;
}

.content {
  word-wrap: break-word;
}
.time {
  font-size: 12px;
  color: #999;
  margin-top: 6px;
  text-align: right;
}
</style>
