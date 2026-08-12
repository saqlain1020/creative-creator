import { useEffect, useRef, useState, type RefObject } from 'react'
import type { CreativeContent, TemplateId } from '../types'
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

const SIZE = 1080

export function CreativeCanvas({ templateId, content, canvasRef }: Props) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.5)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const update = () => {
      const { width, height } = stage.getBoundingClientRect()
      const next = Math.min(width / SIZE, height / SIZE, 1)
      setScale(next > 0 ? next : 0.4)
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="canvas-panel">
      <div className="canvas-panel__head">
        <h2>Preview</h2>
        <p>1080 × 1080</p>
      </div>
      <div className="canvas-panel__stage" ref={stageRef}>
        <div
          className="canvas-panel__scaler"
          style={{ width: SIZE * scale, height: SIZE * scale }}
        >
          <div
            className="canvas-panel__zoom"
            style={{ transform: `scale(${scale})` }}
          >
            <div ref={canvasRef} className="canvas-panel__artboard">
              {renderTemplate(templateId, content)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
