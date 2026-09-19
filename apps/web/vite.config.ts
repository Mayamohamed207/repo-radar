import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@repo-radar/ui': path.resolve(__dirname, '../../packages/ui/src/index.ts'),
      '@repo-radar/charts': path.resolve(__dirname, '../../packages/charts/src/index.ts'),
    },
  },
})