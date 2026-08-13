import type { CreativeContent, CreativeLayout, FieldTune, SizeToken } from '../types'

export const SIZE_TOKENS: SizeToken[] = ['xs', 'sm', 'md', 'lg', 'xl']

export const SIZE_TOKEN_OPTIONS: { label: string; value: SizeToken }[] = [
  { label: 'XS', value: 'xs' },
  { label: 'S', value: 'sm' },
  { label: 'M', value: 'md' },
  { label: 'L', value: 'lg' },
  { label: 'XL', value: 'xl' },
]

const SIZE_FACTORS: Record<SizeToken, number> = {
  xs: 0.62,
  sm: 0.78,
  md: 1,
  lg: 1.22,
  xl: 1.48,
}

export function resolveSizeToken(value: string | undefined): SizeToken {
  return SIZE_TOKENS.includes(value as SizeToken) ? (value as SizeToken) : 'md'
}

export function getFieldTune(
  content: CreativeContent,
  key: keyof CreativeLayout,
): FieldTune {
  return content.layout?.[key] ?? {}
}

export function patchFieldTune(
  layout: CreativeLayout | undefined,
  key: keyof CreativeLayout,
  patch: FieldTune,
): CreativeLayout {
  return {
    ...layout,
    [key]: { ...layout?.[key], ...patch },
  }
}

export function fieldSizePx(
  content: CreativeContent,
  key: keyof CreativeLayout,
  basePx: number,
): string {
  const token = resolveSizeToken(getFieldTune(content, key).size)
  return `${Math.round(basePx * SIZE_FACTORS[token])}px`
}

export function fieldOffsetY(
  content: CreativeContent,
  key: keyof CreativeLayout,
  fallback: number,
): number {
  const value = getFieldTune(content, key).offsetY
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

export function scaledBasePx(basePx: string, token: SizeToken | string | undefined) {
  const px = Number.parseInt(basePx, 10)
  if (Number.isNaN(px)) return basePx
  return `${Math.round(px * SIZE_FACTORS[resolveSizeToken(token)])}px`
}
