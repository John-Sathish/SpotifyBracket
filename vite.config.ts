import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['@types/react-router-dom','react','react-dom','react-router-dom','react-use-cookie'],
  }
})

