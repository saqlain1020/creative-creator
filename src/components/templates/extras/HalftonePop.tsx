import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { ImageSlot } from '../ImageSlot'

export function HalftonePop({ content }: { content: CreativeContent }) {
  const c = content.colors
  return (
    <div
      className="tpl tpl-pop"
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
      <div className="tpl-pop__dots" aria-hidden />
      <div className="tpl-pop__burst">{content.brandTagline}</div>
      <h2>
        <span>{content.headline}</span>
        <strong>{content.subheadline}</strong>
      </h2>
      <div className="tpl-pop__panel">
        <ImageSlot src={content.productImageUrl} alt="Product" className="tpl-product-image" />
        <div className="tpl-pop__bang">{content.sideText}</div>
      </div>
      <p>{content.accentLine}</p>
      <div className="tpl-pop__meta">
        <b>{content.bodyTitle}</b>
        <span>{content.bodyText}</span>
      </div>
      {content.ctaText ? <div className="tpl-pop__cta">{content.ctaText}</div> : null}
    </div>
  )
}
