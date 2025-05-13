<template>
  <div class="profile-page">
    <Navbar />

    <div class="profile-card">
      <h2 class="card-title">个人中心</h2>

      <div class="info-list">
        <div class="info-item">
          <span class="info-label">用户名：</span>
          <span class="info-value">{{ auth.state.user?.username || '--' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">邮箱：</span>
          <span class="info-value">{{ (auth.state.user as any)?.email || '--' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">性别：</span>
          <span class="info-value">{{ (auth.state.user as any)?.gender || '--' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">年龄：</span>
          <span class="info-value">{{ (auth.state.user as any)?.age || '--' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">角色：</span>
          <span class="info-value">{{ formatRole((auth.state.user as any)?.role || '') }}</span>
        </div>
      </div>

      <div class="action-buttons">
        <button class="btn btn-primary" @click="goResetPassword">修改密码</button>
        <button class="btn btn-danger"  @click="logout">注销</button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/components/useAuth'
import Navbar from '@/components/Navbar.vue'

const auth = useAuth()
const router = useRouter()

// 角色名称映射
function formatRole(role: string) {
  const roleMap: { [key: string]: string } = {
    admin: '管理员',
    teacher: '教师',
    student: '学生'
  }
  return roleMap[role] || '未知角色'
}

onMounted(async () => {
  await auth.checkAuth()
  if (!auth.state.isLoggedIn) {
    router.replace('/login')
  }
})

function goResetPassword() {
  router.push('/recover')
}

async function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  await auth.checkAuth()
  router.replace('/login')
}
</script>


<style scoped lang="scss">
.profile-page {
  min-height: 100vh;
  background: #f0f4fa;
  display: flex;
  flex-direction: column;
}

.profile-card {
  max-width: 500px;
  width: 90%;
  margin: 100px auto;
  padding: 30px 20px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 6px 24px rgba(0,0,0,0.15);
}

.card-title {
  text-align: center;
  margin-bottom: 24px;
  color: #0a2d88;
  font-size: 22px;
  font-weight: 600;
}

.info-list {
  margin-bottom: 30px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.info-label {
  font-weight: 500;
  color: #888;
}

.info-value {
  font-weight: 600;
  color: #333;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.btn {
  flex: 1;
  padding: 10px 0;
  border: none;
  border-radius: 30px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
}

.btn-primary {
  background-color: #0a2d88;
  color: #fff;
}

.btn-primary:hover {
  background-color: #09317c;
  transform: scale(1.03);
}

.btn-danger {
  background-color: #d9534f;
  color: #fff;
}

.btn-danger:hover {
  background-color: #c12e2a;
  transform: scale(1.03);
}
</style>
