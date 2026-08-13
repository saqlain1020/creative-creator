import type { CreativeContent, TemplateId } from '../types'

export const ARTBOARD_SQUARE = { width: 1080, height: 1080 } as const
export const ARTBOARD_4_5 = { width: 1080, height: 1350 } as const

export type ArtboardSize = {
  width: number
  height: number
}

export function resolveAspect(value: string): '1:1' | '4:5' {
  return value === '4:5' ? '4:5' : '1:1'
}

export function getArtboardSize(
  templateId: TemplateId,
  content: CreativeContent,
): ArtboardSize {
  if (templateId === 'script-overlay' && resolveAspect(content.ctaText) === '4:5') {
    return ARTBOARD_4_5
  }
  return ARTBOARD_SQUARE
}
