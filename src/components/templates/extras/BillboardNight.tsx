import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { ImageSlot } from '../ImageSlot'

export function BillboardNight({ content }: { content: CreativeContent }) {
  const c = content.colors
  return (
    <div
      className="tpl tpl-board"
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
      <div className="tpl-board__skyline" aria-hidden />
      <div className="tpl-board__frame">
        <small>{content.brandTagline}</small>
        <h2>
          <span>{content.headline}</span>
          <strong>{content.subheadline}</strong>
        </h2>
        <div className="tpl-board__split">
          <div className="tpl-board__copy">
            <p>{content.accentLine}</p>
            <div>
              <b>{content.bodyTitle}</b>
              <span>{content.bodyText}</span>
            </div>
            <em>{content.sideText}</em>
            {content.ctaText ? <div className="tpl-board__cta">{content.ctaText}</div> : null}
          </div>
          <div className="tpl-board__media">
            <ImageSlot src={content.productImageUrl} alt="Product" className="tpl-product-image" />
          </div>
        </div>
      </div>
    </div>
  )
}
