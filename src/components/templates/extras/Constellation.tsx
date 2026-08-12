import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { ImageSlot } from '../ImageSlot'

export function Constellation({ content }: { content: CreativeContent }) {
  const c = content.colors
  return (
    <div
      className="tpl tpl-stella"
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
      <svg className="tpl-stella__map" viewBox="0 0 1080 1080" aria-hidden>
        <g stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.55">
          <path d="M180 240 L320 180 L460 260 L520 140 L700 220" />
          <path d="M240 700 L380 620 L500 740 L640 660 L820 720" />
          <path d="M160 480 L300 520 L420 420 L580 500 L760 400" />
        </g>
        {[
          [180, 240],
          [320, 180],
          [460, 260],
          [520, 140],
          [700, 220],
          [240, 700],
          [380, 620],
          [500, 740],
          [640, 660],
          [820, 720],
          [160, 480],
          [300, 520],
          [420, 420],
          [580, 500],
          [760, 400],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 3.5 : 2} fill="currentColor" />
        ))}
      </svg>
      <header className="tpl-stella__head">
        <span>{content.brandTagline}</span>
        <em>{content.sideText}</em>
      </header>
      <div className="tpl-stella__star">
        <ImageSlot src={content.productImageUrl} alt="Product" className="tpl-product-image" />
      </div>
      <div className="tpl-stella__copy">
        <h2>
          <span>{content.headline}</span>
          <strong>{content.subheadline}</strong>
        </h2>
        <p>{content.accentLine}</p>
        <div>
          <b>{content.bodyTitle}</b>
          <span>{content.bodyText}</span>
        </div>
        {content.ctaText ? <div className="tpl-stella__cta">{content.ctaText}</div> : null}
      </div>
    </div>
  )
}
