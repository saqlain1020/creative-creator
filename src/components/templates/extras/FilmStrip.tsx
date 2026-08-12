import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { ImageSlot } from '../ImageSlot'

export function FilmStrip({ content }: { content: CreativeContent }) {
  const c = content.colors
  return (
    <div
      className="tpl tpl-film"
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
      <div className="tpl-film__sprocket tpl-film__sprocket--l" aria-hidden>
        {Array.from({ length: 12 }).map((_, i) => (
          <i key={i} />
        ))}
      </div>
      <div className="tpl-film__sprocket tpl-film__sprocket--r" aria-hidden>
        {Array.from({ length: 12 }).map((_, i) => (
          <i key={i} />
        ))}
      </div>
      <div className="tpl-film__frame">
        <ImageSlot src={content.productImageUrl} alt="Product" className="tpl-product-image" />
        {content.sideText ? <span className="tpl-film__rec">{content.sideText}</span> : null}
      </div>
      <div className="tpl-film__credits">
        <small>{content.brandTagline}</small>
        <h2>
          <span>{content.headline}</span>
          <strong>{content.subheadline}</strong>
        </h2>
        <p>{content.accentLine}</p>
        <div>
          <b>{content.bodyTitle}</b>
          <span>{content.bodyText}</span>
        </div>
        <div className="tpl-film__actions">
          <span>{content.ctaText}</span>
          <span>{content.website}</span>
        </div>
      </div>
    </div>
  )
}
