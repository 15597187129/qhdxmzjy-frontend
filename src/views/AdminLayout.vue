<!-- 文件路径：src/layouts/AdminLayout.vue -->
<template>
  <div class="admin-layout">
    <!-- 顶部导航 -->
    <AdminNavbar />

    <div class="body">
      <!-- 左侧侧边栏 -->
      <aside class="sidebar">
        <ul class="menu">
          <li :class="{ active: current === 'dashboard' }">
            <router-link to="/admin/dashboard" class="menu-link">
              <Icon icon="mdi:view-dashboard-outline" class="icon" />
              <span class="label">控制面板</span>
            </router-link>
          </li>
          <!-- 新增：用户管理 -->
          <li :class="{ active: current === 'users' }">
            <router-link to="/admin/users" class="menu-link">
              <Icon icon="mdi:account-cog-outline" class="icon" />
              <span class="label">用户管理</span>
            </router-link>
          </li>
        </ul>
      </aside>

      <!-- 右侧主内容区 -->
      <main class="main-content">
        <!-- Dashboard 欢迎卡片 -->
        <div v-if="current === 'dashboard'" class="welcome-card">
          <h2 class="welcome-title">管理员控制面板</h2>
          <p class="welcome-text">
            欢迎使用管理员后台管理功能，请从左侧选择模块开始操作。
          </p>
        </div>
        <!-- 子路由渲染 -->
        <router-view v-else />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AdminNavbar from '@/components/AdminNavbar.vue'
import { Icon } from '@iconify/vue'

const route = useRoute()
const current = computed(() => {
  if (route.path.startsWith('/admin/users')) return 'users'
  // 仅支持 dashboard 如有更多模块可加
  return 'dashboard'
})
</script>

<style scoped lang="scss">
.admin-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* 两栏主体布局 */
.body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* ====== 侧边栏 ====== */
.sidebar {
  width: 200px;
  background: #f5f7fa;
  padding-top: 16px;
  box-sizing: border-box;
}

.menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu li {
  position: relative;
}

.menu-link {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 16px;
  color: #333;
  text-decoration: none;
  transition: background 0.2s, font-weight 0.2s;
}

.icon {
  font-size: 24px;
  flex-shrink: 0;
}

.label {
  margin-left: 12px;
  flex: 1;
}

/* 悬停态 */
.menu-link:hover {
  background: #e0f4ff;
  font-weight: 600;
}

/* 选中态 */
.menu li.active .menu-link {
  background: #eef8ff;
  font-weight: 600;
}

.menu li.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 4px;
  bottom: 4px;
  width: 4px;
  background: #ffd700;
  border-radius: 2px;
}

/* ====== 右侧内容 ====== */
.main-content {
  flex: 1;
  background: #f6f8fb;
  overflow-y: auto;
  padding: 32px;
}

/* 欢迎卡片 */
.welcome-card {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.welcome-title {
  font-size: 24px;
  color: #0a2d88;
  margin-bottom: 16px;
}

.welcome-text {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
}
</style>
