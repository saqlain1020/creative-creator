import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { ImageSlot } from '../ImageSlot'

export function PassportStamp({ content }: { content: CreativeContent }) {
  const c = content.colors
  return (
    <div
      className="tpl tpl-pass"
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
      <div className="tpl-pass__page">
        <div className="tpl-pass__lines" aria-hidden />
        <header>
          <span>{content.brandName}</span>
          <small>{content.website}</small>
        </header>
        <div className="tpl-pass__stamp">{content.brandTagline}</div>
        <div className="tpl-pass__approved">{content.sideText}</div>
        <h2>
          <span>{content.headline}</span>
          <strong>{content.subheadline}</strong>
        </h2>
        <p>{content.accentLine}</p>
        <div className="tpl-pass__photo">
          <ImageSlot src={content.productImageUrl} alt="Product" className="tpl-product-image" />
        </div>
        <div className="tpl-pass__meta">
          <b>{content.bodyTitle}</b>
          <span>{content.bodyText}</span>
        </div>
        {content.ctaText ? <div className="tpl-pass__cta">{content.ctaText}</div> : null}
      </div>
    </div>
  )
}
