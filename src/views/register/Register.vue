<template>
  <div class="register-page">
    <div class="register-card">
      <!-- 标识与标题 -->
      <div class="identity">
        <img src="/logo.png" alt="logo" />
        <h2>青海大学民族团结进步教育平台</h2>
        <p>促进文化交流，增强民族团结，打造共融社会</p>
      </div>

      <!-- 输入表单 -->
      <form @submit.prevent="submitRegister">
        <div class="input-wrapper">
          <i class="icon">👤</i>
          <input v-model="form.username" type="text" placeholder="请输入用户名" />
        </div>
        <div class="input-wrapper">
          <i class="icon">🔒</i>
          <input v-model="form.password" type="password" placeholder="请输入密码" />
        </div>

        <!-- 角色输入框：默认“学生”，可以编辑 -->
        <div class="input-wrapper">
          <i class="icon">🔑</i>
          <input v-model="form.role" type="text" placeholder="请输入角色（默认学生）" />
        </div>

        <!-- 性别输入框 -->
        <div class="input-wrapper">
          <i class="icon">🎓</i>
          <input v-model="form.gender" type="text" placeholder="请输入性别" />
        </div>

        <div class="input-wrapper">
          <i class="icon">🧑‍🎓</i>
          <input v-model="form.age" type="number" placeholder="请输入年龄" />
        </div>

        <!-- 移动邮箱和验证码到最后 -->
        <div class="input-wrapper">
          <i class="icon">📧</i>
          <input v-model="form.email" type="email" placeholder="请输入邮箱" />
        </div>
        <div class="input-wrapper">
          <i class="icon">🎯</i>
          <input v-model="form.code" type="text" placeholder="请输入验证码" />
          <button @click="getCode" :disabled="sending">{{ sending ? countdown + 's' : '发送验证码' }}</button>
        </div>

        <div class="register-footer">
          <!-- 注册按钮添加 disabled 和防止多次点击 -->
          <button type="submit" :disabled="isSubmitting" @click="handleSubmit">注册</button>
        </div>
      </form>

      <div class="footer">
        已有账号？<router-link to="/login">去登录</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import request from '@/utils/request';

const router = useRouter();

const form = reactive({
  username: '',
  password: '',
  email: '',
  code: '',
  role: 'student',  // 默认角色为学生
  gender: '',
  age: null
});

// 防止多次点击
const isSubmitting = ref(false);
const sending = ref(false);  // 控制验证码按钮的状态
const countdown = ref(60);
let timer: any = null;

const handleSubmit = () => {
  console.log('注册按钮被点击');  // 检查事件是否触发
  submitRegister();  // 调用提交注册的方法
};

const submitRegister = async () => {
  isSubmitting.value = true;  // 禁用按钮
  console.log('注册请求开始');

  if (!form.username || !form.password || !form.email || !form.code || !form.gender || !form.age) {
    alert('请完整填写所有字段');
    isSubmitting.value = false;  // 恢复按钮
    return;
  }

  try {
    const res = await request.post('/api/auth/register', form);
    console.log('后端返回:', res.data);

    if (res.data.code === 200) {
      alert('注册成功');
      router.push('/login');  // 跳转到登录页面
    } else {
      alert(res.data.message || '注册失败');
    }
  } catch (error) {
    alert('注册失败，请稍后再试');
  } finally {
    isSubmitting.value = false;  // 恢复按钮
  }
};

const getCode = async () => {
  if (!form.email) {
    alert('请输入邮箱');
    return;
  }

  console.log('发送验证码的请求体:', { email: form.email });  // 打印请求体

  try {
    sending.value = true;  // 禁用按钮
    countdown.value = 60;
    timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(timer);
        sending.value = false;  // 恢复按钮
      }
    }, 1000);

    const response = await request.post('/api/auth/send-code', { email: form.email });

    console.log('后端返回:', response.data);  // 打印后端返回的消息

    if (response.data.code === 200) {
      alert('验证码已发送，请查收');
    } else {
      alert(response.data.message || '验证码发送失败');
    }
  } catch (error) {
    alert('验证码发送失败');
    sending.value = false;  // 恢复按钮
  }
};
</script>

<style scoped lang="scss">
.register-page {
  background-image: url('/campus1.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-card {
  width: 400px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(16px) saturate(180%);
  border-radius: 20px;
  padding: 40px 30px;
  color: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.identity {
  text-align: center;
  margin-bottom: 16px;
}

.input-wrapper {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  padding: 10px 15px;
}

.identity img {
  height: 40px; /* 调整 logo 高度 */
  margin-bottom: 8px;
}

.input-wrapper input {
  width: 100%;
  background: transparent;
  border: none;
  color: white;
  outline: none;
  font-size: 14px;
}

button {
  background-color: #0a2d88;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 30px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #09317c;
  transform: scale(1.05);
}

footer {
  margin-top: 16px;
  font-size: 14px;
  color: #ccc;
}

footer a {
  color: #4a90e2;
  text-decoration: none;
}

footer a:hover {
  text-decoration: underline;
}
</style>
