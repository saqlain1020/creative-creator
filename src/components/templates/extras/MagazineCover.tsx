import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { ImageSlot } from '../ImageSlot'

export function MagazineCover({ content }: { content: CreativeContent }) {
  const c = content.colors
  return (
    <div
      className="tpl tpl-mag"
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
      <div className="tpl-mag__media">
        <ImageSlot src={content.productImageUrl} alt="Product" className="tpl-product-image" />
      </div>
      <header className="tpl-mag__mast">
        <span>{content.brandPrefix}</span>
        <strong>{content.headline}</strong>
        <em>{content.subheadline}</em>
      </header>
      <div className="tpl-mag__stamp">{content.brandTagline}</div>
      <p className="tpl-mag__deck">{content.accentLine}</p>
      <div className="tpl-mag__story">
        <strong>{content.bodyTitle}</strong>
        <span>{content.bodyText}</span>
      </div>
      <div className="tpl-mag__bar">
        <span>{content.sideText}</span>
        <span>{content.ctaText}</span>
        <span>{content.website}</span>
      </div>
      <div className="tpl-mag__barcode" aria-hidden>
        {Array.from({ length: 18 }).map((_, i) => (
          <i key={i} style={{ width: i % 3 === 0 ? 3 : 1.5 }} />
        ))}
      </div>
    </div>
  )
}
