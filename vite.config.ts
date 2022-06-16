import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  define: {
    'process.env': {},
    global: {},
  },

  base:'./',
  server: {
    host: '0.0.0.0',
    fs:{
      strict:false
    }
  }
})
