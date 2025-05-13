<template>
  <div class="panorama-page">
    <h2>全景图片库</h2>
    <el-row :gutter="20">
      <el-col v-for="item in panoramas" :key="item.id" :xs="24" :sm="12" :md="8">
        <el-card class="panorama-card">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <p>{{ formatDate(item.created_at) }}</p>
          <el-button type="primary" @click="viewPanorama(item.id)">预览</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import request from '@/utils/request'
import { ElMessage } from 'element-plus'

interface Panorama {
  id: number
  title: string
  description: string
  created_at: string
}

const router = useRouter()
const panoramas = ref<Panorama[]>([])

async function fetchPanoramas() {
  try {
    const res = await request.get('/panorama/list')
    panoramas.value = res.data
  } catch (err) {
    ElMessage.error('加载全景图片失败')
  }
}

function viewPanorama(id: number) {
  router.push(`/panorama/view/${id}`)
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString()
}

onMounted(fetchPanoramas)
</script>

<style scoped>
.panorama-page {
  padding: 20px;
}

.panorama-card {
  margin: 10px 0;
}

h2 {
  margin-bottom: 20px;
}

.el-card {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
