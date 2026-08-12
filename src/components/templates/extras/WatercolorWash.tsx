import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { ImageSlot } from '../ImageSlot'

export function WatercolorWash({ content }: { content: CreativeContent }) {
  const c = content.colors
  return (
    <div
      className="tpl tpl-wash"
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
      <div className="tpl-wash__bloom tpl-wash__bloom--a" aria-hidden />
      <div className="tpl-wash__bloom tpl-wash__bloom--b" aria-hidden />
      <div className="tpl-wash__bloom tpl-wash__bloom--c" aria-hidden />
      <div className="tpl-wash__sheet">
        <small>{content.brandTagline}</small>
        <h2>
          <span>{content.headline}</span>
          <strong>{content.subheadline}</strong>
        </h2>
        <p>{content.accentLine}</p>
        <div className="tpl-wash__media">
          <ImageSlot src={content.productImageUrl} alt="Product" className="tpl-product-image" />
        </div>
        <div className="tpl-wash__meta">
          <b>{content.bodyTitle}</b>
          <span>{content.bodyText}</span>
        </div>
        <div className="tpl-wash__row">
          <em>{content.sideText}</em>
          {content.ctaText ? <div className="tpl-wash__cta">{content.ctaText}</div> : null}
        </div>
      </div>
    </div>
  )
}
