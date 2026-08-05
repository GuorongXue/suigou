import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // LongCat API 浏览器直调会 CORS，开发期走代理（生产需后端转发）
      '/api/longcat': {
        target: 'https://api.longcat.chat',
        changeOrigin: true,
        secure: false,   // 公司网络证书链不完整时跳过校验
        rewrite: (p) => p.replace(/^\/api\/longcat/, ''),
      },
    },
  },
});
