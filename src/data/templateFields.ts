import type { CreativeColors, CreativeLayout, TemplateId } from '../types'
import { SCRIPT_FONTS } from './scriptFonts'

export type ContentFieldKey =
  | 'brandPrefix'
  | 'brandName'
  | 'brandTagline'
  | 'headline'
  | 'subheadline'
  | 'accentLine'
  | 'bodyTitle'
  | 'bodyText'
  | 'ctaText'
  | 'website'
  | 'sideText'

export type FieldConfig = {
  key: ContentFieldKey
  label: string
  multiline?: boolean
}

export type ColorSwatch = {
  label: string
  value: string
}

export type ColorFieldConfig = {
  key: keyof CreativeColors
  label: string
  swatches?: ColorSwatch[]
}

export type FontChoiceConfig = {
  key: ContentFieldKey
  label: string
  options: { label: string; family: string; opsz?: number; fallback?: string }[]
}

export type ChoiceSet = {
  key: ContentFieldKey
  label: string
  options: { label: string; value: string }[]
}

export type LayoutControl = {
  kind: 'size' | 'offsetY'
  key: keyof CreativeLayout
  label: string
  min?: number
  max?: number
}

export type TemplateFieldConfig = {
  fields: FieldConfig[]
  colors: ColorFieldConfig[]
  showLogo: boolean
  logoReplacesBrand?: boolean
  logoHint?: string
  fontChoices?: FontChoiceConfig
  choiceSets?: ChoiceSet[]
  layoutControls?: LayoutControl[]
}

const brandFields: FieldConfig[] = [
  { key: 'brandName', label: 'Brand name' },
  { key: 'brandTagline', label: 'Tagline / label' },
]

const headlineFields: FieldConfig[] = [
  { key: 'headline', label: 'Headline' },
  { key: 'subheadline', label: 'Subheadline' },
]

const storyFields: FieldConfig[] = [
  { key: 'accentLine', label: 'Accent line' },
  { key: 'bodyTitle', label: 'Body title' },
  { key: 'bodyText', label: 'Body text', multiline: true },
]

const ctaField: FieldConfig = { key: 'ctaText', label: 'CTA' }
const sideField: FieldConfig = { key: 'sideText', label: 'Side / stamp text' }
const webField: FieldConfig = { key: 'website', label: 'Website' }

const fullStory: FieldConfig[] = [
  ...brandFields,
  ...headlineFields,
  ...storyFields,
  ctaField,
  sideField,
]

