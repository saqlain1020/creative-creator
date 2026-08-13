import { templates } from '../data/templates'
import type { TemplateId } from '../types'

export const TEMPLATE_QUERY_PARAM = 'template'

export function isTemplateId(value: string): value is TemplateId {
  return templates.some((t) => t.id === value)
}

export function readTemplateQuery(): TemplateId | null {
  const value = new URLSearchParams(window.location.search).get(TEMPLATE_QUERY_PARAM)
  if (!value || !isTemplateId(value)) return null
  return value
}

export function writeTemplateQuery(id: TemplateId) {
  const url = new URL(window.location.href)
  if (url.searchParams.get(TEMPLATE_QUERY_PARAM) === id) return
  url.searchParams.set(TEMPLATE_QUERY_PARAM, id)
  window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
}
