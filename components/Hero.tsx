'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowDown } from '@phosphor-icons/react'
import { useI18n } from '../i18n'
import { PORTRAIT } from '../data/content'
import { EASE } from '../lib/motion'
import { scrollToId } from '../lib/utils'

export function Hero() {
  const { t } = useI18n()
  const reduce = useReducedMotion()

  const parent = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
  }
  const child = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  }

  return (
    <section id="top" className="relative min-h-[100dvh]">
      <div className="mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-start px-5 pt-24 pb-14 sm:px-8 lg:pt-28 lg:pb-16">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Copy */}
          <motion.div
            variants={parent}
            initial="hidden"
            animate="show"
            className="min-w-0"
          >
            <motion.p variants={child} className="eyebrow text-ink-soft">
              {t.hero.eyebrow}
            </motion.p>

            <motion.h1
              variants={child}
              className="mt-4 text-balance font-display tracking-tighter text-ink"
              style={{ fontSize: 'clamp(3rem, 11vw, 6.5rem)', lineHeight: 0.95 }}
            >
              {t.hero.greeting}
            </motion.h1>

            <motion.p
              variants={child}
              className="mt-2 text-balance font-display text-[clamp(1.5rem,3.8vw,2.5rem)] leading-[1.1] tracking-tight text-ink"
            >
              {t.hero.role}
              <span className="text-accent">.</span>
            </motion.p>

            <motion.p
              variants={child}
              className="mt-5 max-w-[42ch] text-pretty text-base leading-relaxed text-ink-soft sm:text-lg"
            >
              <span className="font-medium text-ink">{t.hero.name}.</span> {t.hero.intro}
            </motion.p>

            <motion.div variants={child} className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToId('work')}
                className="pressable group inline-flex min-h-11 items-center gap-2 rounded-full bg-ink py-3 ps-6 pe-3.5 text-sm font-medium text-cream hover:bg-accent"
              >
                {t.hero.ctaWork}
                <span className="grid h-8 w-8 place-items-center rounded-full bg-cream/10">
                  <ArrowRight
                    size={16}
                    weight="bold"
                    className="transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                  />
                </span>
              </button>

              <button
                type="button"
                onClick={() => scrollToId('contact')}
                className="pressable inline-flex min-h-11 items-center rounded-full border border-line-strong px-5 py-3 text-sm font-medium text-ink hover:border-ink"
              >
                {t.hero.ctaContact}
              </button>
            </motion.div>

            {/* Stats — clean row, tabular nums */}
            <motion.ul
              variants={child}
              className="mt-10 grid grid-cols-3 gap-3 border-t border-line pt-6 sm:max-w-md"
            >
              {t.hero.stats.map((s) => (
                <li key={s.label} className="min-w-0">
                  <p className="font-mono-ui text-xl tracking-tight text-ink sm:text-2xl">{s.value}</p>
                  <p className="mt-1 text-[0.7rem] leading-snug text-ink-soft sm:text-xs">{s.label}</p>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Portrait — concentric radii: outer 28 = inner 20 + pad 8 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
            className="min-w-0"
          >
            <div className="mx-auto w-full max-w-[20rem] sm:max-w-[24rem] lg:ms-auto lg:me-0 lg:max-w-none">
              <div className="rounded-[1.75rem] bg-paper-2 p-2 shadow-frame sm:rounded-[2rem] sm:p-2.5">
                <div className="overflow-hidden rounded-[1.25rem] sm:rounded-[1.375rem]">
                  <img
                    src={PORTRAIT}
                    alt="Anna Rykun"
                    width={903}
                    height={1024}
                    className="img-outline aspect-[4/5] w-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="max-w-[28ch] text-pretty text-sm leading-relaxed text-ink-soft">
                  {t.hero.titleA}{' '}
                  <span className="italic text-accent">{t.hero.titleB}</span>
                </p>
                <button
                  type="button"
                  onClick={() => scrollToId('about')}
                  aria-label={t.hero.scroll}
                  className="pressable grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line-strong text-ink hover:border-ink"
                >
                  <motion.span
                    animate={reduce ? undefined : { y: [0, 3, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    className="grid place-items-center"
                  >
                    <ArrowDown size={16} weight="bold" />
                  </motion.span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        <p className="mt-10 hidden text-sm text-ink-faint lg:block">{t.hero.availability}</p>
      </div>
    </section>
  )
}
