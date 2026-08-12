import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { ImageSlot } from '../ImageSlot'

export function SilkRibbon({ content }: { content: CreativeContent }) {
  const c = content.colors
  return (
    <div
      className="tpl tpl-silk"
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
      <div className="tpl-silk__ribbon tpl-silk__ribbon--1" aria-hidden />
      <div className="tpl-silk__ribbon tpl-silk__ribbon--2" aria-hidden />
      <div className="tpl-silk__card">
        <small>{content.brandTagline}</small>
        <div className="tpl-silk__media">
          <ImageSlot src={content.productImageUrl} alt="Product" className="tpl-product-image" />
        </div>
        <h2>
          <span>{content.headline}</span>
          <strong>{content.subheadline}</strong>
        </h2>
        <p>{content.accentLine}</p>
        <div className="tpl-silk__meta">
          <b>{content.bodyTitle}</b>
          <span>{content.bodyText}</span>
        </div>
        <em>{content.sideText}</em>
        {content.ctaText ? <div className="tpl-silk__cta">{content.ctaText}</div> : null}
      </div>
    </div>
  )
}
