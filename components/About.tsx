'use client'

import { motion } from 'framer-motion'
import { useI18n } from '../i18n'
import { PORTRAIT } from '../data/content'
import { EASE, viewportOnce } from '../lib/motion'
import { Reveal } from './ui/Reveal'

export function About() {
  const { t } = useI18n()

  return (
    <section id="about" className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28 md:py-32">
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Left copy */}
        <div className="min-w-0 lg:col-span-5">
          <Reveal>
            <span className="inline-flex rounded-full border border-line bg-paper-2 px-3.5 py-1.5 text-xs font-medium text-ink-soft">
              {t.about.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4.2vw,3.25rem)] leading-[1.05] tracking-tight text-ink">
              {t.about.passion}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[48ch] text-pretty leading-relaxed text-ink-soft">{t.about.p1}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-[48ch] text-pretty leading-relaxed text-ink-soft">{t.about.p2}</p>
          </Reveal>
        </div>

        {/* Modular stack — reference asymmetry */}
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-12 lg:gap-5">
          <Reveal className="sm:col-span-1 lg:col-span-5">
            <div className="flex h-full flex-col justify-between rounded-[1.75rem] bg-ink p-7 text-cream sm:min-h-[240px]">
              <span className="eyebrow text-cream/45">Impact</span>
              <div>
                <p className="font-mono-ui text-6xl tracking-tight sm:text-7xl">{t.about.highlightStat}</p>
                <p className="mt-3 max-w-[22ch] text-sm text-cream/65">{t.about.highlightLabel}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="sm:col-span-1 lg:col-span-7">
            <div className="overflow-hidden rounded-[1.75rem] bg-paper-3">
              <img
                src={PORTRAIT}
                alt=""
                width={903}
                height={1024}
                className="img-outline aspect-[5/4] w-full object-cover object-[center_20%] grayscale"
              />
            </div>
          </Reveal>

          <Reveal delay={0.12} className="sm:col-span-2 lg:col-span-12">
            <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-2">
              {t.about.facts.slice(0, 4).map((f, i) => (
                <motion.div
                  key={f.k}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.55, ease: EASE, delay: i * 0.05 }}
                  className="bg-paper-2 p-5 sm:p-6"
                >
                  <p className="eyebrow text-ink-faint">{f.k}</p>
                  <p className="mt-2 text-pretty text-ink">{f.v}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
