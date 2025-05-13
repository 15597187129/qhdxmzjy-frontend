<template>
  <div class="chat-input">
    <el-input
        type="textarea"
        v-model="content"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="输入你的发言..."
        @keyup.enter.native="onSend"
    />
    <el-button
        type="primary"
        :loading="sending"
        :disabled="!content.trim()"
        @click="onSend"
    >
      发送
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import request from '@/utils/request'

interface Post { id: number; userId: number; content: string; createdAt: string }

// 接收 groupId
const props = defineProps<{ groupId: number }>()
// 通知父组件：发送完成
const emit = defineEmits<{
  (e: 'sent', msg: Post): void
}>()

const content = ref('')
const sending = ref(false)

async function onSend() {
  if (props.groupId <= 0 || !content.value.trim()) return
  sending.value = true
  try {
    const r = await request.post<Post>('/discussions/post', {
      discussionId: props.groupId,
      content: content.value.trim()
    })
    emit('sent', r.data)
    content.value = ''
  } catch (e: any) {
    ElNotification.error(e.response?.data?.message || '发送失败')
  } finally {
    sending.value = false
  }
}
</script>

<style scoped>
.chat-input {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid #eee;
  background: #fff;
  height: 88px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
}
.chat-input .el-input {
  flex: 1;
}
.chat-input .el-button {
  white-space: nowrap;
}
</style>
