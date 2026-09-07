export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }
  // Sections live on the homepage; from a case page there is nothing to scroll
  // to, so hand the anchor off rather than silently doing nothing.
  window.location.href = id === 'top' ? '/' : `/#${id}`
}
