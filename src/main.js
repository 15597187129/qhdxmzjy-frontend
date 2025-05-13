// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 引入全局样式，确保路径指向 src/assets/styles/global.css
import '@/assets/styles/global.css';
const app = createApp(App);
app.use(router);
app.use(ElementPlus); // ← 注册 Element Plus
app.mount('#app');
