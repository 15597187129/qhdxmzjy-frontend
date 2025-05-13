<template>
  <div class="chat-list" ref="scrollContainer">
    <MessageItem
        v-for="msg in messages"
        :key="msg.id"
        :msg="msg"
        :isMine="msg.userId === myUserId"
    />
    <div v-if="!messages.length && !loading" class="empty">暂无发言</div>
    <div v-if="loading && page > 0" class="load-more">加载中…</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, defineExpose } from 'vue'
import MessageItem from './MessageItem.vue'
import request from '@/utils/request'

interface Post { id: number; userId: number; content: string; createdAt: string }

// 接收 groupId
const props = defineProps<{ groupId: number }>()

// 解析当前用户 ID
function parseJwt(t: string) {
  try {
    const p = t.split('.')[1]
    return JSON.parse(
        decodeURIComponent(
            atob(p)
                .split('')
                .map((c) =>
                    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                )
                .join('')
        )
    )
  } catch {
    return {}
  }
}
const myUserId = parseJwt(localStorage.getItem('token') || '').id || 0

// 数据状态
const messages = ref<Post[]>([])
const page = ref(0)
const total = ref(1)
const loading = ref(false)
const scrollContainer = ref<HTMLElement | null>(null)

// 暴露给外部：追加一条消息并滚到底部
function addMessage(msg: Post) {
  messages.value.push(msg)
  nextTick(() => {
    if (scrollContainer.value)
      scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
  })
}
defineExpose({ addMessage })

// 分页拉取消息
async function loadMessages() {
  if (props.groupId <= 0 || page.value >= total.value) return
  loading.value = true
  try {
    const res = await request.get<{ content: Post[]; totalPages: number }>(
        `/posts/${props.groupId}`,
        { params: { page: page.value, size: 20 } }
    )
    if (page.value === 0) messages.value = []
    messages.value.push(...res.data.content)
    total.value = res.data.totalPages
    await nextTick()
    if (scrollContainer.value)
      scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
  } finally {
    loading.value = false
  }
}

// 切换 groupId 时重置并加载
watch(
    () => props.groupId,
    () => {
      page.value = 0
      total.value = 1
      messages.value = []
      loadMessages()
    }
)

onMounted(() => {
  loadMessages()
  scrollContainer.value?.addEventListener('scroll', () => {
    if (
        scrollContainer.value!.scrollTop === 0 &&
        !loading.value &&
        page.value < total.value - 1
    ) {
      page.value++
      loadMessages()
    }
  })
})
</script>

<style scoped>
.chat-list {
  position: absolute;
  top: 50px;    /* 保持与 ChatPanel 头部一致 */
  bottom: 88px; /* 留出 ChatInput 的高度 */
  left: 0;
  right: 0;
  overflow-y: auto;
  padding: 16px;
}
.empty {
  text-align: center;
  color: #999;
  margin-top: 20px;
}
.load-more {
  text-align: center;
  padding: 8px;
  color: #666;
}
</style>
