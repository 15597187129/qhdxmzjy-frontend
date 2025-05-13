<template>
  <div class="forgot-password-page">
    <div class="forgot-password-card">
      <!-- 顶部logo与文案 -->
      <div class="branding">
        <img src="/logo.png" alt="logo" class="logo" />
        <h2 class="platform-name">青海大学民族团结进步教育平台</h2>
        <p class="platform-desc">通过团结教育，建设更加和谐美好的民族社区</p>
      </div>

      <h3 class="section-title">找回您的密码</h3>

      <!-- 输入邮箱 -->
      <div class="input-wrapper">
        <input v-model="email" type="email" placeholder="请输入注册邮箱" required />
        <button class="code-btn" @click="sendResetCode" :disabled="sending">
          {{ sending ? countdown + 's' : '发送验证码' }}
        </button>
      </div>

      <!-- 输入验证码和新密码 -->
      <div v-if="showCodeAndPassword">
        <div class="input-wrapper">
          <input v-model="code" type="text" placeholder="请输入验证码" required />
        </div>
        <div class="input-wrapper">
          <input v-model="newPassword" type="password" placeholder="请输入新密码" required />
        </div>
        <button class="submit-btn" type="submit" @click="resetPassword" :disabled="isSubmitting">重置密码</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const code = ref('')
const newPassword = ref('')
const showCodeAndPassword = ref(false)  // 控制是否显示验证码和新密码框
const isSubmitting = ref(false)  // 控制重置密码按钮的状态
const sending = ref(false)  // 发送验证码按钮的状态
const countdown = ref(60)
let timer: any = null
const router = useRouter()  // 获取路由实例

// 发送验证码函数
const sendResetCode = async () => {
  if (email.value) {
    alert('验证码已发送，请查收邮箱')
    showCodeAndPassword.value = true  // 显示验证码和新密码框
    sending.value = true
    countdown.value = 60
    timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        sending.value = false
        clearInterval(timer)
      }
    }, 1000)

    try {
      const response = await fetch('http://192.168.127.128:8888/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.value })
      })

      const result = await response.json()

      if (response.ok) {
        alert(result.message || '验证码已发送，请查收邮箱')
      } else {
        alert(result.message || '发送失败，请稍后再试')
      }
    } catch (error) {
      alert('发送验证码失败，请稍后再试')
    }
  } else {
    alert('请输入有效的邮箱')
  }
}

// 模拟重置密码
const resetPassword = async () => {
  if (code.value && newPassword.value) {
    // 提交重置密码请求
    try {
      const response = await fetch('http://192.168.127.128:8888/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.value,
          code: code.value,
          newPassword: newPassword.value
        })
      })
      const result = await response.json()
      if (response.ok) {
        alert('密码重置成功')
        // 成功后跳转到主页
        router.push('/login')
      } else {
        alert(result.message || '密码重置失败')
      }
    } catch (error) {
      alert('密码重置失败，请稍后再试')
    }
  } else {
    alert('请填写完整信息')
  }
}
</script>

<style scoped lang="scss">
.forgot-password-page {
  background-image: url('/campus1.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.forgot-password-card {
  width: 400px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(16px) saturate(180%);
  border-radius: 20px;
  padding: 40px 30px;
  color: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.branding {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  height: 40px;
  margin-bottom: 8px;
}

.platform-name {
  font-size: 20px;
  font-weight: 600;
}

.platform-desc {
  font-size: 13px;
  color: #ddd;
  margin-top: 4px;
}

.section-title {
  margin: 12px 0;
  font-size: 18px;
  font-weight: 500;
}

.input-wrapper {
  margin-bottom: 16px;
  position: relative;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  padding: 10px 15px;
}

.input-wrapper input {
  width: 100%;
  background: transparent;
  border: none;
  color: white;
  outline: none;
  font-size: 14px;
}

.code-btn {
  position: absolute;
  right: 10px;
  top: 6px;
  background: transparent;
  border: none;
  color: #4a90e2;
  font-size: 14px;
  cursor: pointer;
}

.submit-btn {
  background-color: #0a2d88;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 30px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.submit-btn:hover {
  background-color: #09317c;
  transform: scale(1.05);
}
</style>
