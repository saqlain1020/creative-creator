import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { ImageSlot } from '../ImageSlot'

const signs = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']

export function ZodiacWheel({ content }: { content: CreativeContent }) {
  const c = content.colors
  return (
    <div
      className="tpl tpl-zodiac"
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
      <header className="tpl-zodiac__head">
        <span>{content.brandTagline}</span>
        <em>{content.sideText}</em>
      </header>

      <div className="tpl-zodiac__wheel">
        <div className="tpl-zodiac__ring" aria-hidden>
          {signs.map((sign, i) => (
            <span
              key={sign}
              className="tpl-zodiac__sign"
              style={{ transform: `rotate(${i * 30}deg) translateY(-290px) rotate(${-i * 30}deg)` }}
            >
              {sign}
            </span>
          ))}
        </div>
        <svg className="tpl-zodiac__guides" viewBox="0 0 700 700" aria-hidden>
          <circle cx="350" cy="350" r="300" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="350" cy="350" r="230" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="350" cy="350" r="160" fill="none" stroke="currentColor" strokeWidth="1" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = ((i * 30 - 90) * Math.PI) / 180
            const x2 = 350 + Math.cos(a) * 300
            const y2 = 350 + Math.sin(a) * 300
            return (
              <line
                key={i}
                x1="350"
                y1="350"
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="1"
              />
            )
          })}
        </svg>
        <div className="tpl-zodiac__core">
          <ImageSlot src={content.productImageUrl} alt="Product" className="tpl-product-image" />
        </div>
      </div>

      <div className="tpl-zodiac__copy">
        <h2>
          <span>{content.headline}</span>
          <strong>{content.subheadline}</strong>
        </h2>
        <p>{content.accentLine}</p>
        <div>
          <b>{content.bodyTitle}</b>
          <span>{content.bodyText}</span>
        </div>
        {content.ctaText ? <div className="tpl-zodiac__cta">{content.ctaText}</div> : null}
      </div>
    </div>
  )
}
