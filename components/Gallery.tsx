'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Stack } from '@phosphor-icons/react'
import { useMemo, useState } from 'react'
import { useI18n } from '../i18n'
import { MEDIA_FILTERS, WORKS, imgDims } from '../data/content'
import type { Medium } from '../data/content'
import { EASE, SPRING } from '../lib/motion'
import { cn } from '../lib/utils'
import { SectionHeading } from './ui/SectionHeading'
import { Lightbox } from './Lightbox'
import type { LightboxItem } from './Lightbox'

type Filter = Medium | 'all'

export function Gallery() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<Filter>('all')
  const [active, setActive] = useState<LightboxItem | null>(null)

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: WORKS.length }
    for (const w of WORKS) c[w.medium] = (c[w.medium] ?? 0) + 1
    return c
  }, [])

  const filtered = filter === 'all' ? WORKS : WORKS.filter((w) => w.medium === filter)

  function openWork(slug: string, images: string[], medium: Medium, size?: string) {
    const meta = t.work.items[slug]
    const label = t.work.mediumLabels[medium]
    setActive({
      images,
      title: meta?.title,
      subtitle: size ? `${label} · ${size}` : label,
      desc: meta?.desc,
    })
  }

  return (
    <section id="work" className="border-t border-line bg-paper-2/40">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28 md:py-36">
        <SectionHeading
          index="04"
          eyebrow={t.work.eyebrow}
          title={t.work.title}
          lead={t.work.lead}
          className="max-w-3xl"
        />

        {/* Filters */}
        <div className="mt-10 flex flex-wrap gap-2 lg:mt-12">
          {MEDIA_FILTERS.map((f) => {
            if (!counts[f]) return null
            const activeF = filter === f
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className="relative rounded-full px-4 py-2 text-sm transition-colors duration-300"
              >
                {activeF && (
                  <motion.span
                    layoutId="work-filter"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={SPRING}
                  />
                )}
                <span className={cn('relative z-10 flex items-center gap-1.5', activeF ? 'text-cream' : 'text-ink-soft hover:text-ink')}>
                  {t.work.filters[f]}
                  <span className={cn('font-mono-ui text-xs', activeF ? 'text-cream/60' : 'text-ink-faint')}>
                    {counts[f]}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {/* Masonry */}
        <motion.div
          key={filter}
          className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-5"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        >
          {filtered.map((w) => {
            const meta = t.work.items[w.slug]
            const label = t.work.mediumLabels[w.medium]
            return (
              <motion.div
                key={w.slug}
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                }}
                className="mb-6 break-inside-avoid lg:mb-7"
              >
                <button
                  type="button"
                  onClick={() => openWork(w.slug, w.images, w.medium, w.size)}
                  className="group block w-full text-start"
                >
                  <span className="relative block overflow-hidden rounded-2xl bg-paper shadow-frame sm:rounded-[1.75rem]">
                    <img
                      src={w.images[0]}
                      alt={meta?.title ?? w.slug}
                      loading="lazy"
                      {...imgDims(w.images[0])}
                      className="img-outline w-full align-bottom transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />

                    {w.images.length > 1 && (
                      <span className="absolute end-3 top-3 flex items-center gap-1 rounded-full bg-ink/70 px-2.5 py-1 text-xs text-cream backdrop-blur-sm">
                        <Stack size={13} weight="bold" />
                        {w.images.length}
                      </span>
                    )}

                    <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" />
                    <span className="absolute end-3 bottom-3 grid h-10 w-10 place-items-center rounded-full bg-cream text-ink opacity-0 shadow-diffuse transition-opacity duration-300 group-hover:opacity-100 max-lg:opacity-100">
                      <ArrowUpRight size={16} weight="bold" className="rtl:-scale-x-100" />
                    </span>
                  </span>

                  {/* Labels outside card — reference / taste-skill gallery style */}
                  <span className="mt-3 flex items-start justify-between gap-3 px-0.5">
                    <span>
                      <span className="block font-display text-lg leading-tight text-ink sm:text-xl">
                        {meta?.title}
                      </span>
                      <span className="mt-1 block text-sm text-ink-soft">
                        {label}
                        {w.size ? ` · ${w.size}` : ''}
                      </span>
                    </span>
                  </span>
                </button>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {active && <Lightbox item={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}
