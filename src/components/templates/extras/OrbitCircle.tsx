import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { ImageSlot } from '../ImageSlot'

export function OrbitCircle({ content }: { content: CreativeContent }) {
  const c = content.colors
  const orbit = (content.sideText || '• TIMELESS • ').repeat(3)
  return (
    <div
      className="tpl tpl-orbit"
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
      <div className="tpl-orbit__ring">
        <svg viewBox="0 0 500 500" className="tpl-orbit__svg">
          <defs>
            <path id="orbitPath" d="M250,250 m-210,0 a210,210 0 1,1 420,0 a210,210 0 1,1 -420,0" />
          </defs>
          <text>
            <textPath href="#orbitPath" startOffset="0%">
              {orbit}
            </textPath>
          </text>
        </svg>
        <div className="tpl-orbit__core">
          <ImageSlot src={content.productImageUrl} alt="Product" className="tpl-product-image" />
        </div>
      </div>
      <div className="tpl-orbit__copy">
        <small>{content.brandTagline || content.brandName}</small>
        <h2>
          <span>{content.headline}</span>
          <strong>{content.subheadline}</strong>
        </h2>
        {content.accentLine ? <p>{content.accentLine}</p> : null}
        <div className="tpl-orbit__pill">
          <b>{content.bodyTitle}</b>
          <span>{content.bodyText}</span>
        </div>
      </div>
    </div>
  )
}
