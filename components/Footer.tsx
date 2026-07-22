'use client'

import { ArrowUpRight, ArrowUp } from '@phosphor-icons/react'
import { useI18n } from '../i18n'
import { CONTACT } from '../data/content'
import { scrollToId } from '../lib/utils'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Magnetic } from './ui/Magnetic'

const LINK_IDS = ['about', 'work', 'projects', 'teaching', 'recognition', 'contact'] as const

export function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-espresso text-cream">
      {/* Connect band — reference large CTA */}
      <div className="border-b border-cream/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 px-5 py-14 sm:px-8 md:flex-row md:items-center md:py-16">
          <h2 className="font-display text-[clamp(2.4rem,7vw,5rem)] leading-none tracking-tight">
            {t.footer.connect}
            <span className="text-accent-soft">.</span>
          </h2>
          <Magnetic>
            <a
              href={`mailto:${CONTACT.email}`}
              className="pressable group inline-flex min-h-11 items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-medium text-ink hover:bg-accent hover:text-cream"
            >
              {t.cta.button}
              <ArrowUpRight
                size={16}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100"
              />
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 md:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-cream/40">{t.footer.tagline}</p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-4 block font-display text-[clamp(1.35rem,4.5vw,2.75rem)] leading-[1.15] tracking-tight text-cream transition-colors hover:text-accent-soft"
            >
              {CONTACT.email}
            </a>
          </div>

          <div className="flex flex-col gap-6 lg:items-end">
            <nav className="flex flex-wrap gap-x-5 gap-y-2 lg:justify-end">
              {LINK_IDS.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToId(id)}
                  className="text-sm text-cream/55 transition-colors hover:text-cream"
                >
                  {t.nav[id]}
                </button>
              ))}
            </nav>
            <div className="flex flex-wrap items-center gap-4">
              <LanguageSwitcher id="footer" tone="cream" />
              <button
                type="button"
                onClick={() => scrollToId('top')}
                className="group flex items-center gap-2 text-sm text-cream/55 transition-colors hover:text-cream"
              >
                {t.footer.backTop}
                <span className="grid h-8 w-8 place-items-center rounded-full border border-cream/20 transition-transform duration-300 group-hover:-translate-y-1">
                  <ArrowUp size={14} weight="bold" />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-cream/10 pt-6 text-sm text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} Anna Rykun. {t.footer.rights}
          </span>
          <span>{t.footer.built}</span>
        </div>
      </div>
    </footer>
  )
}
