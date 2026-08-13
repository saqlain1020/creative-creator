import type { TemplateId, TemplateMeta } from '../types'

type Props = {
  templates: TemplateMeta[]
  activeId: TemplateId
  onSelect: (id: TemplateId) => void
}

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

          return (
            <button
              key={template.id}
              type="button"
              className={`picker__card${active ? ' is-active' : ''}`}
              onClick={() => onSelect(template.id)}
              aria-pressed={active}
              title={template.description}
            >
              <div className="picker__thumb">
                <img src={template.preview} alt="" />
              </div>
              <strong>{template.name}</strong>
            </button>
          )
        })}
      </div>
    </section>
  )
}
