import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { ImageSlot } from '../ImageSlot'

export function NoirSpotlight({ content }: { content: CreativeContent }) {
  const c = content.colors
  return (
    <div
      className="tpl tpl-noir"
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
      <div className="tpl-noir__glow" aria-hidden />
      <div className="tpl-noir__media">
        <ImageSlot src={content.productImageUrl} alt="Product" className="tpl-product-image" />
      </div>
      <header className="tpl-noir__top">
        {content.logoUrl ? (
          <img src={content.logoUrl} alt="" className="tpl-logo tpl-logo--sm" />
        ) : (
          <span>{content.brandName}</span>
        )}
        {content.brandTagline ? <small>{content.brandTagline}</small> : null}
      </header>
      <div className="tpl-noir__copy">
        <h2>
          <span>{content.headline}</span>
          <strong>{content.subheadline}</strong>
        </h2>
        {content.accentLine ? <p className="tpl-noir__accent">{content.accentLine}</p> : null}
        <div className="tpl-noir__meta">
          <strong>{content.bodyTitle}</strong>
          <span>{content.bodyText}</span>
        </div>
        {content.ctaText ? <div className="tpl-noir__cta">{content.ctaText}</div> : null}
      </div>
      {content.sideText ? <div className="tpl-noir__side">{content.sideText}</div> : null}
    </div>
  )
}
