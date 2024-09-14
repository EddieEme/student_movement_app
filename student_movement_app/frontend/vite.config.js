import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  base: '/student_movement_project/',
  build: {
    chunkSizeWarningLimit: 1000, // Increase limit (in kB)
  },
  plugins: [react()],
})