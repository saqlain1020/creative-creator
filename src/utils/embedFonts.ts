const FONT_FACE_RE = /@font-face\s*\{[\s\S]*?\}/gi

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })
}

function normalizeFamily(family: string) {
  return family.trim().replace(/^['"]|['"]$/g, '').toLowerCase()
}

export function fontsUsedIn(node: HTMLElement): Set<string> {
  const used = new Set<string>()
  const visit = (el: Element) => {
    const family = getComputedStyle(el).fontFamily
    for (const part of family.split(',')) {
      const name = normalizeFamily(part)
      if (name && name !== 'serif' && name !== 'sans-serif' && name !== 'cursive' && name !== 'monospace') {
        used.add(name)
      }
    }
    for (const child of el.children) visit(child)
  }
  visit(node)
  return used
}

function fontFamilyFromRule(rule: string) {
  const match = /font-family\s*:\s*([^;]+)/i.exec(rule)
  return match ? normalizeFamily(match[1]) : ''
}

async function inlineCssFontUrls(cssText: string, baseHref: string): Promise<string> {
  const matches = [...cssText.matchAll(/url\((['"]?)([^'")]+)\1\)/g)]
  const dataUrls = new Map<string, string>()

  for (const match of matches) {
    const spec = match[2].trim()
    if (spec.startsWith('data:')) continue
    const abs = new URL(spec, baseHref).href
    if (dataUrls.has(abs)) continue
    const res = await fetch(abs)
    if (!res.ok) continue
    dataUrls.set(abs, await blobToDataUrl(await res.blob()))
  }

  return cssText.replace(/url\((['"]?)([^'")]+)\1\)/g, (full, _quote, spec: string) => {
    const trimmed = spec.trim()
    if (trimmed.startsWith('data:')) return full
    const data = dataUrls.get(new URL(trimmed, baseHref).href)
    return data ? `url(${data})` : full
  })
}

async function stylesheetFontFaces(href: string): Promise<string[]> {
  const res = await fetch(href)
  if (!res.ok) return []
  const cssText = await inlineCssFontUrls(await res.text(), href)
  return cssText.match(FONT_FACE_RE) ?? []
}

let cachedRules: Promise<string[]> | null = null

function loadAllFontFaceRules(): Promise<string[]> {
  if (!cachedRules) {
    cachedRules = (async () => {
      const hrefs = [...document.querySelectorAll('link[rel="stylesheet"]')]
        .map((link) => (link as HTMLLinkElement).href)
        .filter((href) => href.includes('fonts.googleapis.com'))
      const nested = await Promise.all(hrefs.map((href) => stylesheetFontFaces(href)))
      return nested.flat()
    })().catch((error) => {
      cachedRules = null
      throw error
    })
  }
  return cachedRules
}

export async function getExportFontEmbedCSS(node: HTMLElement): Promise<string> {
  const used = fontsUsedIn(node)
  const rules = await loadAllFontFaceRules()
  return rules
    .filter((rule) => used.has(fontFamilyFromRule(rule)))
    .join('\n')
}
