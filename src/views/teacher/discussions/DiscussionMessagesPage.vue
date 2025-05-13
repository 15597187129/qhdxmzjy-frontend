<!-- 文件路径：src/views/teacher/discussions/DiscussionMessagesPage.vue -->
<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">发言管理</h2>

    <!-- 1. 选择讨论组 -->
    <div class="mb-4">
      <el-select
          v-model="selectedGroupId"
          placeholder="请选择讨论组"
          filterable
          :loading="loadingGroups"
          @change="onGroupChange"
          style="width: 260px"
      >
        <el-option
            v-for="g in groups"
            :key="g.id"
            :label="g.title"
            :value="g.id"
        />
      </el-select>
    </div>

    <!-- 2. 未选组时提示 -->
    <el-empty
        v-if="!selectedGroupId && !loadingMessages"
        description="请选择一个讨论组查看发言"
    />

    <!-- 3. 选组后展示发言表格 + 分页 + 输入 -->
    <div v-else>
      <el-table
          :data="messages"
          stripe
          v-loading="loadingMessages"
          style="width: 100%"
          class="mb-4"
      >
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="content" label="内容" />
        <!-- 改动：格式化 createdAt，只显示 年-月-日 时:分 -->
        <el-table-column label="时间" width="160">
          <template #default="{ row }">
            {{ formatDate(row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="{ row }">
            <el-button
                type="text"
                size="small"
                @click="onDelete(row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页控制 -->
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 20]"
          layout="total, sizes, prev, pager, next"
          :total="totalItems"
          @current-change="onPageChange"
          @size-change="onSizeChange"
          background
          class="mb-6"
      />

      <!-- 新发言 -->
      <div class="mb-2">
        <el-input
            v-model="newMessage"
            type="textarea"
            :rows="3"
            placeholder="输入新发言……"
        />
      </div>
      <div class="flex justify-end">
        <el-button
            type="primary"
            :loading="posting"
            :disabled="!newMessage.trim()"
            @click="onSend"
        >
          发送
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '@/utils/request'

interface Group {
  id: number
  title: string
}
interface Message {
  id: number
  username: string
  content: string
  createdAt: string
}

const groups = ref<Group[]>([])
const selectedGroupId = ref<number | null>(null)

const messages = ref<Message[]>([])
const totalItems = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)

const newMessage = ref('')
const loadingGroups = ref(false)
const loadingMessages = ref(false)
const posting = ref(false)

// 只保留 “年-月-日 时:分”
function formatDate(ts: string): string {
  const [date, time] = ts.split('T')
  return `${date} ${time.slice(0,5)}`
}

// 拉取教师创建的讨论组
async function fetchGroups() {
  loadingGroups.value = true
  try {
    const res = await request.get<Group[]>('/discussions/created')
    groups.value = res.data
  } catch (err: any) {
    ElMessage.error(err.response?.data?.message || '加载讨论组失败')
  } finally {
    loadingGroups.value = false
  }
}

// 拉取某组分页发言
async function fetchMessages() {
  if (!selectedGroupId.value) return
  loadingMessages.value = true
  try {
    const res = await request.get<{
      content: Message[]
      totalElements: number
    }>(`/posts/${selectedGroupId.value}`, {
      params: {
        page: currentPage.value - 1,
        size: pageSize.value
      }
    })
    messages.value = res.data.content
    totalItems.value = res.data.totalElements
  } catch (err: any) {
    ElMessage.error(err.response?.data?.message || '加载发言失败')
    messages.value = []
    totalItems.value = 0
  } finally {
    loadingMessages.value = false
  }
}

// 选组后重置分页并拉取
function onGroupChange() {
  currentPage.value = 1
  fetchMessages()
}

// 页码/页大小变化
function onPageChange(page: number) {
  currentPage.value = page
  fetchMessages()
}
function onSizeChange(size: number) {
  pageSize.value = size
  currentPage.value = 1
  fetchMessages()
}

// 删除发言
async function onDelete(postId: number) {
  try {
    await ElMessageBox.confirm('确认删除该发言？', '提示', { type: 'warning' })
    await request.delete(`/discussions/posts/${postId}`)
    ElMessage.success('删除成功')
    fetchMessages()
  } catch (err: any) {
    if (err !== 'cancel') ElMessage.error('删除失败')
  }
}

// 发送发言
async function onSend() {
  if (!selectedGroupId.value) return
  posting.value = true
  try {
    await request.post('/discussions/post', {
      discussionId: selectedGroupId.value,
      content: newMessage.value.trim()
    })
    ElMessage.success('发送成功')
    newMessage.value = ''
    currentPage.value = 1
    fetchMessages()
  } catch (err: any) {
    ElMessage.error(err.response?.data?.message || '发送失败')
  } finally {
    posting.value = false
  }
}

// 初始加载
onMounted(fetchGroups)

// 当分页或组ID变化，自动刷新
watch([currentPage, pageSize], () => {
  if (selectedGroupId.value) {
    fetchMessages()
  }
})
</script>

<style scoped>
/* 可根据整体风格微调 */
</style>
