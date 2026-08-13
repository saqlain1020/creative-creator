export function isLightColor(hex: string) {
  const raw = hex.replace('#', '').trim()
  const n =
    raw.length === 3
      ? raw
          .split('')
          .map((ch) => ch + ch)
          .join('')
      : raw
  const r = Number.parseInt(n.slice(0, 2), 16)
  const g = Number.parseInt(n.slice(2, 4), 16)
  const b = Number.parseInt(n.slice(4, 6), 16)
  if ([r, g, b].some((channel) => Number.isNaN(channel))) return true
  return (r * 299 + g * 587 + b * 114) / 1000 >= 140
}
