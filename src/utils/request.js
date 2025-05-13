// src/utils/request.ts
import axios from 'axios';
// 从 Vite 环境变量里读取，线上会取到 https://api.qhdxmzjy.xyz，
// 本地如果不设置则退回到 '/api'（这样老代码也能跑）
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';
const request = axios.create({
    baseURL, // 现在可通过 .env 统一配置
    timeout: 10000,
    // withCredentials: true // 不依赖后端 cookie，可继续删掉或保留
});
request.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default request;
