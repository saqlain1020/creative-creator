import { toPng } from 'html-to-image'
import { getExportFontEmbedCSS } from './embedFonts'

export async function artboardToPngDataUrl(
  node: HTMLElement,
  pixelRatio: number,
): Promise<string> {
  await document.fonts.ready
  let fontEmbedCSS = ''
  try {
    fontEmbedCSS = await getExportFontEmbedCSS(node)
  } catch {
    fontEmbedCSS = ''
  }

  return toPng(node, {
    cacheBust: true,
    pixelRatio,
    backgroundColor: undefined,
    includeQueryParams: true,
    skipFonts: false,
    ...(fontEmbedCSS ? { fontEmbedCSS } : {}),
  })
}

export async function exportCreativePng(
  node: HTMLElement,
  filename: string,
): Promise<void> {
  const dataUrl = await artboardToPngDataUrl(node, 2)

  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()
}
