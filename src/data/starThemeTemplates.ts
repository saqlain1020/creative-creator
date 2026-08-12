import type { CreativeContent, TemplateMeta } from '../types'

const brand = {
  brandPrefix: 'SHOP',
  brandName: 'AIZÉL',
  website: 'SHOPAIZEL.COM',
  ctaText: 'SHOP NOW',
  logoUrl: null as string | null,
}

function base(
  partial: Omit<CreativeContent, keyof typeof brand | 'logoUrl'> &
    Partial<typeof brand>,
): CreativeContent {
  return { ...brand, logoUrl: null, ...partial }
}

export const starThemeTemplates: TemplateMeta[] = [
  {
    id: 'lunar-phase',
    name: 'Lunar Phase',
    description: 'Moon-cycle arc with the product as the full moon.',
    preview: '/samples/product-pendant.jpg',
    defaults: base({
      productImageUrl: '/samples/product-pendant.jpg',
      brandTagline: 'LUNAR EDIT',
      headline: 'FULL',
      subheadline: 'MOON',
      accentLine: 'Wax with intention',
      bodyTitle: 'PHASE 05',
      bodyText: 'Brightest night. Softest gold.',
      sideText: '☾ CYCLE',
      ctaText: 'FOLLOW THE MOON',
      colors: {
        background: '#0A0E18',
        accent: '#E8DCC0',
        text: '#F2EFE8',
        muted: '#7E8798',
        surface: '#141A28',
      },
    }),
  },
  {
    id: 'zodiac-wheel',
    name: 'Zodiac Wheel',
    description: 'Astrological wheel with the piece at the chart’s heart.',
    preview: '/samples/product-ring.jpg',
    defaults: base({
      productImageUrl: '/samples/product-ring.jpg',
      brandTagline: 'BORN UNDER GOLD',
      headline: 'YOUR',
      subheadline: 'SIGN',
      accentLine: 'Written in metal and myth',
      bodyTitle: 'HOUSE III',
      bodyText: 'A chart you can wear.',
      sideText: '☉ ASC',
      ctaText: 'READ / SHOP',
      colors: {
        background: '#120E1C',
        accent: '#D4AF6A',
        text: '#F4ECDF',
        muted: '#8B7FA0',
        surface: '#1C1628',
      },
    }),
  },
  {
    id: 'meteor-shower',
    name: 'Meteor Shower',
    description: 'Streaking meteors across midnight with a glowing product.',
    preview: '/samples/product-necklace.jpg',
    defaults: base({
      productImageUrl: '/samples/product-necklace.jpg',
      brandTagline: 'MAKE A WISH',
      headline: 'FALLING',
      subheadline: 'LIGHT',
      accentLine: 'Catch it before it fades',
      bodyTitle: 'SHOWER',
      bodyText: 'Rare spark. Brief sky. Yours forever.',
      sideText: '✦ WISH',
      ctaText: 'CATCH IT',
      colors: {
        background: '#070B14',
        accent: '#9FD4FF',
        text: '#F5F8FC',
        muted: '#6B7C94',
        surface: '#101826',
      },
    }),
  },
]
