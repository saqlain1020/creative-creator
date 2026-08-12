import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { ImageSlot } from '../ImageSlot'

export function MosaicBurst({ content }: { content: CreativeContent }) {
  const c = content.colors
  return (
    <div
      className="tpl tpl-mosaic"
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
      <div className="tpl-mosaic__tiles" aria-hidden>
        {Array.from({ length: 16 }).map((_, i) => (
          <i key={i} className={`t${i % 4}`} />
        ))}
      </div>
      <div className="tpl-mosaic__center">
        <ImageSlot src={content.productImageUrl} alt="Product" className="tpl-product-image" />
      </div>
      <div className="tpl-mosaic__copy">
        <small>{content.brandTagline || content.brandName}</small>
        <h2>
          <span>{content.headline}</span>
          <strong>{content.subheadline}</strong>
        </h2>
        {content.accentLine ? <p>{content.accentLine}</p> : null}
        <div className="tpl-mosaic__chip">
          <b>{content.bodyTitle}</b>
          <span>{content.bodyText}</span>
        </div>
        <div className="tpl-mosaic__row">
          {content.sideText ? <em>{content.sideText}</em> : null}
          {content.ctaText ? <div className="tpl-mosaic__cta">{content.ctaText}</div> : null}
        </div>
      </div>
    </div>
  )
}
