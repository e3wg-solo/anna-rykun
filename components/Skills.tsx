'use client'

import { motion } from 'framer-motion'
import { useI18n } from '../i18n'
import { EASE, viewportOnce } from '../lib/motion'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'

export function Skills() {
  const { t } = useI18n()

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28 md:py-36">
      <SectionHeading
        index="03"
        eyebrow={t.skills.eyebrow}
        title={t.skills.title}
        lead={t.skills.lead}
        className="max-w-3xl"
      />

      <div className="mt-14 border-t border-line-strong lg:mt-20">
        {t.skills.groups.map((g) => (
          <div
            key={g.key}
            className="grid gap-6 border-b border-line py-9 lg:grid-cols-12 lg:items-start lg:gap-10"
          >
            <div className="flex items-baseline gap-4 lg:col-span-4">
              <span className="font-mono-ui text-sm text-accent">{g.key}</span>
              <h3 className="font-display text-2xl tracking-tight text-ink sm:text-3xl">{g.title}</h3>
            </div>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035 } } }}
              className="flex flex-wrap gap-2.5 lg:col-span-8"
            >
              {g.items.map((item) => (
                <motion.li
                  key={item}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                  }}
                  className="cursor-default rounded-full border border-line bg-paper-2 px-4 py-2 text-sm text-ink-soft transition-[transform,border-color,color] duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 hover:border-accent/50 hover:text-ink"
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        ))}

        <Reveal>
          <div className="grid gap-6 py-9 lg:grid-cols-12 lg:items-start lg:gap-10">
            <div className="flex items-baseline gap-4 lg:col-span-4">
              <span className="font-mono-ui text-sm text-accent">05</span>
              <h3 className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
                {t.skills.softTitle}
              </h3>
            </div>
            <ul className="flex flex-wrap gap-2.5 lg:col-span-8">
              {t.skills.soft.map((item) => (
                <li
                  key={item}
                  className="cursor-default rounded-full border border-accent/25 bg-accent/5 px-4 py-2 text-sm text-accent-deep transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 hover:bg-accent/10"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
