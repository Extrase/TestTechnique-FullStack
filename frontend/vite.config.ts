import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()], // trouve ici "https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react"
  server: {
    port: 5173,
    host: 'localhost',
  }
})