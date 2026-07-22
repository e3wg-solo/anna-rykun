'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { CaretLeft, CaretRight, X } from '@phosphor-icons/react'
import { useCallback, useEffect, useState } from 'react'
import { useI18n } from '../i18n'
import { EASE } from '../lib/motion'
import { cn } from '../lib/utils'

export interface LightboxItem {
  images: string[]
  title?: string
  subtitle?: string
  desc?: string
  startIndex?: number
}

export function Lightbox({ item, onClose }: { item: LightboxItem; onClose: () => void }) {
  const { t, dir } = useI18n()
  const [index, setIndex] = useState(item.startIndex ?? 0)
  const count = item.images.length
  const multiple = count > 1

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count],
  )

  useEffect(() => {
    setIndex(item.startIndex ?? 0)
  }, [item])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (!multiple) return
      const fwd = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight'
      const back = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft'
      if (e.key === fwd) go(1)
      if (e.key === back) go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [dir, go, multiple, onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col bg-ink/85 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-5 sm:px-8">
        <span className="font-mono-ui text-sm text-cream/70">
          {multiple ? `${index + 1} / ${count}` : ''}
        </span>
        <button
          type="button"
          aria-label={t.work.close}
          onClick={onClose}
          className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream transition-colors hover:bg-cream hover:text-ink"
        >
          <X size={20} weight="regular" />
        </button>
      </div>

      {/* Stage */}
      <div className="relative flex flex-1 items-center justify-center px-4 sm:px-16" onClick={(e) => e.stopPropagation()}>
        {multiple && (
          <NavArrow side="start" dir={dir} label={t.work.prev} onClick={() => go(-1)} />
        )}

        <AnimatePresence mode="wait">
          <motion.img
            key={item.images[index]}
            src={item.images[index]}
            alt={item.title ?? ''}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="max-h-[68vh] max-w-full rounded-sm object-contain shadow-2xl"
          />
        </AnimatePresence>

        {multiple && <NavArrow side="end" dir={dir} label={t.work.next} onClick={() => go(1)} />}
      </div>

      {/* Caption */}
      <div className="px-5 pb-6 pt-5 sm:px-8" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto max-w-3xl text-center">
          {item.subtitle && <p className="eyebrow mb-2 text-accent-soft">{item.subtitle}</p>}
          {item.title && <h3 className="font-display text-2xl text-cream sm:text-3xl">{item.title}</h3>}
          {item.desc && <p className="mx-auto mt-3 max-w-[60ch] text-pretty text-sm text-cream/70">{item.desc}</p>}

          {multiple && (
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {item.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`${i + 1}`}
                  className={cn(
                    'h-14 w-14 overflow-hidden rounded-sm border transition-[border-color,opacity] duration-200',
                    i === index ? 'border-accent-soft opacity-100' : 'border-cream/20 opacity-50 hover:opacity-90',
                  )}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function NavArrow({
  side,
  dir,
  label,
  onClick,
}: {
  side: 'start' | 'end'
  dir: 'ltr' | 'rtl'
  label: string
  onClick: () => void
}) {
  // Visual position: "start" arrow points back, "end" arrow points forward.
  const isLeftOnScreen = side === 'start' ? dir === 'ltr' : dir === 'rtl'
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cream/20 text-cream transition-colors hover:bg-cream hover:text-ink',
        isLeftOnScreen ? 'left-3 sm:left-6' : 'right-3 sm:right-6',
      )}
    >
      {side === 'start' ? <CaretLeft size={20} weight="bold" /> : <CaretRight size={20} weight="bold" />}
    </button>
  )
}
