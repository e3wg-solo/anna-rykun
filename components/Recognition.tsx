'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, DownloadSimple, FilePdf, Trophy } from '@phosphor-icons/react'
import { useState } from 'react'
import { useI18n } from '../i18n'
import { CERT_ITEMS } from '../data/content'
import { EASE, viewportOnce } from '../lib/motion'
import { cn } from '../lib/utils'
import { SectionHeading } from './ui/SectionHeading'
import { Lightbox } from './Lightbox'
import type { LightboxItem } from './Lightbox'

const SPANS: Record<string, string> = {
  feradiz: 'lg:col-span-7',
  'professional-orientation': 'lg:col-span-5',
  italian: 'lg:col-span-4',
  'employment-record': 'lg:col-span-4',
  safeguarding: 'lg:col-span-4',
}

export function Recognition() {
  const { t } = useI18n()
  const [active, setActive] = useState<LightboxItem | null>(null)

  return (
    <section id="recognition" className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28 md:py-36">
      <SectionHeading
        index="07"
        eyebrow={t.recognition.eyebrow}
        title={t.recognition.title}
        lead={t.recognition.lead}
        className="max-w-3xl"
      />

      <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-12">
        {CERT_ITEMS.map((c, i) => {
          const meta = t.recognition.items[c.slug]
          const isAward = c.slug === 'feradiz'
          const hasImage = c.images.length > 0
          return (
            <motion.article
              key={c.slug}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: EASE, delay: (i % 3) * 0.06 }}
              className={cn(
                'group flex flex-col overflow-hidden rounded-lg border border-line bg-paper-2 shadow-diffuse transition-transform duration-500 hover:-translate-y-1',
                SPANS[c.slug],
              )}
            >
              {hasImage ? (
                <button
                  type="button"
                  onClick={() =>
                    setActive({ images: c.images, title: meta?.title, subtitle: meta?.year, desc: meta?.body })
                  }
                  className={cn(
                    'relative flex items-center justify-center overflow-hidden border-b border-line bg-paper p-4',
                    isAward ? 'h-72 sm:h-80' : 'h-56',
                  )}
                >
                  <img
                    src={c.images[0]}
                    alt={meta?.title ?? c.slug}
                    loading="lazy"
                    className="max-h-full w-auto object-contain shadow-sm transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  {isAward && (
                    <span className="absolute start-4 top-4 flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-cream shadow-diffuse">
                      <Trophy size={13} weight="fill" />
                      1<sup>st</sup>
                    </span>
                  )}
                  <span className="absolute end-3 bottom-3 grid h-9 w-9 place-items-center rounded-full bg-ink/70 text-cream opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRight size={16} weight="bold" className="rtl:-scale-x-100" />
                  </span>
                </button>
              ) : (
                <div className="relative flex h-56 items-center justify-center overflow-hidden border-b border-line bg-espresso">
                  <FilePdf size={54} weight="thin" className="text-cream/50" />
                  <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-accent)/0.18,transparent_65%)]" />
                </div>
              )}

              <div className="flex flex-1 flex-col gap-2 p-6">
                {meta?.year && <span className="eyebrow text-accent">{meta.year}</span>}
                <h3 className="font-display text-xl leading-tight text-ink sm:text-2xl">{meta?.title}</h3>
                <p className="text-pretty text-sm leading-relaxed text-ink-soft">{meta?.body}</p>

                {c.pdfs.length > 0 && (
                  <div className="mt-auto flex flex-col gap-2 pt-4">
                    {c.pdfs.map((pdf, idx) => (
                      <a
                        key={pdf}
                        href={pdf}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between gap-2 rounded-full border border-line px-4 py-2.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
                      >
                        <span>{t.recognition.download}{c.pdfs.length > 1 ? ` · ${idx + 1}` : ''}</span>
                        <DownloadSimple size={16} weight="bold" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          )
        })}
      </div>

      <AnimatePresence>{active && <Lightbox item={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </section>
  )
}
