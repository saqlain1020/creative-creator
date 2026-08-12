import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { ImageSlot } from '../ImageSlot'

export function MeteorShower({ content }: { content: CreativeContent }) {
  const c = content.colors
  return (
    <div
      className="tpl tpl-meteor"
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
      <div className="tpl-meteor__field" aria-hidden>
        {Array.from({ length: 14 }).map((_, i) => (
          <i
            key={i}
            className="tpl-meteor__streak"
            style={
              {
                '--x': `${8 + (i * 7) % 80}%`,
                '--y': `${6 + (i * 11) % 55}%`,
                '--len': `${90 + (i % 5) * 28}px`,
                '--delay': `${(i % 7) * 0.35}s`,
              } as CSSProperties
            }
          />
        ))}
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={`s${i}`}
            className="tpl-meteor__dot"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 29) % 100}%`,
              width: i % 5 === 0 ? 3 : 1.5,
              height: i % 5 === 0 ? 3 : 1.5,
            }}
          />
        ))}
      </div>

      <header className="tpl-meteor__head">
        <span>{content.brandTagline}</span>
        <em>{content.sideText}</em>
      </header>

      <div className="tpl-meteor__copy">
        <h2>
          <span>{content.headline}</span>
          <strong>{content.subheadline}</strong>
        </h2>
        <p>{content.accentLine}</p>
        <div>
          <b>{content.bodyTitle}</b>
          <span>{content.bodyText}</span>
        </div>
        {content.ctaText ? <div className="tpl-meteor__cta">{content.ctaText}</div> : null}
      </div>

      <div className="tpl-meteor__glow">
        <ImageSlot src={content.productImageUrl} alt="Product" className="tpl-product-image" />
      </div>
    </div>
  )
}
