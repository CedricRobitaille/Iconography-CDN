import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const env = loadEnv(process.cwd(), "");

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
      https: false,   // frontend HTTPS off → simpler in WSL
      proxy: {
        "/api": {
          target: env.VITE_API_PROXY_TARGET, // pulls from .env
          changeOrigin: true,
          secure: false, // HTTP backend, so no cert needed
        }
      }
    }
});
