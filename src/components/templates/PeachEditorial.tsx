import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../types'
import { ImageSlot } from './ImageSlot'
import { SocialIcons } from './SocialIcons'

type Props = { content: CreativeContent }

export function PeachEditorial({ content }: Props) {
  const c = content.colors

  return (
    <div
      className="tpl tpl-peach"
      style={
        {
          '--bg': c.background,
          '--accent': c.accent,
          '--text': c.text,
        } as CSSProperties
      }
    >
      <div className="tpl-peach__copy">
        <header className="tpl-peach__brand">
          {content.logoUrl ? (
            <img src={content.logoUrl} alt={content.brandName} className="tpl-logo" />
          ) : (
            <>
              {content.brandPrefix ? (
                <span className="tpl-peach__shop">
                  <i />
                  {content.brandPrefix}
                  <i />
                </span>
              ) : null}
              {content.brandName ? <strong>{content.brandName}</strong> : null}
            </>
          )}
        </header>

        {content.accentLine ? (
          <p className="tpl-peach__script">{content.accentLine}</p>
        ) : null}

        <div className="tpl-peach__headline">
          {content.headline ? <span>{content.headline}</span> : null}
          {content.subheadline ? <strong>{content.subheadline}</strong> : null}
        </div>

        {content.sideText ? <p className="tpl-peach__for">{content.sideText}</p> : null}

        <hr className="tpl-peach__rule" />

        {(content.bodyTitle || content.bodyText) && (
          <div className="tpl-peach__body">
            {content.bodyTitle ? <strong>{content.bodyTitle}</strong> : null}
            {content.bodyText ? <p>{content.bodyText}</p> : null}
          </div>
        )}

        {content.ctaText ? (
          <div className="tpl-peach__cta">{content.ctaText}</div>
        ) : null}
      </div>

      <div className="tpl-peach__media">
        <div className="tpl-peach__frame">
          <ImageSlot
            src={content.productImageUrl}
            alt="Product"
            className="tpl-product-image"
          />
        </div>
        <SocialIcons className="tpl-peach__social" color={c.accent} />
      </div>
    </div>
  )
}
