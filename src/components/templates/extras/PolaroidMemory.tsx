import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { ImageSlot } from '../ImageSlot'

export function PolaroidMemory({ content }: { content: CreativeContent }) {
  const c = content.colors
  return (
    <div
      className="tpl tpl-poly"
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
      <div className="tpl-poly__tape" aria-hidden />
      <div className="tpl-poly__card">
        <div className="tpl-poly__photo">
          <ImageSlot src={content.productImageUrl} alt="Product" className="tpl-product-image" />
        </div>
        <p className="tpl-poly__caption">{content.accentLine || content.bodyText}</p>
      </div>
      <div className="tpl-poly__notes">
        <small>{content.brandTagline || content.brandName}</small>
        <h2>
          <span>{content.headline}</span>
          <strong>{content.subheadline}</strong>
        </h2>
        <div className="tpl-poly__date">
          <b>{content.bodyTitle}</b>
          <span>{content.bodyText}</span>
        </div>
        {content.sideText ? <em>{content.sideText}</em> : null}
        {content.ctaText ? <div className="tpl-poly__cta">{content.ctaText}</div> : null}
      </div>
    </div>
  )
}
