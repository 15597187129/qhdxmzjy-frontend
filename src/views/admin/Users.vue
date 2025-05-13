<!-- 文件路径：src/views/admin/Users.vue -->
<template>
  <div class="p-6 bg-gray-50 min-h-full">
    <el-card shadow="never">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">用户权限管理</h2>
      </div>

      <el-table
          :data="users"
          v-loading="loading"
          stripe
          style="width: 100%;"
      >
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column label="角色" width="240">
          <template #default="{ row }">
            <el-space align="center" size="small">
              <el-select
                  v-model="row.role"
                  placeholder="请选择"
                  clearable
                  style="width: 120px;"
              >
                <el-option label="学生" value="student" />
                <el-option label="教师" value="teacher" />
                <el-option label="管理员" value="admin" />
              </el-select>
              <el-button
                  type="primary"
                  size="small"
                  :loading="savingId === row.id"
                  @click="saveRole(row)"
              >
                保存
              </el-button>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="{ row }">
            <el-button
                type="text"
                size="small"
                class="text-red-500 hover:underline"
                @click="deleteUser(row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '@/utils/request'

interface User {
  id: number
  username: string
  email: string
  role: 'student' | 'teacher' | 'admin'
}

const users = ref<User[]>([])
const loading = ref(false)
const savingId = ref<number | null>(null)

async function fetchUsers() {
  loading.value = true
  try {
    const res = await request.get<User[]>('/admin/users')
    users.value = res.data
  } catch (err: any) {
    ElMessage.error(err.response?.data?.message || '加载用户失败')
  } finally {
    loading.value = false
  }
}

async function saveRole(user: User) {
  savingId.value = user.id
  try {
    await request.put(`/admin/users/${user.id}/role`, { role: user.role })
    ElMessage.success('角色更新成功')
  } catch (err: any) {
    ElMessage.error(err.response?.data?.message || '更新失败')
  } finally {
    savingId.value = null
  }
}

async function deleteUser(id: number) {
  try {
    await ElMessageBox.confirm('确认删除此用户？', '提示', {
      type: 'warning',
      confirmButtonText: '删除',
      cancelButtonText: '取消'
    })
    loading.value = true
    await request.delete(`/admin/users/${id}`)
    ElMessage.success('删除成功')
    await fetchUsers()
  } catch (err: any) {
    if (err !== 'cancel') {
      ElMessage.error(err.response?.data?.message || '删除失败')
    }
  } finally {
    loading.value = false
  }
}

onMounted(fetchUsers)
</script>

<style scoped>
.bg-gray-50 {
  background-color: #f6f8fb;
}
</style>
