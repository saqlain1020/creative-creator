import type { CSSProperties } from 'react'
import type { TemplateId, TemplateMeta } from '../types'

type Props = {
  templates: TemplateMeta[]
  activeId: TemplateId
  onSelect: (id: TemplateId) => void
}

const classicPreviews = new Set([
  'split-editorial',
  'centered-collection',
  'peach-editorial',
  'curve-showcase',
])

export function TemplatePicker({ templates, activeId, onSelect }: Props) {
  return (
    <section className="picker">
      <div className="picker__head">
        <h2>Templates</h2>
        <p>{templates.length} layouts</p>
      </div>
      <div className="picker__grid">
        {templates.map((template) => {
          const active = template.id === activeId
          const c = template.defaults.colors
          const thumbStyle = {
            '--thumb-bg': c.background,
            '--thumb-accent': c.accent,
            '--thumb-surface': c.surface,
            '--thumb-text': c.text,
          } as CSSProperties

          return (
            <button
              key={template.id}
              type="button"
              className={`picker__card${active ? ' is-active' : ''}`}
              onClick={() => onSelect(template.id)}
              aria-pressed={active}
              title={template.description}
            >
              <div
                className={`picker__thumb picker__thumb--${template.id}`}
                style={thumbStyle}
              >
                {classicPreviews.has(template.id) ? (
                  <img src={template.preview} alt="" />
                ) : (
                  <>
                    {template.defaults.productImageUrl ? (
                      <img
                        src={template.defaults.productImageUrl}
                        alt=""
                        className="picker__thumb-img"
                      />
                    ) : null}
                    <span className="picker__thumb-label">
                      {template.defaults.headline}
                    </span>
                  </>
                )}
              </div>
              <strong>{template.name}</strong>
            </button>
          )
        })}
      </div>
    </section>
  )
}
