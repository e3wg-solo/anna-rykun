'use client'

import { motion } from 'framer-motion'
import { LANGS, useI18n } from '../i18n'
import { cn } from '../lib/utils'
import { SPRING } from '../lib/motion'

interface Props {
  id: string
  tone?: 'ink' | 'cream'
}

export function LanguageSwitcher({ id, tone = 'ink' }: Props) {
  const { lang, setLang } = useI18n()

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        'relative flex items-center gap-0.5 rounded-full border p-1',
        tone === 'cream' ? 'border-cream/20' : 'border-line-strong bg-paper-2',
      )}
    >
      {LANGS.map((l) => {
        const active = l.code === lang
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            aria-label={l.label}
            className={cn(
              'relative z-10 flex h-10 min-w-10 items-center justify-center rounded-full px-2.5 text-xs font-medium transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)]',
              l.code === 'ar' && 'text-sm',
              active
                ? 'text-cream'
                : tone === 'cream'
                  ? 'text-cream/55 hover:text-cream'
                  : 'text-ink-soft hover:text-ink',
            )}
          >
            {active && (
              <motion.span
                layoutId={`lang-pill-${id}`}
                className="absolute inset-0 -z-10 rounded-full bg-accent"
                transition={SPRING}
              />
            )}
            {l.short}
          </button>
        )
      })}
    </div>
  )
}
