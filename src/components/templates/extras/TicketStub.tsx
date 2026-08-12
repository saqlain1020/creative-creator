import type { CSSProperties } from 'react'
import type { CreativeContent } from '../../../types'
import { ImageSlot } from '../ImageSlot'

export function TicketStub({ content }: { content: CreativeContent }) {
  const c = content.colors
  return (
    <div
      className="tpl tpl-ticket"
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
      <div className="tpl-ticket__stub">
        <div className="tpl-ticket__perf" aria-hidden />
        <div className="tpl-ticket__left">
          <span className="tpl-ticket__admit">{content.brandTagline}</span>
          <h2>
            <span>{content.headline}</span>
            <strong>{content.subheadline}</strong>
          </h2>
          <p>{content.accentLine}</p>
          <div className="tpl-ticket__row">
            <div>
              <small>{content.bodyTitle}</small>
              <b>{content.bodyText}</b>
            </div>
            <div>
              <small>BRAND</small>
              <b>{content.brandName}</b>
            </div>
          </div>
          {content.ctaText ? <div className="tpl-ticket__cta">{content.ctaText}</div> : null}
          <span className="tpl-ticket__web">{content.website}</span>
        </div>
        <div className="tpl-ticket__right">
          <div className="tpl-ticket__media">
            <ImageSlot src={content.productImageUrl} alt="Product" className="tpl-product-image" />
          </div>
          {content.sideText ? <span className="tpl-ticket__side">{content.sideText}</span> : null}
        </div>
      </div>
    </div>
  )
}
