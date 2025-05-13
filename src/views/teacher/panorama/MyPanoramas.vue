<template>
  <div class="panorama-list">
    <h2 class="title">我的全景图片</h2>
    <el-table :data="panoramas" stripe>
      <el-table-column prop="id" label="编号" width="80" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="description" label="描述" />
      <el-table-column label="上传时间" v-slot="scope">
        {{ formatDate(scope.row.createdAt) }}
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template #default="scope">
          <el-button
              type="text"
              @click="deletePanorama(scope.row.id)"
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
import { ElMessage } from 'element-plus'
import request from '@/utils/request'

const panoramas = ref([])

async function fetchPanoramas() {
  try {
    const res = await request.get('panorama/list')
    panoramas.value = res.data
  } catch (err: any) {
    console.error('加载全景图片失败', err)
    ElMessage.error(err.response?.data?.message || '加载失败')
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${minute}`
}

async function deletePanorama(id: number) {
  try {
    await request.delete(`panorama/delete/${id}`)
    ElMessage.success('删除成功')
    fetchPanoramas()
  } catch (err: any) {
    console.error('删除失败', err)
    ElMessage.error(err.response?.data?.message || '删除失败')
  }
}

onMounted(fetchPanoramas)
</script>

<style scoped>
.panorama-list {
  padding: 24px;
  background-color: #f6f8fb;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}
</style>
