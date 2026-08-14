'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Stack } from '@phosphor-icons/react'
import { useMemo, useState } from 'react'
import { useI18n } from '../i18n'
import { MEDIA_FILTERS, WORK_GROUPS, WORKS, imgDims } from '../data/content'
import type { Medium, WorkItem } from '../data/content'
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
    for (const work of WORKS) c[work.medium] = (c[work.medium] ?? 0) + 1
    return c
  }, [])

  const visibleGroups = WORK_GROUPS.map((group) => ({
    ...group,
    items: filter === 'all' ? group.items : group.items.filter((work) => work.medium === filter),
  })).filter((group) => group.items.length > 0)

  function openWork(work: WorkItem) {
    const meta = t.work.items[work.slug]
    const label = t.work.mediumLabels[work.medium]
    setActive({
      images: work.images,
      title: meta?.title,
      subtitle: work.size ? `${label} · ${work.size}` : label,
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

        <div className="mt-10 flex flex-wrap gap-2 lg:mt-12">
          {MEDIA_FILTERS.map((medium) => {
            if (!counts[medium]) return null
            const isActive = filter === medium
            return (
              <button
                key={medium}
                type="button"
                onClick={() => setFilter(medium)}
                className="relative rounded-full px-4 py-2 text-sm transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {isActive && (
                  <motion.span
                    layoutId="work-filter"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={SPRING}
                  />
                )}
                <span className={cn('relative z-10 flex items-center gap-1.5', isActive ? 'text-cream' : 'text-ink-soft hover:text-ink')}>
                  {t.work.filters[medium]}
                  <span className={cn('font-mono-ui text-xs', isActive ? 'text-cream/60' : 'text-ink-faint')}>
                    {counts[medium]}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        <motion.div
          key={filter}
          className="mt-14 space-y-20 sm:mt-20 sm:space-y-28"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {visibleGroups.map((group) => {
            const groupMeta = t.work.groups[group.key]
            return (
              <motion.section
                key={group.key}
                aria-labelledby={`work-group-${group.key}`}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
                }}
              >
                <div className="grid gap-4 border-t border-line-strong pt-5 sm:grid-cols-12 sm:items-start">
                  <div className="sm:col-span-5">
                    <p className="font-mono-ui text-xs text-accent">{String(WORK_GROUPS.findIndex((item) => item.key === group.key) + 1).padStart(2, '0')}</p>
                    <h3 id={`work-group-${group.key}`} className="mt-2 font-display text-3xl leading-none text-ink sm:text-4xl">
                      {groupMeta.title}
                    </h3>
                  </div>
                  <p className="max-w-[52ch] text-pretty text-sm leading-relaxed text-ink-soft sm:col-span-7 sm:justify-self-end sm:text-base">
                    {groupMeta.lead}
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 md:gap-y-16">
                  {group.items.map((work, index) => (
                    <WorkCard
                      key={work.slug}
                      work={work}
                      index={index}
                      isLastOdd={group.items.length % 2 === 1 && index === group.items.length - 1}
                      onOpen={() => openWork(work)}
                    />
                  ))}
                </div>
              </motion.section>
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

function WorkCard({
  work,
  index,
  isLastOdd,
  onOpen,
}: {
  work: WorkItem
  index: number
  isLastOdd: boolean
  onOpen: () => void
}) {
  const { t } = useI18n()
  const meta = t.work.items[work.slug]
  const label = t.work.mediumLabels[work.medium]
  const dimensions = imgDims(work.images[0])

  return (
    <article className={cn(isLastOdd && 'md:col-span-2 md:max-w-[68%] md:justify-self-center')}>
      <button
        type="button"
        onClick={onOpen}
        className="group block w-full text-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <span className="relative flex min-h-64 w-full items-center justify-center overflow-hidden bg-paper-3 p-3 sm:p-5">
          <Image
            src={work.images[0]}
            alt={meta?.title ?? work.slug}
            width={dimensions.width}
            height={dimensions.height}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="img-outline max-h-[72dvh] h-auto w-full object-contain transition-transform duration-[900ms] ease-out group-hover:scale-[1.015]"
          />

          {work.images.length > 1 && (
            <span className="absolute end-3 top-3 flex items-center gap-1 bg-ink/75 px-2.5 py-1 font-mono-ui text-xs text-cream backdrop-blur-sm">
              <Stack size={13} weight="bold" />
              {work.images.length}
            </span>
          )}

          <span className="absolute end-3 bottom-3 grid h-10 w-10 place-items-center rounded-full bg-cream text-ink opacity-0 shadow-diffuse transition-[opacity,transform] duration-300 group-hover:-translate-y-1 group-hover:opacity-100 max-lg:opacity-100">
            <ArrowUpRight size={16} weight="bold" className="rtl:-scale-x-100" />
          </span>
        </span>

        <span className="mt-4 flex items-start justify-between gap-4 border-t border-line pt-3">
          <span>
            <span className="block font-display text-xl leading-tight text-ink sm:text-2xl">{meta?.title}</span>
            <span className="mt-1 block text-sm text-ink-soft">
              {label}
              {work.size ? ` · ${work.size}` : ''}
            </span>
          </span>
          <span className="font-mono-ui text-[0.65rem] text-ink-faint">{String(index + 1).padStart(2, '0')}</span>
        </span>
      </button>
    </article>
  )
}
