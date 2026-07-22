'use client'

import { useI18n } from '../i18n'

export function Marquee() {
  const { t } = useI18n()
  const items = t.marquee
  const track = [...items, ...items]

  return (
    <section aria-hidden className="pause-on-hover overflow-hidden border-y border-ink/10 bg-espresso py-6 md:py-8">
      <div className="flex w-max animate-marquee">
        {track.map((word, i) => (
          <div key={i} className="flex items-center">
            <span className="px-6 font-display text-2xl italic text-cream/90 sm:text-3xl md:px-9 md:text-4xl">
              {word}
            </span>
            <span className="mx-1 h-1.5 w-1.5 rounded-full bg-accent-soft md:mx-2" />
          </div>
        ))}
      </div>
    </section>
  )
}
