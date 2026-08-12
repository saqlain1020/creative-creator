import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../types'
import { ImageSlot } from './ImageSlot'

type Props = { content: CreativeContent }

export function CenteredCollection({ content }: Props) {
  const c = content.colors

  return (
    <div
      className="tpl tpl-centered"
      style={
        {
          '--bg': c.background,
          '--accent': c.accent,
          '--text': c.text,
          '--muted': c.muted,
          '--surface': c.surface,
        } as CSSProperties
      }
    >
      <div className="tpl-centered__top">
        {content.logoUrl ? (
          <img
            src={content.logoUrl}
            alt={content.brandName || 'Logo'}
            className="tpl-logo tpl-logo--sm"
          />
        ) : null}
        <h2>
          {content.headline ? <span>{content.headline}</span> : null}
          {content.subheadline ? <small>{content.subheadline}</small> : null}
        </h2>
      </div>

      <div className="tpl-centered__bottom" />

      <div className="tpl-centered__product">
        <div className="tpl-centered__frame">
          <ImageSlot
            src={content.productImageUrl}
            alt="Product"
            className="tpl-product-image"
          />
        </div>
        {(content.bodyTitle || content.bodyText) && (
          <div className="tpl-centered__badge">
            {content.bodyTitle ? <strong>{content.bodyTitle}</strong> : null}
            {content.bodyText ? <span>{content.bodyText}</span> : null}
          </div>
        )}
      </div>

      {content.website ? (
        <footer className="tpl-centered__footer">
          <i />
          <span>{content.website}</span>
          <i />
        </footer>
      ) : null}
    </div>
  )
}
