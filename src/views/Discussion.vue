<!-- src/views/Discussion.vue -->
<template>
  <div class="flex flex-col h-screen">
    <!-- 顶部全局导航 -->
    <Navbar />

    <div class="flex flex-1 overflow-hidden">
      <!-- 左侧：讨论组列表 & Tab -->
      <aside class="w-64 border-r bg-white p-4 overflow-y-auto">
        <!-- Tab 切换 -->
        <el-tabs v-model="activeTab" @tab-click="switchTab">
          <el-tab-pane label="我已加入" name="joined" />
          <el-tab-pane label="加入讨论组" name="join" />
        </el-tabs>

        <!-- 讨论组列表 -->
        <div class="mt-4 space-y-2">
          <div
              v-for="g in displayedGroups"
              :key="g.id"
              @click="selectGroup(g.id)"
              class="flex justify-between items-center p-2 border rounded cursor-pointer hover:bg-blue-50"
              :class="{ 'bg-blue-100': selectedGroupId === g.id }"
          >
            <span>{{ g.title }}</span>
            <!-- 只有“加入讨论组”页签显示按钮 -->
            <el-button
                v-if="activeTab === 'join'"
                type="primary"
                size="mini"
                @click.stop="joinGroup(g.id)"
            >
              加入
            </el-button>
          </div>
          <div v-if="displayedGroups.length === 0" class="mt-8 text-center text-gray-500">
            <el-empty
                :description="activeTab === 'joined' ? '暂无已加入讨论组' : '暂无可加入讨论组'"
            />
          </div>
        </div>
      </aside>

      <!-- 右侧：消息列表 + 分页 + 输入 -->
      <main class="flex-1 flex flex-col bg-gray-50 p-4">
        <!-- 未选中任何组时的提示 -->
        <div v-if="!selectedGroupId" class="flex-1 flex items-center justify-center">
          <el-empty description="请选择讨论组" />
        </div>

        <!-- 已选组后的消息区 -->
        <div v-else class="flex flex-col flex-1">
          <!-- 消息滚动区 -->
          <div class="flex-1 overflow-y-auto pr-2 mb-4 bg-white p-4 rounded">
            <div
                v-for="msg in messages"
                :key="msg.id"
                class="mb-4 border-b pb-2 last:border-none"
            >
              <div class="text-gray-800">
                <span class="font-medium">{{ msg.username }}</span>：{{ msg.content }}
              </div>
              <div class="text-gray-500 text-sm">{{ formatDate(msg.createdAt) }}</div>
            </div>
            <div v-if="messages.length === 0" class="py-12 text-center text-gray-500">
              <el-empty description="暂无发言" />
            </div>
          </div>

          <!-- 分页控制 -->
          <div class="flex items-center justify-between mb-4 flex-shrink-0">
            <div>共 {{ total }} 条</div>
            <div class="flex items-center space-x-2">
              <span>每页</span>
              <el-select v-model="size" class="w-20">
                <el-option v-for="s in [5,10,20]" :key="s" :label="s" :value="s" />
              </el-select>
              <span>条</span>
              <el-pagination
                  :current-page="page"
                  :page-size="size"
                  :total="total"
                  layout="prev, pager, next"
                  background
                  class="ml-2"
                  @current-change="onPageChange"
              />
            </div>
          </div>

          <!-- 新发言输入区 -->
          <div class="space-y-2 flex-shrink-0 bg-white p-4 rounded">
            <el-input
                v-model="draft"
                type="textarea"
                :rows="3"
                placeholder="输入发言…"
            />
            <div class="text-right">
              <el-button type="primary" @click="send">发送</el-button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import Navbar from '@/components/Navbar.vue'
import request from '@/utils/request'

interface Group { id: number; title: string }
interface Message { id: number; username: string; content: string; createdAt: string }

// Tab 状态
const activeTab = ref<'joined' | 'join'>('joined')

// 我已加入 / 可加入 的列表
const groupsJoined = ref<Group[]>([])
const groupsJoin = ref<Group[]>([])

// 当前选择的讨论组
const selectedGroupId = ref<number | null>(null)

// 消息与分页
const messages = ref<Message[]>([])
const total = ref(0)
const page = ref(1)
const size = ref(10)
const draft = ref('')

// 根据 Tab 计算要展示哪个列表
const displayedGroups = computed(() =>
    activeTab.value === 'joined' ? groupsJoined.value : groupsJoin.value
)

// 时间格式化，只保留 “年-月-日 时:分”
function formatDate(ts: string): string {
  const [d, t] = ts.split('T')
  return `${d} ${t.slice(0,5)}`
}

// —— API 调用 ——

// 拉 “我已加入” 列表，500 错误当成空列表
async function fetchJoined() {
  try {
    const res = await request.get<Group[]>('/discussions/my')
    groupsJoined.value = res.data
  } catch (err: any) {
    if (err.response?.status === 500) {
      groupsJoined.value = []
    } else {
      ElMessage.error(err.response?.data?.message || '加载已加入列表失败')
    }
  }
}

// 拉 “可加入” 列表（模拟接口；后端若没有可删）
async function fetchJoinable() {
  try {
    const res = await request.get<Group[]>('/discussions/available')
    groupsJoin.value = res.data
  } catch {
    groupsJoin.value = []
  }
}

// 拉指定组的消息列表
async function fetchMessages() {
  if (!selectedGroupId.value) return
  try {
    const res = await request.get<{
      content: Message[]
      totalElements: number
    }>(`/posts/${selectedGroupId.value}`, {
      params: { page: page.value - 1, size: size.value }
    })
    messages.value = res.data.content
    total.value = res.data.totalElements
  } catch {
    messages.value = []
    total.value = 0
  }
}

// 加入讨论组
async function joinGroup(id: number) {
  try {
    await request.post('/discussions/join', { discussionId: id })
    ElMessage.success('加入成功')
    await fetchJoined()
    activeTab.value = 'joined'
    selectedGroupId.value = id
  } catch (err: any) {
    ElMessage.error(err.response?.data?.message || '加入失败')
  }
}

// 发送新发言
async function send() {
  if (!draft.value.trim() || !selectedGroupId.value) return
  try {
    await request.post('/discussions/post', {
      discussionId: selectedGroupId.value,
      content: draft.value.trim()
    })
    draft.value = ''
    await fetchMessages()
  } catch {
    ElMessage.error('发送失败')
  }
}

// 切 Tab
function switchTab(tab: { name: string }) {
  activeTab.value = tab.name as 'joined' | 'join'
  selectedGroupId.value = null
  messages.value = []
  total.value = 0
}

// 选中一个组
function selectGroup(id: number) {
  selectedGroupId.value = id
  fetchMessages()
}

// 分页变化
function onPageChange(p: number) {
  page.value = p
  fetchMessages()
}

// 初始加载
onMounted(() => {
  fetchJoined()
  fetchJoinable()
})
</script>

<style scoped>
/* 可根据需要微调 */
</style>
