<template>
  <el-card class="chat-card" :body-style="{ padding: 0 }">
    <!-- 头部 -->
    <div class="chat-header" v-if="groupTitle">
      <span class="title">{{ groupTitle }} {{ memberCount }} 人</span>
      <el-button size="small" type="danger" @click="leaveGroup">
        退出组
      </el-button>
    </div>

    <!-- 拆分后的子组件 -->
    <ChatList
        v-if="groupId !== null"
        :groupId="groupId"
        ref="chatList"
    />
    <ChatInput
        v-if="groupId !== null"
        :groupId="groupId"
        @sent="onSent"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, toRef, watch, onMounted } from 'vue'
import { ElNotification } from 'element-plus'
import request from '@/utils/request'
import ChatList from './ChatList.vue'
import ChatInput from './ChatInput.vue'

interface Group { id: number; title: string }
interface Member { id: number; username: string }

// 接收父级传入的 groupId（可 null）
const props = defineProps<{ groupId: number | null }>()
const groupId = toRef(props, 'groupId')
const emit = defineEmits(['left'])

// 头部展示数据
const groupTitle = ref('')
const memberCount = ref(0)

// 加载组标题 & 人数
async function loadHeader() {
  if (groupId.value === null) return
  try {
    const r = await request.get<Group[]>('/discussions/my')
    const g = r.data.find((x) => x.id === groupId.value)
    groupTitle.value = g?.title ?? '讨论组'
  } catch {}
  try {
    const r2 = await request.get<Member[]>(
        `/discussions/${groupId.value}/members`
    )
    memberCount.value = r2.data.length
  } catch {}
}

// 监听 groupId 改变 & 初始加载
watch(groupId, loadHeader)
onMounted(loadHeader)

// 退出组
async function leaveGroup() {
  if (groupId.value === null) return
  try {
    await request.delete(`/discussions/${groupId.value}/leave`)
    ElNotification.info('已退出讨论组')
    emit('left')
  } catch (e: any) {
    ElNotification.error(e.response?.data?.message || '退出失败')
  }
}

// 子组件 ChatInput 发完消息后回调，把它加到 ChatList
const chatList = ref<{ addMessage: (msg: any) => void } | null>(null)
function onSent(msg: any) {
  chatList.value?.addMessage(msg)
}
</script>

<style scoped>
.chat-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 112px);
  border-radius: 8px;
}
.chat-header {
  flex: 0 0 50px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: #fafafa;
  border-bottom: 1px solid #eee;
}
.chat-header .title {
  font-size: 16px;
  font-weight: 600;
  margin-right: auto;
}
</style>
