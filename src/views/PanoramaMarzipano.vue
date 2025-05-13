<!-- 文件路径：src/views/PanoramaMarzipano.vue -->
<template>
  <div class="panorama-page">
    <!-- 顶部导航 -->
    <Navbar />

    <!-- 主容器，宽度自适应，居中 -->
    <div class="panorama-wrapper">
      <el-card class="panorama-card" shadow="hover">
        <!-- 返回 + 标题 -->
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
        <!-- 全景放在卡片内 -->
        <div ref="panoElement" class="marzipano-container"></div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Marzipano from 'marzipano';
import request from '@/utils/request';
import { ElMessage } from 'element-plus';
import Navbar from '@/components/Navbar.vue';

const route = useRoute();
const router = useRouter();
const panoramaId = route.params.id as string;

const panoElement = ref<HTMLDivElement|null>(null);
let viewer: any = null;
let scene: any = null;
const panoramaTitle = ref('全景图片');

function goBack() {
  router.push('/panorama');
}

async function loadPanorama() {
  try {
    const { data } = await request.get(`/panorama/${panoramaId}`);
    if (!data.imagePath) {
      ElMessage.error('全景图数据不完整');
      return;
    }
    const { protocol, hostname } = window.location;
    const imageUrl = `${protocol}//${hostname}:8888${data.imagePath}`;
    panoramaTitle.value = data.title || '全景图片';

    // 初始化 Marzipano
    viewer = new Marzipano.Viewer(panoElement.value!, {
      stageType: 'webgl'
    });
    const source = Marzipano.ImageUrlSource.fromString(imageUrl);
    const geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);
    const limiter = Marzipano.RectilinearView.limit.traditional(
        1024,
        Math.PI / 2
    );
    const view = new Marzipano.RectilinearView(null, limiter);
    scene = viewer.createScene({ source, geometry, view });
    scene.switchTo();
  } catch (err: any) {
    console.error(err);
    ElMessage.error('加载全景图失败，请稍后重试');
  }
}

onMounted(loadPanorama);
onBeforeUnmount(() => {
  scene?.destroy();
  viewer?.destroy();
});
</script>

<style scoped>
.panorama-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: #f5f7fa;
}

/* 居中包装器 */
.panorama-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

/* 卡片容器 */
.panorama-card {
  width: 80vw;
  max-width: 1000px;
  border-radius: 12px;
  background: #ffffff;
}

/* 返回 & 标题区 */
.viewer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid #ebeef5;
  margin-bottom: 16px;
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
.back-button:focus {
  outline: none;
  box-shadow: 0 0 5px #409eff;
}

/* 全景画布容器 */
.marzipano-container {
  width: 100%;
  height: 50vh;
  max-height: 500px;
  border-radius: 8px;
  overflow: hidden;
  background: #000; /* 加载前背景 */
}
</style>
