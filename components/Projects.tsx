'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from '@phosphor-icons/react'
import { useState } from 'react'
import { useI18n } from '../i18n'
import { ETA_DESKTOP, ETA_MOBILE, imgDims } from '../data/content'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { Lightbox } from './Lightbox'
import type { LightboxItem } from './Lightbox'

export function Projects() {
  const { t } = useI18n()
  const p = t.projects
  const [active, setActive] = useState<LightboxItem | null>(null)

  return (
    <section id="projects" className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28 md:py-36">
      <SectionHeading index="05" eyebrow={p.eyebrow} title={p.title} lead={p.lead} className="max-w-3xl" />

      {/* English Through Art — feature */}
      <div className="mt-16 grid items-center gap-10 lg:mt-24 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <p className="eyebrow text-accent">{p.eta.tagline}</p>
          <h3 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl md:text-5xl">
            {p.eta.name}
          </h3>
          <p className="mt-5 max-w-[52ch] text-pretty leading-relaxed text-ink-soft">{p.eta.body}</p>

          <ul className="mt-8 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
            {p.eta.bullets.map((b, i) => (
              <li key={b} className="flex flex-col gap-2 bg-paper-2 p-4">
                <span className="font-mono-ui text-xs text-accent">{`0${i + 1}`}</span>
                <span className="text-sm text-ink">{b}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-[52ch] border-s-2 border-accent/40 ps-4 text-pretty text-sm leading-relaxed text-ink-soft">
            {p.eta.note}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <button
              type="button"
              onClick={() =>
                setActive({ images: [...ETA_DESKTOP, ...ETA_MOBILE], title: p.eta.name, subtitle: p.eta.tagline })
              }
              className="group block w-full overflow-hidden rounded-xl border border-line bg-paper-2 text-start shadow-frame"
            >
              <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                <span className="ms-3 rounded-full bg-paper px-3 py-1 font-mono-ui text-[0.65rem] text-ink-faint">
                  english-through-art
                </span>
              </div>
              <div className="overflow-hidden">
                <img
                  src={ETA_DESKTOP[0]}
                  alt={p.eta.name}
                  loading="lazy"
                  {...imgDims(ETA_DESKTOP[0])}
                  className="w-full align-bottom transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
            </button>

            {ETA_MOBILE[0] && (
              <div className="absolute -bottom-5 end-2 w-24 overflow-hidden rounded-[1.4rem] border-[5px] border-ink bg-ink shadow-frame sm:w-32">
                <img
                  src={ETA_MOBILE[0]}
                  alt={`${p.eta.name} — ${p.eta.mobileLabel}`}
                  loading="lazy"
                  {...imgDims(ETA_MOBILE[0])}
                  className="w-full align-bottom"
                />
              </div>
            )}
          </div>
        </Reveal>
      </div>

      {/* FocusArt AI — highlight panel */}
      <Reveal className="mt-20 lg:mt-28">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-espresso px-6 py-10 sm:px-10 sm:py-14 md:px-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="eyebrow text-accent-soft">{p.role} · {p.focus.role}</p>
              <h3 className="mt-3 font-display text-3xl tracking-tight text-cream sm:text-4xl md:text-5xl">
                {p.focus.name}
              </h3>
              <p className="mt-5 max-w-[54ch] text-pretty leading-relaxed text-cream/70">{p.focus.body}</p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <FocusMotif />
            </div>
          </div>
        </div>
      </Reveal>

      {/* Tour + Exhibitions */}
      <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-2">
        <Reveal className="bg-paper p-8 sm:p-10">
          <p className="eyebrow text-ink-faint">{p.tour.year}</p>
          <h3 className="mt-3 font-display text-2xl tracking-tight text-ink sm:text-3xl">{p.tour.name}</h3>
          <p className="mt-4 max-w-[48ch] text-pretty leading-relaxed text-ink-soft">{p.tour.body}</p>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col justify-between gap-8 bg-paper p-8 sm:p-10">
          <div>
            <p className="eyebrow text-ink-faint">{p.exhibitions.year}</p>
            <h3 className="mt-3 font-display text-2xl tracking-tight text-ink sm:text-3xl">
              {p.exhibitions.name}
            </h3>
            <p className="mt-4 max-w-[48ch] text-pretty leading-relaxed text-ink-soft">{p.exhibitions.body}</p>
          </div>
          <div className="flex items-baseline gap-4 border-t border-line pt-6">
            <span className="font-display text-5xl text-accent sm:text-6xl">{p.exhibitions.stat}</span>
            <span className="max-w-[24ch] text-sm text-ink-soft">{p.exhibitions.statLabel}</span>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>{active && <Lightbox item={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </section>
  )
}

function FocusMotif() {
  const reduce = useReducedMotion()
  const rings = [0, 1, 2]
  return (
    <div className="relative grid h-44 w-44 place-items-center sm:h-52 sm:w-52">
      {rings.map((r) => (
        <motion.span
          key={r}
          className="absolute rounded-full border border-accent-soft/40"
          style={{ width: `${100 - r * 26}%`, height: `${100 - r * 26}%` }}
          animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: r * 0.5 }}
        />
      ))}
      <motion.span
        className="h-10 w-10 rounded-full bg-accent"
        animate={reduce ? undefined : { scale: [1, 0.86, 1] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <ArrowUpRight size={18} weight="bold" className="absolute text-cream rtl:-scale-x-100" />
    </div>
  )
}
