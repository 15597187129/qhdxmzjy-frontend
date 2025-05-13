<!-- src/views/Home.vue -->
<template>
  <div class="home-page">
    <!-- 悬浮导航 -->
    <Navbar class="home-navbar" />

    <!-- 轮播图背景首屏 -->
    <section class="banner-section">
      <div class="carousel-container">
        <ImageCarousel />
      </div>
      <div class="slogan">
        坚定信心 保持定力 深化改革<br />
        坚持用改革促发展 用改革促提升
      </div>
      <!-- 欢迎浮层 -->
      <div v-if="showToast" class="welcome-toast">
        🎉 欢迎回来，{{ (auth.state.user as any)?.username }}！
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
import { checkAuth, useAuth } from '@/components/useAuth'

const auth = useAuth()
const router = useRouter()
const showToast = ref(false)

onMounted(async () => {
  // 检查登录态
  await checkAuth()
  if (!auth.state.isLoggedIn) {
    window.location.href = '/login'
    return
  }

  // 拿到当前用户角色
  const role = (auth.state.user as any)?.role || ''

  // 首次加载时带欢迎参数跳转
  if (role === 'student') {
    router.push({ path: '/home', query: { welcome: '1' } })
  } else if (role === 'teacher') {
    router.push({ path: '/teacher/dashboard', query: { welcome: '1' } })
  } else if (role === 'admin') {
    router.push({ path: '/admin/dashboard', query: { welcome: '1' } })
  }
})
</script>

<style scoped lang="scss">
/* 全局防止纵向滚动 */
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow: hidden;
}

.home-page {
  position: relative;
  width: 100%;
  height: 100%;
}

/* 顶部悬浮导航 */
.home-navbar {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  z-index: 20;
}

/* 轮播图区域 */
.banner-section {
  position: absolute;
  top: 60px; /* 导航栏高度 */
  left: 0;
  width: 100%;
  height: calc(100vh - 60px);
  overflow: hidden;
}

/* 轮播容器全屏铺满 */
.carousel-container {
  width: 100%;
  height: 100%;
}

/* 标语 */
.slogan {
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  color: #ffd700;
  font-size: 2.2rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px 6px rgba(0,0,0,0.6);
  z-index: 10;
}

/* 欢迎浮层 */
.welcome-toast {
  position: fixed;
  top: 80px; right: 20px; /* 导航下方稍微偏移 */
  background: #fff;
  color: #0a2d88;
  padding: 10px 16px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  font-weight: 500;
  z-index: 30;
  animation: fadeInOut 2.5s ease forwards;
}

@keyframes fadeInOut {
  0%   { opacity: 0; transform: translateY(-8px); }
  10%  { opacity: 1; transform: translateY(0); }
  80%  { opacity: 1; }
  100% { opacity: 0; transform: translateY(-8px); }
}
</style>
