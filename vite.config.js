import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Serve /api/fileStructure in dev for Vercel
function apiFileStructurePlugin() {
  return {
    name: 'api-file-structure',
    configureServer(server) {
      server.middlewares.use('/api/fileStructure', (req, res) => {
        const filePath = path.resolve(__dirname, 'src/data/fileStructure.json')
        const data = fs.readFileSync(filePath, 'utf8')
        res.setHeader('Content-Type', 'application/json')
        res.end(data)
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiFileStructurePlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
  },
})
