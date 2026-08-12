import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { ImageSlot } from '../ImageSlot'

export function ZenInk({ content }: { content: CreativeContent }) {
  const c = content.colors
  return (
    <div
      className="tpl tpl-zen"
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
      <div className="tpl-zen__rake" aria-hidden />
      <header>
        <span>{content.brandTagline}</span>
        <em>{content.sideText}</em>
      </header>
      <div className="tpl-zen__stone">
        <ImageSlot src={content.productImageUrl} alt="Product" className="tpl-product-image" />
      </div>
      <div className="tpl-zen__copy">
        <h2>
          <span>{content.headline}</span>
          <strong>{content.subheadline}</strong>
        </h2>
        <p>{content.accentLine}</p>
        <div>
          <b>{content.bodyTitle}</b>
          <span>{content.bodyText}</span>
        </div>
        {content.ctaText ? <div className="tpl-zen__cta">{content.ctaText}</div> : null}
      </div>
    </div>
  )
}
