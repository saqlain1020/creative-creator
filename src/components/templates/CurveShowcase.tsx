import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../types'
import { ImageSlot } from './ImageSlot'

type Props = { content: CreativeContent }

function Leaf({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" aria-hidden>
      <path
        d="M40 8c8 14 18 24 28 30-16 4-28 16-34 34-6-18-18-30-34-34 14-6 24-16 40-30z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  )
}

export function CurveShowcase({ content }: Props) {
  const c = content.colors

  return (
    <div
      className="tpl tpl-curve"
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
      <svg width="0" height="0" aria-hidden>
        <defs>
          <clipPath id="curve-media-clip" clipPathUnits="objectBoundingBox">
            <path d="M0.18,0 C0.04,0.3 0.04,0.7 0.18,1 L1,1 L1,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="tpl-curve__media">
        <ImageSlot
          src={content.productImageUrl}
          alt="Product"
          className="tpl-product-image"
        />
      </div>

      <Leaf className="tpl-curve__leaf tpl-curve__leaf--top" />

      <div className="tpl-curve__panel">
        {content.logoUrl ? (
          <img
            src={content.logoUrl}
            alt={content.brandName || 'Logo'}
            className="tpl-logo tpl-logo--sm"
          />
        ) : null}

        <div className="tpl-curve__headline">
          {content.headline ? <span>{content.headline}</span> : null}
          {content.subheadline ? <strong>{content.subheadline}</strong> : null}
        </div>

        {content.brandTagline ? (
          <div className="tpl-curve__collection">
            <i />
            <span>✦</span>
            <i />
            <small>{content.brandTagline}</small>
          </div>
        ) : null}

        {content.accentLine ? (
          <p className="tpl-curve__accent">{content.accentLine}</p>
        ) : null}
      </div>

      {(content.bodyTitle || content.bodyText) && (
        <div className="tpl-curve__badge">
          {content.bodyTitle ? <strong>{content.bodyTitle}</strong> : null}
          {content.bodyText ? <span>{content.bodyText}</span> : null}
        </div>
      )}

      <footer className="tpl-curve__footer">
        <Leaf className="tpl-curve__leaf tpl-curve__leaf--footer" />
        {content.website ? (
          <>
            <i />
            <span>{content.website}</span>
            <i />
          </>
        ) : null}
      </footer>
    </div>
  )
}
