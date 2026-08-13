import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { ImageSlot } from '../ImageSlot'

function isLightColor(hex: string) {
  const raw = hex.replace('#', '').trim()
  const n =
    raw.length === 3
      ? raw
          .split('')
          .map((ch) => ch + ch)
          .join('')
      : raw
  const r = Number.parseInt(n.slice(0, 2), 16)
  const g = Number.parseInt(n.slice(2, 4), 16)
  const b = Number.parseInt(n.slice(4, 6), 16)
  if ([r, g, b].some((channel) => Number.isNaN(channel))) return true
  return (r * 299 + g * 587 + b * 114) / 1000 >= 140
}

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
