import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { ImageSlot } from '../ImageSlot'

export function VinylSleeve({ content }: { content: CreativeContent }) {
  const c = content.colors
  return (
    <div
      className="tpl tpl-vinyl"
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
      <div className="tpl-vinyl__grooves" aria-hidden />
      <div className="tpl-vinyl__disc">
        <div className="tpl-vinyl__label">
          <ImageSlot src={content.productImageUrl} alt="Product" className="tpl-product-image" />
        </div>
      </div>
      <div className="tpl-vinyl__copy">
        <small>{content.brandTagline}</small>
        <h2>
          <span>{content.headline}</span>
          <strong>{content.subheadline}</strong>
        </h2>
        <p>{content.accentLine}</p>
        <div className="tpl-vinyl__meta">
          <b>{content.bodyTitle}</b>
          <span>{content.bodyText}</span>
        </div>
        <div className="tpl-vinyl__row">
          <em>{content.sideText}</em>
          {content.ctaText ? <div className="tpl-vinyl__cta">{content.ctaText}</div> : null}
        </div>
      </div>
    </div>
  )
}
