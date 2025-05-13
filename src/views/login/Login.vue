<template>
  <div class="login-page">
    <div class="login-left"></div>

    <div class="login-right">
      <div class="login-card">
        <!-- ✅ 平台标识 -->
        <div class="identity">
          <img src="/logo.png" alt="logo" />
          <h2>青海大学民族团结进步教育平台</h2>
          <p>民族团结是民族教育之本，共同体意识是核心价值</p>
        </div>

        <!-- 顶部标签栏 -->
        <div class="login-tabs">
          <span class="tab active">账号登录</span>
        </div>

        <!-- 表单 -->
        <form @submit.prevent="handleLogin">
          <div class="input-wrapper">
            <i class="icon">👤</i>
            <input v-model="form.username" type="text" placeholder="请输入用户名" />
          </div>

          <div class="input-wrapper">
            <i class="icon">🔒</i>
            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="请输入登录密码" />
            <i class="icon eye" @click="togglePassword">{{ showPassword ? '🙈' : '👁️' }}</i>
          </div>

          <div class="login-remember">
            <label><input type="checkbox" v-model="rememberMe" /> 记住我</label>
          </div>

          <button type="submit">登录</button>

          <div class="login-footer">
            <router-link to="/recover">忘记密码？</router-link>
            <router-link to="/register">立即注册</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import request from '@/utils/request' // axios 实例，自动带 token
import { checkAuth } from '@/components/useAuth'


const form = ref({ username: '', password: '' })
const rememberMe = ref(false)
const showPassword = ref(false)
const router = useRouter()

const togglePassword = () => {
  showPassword.value = !showPassword.value
}



const handleLogin = async () => {
  try {
// ✅ 正确：请求到 /api/auth/login
    const res = await request.post('/auth/login', form.value)
    console.log('后端返回:', res.data);

    if (res.data.message === '登录成功') {
      alert(res.data.message || '登录成功');

      const { token, role } = res.data.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role); // 如果后面页面要用，可以保存角色
      // 刷新全局登录态
      await checkAuth();

      // 根据角色跳转
      if (role === 'student') {
        router.push('/home');
      } else if (role === 'teacher') {
        router.push('/teacher/dashboard');
      } else if (role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        alert('未知角色，无法跳转');
      }
    } else {
      alert(res.data.message || '登录失败');
    }
  } catch (e: any) {
    console.log('捕获到异常:', e);
    alert(e.response?.data?.message || '系统异常，请稍后再试');
  }
}





</script>

<style scoped lang="scss">
.login-page {
  display: flex;
  height: 100vh;
  background-image: url('/campus1.jpg'); // ✅ 修改背景图名
  background-size: cover;
  background-position: center;
}

.login-left {
  flex: 6;
}

.login-right {
  flex: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border-radius: 20px;
  padding: 40px 32px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  color: #fff;
}

/* ✅ 平台标识样式 */
.identity {
  text-align: center;
  margin-bottom: 16px;
}
.identity img {
  height: 40px;
  margin-bottom: 8px;
}
.identity h2 {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
}
.identity p {
  font-size: 13px;
  color: #eee;
  margin-top: 4px;
}

.login-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.tab {
  font-size: 18px;
  padding-bottom: 6px;
  border-bottom: 2px solid transparent;
  margin: 0 8px;
  cursor: pointer;
}

.tab.active {
  border-bottom: 2px solid #4a90e2;
  font-weight: 600;
}

.input-wrapper {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 12px 16px;
  margin-bottom: 16px;
  gap: 10px;
  color: white;
  font-size: 14px;
}

.input-wrapper input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: white;
}

.input-wrapper .icon {
  cursor: default;
}

.input-wrapper .eye {
  cursor: pointer;
}

.login-remember {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  font-size: 14px;
  color: #ccc;
}

.login-footer {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-top: 20px;
  color: #dcdcdc;
}

.login-footer a {
  color: #4a90e2;
  text-decoration: none;
}

.login-footer a:hover {
  text-decoration: underline;
}

/* ✅ 登录按钮交互增强 */
button {
  background-color: #0a2d88;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 12px 0;
  font-weight: 600;
  font-size: 16px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.25s, transform 0.2s;
}

button:hover {
  background-color: #09317c;
  transform: scale(1.03);
}
</style>
