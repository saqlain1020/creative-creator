import { useEffect, useRef, type ChangeEvent } from 'react'
import { ChoiceRow, OffsetYPicker, SizePicker } from './editor'
import { patchFieldTune } from '../data/fieldTune'
import { scriptFontStack } from '../data/scriptFonts'
import { templateFieldConfig } from '../data/templateFields'
import type {
  CreativeColors,
  CreativeContent,
  CreativeLayout,
  FieldTune,
  TemplateId,
} from '../types'
import { getArtboardSize } from '../utils/artboardSize'
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
  const fontChoices = config.fontChoices

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

  function updateLayout(key: keyof CreativeLayout, patch: FieldTune) {
    onChange({
      ...content,
      layout: patchFieldTune(content.layout, key, patch),
    })
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
                {config.logoHint
                  ? config.logoHint
                  : config.logoReplacesBrand
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

      {config.layoutControls?.length ? (
        <div className="editor__adjust">
          <h3>Adjust</h3>
          {config.layoutControls.map((control) => {
            if (control.kind === 'offsetY') {
              const artH = getArtboardSize(templateId, content).height
              const max = control.max ?? Math.max(240, artH - 160)
              return (
                <OffsetYPicker
                  key={`${control.key}-y`}
                  label={control.label}
                  min={control.min ?? 0}
                  max={max}
                  value={content.layout?.[control.key]?.offsetY ?? 24}
                  onChange={(offsetY) => updateLayout(control.key, { offsetY })}
                />
              )
            }
            return (
              <SizePicker
                key={`${control.key}-size`}
                label={control.label}
                value={content.layout?.[control.key]?.size}
                onChange={(size) => updateLayout(control.key, { size })}
              />
            )
          })}
        </div>
      ) : null}

      {config.choiceSets?.map((set) => (
        <ChoiceRow
          key={set.key}
          label={set.label}
          value={content[set.key]}
          options={set.options}
          onChange={(value) => updateField(set.key, value)}
        />
      ))}

      {fontChoices ? (
        <div className="font-picker">
          <span>{fontChoices.label}</span>
          <div className="font-picker__grid">
            {fontChoices.options.map((option) => {
              const active = content[fontChoices.key] === option.family
              return (
                <button
                  key={option.family}
                  type="button"
                  className={`font-picker__btn${active ? ' is-active' : ''}`}
                  onClick={() => updateField(fontChoices.key, option.family)}
                >
                  <span
                    className="font-picker__sample"
                    style={{
                      fontFamily: scriptFontStack(option),
                      ...(option.opsz
                        ? { fontVariationSettings: `"opsz" ${option.opsz}` }
                        : {}),
                    }}
                  >
                    New
                  </span>
                  <span className="font-picker__name">{option.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      ) : null}

      <div className="editor__colors">
        <h3>Colors</h3>
        <div className="editor__color-grid">
          {config.colors.map((field) =>
            field.swatches ? (
              <div key={field.key} className="color-field color-field--tones">
                <span>{field.label}</span>
                <div className="tone-toggle">
                  {field.swatches.map((swatch) => {
                    const active =
                      content.colors[field.key].toLowerCase() ===
                      swatch.value.toLowerCase()
                    return (
                      <button
                        key={swatch.value}
                        type="button"
                        className={`tone-toggle__btn${active ? ' is-active' : ''}`}
                        onClick={() => updateColor(field.key, swatch.value)}
                      >
                        <i
                          className="tone-toggle__swatch"
                          style={{ background: swatch.value }}
                          aria-hidden
                        />
                        {swatch.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              <label key={field.key} className="color-field">
                <span>{field.label}</span>
                <input
                  type="color"
                  value={content.colors[field.key]}
                  onChange={(e) => updateColor(field.key, e.target.value)}
                />
                <code>{content.colors[field.key]}</code>
              </label>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
