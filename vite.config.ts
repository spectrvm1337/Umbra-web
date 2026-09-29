import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Project Pages are served from https://<user>.github.io/<repo>/, so every
  // asset URL has to carry the repo prefix. Without this the built HTML points
  // at /assets/... and 404s on Pages.
  base: '/Umbra-web/',
})
