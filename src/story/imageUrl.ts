/** Resolve an uploaded image in public/ under the Vite/GitHub Pages base path. */
export function imageUrl(path: string) {
  if (/^(?:https?:|data:|blob:)/.test(path)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
