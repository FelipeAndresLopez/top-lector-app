/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // TODO: uncomment this end the release II
  // server: {
  //   proxy: {
  //     '': {
  //       target: 'http://localhost:3001',
  //       changeOrigin: true,
  //     },
  //   },
  // },
  test: {
    environment: 'happy-dom',
  }
})
