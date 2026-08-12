import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../types'
import { ImageSlot } from './ImageSlot'
import { SocialIcons } from './SocialIcons'

type Props = { content: CreativeContent }

export function SplitEditorial({ content }: Props) {
  const c = content.colors

  return (
    <div
      className="tpl tpl-split"
      style={
        {
          '--bg': c.background,
          '--accent': c.accent,
          '--text': c.text,
          '--muted': c.muted,
        } as CSSProperties
      }
    >
      <div className="tpl-split__watermark" aria-hidden>
        {(content.brandName || 'A').charAt(0)}
      </div>

      <div className="tpl-split__copy">
        <header className="tpl-split__brand">
          {content.logoUrl ? (
            <img src={content.logoUrl} alt={content.brandName} className="tpl-logo" />
          ) : (
            <>
              {content.brandPrefix ? (
                <span className="tpl-split__shop">{content.brandPrefix}</span>
              ) : null}
              {content.brandName ? (
                <strong className="tpl-split__name">{content.brandName}</strong>
              ) : null}
            </>
          )}
          {content.brandTagline ? (
            <span className="tpl-split__tagline">
              <i />
              {content.brandTagline}
              <i />
            </span>
          ) : null}
        </header>

        <div className="tpl-split__headline">
          {content.headline ? <span>{content.headline}</span> : null}
          {content.subheadline ? <strong>{content.subheadline}</strong> : null}
        </div>

        {content.accentLine ? (
          <p className="tpl-split__accent">{content.accentLine}</p>
        ) : null}

        {(content.bodyTitle || content.bodyText) && (
          <div className="tpl-split__body">
            {content.bodyTitle ? <strong>{content.bodyTitle}</strong> : null}
            {content.bodyText ? <p>{content.bodyText}</p> : null}
          </div>
        )}

        {content.ctaText ? (
          <div className="tpl-split__cta">{content.ctaText}</div>
        ) : null}
      </div>

      <div className="tpl-split__media">
        <ImageSlot
          src={content.productImageUrl}
          alt="Product"
          className="tpl-product-image"
        />
        {content.sideText ? (
          <div className="tpl-split__side">
            <span>{content.sideText}</span>
          </div>
        ) : null}
        <SocialIcons className="tpl-split__social" color="rgba(255,255,255,0.92)" />
      </div>
    </div>
  )
}
