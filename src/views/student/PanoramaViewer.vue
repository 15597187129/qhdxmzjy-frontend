<template>
  <div class="panorama-page">
    <Navbar />

    <div class="panorama-wrapper">
      <el-card class="panorama-card" shadow="hover">
        <div class="viewer-header">
          <el-button
              type="primary"
              icon="el-icon-arrow-left"
              class="back-button"
              @click="goBack"
          >
            返回
          </el-button>
          <div class="title">{{ panoramaTitle }}</div>
        </div>
        <!-- 这里的 id 用于 Pannellum 渲染 -->
        <div id="panoramaContainer" class="pannellum-container"></div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue / 路由 / 请求
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import request from '@/utils/request'
import { ElMessage } from 'element-plus'
import Navbar from '@/components/Navbar.vue'

// 只加载 Pannellum 的打包文件和样式，不再从它的包里 import
import 'pannellum/build/pannellum.js'
import 'pannellum/build/pannellum.css'

// 全局声明 Pannellum（它会自动挂在 window.pannellum）
declare global {
  interface Window { pannellum: any }
}

const route = useRoute()
const router = useRouter()
const panoramaId = route.params.id as string
const panoramaTitle = ref('全景图片')

function goBack() {
  router.push('/panorama')
}

async function initViewer() {
  try {
    const { data } = await request.get(`/panorama/${panoramaId}`)
    if (!data.imagePath) {
      ElMessage.error('全景图数据不完整')
      return
    }
    // 动态拼协议，兼容 http/https
    const { protocol, hostname } = window.location
    const url = `${protocol}//${hostname}:8888${data.imagePath}`
    panoramaTitle.value = data.title || '全景图片'

    // 使用全局的 window.pannellum.viewer
    window.pannellum.viewer('panoramaContainer', {
      type: 'equirectangular',
      panorama: url,
      autoLoad: true,
      showZoomCtrl: true,
      showFullscreenCtrl: true,
      mouseZoom: true,
      draggable: true,
    })
  } catch (err: any) {
    console.error(err)
    ElMessage.error('加载全景图失败，请稍后重试')
  }
}

onMounted(initViewer)
</script>

<style scoped>
.panorama-page {
  padding-top: 64px; /* 根据你的 Navbar 高度调整 */
  background: #f5f7fa;
  min-height: 100vh;
  box-sizing: border-box;
}

.panorama-wrapper {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.panorama-card {
  width: 80vw;
  max-width: 1000px;
  border-radius: 12px;
  overflow: hidden;
}

.viewer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid #ebeef5;
  background: #fff;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: #303133;
}

.back-button {
  background: #409eff;
  color: #fff;
}
.back-button:hover {
  background: #66b1ff;
}

/* Pannellum 渲染容器 */
.pannellum-container {
  width: 100%;
  height: 60vh;
  max-height: 600px;
  background: #000; /* 加载前黑底 */
}
</style>
