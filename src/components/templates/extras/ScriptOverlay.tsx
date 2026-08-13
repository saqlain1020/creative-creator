import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { isLightColor } from '../../../utils/colorTone'
import { ImageSlot } from '../ImageSlot'

export function ScriptOverlay({ content }: { content: CreativeContent }) {
  const c = content.colors
  const tone = isLightColor(c.text) ? 'light' : 'dark'

  return (
    <div
      className={`tpl tpl-script tpl-script--${tone}`}
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
      <div className="tpl-script__media">
        <ImageSlot
          src={content.productImageUrl}
          alt="Product"
          className="tpl-product-image"
        />
      </div>
      {(content.headline || content.subheadline) && (
        <header className="tpl-script__top">
          {content.headline ? (
            <p className="tpl-script__script">{content.headline}</p>
          ) : null}
          {content.subheadline ? (
            <p className="tpl-script__caps">{content.subheadline}</p>
          ) : null}
        </header>
      )}
      {(content.bodyText || content.website) && (
        <footer className="tpl-script__bottom">
          {content.bodyText ? (
            <p className="tpl-script__body">{content.bodyText}</p>
          ) : null}
          {content.website ? (
            <p className="tpl-script__web">{content.website}</p>
          ) : null}
        </footer>
      )}
    </div>
  )
}
