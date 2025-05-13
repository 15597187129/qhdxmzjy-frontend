<template>
  <div>
    <!-- 顶部导航卡片 -->
    <Navbar />

    <!-- 主体内容 -->
    <div class="panorama-container">
      <h2 class="page-title">虚拟文化之旅</h2>
      <p class="page-subtitle">环视青海·在全景画卷中感悟民族团结进步的壮丽画面</p>

      <!-- 全景图片列表 -->
      <el-row :gutter="20" class="panorama-list">
        <el-col v-for="image in images" :key="image.id" :span="8">
          <el-card class="panorama-item" shadow="hover">
            <div class="panorama-info">
              <h3 class="panorama-title">{{ image.title }}</h3>
              <p class="panorama-desc">{{ image.description }}</p>
              <el-button type="primary" size="small" @click="viewPanorama(image.id)">查看</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import request from '@/utils/request'

interface Panorama {
  id: number
  title: string
  description: string
  imagePath: string
}

const images = ref<Panorama[]>([])
const router = useRouter()

// 加载全景图片列表
async function loadPanoramas() {
  try {
    const res = await request.get('/panorama/list')
    images.value = res.data
  } catch (error) {
    console.error('加载全景图片失败', error)
  }
}

function viewPanorama(id: number) {
  router.push(`/panorama/view/${id}`)
}

onMounted(() => {
  loadPanoramas()
})
</script>

<style scoped>
.panorama-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 60px;
  text-align: center;
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
}

.panorama-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.panorama-item {
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
  text-align: center;
  line-height: 1.5;
}

.panorama-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.panorama-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

.el-button {
  margin-top: 8px;
}
</style>
