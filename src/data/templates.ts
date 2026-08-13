import type { TemplateMeta } from '../types'
import { newTemplates } from './newTemplates'
import { starThemeTemplates } from './starThemeTemplates'
import { wave2Templates } from './wave2Templates'

const classicTemplates: TemplateMeta[] = [
  {
    id: 'split-editorial',
    name: 'Split Editorial',
    description: 'Text left, product right with a vertical accent bar.',
    preview: '/templates/preview-split.png',
    defaults: {
      brandPrefix: 'SHOP',
      brandName: 'AIZÉL',
      website: 'SHOPAIZEL.COM',
      ctaText: 'SHOP NOW',
      logoUrl: null,
      productImageUrl: '/samples/product-pendant.jpg',
      brandTagline: 'TIMELESS ELEGANCE',
      headline: 'PENDENT',
      subheadline: 'SETS',
      accentLine: 'Crafted to Shine, Made for You',
      bodyTitle: 'NEW ARRIVAL',
      bodyText: 'Discover timeless beauty with our new pendant sets.',
      sideText: 'TIMELESS ELEGANCE, JUST FOR YOU',
      colors: {
        background: '#F2E7DC',
        accent: '#0F3D34',
        text: '#1A1A1A',
        muted: '#8A6B4A',
        surface: '#FFFFFF',
      },
    },
  },
  {
    id: 'centered-collection',
    name: 'Centered Collection',
    description: 'Stacked layout with a floating new-arrival badge.',
    preview: '/templates/preview-centered.png',
    defaults: {
      brandPrefix: 'SHOP',
      brandName: 'AIZÉL',
      website: 'SHOPAIZEL.COM',
      ctaText: 'SHOP NOW',
      logoUrl: null,
      productImageUrl: '/samples/product-ring.jpg',
      brandTagline: '',
      headline: 'RINGS',
      subheadline: 'COLLECTION',
      accentLine: '',
      bodyTitle: 'NEW',
      bodyText: 'ARRIVAL',
      sideText: '',
      colors: {
        background: '#F5E6D3',
        accent: '#00332B',
        text: '#00332B',
        muted: '#FFFFFF',
        surface: '#00332B',
      },
    },
  },
  {
    id: 'peach-editorial',
    name: 'Peach Editorial',
    description: 'Warm peach canvas with script accent and framed product.',
    preview: '/templates/preview-peach.png',
    defaults: {
      brandPrefix: 'SHOP',
      brandName: 'AIZÉL',
      website: 'SHOPAIZEL.COM',
      ctaText: 'Shop Now',
      logoUrl: null,
      productImageUrl: '/samples/product-necklace.jpg',
      brandTagline: '',
      headline: 'EXQUISITE',
      subheadline: 'NECKLACE COLLECTION',
      accentLine: 'Discover',
      bodyTitle: 'Own Your Sparkle!',
      bodyText: 'Explore our collection at ShopAizel.com',
      sideText: 'Just for You',
      colors: {
        background: '#E6C7AC',
        accent: '#111111',
        text: '#111111',
        muted: '#333333',
        surface: '#FFFFFF',
      },
    },
  },
  {
    id: 'curve-showcase',
    name: 'Curve Showcase',
    description: 'Curved product frame with cream panel and green footer.',
    preview: '/templates/preview-curve.png',
    defaults: {
      brandPrefix: 'SHOP',
      brandName: 'AIZÉL',
      website: 'SHOPAIZEL.COM',
      ctaText: 'SHOP NOW',
      logoUrl: null,
      productImageUrl: '/samples/product-pendant.jpg',
      brandTagline: 'COLLECTION',
      headline: 'PENDENT',
      subheadline: 'SETS',
      accentLine: 'Timeless elegance, perfectly matched.',
      bodyTitle: 'NEW',
      bodyText: 'ARRIVAL',
      sideText: '',
      colors: {
        background: '#F3EDE4',
        accent: '#0B3D33',
        text: '#0B3D33',
        muted: '#C4A574',
        surface: '#0B3D33',
      },
    },
  },
]

export function templatePreviewPath(id: string) {
  return `/templates/preview-${id}.png`
}

export const templates: TemplateMeta[] = [
  ...classicTemplates,
  ...newTemplates,
  ...wave2Templates,
  ...starThemeTemplates,
].map((template) => ({
  ...template,
  preview: templatePreviewPath(template.id),
}))

export function getTemplate(id: string): TemplateMeta {
  return templates.find((t) => t.id === id) ?? templates[0]
}
