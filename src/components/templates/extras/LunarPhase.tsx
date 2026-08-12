import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { ImageSlot } from '../ImageSlot'

const phases = ['new', 'crescent', 'quarter', 'gibbous', 'full', 'gibbous', 'quarter', 'crescent']

export function LunarPhase({ content }: { content: CreativeContent }) {
  const c = content.colors
  return (
    <div
      className="tpl tpl-lunar"
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
      <div className="tpl-lunar__stars" aria-hidden />
      <header className="tpl-lunar__head">
        <span>{content.brandTagline}</span>
        <em>{content.sideText}</em>
      </header>

      <div className="tpl-lunar__arc" aria-hidden>
        {phases.map((phase, i) => (
          <span key={`${phase}-${i}`} className={`tpl-lunar__phase tpl-lunar__phase--${phase}`} />
        ))}
      </div>

      <div className="tpl-lunar__full">
        <ImageSlot src={content.productImageUrl} alt="Product" className="tpl-product-image" />
      </div>

      <div className="tpl-lunar__copy">
        <h2>
          <span>{content.headline}</span>
          <strong>{content.subheadline}</strong>
        </h2>
        <p>{content.accentLine}</p>
        <div>
          <b>{content.bodyTitle}</b>
          <span>{content.bodyText}</span>
        </div>
        {content.ctaText ? <div className="tpl-lunar__cta">{content.ctaText}</div> : null}
      </div>
    </div>
  )
}
