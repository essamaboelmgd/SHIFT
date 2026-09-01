import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // This project may share a symlinked node_modules directory with another
  // Vite app. Keep its optimized dependency cache local so the other app
  // cannot replace React's pre-bundled module while this dev server is running.
  cacheDir: '.vite-cache',
  plugins: [react()],
  resolve: {
    // Hooks and the renderer must always use the same React module instance.
    dedupe: ['react', 'react-dom'],
  },
  server: {
    host: 'localhost',
    port: 5176,
    strictPort: true,
  },
})
