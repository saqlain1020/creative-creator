import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { ImageSlot } from '../ImageSlot'

export function BrutalBlock({ content }: { content: CreativeContent }) {
  const c = content.colors
  return (
    <div
      className="tpl tpl-brutal"
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
      <div className="tpl-brutal__slab tpl-brutal__slab--a" />
      <div className="tpl-brutal__slab tpl-brutal__slab--b" />
      <div className="tpl-brutal__stamp">{content.sideText}</div>
      <div className="tpl-brutal__copy">
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
        {content.ctaText ? <div className="tpl-brutal__cta">{content.ctaText}</div> : null}
      </div>
      <div className="tpl-brutal__media">
        <ImageSlot src={content.productImageUrl} alt="Product" className="tpl-product-image" />
      </div>
    </div>
  )
}
