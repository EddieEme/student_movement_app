import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
     base: '/student_movement_app/',
     plugins: [react()],
     build: {
       outDir: 'dist',
       chunkSizeWarningLimit: 1000,
     },
   })