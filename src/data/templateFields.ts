import type { CreativeColors, TemplateId } from '../types'

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

export type TemplateFieldConfig = {
  fields: FieldConfig[]
  colors: { key: keyof CreativeColors; label: string }[]
  showLogo: boolean
  logoReplacesBrand?: boolean
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
}
