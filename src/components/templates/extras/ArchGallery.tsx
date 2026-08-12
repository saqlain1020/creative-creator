import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { ImageSlot } from '../ImageSlot'

export function ArchGallery({ content }: { content: CreativeContent }) {
  const c = content.colors
  return (
    <div
      className="tpl tpl-arch"
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
      <div className="tpl-arch__wall" aria-hidden />
      <header className="tpl-arch__head">
        <span>{content.brandTagline || content.brandName}</span>
        {content.sideText ? <em>{content.sideText}</em> : null}
      </header>
      <div className="tpl-arch__window">
        <ImageSlot src={content.productImageUrl} alt="Product" className="tpl-product-image" />
      </div>
      <div className="tpl-arch__plaque">
        <h2>
          <span>{content.headline}</span>
          <strong>{content.subheadline}</strong>
        </h2>
        {content.accentLine ? <p>{content.accentLine}</p> : null}
        <div>
          <b>{content.bodyTitle}</b>
          <span>{content.bodyText}</span>
        </div>
        {content.ctaText ? <div className="tpl-arch__cta">{content.ctaText}</div> : null}
      </div>
    </div>
  )
}
