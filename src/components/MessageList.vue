<template>
  <div class="message-item">
    <div class="header">
      <span>{{ msg.username }}</span>
      <span class="time">{{ formatTime(msg.createdAt) }}</span>
      <el-icon
          v-if="isMine"
          class="delete-icon"
          @click="onDelete"
      >
        <delete />
      </el-icon>
    </div>
    <div class="content">{{ msg.content }}</div>
  </div>
</template>

<script setup lang="ts">
import request from '@/utils/request'
import { ElNotification } from 'element-plus'

// 消息类型
interface Msg {
  id: number
  userId: number
  username: string
  content: string
  createdAt: string
}

const props = defineProps<{ msg: Msg; isMine: boolean }>()
// 只列出事件名，去掉 tuple 泛型
const emit = defineEmits(['deleted'])

function formatTime(ts: string) {
  const [d, t] = ts.split('T')
  return `${d} ${t.slice(0,5)}`
}

async function onDelete() {
  try {
    await request.delete(`/discussions/posts/${props.msg.id}`)
    ElNotification.success({ title: '成功', message: '删除成功' })
    emit('deleted', props.msg.id)
  } catch (err: any) {
    ElNotification.error(err.response?.data?.message || '删除失败')
  }
}
</script>

<style scoped>
.message-item {
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 6px;
  background: #fff;
  position: relative;
}
.header {
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.time {
  font-size: 12px;
  color: #999;
}
.content {
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  margin-top: 8px;
}
.delete-icon {
  cursor: pointer;
}
.delete-icon:hover {
  color: #f56c6c;
}
</style>
