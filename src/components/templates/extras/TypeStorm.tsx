import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { ImageSlot } from '../ImageSlot'

export function TypeStorm({ content }: { content: CreativeContent }) {
  const c = content.colors
  return (
    <div
      className="tpl tpl-storm"
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
      <div className="tpl-storm__word tpl-storm__word--a" aria-hidden>
        {content.headline}
      </div>
      <div className="tpl-storm__word tpl-storm__word--b" aria-hidden>
        {content.subheadline}
      </div>
      <div className="tpl-storm__word tpl-storm__word--c" aria-hidden>
        {content.bodyTitle}
      </div>
      <div className="tpl-storm__media">
        <ImageSlot src={content.productImageUrl} alt="Product" className="tpl-product-image" />
      </div>
      <div className="tpl-storm__front">
        <small>{content.brandTagline || content.brandName}</small>
        <h2>
          {content.headline} {content.subheadline}
        </h2>
        {content.accentLine ? <p>{content.accentLine}</p> : null}
        <span className="tpl-storm__note">{content.bodyText}</span>
        {content.sideText ? <em>{content.sideText}</em> : null}
        {content.ctaText ? <div className="tpl-storm__cta">{content.ctaText}</div> : null}
      </div>
    </div>
  )
}
