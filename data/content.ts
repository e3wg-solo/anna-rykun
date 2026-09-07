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
const fashion = media.fashion as Record<string, string[]>

export type WorkGroupKey = 'landscapes' | 'figurative' | 'graphic'

export interface WorkGroup {
  key: WorkGroupKey
  items: WorkItem[]
}

/**
 * Exhibition order requested by the artist. Context shots with walls, mirrors,
 * easels or interiors are intentionally excluded when a clean artwork image exists.
 */
export const WORK_GROUPS: WorkGroup[] = [
  {
    key: 'landscapes',
    items: [
      { slug: 'borgo', images: [works.borgo[0], works.borgo[2]], medium: 'acrylic', featured: true },
      { slug: 'georgia', images: [works.georgia[1], works.georgia[2]], medium: 'oil', featured: true },
      { slug: 'camogli', images: [works.camogli[1]], medium: 'oil' },
      { slug: 'florence', images: works.florence.slice(0, 3), medium: 'oil', size: '50 × 50 cm' },
      { slug: 'cranes', images: works.cranes.slice(0, 2), medium: 'acrylic' },
    ],
  },
  {
    key: 'figurative',
    items: [
      { slug: 'fast-furious', images: [works['fast-furious'][1]], medium: 'acrylic', size: '80 × 60 cm' },
      { slug: 'kobe-bryant', images: works['kobe-bryant'], medium: 'digital' },
      { slug: 'moms-image', images: works['moms-image'], medium: 'mixed' },
    ],
  },
  {
    key: 'graphic',
    items: [
      { slug: 'alice', images: works.alice, medium: 'mixed' },
      { slug: 'caucasian-tapestry', images: works['caucasian-tapestry'], medium: 'mixed' },
      { slug: 'model-head', images: academic['model-head'], medium: 'graphite' },
      { slug: 'academic-works', images: academic['academic-works'], medium: 'graphite' },
      { slug: 'model-hands', images: academic['model-hands'], medium: 'graphite' },
    ],
  },
]

export const WORKS: WorkItem[] = WORK_GROUPS.flatMap((group) => group.items)

export const MEDIA_FILTERS: (Medium | 'all')[] = ['all', 'oil', 'acrylic', 'mixed', 'graphite', 'digital']

export interface FashionItem {
  slug: string
  images: string[]
}

export const FASHION_ITEMS: FashionItem[] = [
  {
    slug: 'grey-botanical-cloak',
    images: [
      fashion['grey-botanical-cloak'][8],
      fashion['grey-botanical-cloak'][0],
      fashion['grey-botanical-cloak'][5],
      fashion['grey-botanical-cloak'][1],
      fashion['grey-botanical-cloak'][2],
      fashion['grey-botanical-cloak'][6],
      fashion['grey-botanical-cloak'][7],
      fashion['grey-botanical-cloak'][9],
      fashion['grey-botanical-cloak'][10],
      fashion['grey-botanical-cloak'][11],
    ],
  },
  {
    slug: 'ikat-harmony',
    images: [
      fashion['ikat-harmony'][4],
      fashion['ikat-harmony'][0],
      fashion['ikat-harmony'][2],
      fashion['ikat-harmony'][3],
      fashion['ikat-harmony'][1],
    ],
  },
  {
    slug: 'floral-heritage-vest',
    images: [
      fashion['floral-heritage-vest'][3],
      fashion['floral-heritage-vest'][0],
      fashion['floral-heritage-vest'][4],
      fashion['floral-heritage-vest'][1],
      fashion['floral-heritage-vest'][2],
    ],
  },
  {
    slug: 'modern-heritage-tweed-vest',
    images: [
      fashion['modern-heritage-tweed-vest'][6],
      fashion['modern-heritage-tweed-vest'][0],
      fashion['modern-heritage-tweed-vest'][3],
      fashion['modern-heritage-tweed-vest'][5],
      fashion['modern-heritage-tweed-vest'][1],
      fashion['modern-heritage-tweed-vest'][4],
      fashion['modern-heritage-tweed-vest'][2],
    ],
  },
]

export interface CertItem {
  slug: string
  images: string[]
  pdfs: string[]
}

export const CERT_ITEMS: CertItem[] = [
  {
    slug: 'ba-diploma',
    images: certs['ba-diploma'].filter((f) => !f.endsWith('.pdf')),
    pdfs: certs['ba-diploma'].filter((f) => f.endsWith('.pdf')),
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
