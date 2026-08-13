export type ScriptFontOption = {
  label: string
  family: string
  size: string
  opsz?: number
  fallback?: string
}

export const SCRIPT_FONTS: ScriptFontOption[] = [
  { label: 'Ballet', family: 'Ballet', size: '188px', opsz: 72 },
  { label: 'Bodoni Moda', family: 'Bodoni Moda', size: '152px', opsz: 96, fallback: 'serif' },
  { label: 'Fleur De Leah', family: 'Fleur De Leah', size: '168px' },
  { label: 'Lavishly Yours', family: 'Lavishly Yours', size: '176px' },
  { label: 'Miss Fajardose', family: 'Miss Fajardose', size: '204px' },
  { label: 'Rouge Script', family: 'Rouge Script', size: '164px' },
  { label: 'The Nautigal', family: 'The Nautigal', size: '220px' },
]

export function scriptFontStack(font: Pick<ScriptFontOption, 'family' | 'fallback'>) {
  return `'${font.family}', ${font.fallback ?? 'cursive'}`
}

export const DEFAULT_SCRIPT_FONT = SCRIPT_FONTS[0].family

export function resolveScriptFont(value: string): ScriptFontOption {
  return SCRIPT_FONTS.find((font) => font.family === value) ?? SCRIPT_FONTS[0]
}

export type ScriptAlign = 'left' | 'center' | 'right'

export function resolveScriptAlign(value: string): ScriptAlign {
  return value === 'left' || value === 'right' ? value : 'center'
}
