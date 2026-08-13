import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { isLightColor } from '../../../utils/colorTone'
import { ImageSlot } from '../ImageSlot'

export function LogoWatermark({ content }: { content: CreativeContent }) {
  const c = content.colors
  const tone = isLightColor(c.text) ? 'light' : 'dark'

  return (
    <div
      className={`tpl tpl-mark tpl-mark--${tone}`}
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
      <div className="tpl-mark__media">
        <ImageSlot
          src={content.productImageUrl}
          alt="Product"
          className="tpl-product-image"
        />
      </div>
      {content.logoUrl ? (
        <img src={content.logoUrl} alt="" className="tpl-logo tpl-mark__logo" />
      ) : content.brandName ? (
        <p className="tpl-mark__word">{content.brandName}</p>
      ) : null}
      {content.website ? <p className="tpl-mark__web">{content.website}</p> : null}
    </div>
  )
}
