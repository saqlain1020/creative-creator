import { useEffect, useRef, type ChangeEvent } from 'react'
import { templateFieldConfig } from '../data/templateFields'
import type { CreativeColors, CreativeContent, TemplateId } from '../types'
import { fileToDataUrl } from '../utils/fileToDataUrl'

type Props = {
  templateId: TemplateId
  content: CreativeContent
  onChange: (next: CreativeContent) => void
}

export function EditorForm({ templateId, content, onChange }: Props) {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    rootRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [templateId])
  const config = templateFieldConfig[templateId]

  const visibleFields = config.fields.filter((field) => {
    if (!config.logoReplacesBrand || !content.logoUrl) return true
    return field.key !== 'brandPrefix' && field.key !== 'brandName'
  })

  function updateField<K extends keyof CreativeContent>(
    key: K,
    value: CreativeContent[K],
  ) {
    onChange({ ...content, [key]: value })
  }

  function updateColor(key: keyof CreativeColors, value: string) {
    onChange({
      ...content,
      colors: { ...content.colors, [key]: value },
    })
  }

  async function onFile(
    key: 'logoUrl' | 'productImageUrl',
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0]
    if (!file) return
    const url = await fileToDataUrl(file)
    updateField(key, url)
    event.target.value = ''
  }

  return (
    <section className="editor" ref={rootRef}>
      <div className="editor__head">
        <h2>Content</h2>
        <p>Fields for this template</p>
      </div>

      <div className={`editor__uploads${config.showLogo ? '' : ' editor__uploads--single'}`}>
        {config.showLogo ? (
          <label className="upload">
            <span>Logo</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => void onFile('logoUrl', e)}
            />
            {content.logoUrl ? (
              <img src={content.logoUrl} alt="Logo preview" />
            ) : (
              <em>
                {config.logoReplacesBrand
                  ? 'Optional — replaces brand text'
                  : 'Optional brand mark'}
              </em>
            )}
            {content.logoUrl ? (
              <button
                type="button"
                className="upload__clear"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  updateField('logoUrl', null)
                }}
              >
                Remove
              </button>
            ) : null}
          </label>
        ) : null}

        <label className="upload">
          <span>Product image</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => void onFile('productImageUrl', e)}
          />
          {content.productImageUrl ? (
            <img src={content.productImageUrl} alt="Product preview" />
          ) : (
            <em>Upload the main product photo</em>
          )}
          {content.productImageUrl ? (
            <button
              type="button"
              className="upload__clear"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                updateField('productImageUrl', null)
              }}
            >
              Remove
            </button>
          ) : null}
        </label>
      </div>

      <div className="editor__fields">
        {visibleFields.map((field) => (
          <label key={field.key} className="field">
            <span>{field.label}</span>
            {field.multiline ? (
              <textarea
                rows={2}
                value={content[field.key]}
                onChange={(e) => updateField(field.key, e.target.value)}
              />
            ) : (
              <input
                type="text"
                value={content[field.key]}
                onChange={(e) => updateField(field.key, e.target.value)}
              />
            )}
          </label>
        ))}
      </div>

      <div className="editor__colors">
        <h3>Colors</h3>
        <div className="editor__color-grid">
          {config.colors.map((field) => (
            <label key={field.key} className="color-field">
              <span>{field.label}</span>
              <input
                type="color"
                value={content.colors[field.key]}
                onChange={(e) => updateColor(field.key, e.target.value)}
              />
              <code>{content.colors[field.key]}</code>
            </label>
          ))}
        </div>
      </div>
    </section>
  )
}
