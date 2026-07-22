'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'
import { cn, scrollToId } from '../lib/utils'
import { EASE } from '../lib/motion'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Magnetic } from './ui/Magnetic'

const LINK_IDS = ['about', 'work', 'projects', 'teaching', 'recognition', 'contact'] as const

export function Nav() {
  const { t } = useI18n()
  const { scrollYProgress } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setScrolled(v > 0.015)
  })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function go(id: string) {
    setOpen(false)
    requestAnimationFrame(() => scrollToId(id))
  }

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-accent rtl:origin-right"
        style={{ scaleX: scrollYProgress }}
      />

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[65] transition-colors duration-500',
          scrolled ? 'border-b border-line bg-paper/80 backdrop-blur-xl' : 'border-b border-transparent',
        )}
      >
        <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8 md:h-20">
          <button
            type="button"
            onClick={() => go('top')}
            className="group flex items-center gap-2 font-display text-lg tracking-tight text-ink"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-cream transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:rotate-[12deg]">
              <span className="font-display text-sm italic leading-none text-accent">AR</span>
            </span>
            <span className="hidden sm:inline">Anna Rykun</span>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {LINK_IDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => go(id)}
                className="link-underline rounded-full px-3 py-2 text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {t.nav[id]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher id="nav" />
            <Magnetic className="hidden md:block">
              <button
                type="button"
                onClick={() => go('contact')}
                className="pressable rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream hover:bg-accent"
              >
                {t.nav.contact}
              </button>
            </Magnetic>
            <button
              type="button"
              aria-label={t.nav.menu}
              onClick={() => setOpen(true)}
              className="pressable grid h-11 w-11 place-items-center rounded-full border border-line-strong text-ink hover:bg-paper-2 lg:hidden"
            >
              <List size={20} weight="regular" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-paper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className="flex h-16 items-center justify-between px-5 sm:px-8">
              <span className="font-display text-lg tracking-tight">Anna Rykun</span>
              <button
                type="button"
                aria-label={t.nav.close}
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-ink"
              >
                <X size={20} weight="regular" />
              </button>
            </div>

            <motion.ul
              className="flex flex-1 flex-col justify-center gap-1 px-5 sm:px-8"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            >
              {LINK_IDS.map((id, i) => (
                <motion.li
                  key={id}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                  }}
                >
                  <button
                    type="button"
                    onClick={() => go(id)}
                    className="flex w-full items-baseline gap-4 border-b border-line py-4 text-start"
                  >
                    <span className="eyebrow text-accent">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
                      {t.nav[id]}
                    </span>
                  </button>
                </motion.li>
              ))}
            </motion.ul>

            <div className="flex items-center justify-between px-5 pb-10 sm:px-8">
              <LanguageSwitcher id="menu" />
              <span className="eyebrow text-ink-faint">Anna Rykun</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
