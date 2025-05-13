<template>
  <nav class="teacher-navbar">
    <!-- 左侧：Logo + 平台名称 -->
    <div class="navbar-left">
      <img src="@/assets/images/logo.png" alt="平台 Logo" class="logo" />
      <span class="title">青海大学民族团结进步教育平台</span>
    </div>

    <!-- 中间：固定文本 -->
    <div class="navbar-center">教师控制端</div>

    <!-- 右侧：个人中心 -->
    <div class="navbar-right">
      <router-link to="/profile" class="profile-link">个人中心</router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
// 无需额外逻辑
</script>

<style scoped>
.teacher-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 24px;
  background: linear-gradient(
      to right,
      rgba(155, 28, 28, 0.6),
      rgba(10, 45, 136, 0.6)
  );
  backdrop-filter: blur(12px);
  color: #fff;
  font-weight: bold;
  user-select: none;
}

/* 左侧 Logo + 平台名 */
.navbar-left {
  display: flex;
  align-items: center;
}
.navbar-left .logo {
  height: 36px;
  margin-right: 12px;
}
.navbar-left .title {
  font-size: 18px;
}

/* 中间固定文字 */
.navbar-center {
  flex: 1;
  text-align: center;
  font-size: 18px;
  color: #fff;
  pointer-events: none; /* 禁用点击/悬停 */
}

/* 右侧个人中心 */
.navbar-right .profile-link {
  color: #fff;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 4px;
  transition: background 0.2s;
}
.navbar-right .profile-link:hover {
  background: rgba(255,255,255,0.15);
}
</style>