export const templateFieldConfig: Record<TemplateId, TemplateFieldConfig> = {
  'split-editorial': {
    showLogo: true,
    logoReplacesBrand: true,
    fields: [
      { key: 'brandPrefix', label: 'Brand prefix' },
      { key: 'brandName', label: 'Brand name' },
      { key: 'brandTagline', label: 'Brand tagline' },
      ...headlineFields,
      { key: 'accentLine', label: 'Accent line' },
      { key: 'bodyTitle', label: 'Body title' },
      { key: 'bodyText', label: 'Body text', multiline: true },
      ctaField,
      { key: 'sideText', label: 'Vertical side text' },
    ],
    colors: [
      { key: 'background', label: 'Background' },
      { key: 'accent', label: 'Accent / CTA' },
      { key: 'text', label: 'Text' },
      { key: 'muted', label: 'Accent line' },
    ],
  },
  'centered-collection': {
    showLogo: true,
    fields: [
      ...headlineFields,
      { key: 'bodyTitle', label: 'Badge line 1' },
      { key: 'bodyText', label: 'Badge line 2' },
      webField,
    ],
    colors: [
      { key: 'background', label: 'Top background' },
      { key: 'surface', label: 'Bottom / footer' },
      { key: 'accent', label: 'Badge' },
      { key: 'text', label: 'Headline text' },
      { key: 'muted', label: 'Website text' },
    ],
  },
  'peach-editorial': {
    showLogo: true,
    logoReplacesBrand: true,
    fields: [
      { key: 'brandPrefix', label: 'Brand prefix' },
      { key: 'brandName', label: 'Brand name' },
      { key: 'accentLine', label: 'Script accent' },
      ...headlineFields,
      { key: 'sideText', label: 'Secondary line' },
      { key: 'bodyTitle', label: 'Body title' },
      { key: 'bodyText', label: 'Body text', multiline: true },
      ctaField,
    ],
    colors: [
      { key: 'background', label: 'Background' },
      { key: 'accent', label: 'Frame / CTA' },
      { key: 'text', label: 'Text' },
    ],
  },
  'curve-showcase': {
    showLogo: true,
    fields: [
      ...headlineFields,
      { key: 'brandTagline', label: 'Collection label' },
      { key: 'accentLine', label: 'Supporting line', multiline: true },
      { key: 'bodyTitle', label: 'Badge line 1' },
      { key: 'bodyText', label: 'Badge line 2' },
      webField,
    ],
    colors: [
      { key: 'background', label: 'Panel background' },
      { key: 'surface', label: 'Footer' },
      { key: 'text', label: 'Headline text' },
      { key: 'muted', label: 'Gold accents' },
      { key: 'accent', label: 'Accent' },
    ],
  },
  'noir-spotlight': {
    showLogo: true,
    fields: fullStory,
    colors: [
      { key: 'background', label: 'Stage' },
      { key: 'accent', label: 'Champagne' },
      { key: 'text', label: 'Text' },
      { key: 'muted', label: 'Muted' },
    ],
  },
  'diagonal-cut': {
    showLogo: false,
    fields: [
      { key: 'brandTagline', label: 'Season / label' },
      ...headlineFields,
      ...storyFields,
      ctaField,
      sideField,
    ],
    colors: [
      { key: 'background', label: 'Canvas' },
      { key: 'accent', label: 'Slash / CTA' },
      { key: 'text', label: 'Text' },
    ],
  },
  'magazine-cover': {
    showLogo: false,
    fields: [
      { key: 'brandPrefix', label: 'Masthead prefix' },
      ...headlineFields,
      { key: 'brandTagline', label: 'Issue stamp' },
      ...storyFields,
      sideField,
      ctaField,
      webField,
    ],
    colors: [
      { key: 'background', label: 'Paper' },
      { key: 'text', label: 'Ink' },
      { key: 'muted', label: 'Secondary' },
    ],
  },
  'orbit-circle': {
    showLogo: false,
    fields: [
      { key: 'brandTagline', label: 'Collection label' },
      ...headlineFields,
      ...storyFields,
      { key: 'sideText', label: 'Orbit text' },
    ],
    colors: [
      { key: 'background', label: 'Background' },
      { key: 'accent', label: 'Pill / accent' },
      { key: 'text', label: 'Text' },
      { key: 'muted', label: 'Orbit type' },
      { key: 'surface', label: 'Ring border' },
    ],
  },
  'arch-gallery': {
    showLogo: false,
    fields: [
      { key: 'brandTagline', label: 'Gallery label' },
      sideField,
      ...headlineFields,
      ...storyFields,
      ctaField,
    ],
    colors: [
      { key: 'background', label: 'Wall' },
      { key: 'surface', label: 'Arch frame' },
      { key: 'text', label: 'Text' },
      { key: 'muted', label: 'Accent line' },
      { key: 'accent', label: 'CTA underline' },
    ],
  },
  'type-storm': {
    showLogo: false,
    fields: [
      { key: 'brandTagline', label: 'Eyebrow' },
      ...headlineFields,
      { key: 'bodyTitle', label: 'Ghost word' },
      ...storyFields.filter((f) => f.key !== 'bodyTitle'),
      sideField,
      ctaField,
    ],
    colors: [
      { key: 'background', label: 'Background' },
      { key: 'accent', label: 'Frame' },
      { key: 'text', label: 'Type' },
      { key: 'surface', label: 'CTA' },
    ],
  },
  'ticket-stub': {
    showLogo: false,
    fields: [
      { key: 'brandTagline', label: 'Admit label' },
      { key: 'brandName', label: 'Brand on ticket' },
      ...headlineFields,
      ...storyFields,
      ctaField,
      sideField,
      webField,
    ],
    colors: [
      { key: 'background', label: 'Backdrop' },
      { key: 'surface', label: 'Ticket paper' },
      { key: 'accent', label: 'CTA chip' },
      { key: 'text', label: 'Ticket text' },
    ],
  },
  'polaroid-memory': {
    showLogo: false,
    fields: [
      { key: 'brandTagline', label: 'Keepsake label' },
      ...headlineFields,
      { key: 'accentLine', label: 'Handwritten caption' },
      { key: 'bodyTitle', label: 'Date stamp' },
      { key: 'bodyText', label: 'Note', multiline: true },
      sideField,
      ctaField,
    ],
    colors: [
      { key: 'background', label: 'Scrapbook' },
      { key: 'surface', label: 'Polaroid' },
      { key: 'accent', label: 'Ink / CTA' },
      { key: 'text', label: 'Text' },
      { key: 'muted', label: 'Script note' },
    ],
  },
  'film-strip': {
    showLogo: false,
    fields: [
      { key: 'brandTagline', label: 'Take / slate' },
      ...headlineFields,
      ...storyFields,
      sideField,
      ctaField,
      webField,
    ],
    colors: [
      { key: 'background', label: 'Film body' },
      { key: 'surface', label: 'Frame' },
      { key: 'text', label: 'Credits' },
      { key: 'muted', label: 'Secondary' },
      { key: 'accent', label: 'Accent' },
    ],
  },
  'mosaic-burst': {
    showLogo: false,
    fields: [
      { key: 'brandTagline', label: 'Edit label' },
      ...headlineFields,
      ...storyFields,
      sideField,
      ctaField,
    ],
    colors: [
      { key: 'background', label: 'Background' },
      { key: 'accent', label: 'Coral tiles' },
      { key: 'surface', label: 'Ink tiles / CTA' },
      { key: 'text', label: 'Text' },
      { key: 'muted', label: 'Soft tiles' },
    ],
  },
  'vinyl-sleeve': {
    showLogo: false,
    fields: [
      { key: 'brandTagline', label: 'Side label' },
      ...headlineFields,
      ...storyFields,
      sideField,
      ctaField,
    ],
    colors: [
      { key: 'background', label: 'Sleeve' },
      { key: 'surface', label: 'Inner panel' },
      { key: 'accent', label: 'Gold / CTA' },
      { key: 'text', label: 'Text' },
      { key: 'muted', label: 'Muted' },
    ],
  },
  constellation: {
    showLogo: false,
    fields: [
      { key: 'brandTagline', label: 'Map label' },
      ...headlineFields,
      ...storyFields,
      sideField,
      ctaField,
    ],
    colors: [
      { key: 'background', label: 'Night sky' },
      { key: 'accent', label: 'Star gold' },
      { key: 'text', label: 'Text' },
      { key: 'muted', label: 'Constellation lines' },
      { key: 'surface', label: 'Panel' },
    ],
  },
  'tarot-arcana': {
    showLogo: false,
    fields: [
      { key: 'brandTagline', label: 'Arcana label' },
      ...headlineFields,
      ...storyFields,
      sideField,
      ctaField,
    ],
    colors: [
      { key: 'background', label: 'Velvet' },
      { key: 'accent', label: 'Gilded border' },
      { key: 'text', label: 'Text' },
      { key: 'muted', label: 'Mystic muted' },
      { key: 'surface', label: 'Card face' },
    ],
  },
  'brutal-block': {
    showLogo: false,
    fields: [
      { key: 'brandTagline', label: 'Stamp line' },
      ...headlineFields,
      ...storyFields,
      sideField,
      ctaField,
    ],
    colors: [
      { key: 'background', label: 'Concrete' },
      { key: 'surface', label: 'Slab' },
      { key: 'accent', label: 'Ink / CTA' },
      { key: 'text', label: 'Text' },
      { key: 'muted', label: 'Secondary' },
    ],
  },
  'silk-ribbon': {
    showLogo: false,
    fields: [
      { key: 'brandTagline', label: 'Ribbon label' },
      ...headlineFields,
      ...storyFields,
      sideField,
      ctaField,
    ],
    colors: [
      { key: 'background', label: 'Blush' },
      { key: 'accent', label: 'Ribbon / CTA' },
      { key: 'text', label: 'Text' },
      { key: 'muted', label: 'Soft muted' },
      { key: 'surface', label: 'Card' },
    ],
  },
  'halftone-pop': {
    showLogo: false,
    fields: [
      { key: 'brandTagline', label: 'Burst label' },
      ...headlineFields,
      ...storyFields,
      sideField,
      ctaField,
    ],
    colors: [
      { key: 'background', label: 'Yellow field' },
      { key: 'accent', label: 'Pop red' },
      { key: 'text', label: 'Ink' },
      { key: 'surface', label: 'Panel white' },
    ],
  },
  'zen-ink': {
    showLogo: false,
    fields: [
      { key: 'brandTagline', label: 'Quiet label' },
      ...headlineFields,
      ...storyFields,
      sideField,
      ctaField,
    ],
    colors: [
      { key: 'background', label: 'Paper' },
      { key: 'accent', label: 'Ink' },
      { key: 'text', label: 'Text' },
      { key: 'muted', label: 'Rake lines' },
      { key: 'surface', label: 'Sand bed' },
    ],
  },
  'passport-stamp': {
    showLogo: false,
    fields: [
      { key: 'brandTagline', label: 'Visa stamp' },
      ...headlineFields,
      ...storyFields,
      sideField,
      ctaField,
      webField,
    ],
    colors: [
      { key: 'background', label: 'Passport paper' },
      { key: 'accent', label: 'Stamp red' },
      { key: 'text', label: 'Ink' },
      { key: 'muted', label: 'Lines' },
      { key: 'surface', label: 'Page' },
    ],
  },
  'billboard-night': {
    showLogo: false,
    fields: [
      { key: 'brandTagline', label: 'Marquee' },
      ...headlineFields,
      ...storyFields,
      sideField,
      ctaField,
    ],
    colors: [
      { key: 'background', label: 'Night city' },
      { key: 'accent', label: 'Neon amber' },
      { key: 'text', label: 'Billboard text' },
      { key: 'muted', label: 'Skyline muted' },
      { key: 'surface', label: 'Panel' },
    ],
  },
  'watercolor-wash': {
    showLogo: false,
    fields: [
      { key: 'brandTagline', label: 'Studio label' },
      ...headlineFields,
      ...storyFields,
      sideField,
      ctaField,
    ],
    colors: [
      { key: 'background', label: 'Paper' },
      { key: 'accent', label: 'Teal wash' },
      { key: 'muted', label: 'Warm wash' },
      { key: 'text', label: 'Text' },
      { key: 'surface', label: 'Card' },
    ],
  },
  'lunar-phase': {
    showLogo: false,
    fields: [
      { key: 'brandTagline', label: 'Lunar label' },
      ...headlineFields,
      ...storyFields,
      sideField,
      ctaField,
    ],
    colors: [
      { key: 'background', label: 'Night' },
      { key: 'accent', label: 'Moonlight' },
      { key: 'text', label: 'Text' },
      { key: 'muted', label: 'Soft muted' },
      { key: 'surface', label: 'Surface' },
    ],
  },
  'zodiac-wheel': {
    showLogo: false,
    fields: [
      { key: 'brandTagline', label: 'Chart label' },
      ...headlineFields,
      ...storyFields,
      sideField,
      ctaField,
    ],
    colors: [
      { key: 'background', label: 'Void' },
      { key: 'accent', label: 'Gold ink' },
      { key: 'text', label: 'Text' },
      { key: 'muted', label: 'Wheel lines' },
      { key: 'surface', label: 'Core' },
    ],
  },
  'meteor-shower': {
    showLogo: false,
    fields: [
      { key: 'brandTagline', label: 'Wish label' },
      ...headlineFields,
      ...storyFields,
      sideField,
      ctaField,
    ],
    colors: [
      { key: 'background', label: 'Midnight' },
      { key: 'accent', label: 'Meteor ice' },
      { key: 'text', label: 'Text' },
      { key: 'muted', label: 'Secondary' },
      { key: 'surface', label: 'Panel' },
    ],
  },
  'logo-watermark': {
    showLogo: true,
    logoHint: 'Used as the watermark on your photo',
    fields: [webField],
    colors: [
      {
        key: 'text',
        label: 'Watermark & website',
        swatches: [
          { label: 'White', value: '#ffffff' },
          { label: 'Black', value: '#000000' },
        ],
      },
    ],
  },
  'script-overlay': {
    showLogo: false,
    fontChoices: {
      key: 'sideText',
      label: 'Script font',
      options: SCRIPT_FONTS,
    },
    layoutControls: [
      { kind: 'offsetY', key: 'headline', label: 'Script from top', min: 0 },
      { kind: 'size', key: 'headline', label: 'Script size' },
      { kind: 'size', key: 'subheadline', label: 'Second line size' },
      { kind: 'size', key: 'bodyText', label: 'Bottom line size' },
      { kind: 'size', key: 'website', label: 'Website size' },
    ],
    choiceSets: [
      {
        key: 'ctaText',
        label: 'Aspect ratio',
        options: [
          { label: '1:1', value: '1:1' },
          { label: '4:5', value: '4:5' },
        ],
      },
      {
        key: 'brandTagline',
        label: 'Alignment',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' },
        ],
      },
    ],
    fields: [
      { key: 'headline', label: 'Script line', multiline: true },
      { key: 'subheadline', label: 'Second line', multiline: true },
      { key: 'bodyText', label: 'Bottom line', multiline: true },
      webField,
    ],
    colors: [
      {
        key: 'text',
        label: 'Text',
        swatches: [
          { label: 'White', value: '#ffffff' },
          { label: 'Black', value: '#000000' },
        ],
      },
    ],
  },
}
