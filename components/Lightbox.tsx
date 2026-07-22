'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { CaretLeft, CaretRight, X } from '@phosphor-icons/react'
import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
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
  const [mounted, setMounted] = useState(false)
  const count = item.images.length
  const multiple = count > 1

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count],
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setIndex(item.startIndex ?? 0)
  }, [item])

  useEffect(() => {
    const prev = document.body.style.overflow
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
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [dir, go, multiple, onClose])

  if (!mounted) return null

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col bg-ink/90"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      role="dialog"
      aria-modal="true"
      aria-label={item.title ?? t.work.close}
    >
      {/* Backdrop — separate so caption/thumbs never fight overlay click */}
      <button
        type="button"
        aria-label={t.work.close}
        className="absolute inset-0 -z-10 cursor-default bg-transparent"
        onClick={onClose}
      />

      {/* Top bar */}
      <div className="relative z-20 flex shrink-0 items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <span className="font-mono-ui text-sm text-cream/70">
          {multiple ? `${index + 1} / ${count}` : ''}
        </span>
        <button
          type="button"
          aria-label={t.work.close}
          onClick={onClose}
          className="pressable grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream touch-manipulation"
        >
          <X size={20} weight="regular" />
        </button>
      </div>

      {/* Stage */}
      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 sm:px-16">
        {multiple && (
          <NavArrow side="start" dir={dir} label={t.work.prev} onClick={() => go(-1)} />
        )}

        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={item.images[index]}
            src={item.images[index]}
            alt={item.title ?? ''}
            draggable={false}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="pointer-events-none max-h-[min(58vh,520px)] max-w-full select-none rounded-sm object-contain shadow-2xl sm:max-h-[68vh]"
          />
        </AnimatePresence>

        {multiple && <NavArrow side="end" dir={dir} label={t.work.next} onClick={() => go(1)} />}
      </div>

      {/* Caption + thumbs — above stage, Safari-safe taps */}
      <div className="relative z-20 shrink-0 bg-ink/95 px-5 pb-5 pt-4 backdrop-blur-md sm:px-8 sm:pb-6 sm:pt-5">
        <div className="mx-auto max-w-3xl text-center">
          {item.subtitle && <p className="eyebrow mb-2 text-accent-soft">{item.subtitle}</p>}
          {item.title && (
            <h3 className="text-balance font-display text-2xl text-cream sm:text-3xl">{item.title}</h3>
          )}
          {item.desc && (
            <p className="mx-auto mt-3 max-w-[60ch] text-pretty text-sm text-cream/70">{item.desc}</p>
          )}

          {multiple && (
            <div
              className="-mx-1 mt-5 flex justify-start gap-2 overflow-x-auto overscroll-x-contain px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:justify-center [&::-webkit-scrollbar]:hidden"
              role="listbox"
              aria-label={item.title}
            >
              {item.images.map((img, i) => {
                const active = i === index
                return (
                  <button
                    key={img}
                    type="button"
                    role="option"
                    aria-selected={active}
                    aria-label={`${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={cn(
                      'pressable relative h-14 w-14 shrink-0 touch-manipulation overflow-hidden rounded-sm border transition-[border-color,opacity] duration-200',
                      active ? 'border-accent-soft opacity-100' : 'border-cream/20 opacity-55',
                    )}
                  >
                    <img src={img} alt="" draggable={false} className="pointer-events-none h-full w-full object-cover" />
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>,
    document.body,
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
  const isLeftOnScreen = side === 'start' ? dir === 'ltr' : dir === 'rtl'
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'pressable absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cream/20 text-cream touch-manipulation',
        isLeftOnScreen ? 'left-2 sm:left-6' : 'right-2 sm:right-6',
      )}
    >
      {side === 'start' ? <CaretLeft size={20} weight="bold" /> : <CaretRight size={20} weight="bold" />}
    </button>
  )
}
