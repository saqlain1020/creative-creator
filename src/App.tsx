import { useRef, useState } from 'react'
import { CreativeCanvas } from './components/CreativeCanvas'
import { EditorForm } from './components/EditorForm'
import { TemplatePicker } from './components/TemplatePicker'
import { getTemplate, templates } from './data/templates'
import type { CreativeContent, TemplateId } from './types'
import { exportCreativePng } from './utils/exportCreative'
import './App.css'

function App() {
  const [templateId, setTemplateId] = useState<TemplateId>('split-editorial')
  const [content, setContent] = useState<CreativeContent>(
    () => getTemplate('split-editorial').defaults,
  )
  const [exporting, setExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  function handleSelectTemplate(id: TemplateId) {
    setTemplateId(id)
    const defaults = getTemplate(id).defaults
    setContent({
      ...defaults,
      // Keep only user-uploaded assets (data URLs); sample defaults stay template-specific
      logoUrl: content.logoUrl?.startsWith('data:') ? content.logoUrl : defaults.logoUrl,
      productImageUrl: content.productImageUrl?.startsWith('data:')
        ? content.productImageUrl
        : defaults.productImageUrl,
    })
    setError(null)
  }

  function handleReset() {
    setContent(getTemplate(templateId).defaults)
    setError(null)
  }

  async function handleExport() {
    const node = canvasRef.current
    if (!node) return

    setExporting(true)
    setError(null)
    try {
      const slug = content.brandName.toLowerCase().replace(/\s+/g, '-') || 'creative'
      await exportCreativePng(node, `${slug}-${templateId}.png`)
    } catch {
      setError('Could not export the creative. Try again after images finish loading.')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar__brand">
          <span className="topbar__mark">CC</span>
          <div>
            <strong>Creative Creator</strong>
            <p>Design square social ads from ready-made templates</p>
          </div>
        </div>
        <div className="topbar__actions">
          {error ? <span className="topbar__error">{error}</span> : null}
          <button type="button" className="btn btn--ghost" onClick={handleReset}>
            Reset template
          </button>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => void handleExport()}
            disabled={exporting}
          >
            {exporting ? 'Exporting…' : 'Download PNG'}
          </button>
        </div>
      </header>

      <main className="workspace">
        <aside className="workspace__sidebar">
          <TemplatePicker
            templates={templates}
            activeId={templateId}
            onSelect={handleSelectTemplate}
          />
          <EditorForm
            templateId={templateId}
            content={content}
            onChange={setContent}
          />
        </aside>
        <CreativeCanvas
          templateId={templateId}
          content={content}
          canvasRef={canvasRef}
        />
      </main>
    </div>
  )
}

export default App
