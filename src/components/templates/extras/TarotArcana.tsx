import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { ImageSlot } from '../ImageSlot'

export function TarotArcana({ content }: { content: CreativeContent }) {
  const c = content.colors
  return (
    <div
      className="tpl tpl-tarot"
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
      <div className="tpl-tarot__card">
        <div className="tpl-tarot__border">
          <span className="tpl-tarot__corner">✧</span>
          <span className="tpl-tarot__corner">✧</span>
          <span className="tpl-tarot__corner">✧</span>
          <span className="tpl-tarot__corner">✧</span>
          <small>{content.brandTagline}</small>
          <h2>
            <span>{content.headline}</span>
            <strong>{content.subheadline}</strong>
          </h2>
          <div className="tpl-tarot__art">
            <ImageSlot src={content.productImageUrl} alt="Product" className="tpl-product-image" />
          </div>
          <p>{content.accentLine}</p>
          <div className="tpl-tarot__foot">
            <b>{content.bodyTitle}</b>
            <span>{content.bodyText}</span>
          </div>
          <em>{content.sideText}</em>
        </div>
      </div>
      {content.ctaText ? <div className="tpl-tarot__cta">{content.ctaText}</div> : null}
    </div>
  )
}
