export type TemplateId =
  | 'split-editorial'
  | 'centered-collection'
  | 'peach-editorial'
  | 'curve-showcase'
  | 'noir-spotlight'
  | 'diagonal-cut'
  | 'magazine-cover'
  | 'orbit-circle'
  | 'arch-gallery'
  | 'type-storm'
  | 'ticket-stub'
  | 'polaroid-memory'
  | 'film-strip'
  | 'mosaic-burst'
  | 'vinyl-sleeve'
  | 'constellation'
  | 'tarot-arcana'
  | 'brutal-block'
  | 'silk-ribbon'
  | 'halftone-pop'
  | 'zen-ink'
  | 'passport-stamp'
  | 'billboard-night'
  | 'watercolor-wash'
  | 'lunar-phase'
  | 'zodiac-wheel'
  | 'meteor-shower'
  | 'logo-watermark'
  | 'script-overlay'

export type CreativeColors = {
  background: string
  accent: string
  text: string
  muted: string
  surface: string
}

export type CreativeContent = {
  brandPrefix: string
  brandName: string
  brandTagline: string
  headline: string
  subheadline: string
  accentLine: string
  bodyTitle: string
  bodyText: string
  ctaText: string
  website: string
  sideText: string
  logoUrl: string | null
  productImageUrl: string | null
  colors: CreativeColors
}

export type TemplateMeta = {
  id: TemplateId
  name: string
  description: string
  preview: string
  defaults: CreativeContent
}
