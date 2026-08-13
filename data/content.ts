import media from '../media.json'
import dimsData from '../dims.json'

const dims = dimsData as unknown as Record<string, [number, number]>

export function imgDims(src: string): { width: number; height: number } {
  const d = dims[src]
  return d ? { width: d[0], height: d[1] } : { width: 1200, height: 900 }
}

export type Medium = 'oil' | 'acrylic' | 'mixed' | 'graphite' | 'digital'

export interface WorkItem {
  slug: string
  images: string[]
  medium: Medium
  size?: string
  featured?: boolean
}

const works = media.works as Record<string, string[]>
const academic = media.academic as Record<string, string[]>
const certs = media.certificates as Record<string, string[]>

/** Curated order — alternating strong pieces and orientations for gallery rhythm. */
export const WORKS: WorkItem[] = [
  { slug: 'florence', images: works.florence, medium: 'oil', size: '50 × 50 cm', featured: true },
  { slug: 'borgo', images: works.borgo, medium: 'acrylic', featured: true },
  { slug: 'moms-image', images: works['moms-image'], medium: 'mixed', featured: true },
  { slug: 'camogli', images: works.camogli, medium: 'oil' },
  { slug: 'cranes', images: works.cranes, medium: 'acrylic' },
  { slug: 'kobe-bryant', images: works['kobe-bryant'], medium: 'digital' },
  { slug: 'grenades', images: academic.grenades, medium: 'acrylic' },
  { slug: 'georgia', images: works.georgia, medium: 'oil' },
  { slug: 'alice', images: works.alice, medium: 'mixed' },
  { slug: 'golden-falls', images: works['golden-falls'], medium: 'acrylic' },
  { slug: 'caucasian-tapestry', images: works['caucasian-tapestry'], medium: 'mixed' },
  { slug: 'acrylic-composition', images: works['acrylic-composition'], medium: 'acrylic' },
  { slug: 'fast-furious', images: works['fast-furious'], medium: 'acrylic', size: '80 × 60 cm' },
  { slug: 'model-head', images: academic['model-head'], medium: 'graphite' },
  { slug: 'academic-works', images: academic['academic-works'], medium: 'graphite' },
  { slug: 'model-hands', images: academic['model-hands'], medium: 'graphite' },
]

export const MEDIA_FILTERS: (Medium | 'all')[] = ['all', 'oil', 'acrylic', 'mixed', 'graphite', 'digital']

export interface CertItem {
  slug: string
  images: string[]
  pdfs: string[]
}

export const CERT_ITEMS: CertItem[] = [
  {
    slug: 'ba-diploma',
    images: [certs['ba-diploma'][0]],
    pdfs: [certs['ba-diploma'][1]],
  },
  { slug: 'feradiz', images: certs.feradiz, pdfs: [] },
  { slug: 'professional-orientation', images: certs['professional-orientation'], pdfs: [] },
  { slug: 'italian', images: certs.italian, pdfs: [] },
  { slug: 'employment-record', images: certs['employment-record'], pdfs: [] },
  { slug: 'safeguarding', images: [], pdfs: certs.safeguarding },
]

export const STUDENTS: string[] = media.students
export const PORTRAIT: string = media.portrait
export const ETA_DESKTOP: string[] = media.projects['english-through-art']
export const ETA_MOBILE: string[] = media.projects['english-through-art-mobile']

export const CONTACT = {
  email: 'anyarichie@gmail.com',
  instagram: 'https://instagram.com/',
}
