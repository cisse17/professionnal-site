import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist'
  },

  // Tu n’as pas besoin du server.proxy en production car React est précompilé. Donc tu peux rendre la section server optionnelle.
  // Mais si tu veux que ça reste clair etfonctionne en local et en prod avec Docker,
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': 'http://localhost:8000',
    }
  }
})
