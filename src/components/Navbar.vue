<!-- 文件路径：src/components/Navbar.vue -->
<template>
  <nav class="navbar">
    <div class="navbar-content">
      <!-- 左侧 Logo + 平台标题 -->
      <router-link to="/home" class="logo-area">
        <img :src="logo" alt="平台 Logo" class="logo-img" />
        <span class="platform-title">青海大学民族团结进步教育平台</span>
      </router-link>

      <!-- 中间主菜单：student/admin 可见，teacher 隐藏 -->
      <ul v-if="!isTeacher" class="nav-links">
        <li><router-link to="/home">首页</router-link></li>
        <li><router-link to="/daily-quiz">智力挑战</router-link></li>
        <li><router-link to="/panorama">全景探索</router-link></li>
        <li><router-link to="/discussions">互动讨论</router-link></li>
        <li><router-link to="/videos">视频库</router-link></li>
      </ul>

      <!-- 右侧：登录/注册 或 个人中心 -->
      <div class="auth-links">
        <template v-if="!auth.state.isLoggedIn">
          <router-link to="/login" class="auth">登录</router-link>
          <router-link to="/register" class="auth">注册</router-link>
        </template>
        <template v-else>
          <router-link to="/profile" class="auth">个人中心</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import logo from '@/assets/images/logo.png'
import { useAuth } from '@/components/useAuth'

const auth = useAuth()

// 如果用户角色是 teacher，admin,就隐藏学生菜单
// 判断是否为教师或管理员
const isTeacher = computed(() => {
  const role = auth.state.user?.role || '';
  return ['teacher', 'admin'].includes(role);
});
</script>

<style scoped lang="scss">
.navbar {
  /* 定义并暴露 navbar 的高度变量，供其他组件引用 */
  --navbar-height: 60px;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--navbar-height);
  background: linear-gradient(
          to right,
          rgba(155, 28, 28, 0.6),
          rgba(10, 45, 136, 0.6)
  );
  backdrop-filter: blur(14px);
  z-index: 10;
}

.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.logo-area {
  display: flex;
  align-items: center;
  text-decoration: none;
}
.logo-img {
  max-height: 40px;
}
.platform-title {
  color: #fff;
  font-size: 1.2rem;
  margin-left: 8px;
  font-weight: 500;
}

.nav-links {
  display: flex;
  gap: 24px;
  list-style: none;
}
.nav-links a {
  color: #fff;
  font-size: 15px;
  text-decoration: none;
  transition: color 0.3s, font-weight 0.3s;
}
.nav-links a:hover {
  color: #FFD700;
  font-weight: bold;
}
.router-link-active {
  border-bottom: 2px solid #FFD700;
}

.auth-links {
  display: flex;
  gap: 24px;
}
.auth {
  color: #fff;
  font-size: 15px;
  text-decoration: none;
  transition: color 0.3s, font-weight 0.3s;
}
.auth:hover {
  color: #FFD700;
  font-weight: bold;
}
</style>
