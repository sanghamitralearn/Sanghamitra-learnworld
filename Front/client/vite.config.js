import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Server/app.js has CORS locked to http://127.0.0.1:5500 (credentials: true),
// so the dev server binds to that exact host:port. API calls are also proxied
// through this same origin (see server.proxy below) so the express-session
// cookie is same-site from the browser's point of view — without the proxy,
// 127.0.0.1:5500 and localhost:4000 count as cross-site and the default
// SameSite=Lax session cookie never gets sent back on fetch() calls, so a
// login "succeeds" but the session never sticks.
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5500,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  }
})
