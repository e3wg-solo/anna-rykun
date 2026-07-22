'use client'

import { ArrowRight } from '@phosphor-icons/react'
import { useI18n } from '../i18n'
import { scrollToId } from '../lib/utils'
import { Reveal } from './ui/Reveal'

export function ConnectCta() {
  const { t } = useI18n()

  return (
    <section className="px-5 py-10 sm:px-8 sm:py-14">
      <Reveal>
        <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] bg-ink px-6 py-14 sm:px-12 sm:py-16 md:rounded-[2.5rem]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                'radial-gradient(circle at 12% 18%, rgba(255,81,0,0.4), transparent 42%), radial-gradient(circle at 88% 78%, rgba(255,81,0,0.18), transparent 40%)',
            }}
          />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow text-accent">{t.cta.eyebrow}</p>
              <h2 className="mt-4 text-balance font-display text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.05] tracking-tight text-cream">
                {t.cta.title}
              </h2>
              <p className="mt-4 max-w-[42ch] text-pretty text-cream/60">{t.cta.body}</p>
            </div>
            <button
              type="button"
              onClick={() => scrollToId('contact')}
              className="pressable group inline-flex min-h-11 items-center gap-2 rounded-full bg-cream py-3 ps-6 pe-3.5 text-sm font-medium text-ink hover:bg-accent hover:text-cream"
            >
              {t.cta.button}
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ink/5">
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                />
              </span>
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
