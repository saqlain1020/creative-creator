import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

function previewSaver(): Plugin {
  return {
    name: 'preview-saver',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__save-preview', (req, res, next) => {
        if (req.method !== 'POST') {
          next()
          return
        }

        const chunks: Buffer[] = []
        req.on('data', (chunk) => {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
        })
        req.on('end', () => {
          try {
            const body = JSON.parse(Buffer.concat(chunks).toString('utf8')) as {
              id?: string
              dataUrl?: string
            }
            const id = body.id ?? ''
            if (!/^[a-z0-9-]+$/.test(id)) {
              res.statusCode = 400
              res.end('Invalid template id')
              return
            }
            const match = /^data:image\/png;base64,(.+)$/.exec(body.dataUrl ?? '')
            if (!match) {
              res.statusCode = 400
              res.end('Invalid PNG data')
              return
            }
            const dir = path.resolve(server.config.root, 'public/templates')
            fs.mkdirSync(dir, { recursive: true })
            fs.writeFileSync(
              path.join(dir, `preview-${id}.png`),
              Buffer.from(match[1], 'base64'),
            )
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true }))
          } catch (error) {
            res.statusCode = 500
            res.end(error instanceof Error ? error.message : 'Save failed')
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), previewSaver()],
})
