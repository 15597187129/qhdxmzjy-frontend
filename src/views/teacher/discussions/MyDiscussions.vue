<!-- 文件路径：src/views/teacher/discussions/MyDiscussions.vue -->
<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">我的讨论组</h2>
      <el-button
          type="primary"
          :disabled="loading"
          @click="goCreate"
      >
        创建讨论组
      </el-button>
    </div>

    <el-table
        :data="discussions"
        stripe
        v-loading="loading"
        style="width: 100%"
    >
      <!-- 编号 -->
      <el-table-column
          prop="id"
          label="编号"
          width="100"
      />

      <!-- 组名 -->
      <el-table-column
          prop="title"
          label="组名"
      />

      <!-- 描述 -->
      <el-table-column
          prop="description"
          label="描述"
      />

      <!-- 创建日期（年月日） -->
      <el-table-column
          prop="createDate"
          label="创建日期"
          width="120"
      />

      <!-- 操作 -->
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
              type="text"
              size="small"
              @click="goMembers(row.id)"
          >
            成员管理
          </el-button>
          <el-button
              type="text"
              size="small"
              @click="goMessages(row.id)"
          >
            发言管理
          </el-button>
          <el-button
              type="text"
              size="small"
              :disabled="loading"
              @click="deleteDiscussion(row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '@/utils/request'

// 后端原始返回类型
interface RawDiscussion {
  id: number
  title: string
  description: string
  // 有的接口可能叫 createdAt，有的可能叫 created_at
  createdAt?: string
  created_at?: string
}

// 表格展示类型
interface Discussion {
  id: number
  title: string
  description: string
  // 只要年月日
  createDate: string
}

const router = useRouter()
const discussions = ref<Discussion[]>([])
const loading = ref(false)

async function fetchDiscussions() {
  loading.value = true
  try {
    const res = await request.get<RawDiscussion[]>('/discussions/created')
    discussions.value = res.data.map(item => {
      // 优先取 created_at，再取 createdAt
      const raw = item.created_at ?? item.createdAt ?? ''
      // 截取前 10 个字符：YYYY-MM-DD
      const dateOnly = raw.slice(0, 10)
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        createDate: dateOnly
      }
    })
  } catch (err: any) {
    console.error('加载讨论组失败', err)
    ElMessage.error(err.response?.data?.message || '加载讨论组失败')
  } finally {
    loading.value = false
  }
}

function goCreate() {
  router.push('/teacher/discussions/create')
}

function goMembers(id: number) {
  router.push(`/teacher/discussions/members?groupId=${id}`)
}

function goMessages(id: number) {
  router.push(`/teacher/discussions/messages?groupId=${id}`)
}

async function deleteDiscussion(id: number) {
  try {
    await ElMessageBox.confirm('确认删除此讨论组？', '提示', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning'
    })
    loading.value = true
    await request.delete(`/discussions/${id}`)
    ElMessage.success('删除成功')
    fetchDiscussions()
  } catch (err: any) {
    if (err !== 'cancel') {
      console.error('删除失败', err)
      ElMessage.error(err.response?.data?.message || '删除失败')
    }
  } finally {
    loading.value = false
  }
}

onMounted(fetchDiscussions)
</script>

<style scoped>
.p-6 {
  padding: 1.5rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
</style>
