import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { templates } from './data/templates'
import type { TemplateMeta } from './types'
import { renderTemplate } from './components/templates/registry'
import { artboardToPngDataUrl } from './utils/exportCreative'
import './components/templates/templates.css'
import './components/templates/extras/extras.css'
import './components/templates/extras/wave2.css'
import './components/templates/extras/starTheme.css'

async function waitForImages(root: HTMLElement) {
  const images = [...root.querySelectorAll('img')]
  await Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve()
            return
          }
          img.addEventListener('load', () => resolve(), { once: true })
          img.addEventListener('error', () => resolve(), { once: true })
        }),
    ),
  )
  await document.fonts.ready
  await Promise.allSettled(
    [
      'The Nautigal',
      'Great Vibes',
      'Cormorant Garamond',
      'Playfair Display',
      'Montserrat',
    ].map((family) => document.fonts.load(`24px "${family}"`)),
  )
}

export function CapturePreviews() {
  const nodeRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState<TemplateMeta | null>(null)
  const [status, setStatus] = useState('Starting…')
  const [phase, setPhase] = useState<'running' | 'done' | 'error'>('running')

  useEffect(() => {
    let cancelled = false

    async function run() {
      try {
        await document.fonts.ready
        const only = new URLSearchParams(window.location.search).get('only')
        const queue = only
          ? templates.filter((template) => template.id === only)
          : templates
        if (only && queue.length === 0) {
          throw new Error(`Unknown template: ${only}`)
        }
        for (const [index, template] of queue.entries()) {
          if (cancelled) return
          flushSync(() => {
            setCurrent(template)
            setStatus(`Capturing ${index + 1}/${queue.length}: ${template.id}`)
          })
          const node = nodeRef.current
          if (!node) throw new Error('Artboard missing')
          await waitForImages(node)
          await new Promise((resolve) => setTimeout(resolve, 250))
          const dataUrl = await artboardToPngDataUrl(node, 0.5)
          const res = await fetch('/__save-preview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: template.id, dataUrl }),
          })
          if (!res.ok) {
            throw new Error(`Save failed for ${template.id}: ${await res.text()}`)
          }
        }
        if (cancelled) return
        setStatus(`Saved ${queue.length} previews`)
        setPhase('done')
      } catch (error) {
        if (cancelled) return
        setPhase('error')
        setStatus(error instanceof Error ? error.message : 'Capture failed')
      }
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="capture-page" data-capture-status={phase} data-capture-message={status}>
      <p className="capture-page__status">{status}</p>
      <div ref={nodeRef} className="capture-page__artboard">
        {current ? renderTemplate(current.id, current.defaults) : null}
      </div>
    </div>
  )
}
