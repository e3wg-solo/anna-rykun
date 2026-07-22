'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Plus } from '@phosphor-icons/react'
import { useState } from 'react'
import { useI18n } from '../i18n'
import { EASE, SPRING } from '../lib/motion'
import { cn } from '../lib/utils'
import { Reveal } from './ui/Reveal'

export function Philosophy() {
  const { t } = useI18n()
  const [open, setOpen] = useState(0)

  return (
    <section className="border-t border-line bg-paper-2/40">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28 md:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="inline-flex rounded-full border border-line bg-paper px-3.5 py-1.5 text-xs font-medium text-ink-soft">
                {t.philosophy.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-[clamp(1.85rem,3.8vw,3rem)] leading-[1.05] tracking-tight text-ink">
                {t.philosophy.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-[36ch] text-pretty text-ink-soft">{t.philosophy.lead}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <ul className="divide-y divide-line border-y border-line">
              {t.philosophy.pillars.map((p, i) => {
                const isOpen = open === i
                return (
                  <li key={p.title}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className={cn(
                        'group flex w-full items-center gap-4 py-5 text-start transition-colors duration-300 sm:gap-6 sm:py-6',
                        isOpen && 'bg-paper/70',
                      )}
                    >
                      <span className="font-mono-ui w-10 shrink-0 text-sm text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h3 className="font-display text-xl tracking-tight text-ink sm:text-2xl">
                            {p.title}
                          </h3>
                          <span className="rounded-full bg-paper-3 px-2.5 py-0.5 text-xs text-ink-soft">
                            {p.meta}
                          </span>
                        </div>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.p
                              key="body"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.4, ease: EASE }}
                              className="mt-3 max-w-[54ch] overflow-hidden text-pretty text-sm leading-relaxed text-ink-soft sm:text-base"
                            >
                              {p.body}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={SPRING}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-strong text-ink"
                      >
                        <Plus size={16} weight="bold" />
                      </motion.span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <Reveal className="mt-10">
              <p className="eyebrow mb-4 text-ink-faint">{t.philosophy.approachTitle}</p>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {t.philosophy.approach.map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2.5 text-sm text-ink"
                  >
                    <ArrowUpRight size={14} weight="bold" className="text-accent rtl:-scale-x-100" />
                    {a}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
