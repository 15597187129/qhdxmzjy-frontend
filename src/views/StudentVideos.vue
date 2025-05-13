<!-- src/views/StudentVideos.vue -->
<template>
  <div class="student-videos">
    <Navbar />

    <div class="videos-header">
      <h2>视频库</h2>
    </div>

    <div class="motto">
      <p>民族团结一家亲，共同进步齐发展</p>
    </div>

    <!-- 加载中骨架屏 -->
    <el-skeleton
        v-if="loading"
        animated
        class="skeleton-grid"
        :rows="4"
        :template="skeletonTemplate"
    />

    <!-- 视频列表 -->
    <div v-else-if="videos.length" class="video-grid">
      <div
          v-for="video in videos"
          :key="video.id"
          class="video-card"
          @click="playVideo(video)"
      >
        <div class="cover-wrapper">
          <img
              :src="getCoverUrl(video.coverUrl)"
              alt="视频封面"
              loading="lazy"
              class="video-cover"
          />
        </div>
        <div class="video-info">
          <h3 class="title">{{ video.title }}</h3>
          <p class="date">{{ formatDate(video.createdAt) }}</p>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="empty-message">
      <el-empty description="暂无视频，请稍后再试" />
    </div>

    <!-- 视频播放弹窗 -->
    <el-dialog
        v-model="isPlayerVisible"
        width="90%"
        :modal-append-to-body="true"
        @close="closePlayer"
        custom-class="video-dialog"
        :destroy-on-close="true"
    >
      <template #title>视频播放</template>
      <div class="player-container">
        <video
            v-if="currentVideoUrl"
            :src="currentVideoUrl"
            controls
            autoplay
            class="video-player"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import request from '@/utils/request'
import { ElMessage } from 'element-plus'

// 数据与状态
const videos = ref<any[]>([])
const loading = ref(true)
const isPlayerVisible = ref(false)
const currentVideoUrl = ref<string>('')

// 骨架屏模板
const skeletonTemplate = `
  <div class="skeleton-card" v-for="i in 8">
    <el-skeleton-item variant="image" style="width:100%;height:160px;border-radius:8px" />
    <div style="padding:12px">
      <el-skeleton-item variant="text" style="width:60%;margin-bottom:8px" />
      <el-skeleton-item variant="text" style="width:40%" />
    </div>
  </div>
`

// 格式化日期
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString()
}

// 封面地址
function getCoverUrl(url?: string) {
  return url || '/default-cover.jpg'
}

// 打开播放
function playVideo(video: any) {
  currentVideoUrl.value = video.videoUrl
  isPlayerVisible.value = true
}

// 关闭播放
function closePlayer() {
  isPlayerVisible.value = false
  currentVideoUrl.value = ''
}

// 拉列表
async function loadVideos() {
  try {
    const res = await request.get('/video/list')
    if (Array.isArray(res.data)) {
      videos.value = res.data
    } else {
      ElMessage.warning('视频列表数据格式异常')
    }
  } catch (err: any) {
    ElMessage.error('加载视频列表失败')
  } finally {
    loading.value = false
  }
}

onMounted(loadVideos)
</script>

<style scoped>
.student-videos {
  background: #f5f7fa;
  min-height: 100vh;
  padding: 24px;
}
/* 标题 */
.videos-header h2 {
  text-align: center;
  font-size: 2.4rem;
  margin-bottom: 12px;
  color: #333;
}
.motto {
  text-align: center;
  margin-bottom: 24px;
  font-size: 1.2rem;
  color: #007bff;
  padding: 12px;
  background: #e6f4ff;
  border-radius: 6px;
}
/* 骨架屏网格 */
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}
/* 视频网格 */
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
/* 卡片 */
.video-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform .2s, box-shadow .2s;
}
.video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}
/* 封面容器 */
.cover-wrapper {
  width: 100%;
  height: 160px;
  overflow: hidden;
}
.video-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* 信息区 */
.video-info {
  padding: 12px;
  text-align: center;
}
.video-info .title {
  font-size: 1rem;
  color: #333;
  margin-bottom: 4px;
  line-height: 1.4;
}
.video-info .date {
  font-size: .85rem;
  color: #888;
}
/* 空状态 */
.empty-message {
  margin-top: 80px;
  text-align: center;
}
/* 播放弹窗 */
.video-dialog .el-dialog__header {
  padding: 12px 20px;
  font-size: 1.2rem;
}
.player-container {
  text-align: center;
}
.video-player {
  width: 100%;
  max-height: 80vh;
  border-radius: 6px;
  background: #000;
}
</style>
