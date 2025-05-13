// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: { '@': path.resolve(__dirname, 'src') }
    },
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        // 允许从这个域名过来，否则会被拦截
        allowedHosts: [
            'qhdxmzjy.xyz'
        ],
        // HMR 服务仍然在本机 5173，不要让它去绑定 443
        // clientPort 指示浏览器用 wss://qhdxmzjy.xyz:443 来连
        hmr: {
            protocol: 'wss',
            host: 'qhdxmzjy.xyz',
            port: 5173,
            clientPort: 443,
        },
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8888',
                changeOrigin: true,
                secure: false,
                rewrite: (p) => p
            }
        }
    }
});
