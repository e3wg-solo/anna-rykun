'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import { useState } from 'react'
import { useI18n } from '../i18n'
import { STUDENTS, imgDims } from '../data/content'
import { EASE, viewportOnce } from '../lib/motion'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { Lightbox } from './Lightbox'
import type { LightboxItem } from './Lightbox'

export function Teaching() {
  const { t } = useI18n()
  const [active, setActive] = useState<LightboxItem | null>(null)

  function openAt(i: number) {
    setActive({ images: STUDENTS, startIndex: i, title: t.teaching.title, subtitle: t.teaching.galleryNote })
  }

  return (
    <section id="teaching" className="border-t border-line bg-paper-2/40">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28 md:py-36">
        <SectionHeading
          index="07"
          eyebrow={t.teaching.eyebrow}
          title={t.teaching.title}
          lead={t.teaching.lead}
          className="max-w-3xl"
        />

        {/* Stats */}
        <Reveal className="mt-12">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-4">
            {t.teaching.stats.map((s) => (
              <div key={s.label} className="bg-paper p-6 sm:p-7">
                <div className="font-display text-4xl tracking-tight text-ink sm:text-5xl">{s.value}</div>
                <div className="mt-2 text-pretty text-sm text-ink-soft">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Student filmstrip */}
        <div className="mt-14">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="eyebrow text-ink-faint">{t.teaching.galleryNote}</p>
            <span className="hidden items-center gap-2 text-sm text-ink-faint sm:flex">
              <span className="h-px w-8 bg-line-strong" />
              <ArrowRight size={15} weight="bold" className="rtl:rotate-180" />
            </span>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {STUDENTS.map((src, i) => (
              <motion.button
                key={src}
                type="button"
                onClick={() => openAt(i)}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                }}
                className="group relative shrink-0 snap-start overflow-hidden rounded-sm border border-line bg-paper"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  {...imgDims(src)}
                  className="h-60 w-auto align-bottom transition-transform duration-[900ms] ease-out group-hover:scale-[1.05] sm:h-72"
                />
                <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>{active && <Lightbox item={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </section>
  )
}
