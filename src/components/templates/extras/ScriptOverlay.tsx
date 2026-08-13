import type { CSSProperties } from 'react'
import {
  fieldOffsetY,
  fieldSizePx,
  getFieldTune,
  scaledBasePx,
} from '../../../data/fieldTune'
import {
  resolveScriptAlign,
  resolveScriptFont,
  scriptFontStack,
} from '../../../data/scriptFonts'
import type { CreativeContent } from '../../../types'
import { getArtboardSize } from '../../../utils/artboardSize'
import { isLightColor } from '../../../utils/colorTone'
import { ImageSlot } from '../ImageSlot'

export function ScriptOverlay({ content }: { content: CreativeContent }) {
  const c = content.colors
  const tone = isLightColor(c.text) ? 'light' : 'dark'
  const scriptFont = resolveScriptFont(content.sideText)
  const align = resolveScriptAlign(content.brandTagline)
  const { width, height } = getArtboardSize('script-overlay', content)
  const headingY = fieldOffsetY(content, 'headline', 24)
  const scriptSize = scaledBasePx(scriptFont.size, getFieldTune(content, 'headline').size)
  const capsSize = fieldSizePx(content, 'subheadline', 40)
  const bodySize = fieldSizePx(content, 'bodyText', 22)
  const webSize = fieldSizePx(content, 'website', 20)

  return (
    <div
      className={`tpl tpl-script tpl-script--${tone} tpl-script--${align}`}
      style={
        {
          width,
          height,
          '--bg': c.background,
          '--accent': c.accent,
          '--text': c.text,
          '--muted': c.muted,
          '--surface': c.surface,
          '--caps-size': capsSize,
          '--body-size': bodySize,
          '--web-size': webSize,
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
        <header className="tpl-script__top" style={{ top: headingY }}>
          {content.headline ? (
            <p
              className="tpl-script__script"
              style={{
                fontFamily: scriptFontStack(scriptFont),
                fontSize: scriptSize,
                ...(scriptFont.opsz
                  ? {
                      fontOpticalSizing: 'auto',
                      fontVariationSettings: `"opsz" ${scriptFont.opsz}`,
                    }
                  : {}),
              }}
            >
              {content.headline}
            </p>
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
