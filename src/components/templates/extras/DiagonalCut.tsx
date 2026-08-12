import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { ImageSlot } from '../ImageSlot'

export function DiagonalCut({ content }: { content: CreativeContent }) {
  const c = content.colors
  return (
    <div
      className="tpl tpl-diag"
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
      <div className="tpl-diag__slash" aria-hidden />
      <div className="tpl-diag__copy">
        <span className="tpl-diag__tag">{content.brandTagline || content.brandName}</span>
        <h2>
          <span>{content.headline}</span>
          <strong>{content.subheadline}</strong>
        </h2>
        {content.accentLine ? <p>{content.accentLine}</p> : null}
        <div className="tpl-diag__body">
          <strong>{content.bodyTitle}</strong>
          <span>{content.bodyText}</span>
        </div>
        {content.ctaText ? <div className="tpl-diag__cta">{content.ctaText}</div> : null}
      </div>
      <div className="tpl-diag__media">
        <div className="tpl-diag__frame">
          <ImageSlot src={content.productImageUrl} alt="Product" className="tpl-product-image" />
        </div>
        {content.sideText ? <div className="tpl-diag__badge">{content.sideText}</div> : null}
      </div>
    </div>
  )
}
