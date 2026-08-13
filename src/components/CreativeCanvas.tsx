import { useEffect, useRef, useState, type RefObject } from 'react'
import type { CreativeContent, TemplateId } from '../types'
import { getArtboardSize } from '../utils/artboardSize'
import { renderTemplate } from './templates/registry'
import './templates/templates.css'
import './templates/extras/extras.css'
import './templates/extras/wave2.css'
import './templates/extras/starTheme.css'

type Props = {
  templateId: TemplateId
  content: CreativeContent
  canvasRef: RefObject<HTMLDivElement | null>
}

export function CreativeCanvas({ templateId, content, canvasRef }: Props) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.5)
  const { width: artW, height: artH } = getArtboardSize(templateId, content)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const update = () => {
      const { width, height } = stage.getBoundingClientRect()
      const next = Math.min(width / artW, height / artH, 1)
      setScale(next > 0 ? next : 0.4)
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [artW, artH])

  return (
    <section className="canvas-panel">
      <div className="canvas-panel__head">
        <h2>Preview</h2>
        <p>
          {artW} × {artH}
        </p>
      </div>
      <div className="canvas-panel__stage" ref={stageRef}>
        <div
          className="canvas-panel__scaler"
          style={{ width: artW * scale, height: artH * scale }}
        >
          <div
            className="canvas-panel__zoom"
            style={{
              transform: `scale(${scale})`,
              width: artW,
              height: artH,
            }}
          >
            <div
              ref={canvasRef}
              className="canvas-panel__artboard"
              style={{ width: artW, height: artH }}
            >
              {renderTemplate(templateId, content)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
