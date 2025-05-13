<!-- 文件：src/views/teacher/discussions/DiscussionMembersPage.vue -->
<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">成员管理</h2>

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
        v-if="!selectedGroupId && !loadingMembers"
        description="请选择一个讨论组查看成员"
    />

    <!-- 3. 选组后展示成员表格 -->
    <el-table
        v-else
        :data="members"
        stripe
        v-loading="loadingMembers"
        style="width:100%"
    >
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="role" label="角色" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import request from '@/utils/request'
import { ElMessage } from 'element-plus'

// 接口返回的讨论组简要信息
interface Group {
  id: number
  title: string
  // 如果你的 DTO 字段是 name 而不是 title，请改成 name
}
// 接口返回的成员 DTO
interface Member {
  userId: number
  username: string
  role: string
  // 如果后端字段叫 userRole，请在下面 map 时使用 m.userRole
}

const groups = ref<Group[]>([])
const members = ref<Member[]>([])
const selectedGroupId = ref<number | null>(null)

const loadingGroups = ref(false)
const loadingMembers = ref(false)

// 拉教师自己创建的讨论组
async function fetchGroups() {
  loadingGroups.value = true
  try {
    const res = await request.get<Group[]>('/discussions/created')
    groups.value = res.data
  } catch (err: any) {
    console.error('获取讨论组列表失败', err)
    ElMessage.error(err.response?.data?.message || '加载讨论组失败')
  } finally {
    loadingGroups.value = false
  }
}

// 拉某个讨论组的成员
async function fetchMembers(groupId: number) {
  loadingMembers.value = true
  try {
    const res = await request.get<Member[]>(
        `/discussions/${groupId}/members`
    )
    members.value = res.data
  } catch (err: any) {
    console.error('获取成员列表失败', err)
    ElMessage.error(err.response?.data?.message || '加载成员失败')
    members.value = []
  } finally {
    loadingMembers.value = false
  }
}

// 组改变时触发
function onGroupChange(id: number) {
  members.value = []
  fetchMembers(id)
}

// 初始加载组列表
onMounted(fetchGroups)
</script>

<style scoped>
/* 可根据项目风格微调 */
</style>
