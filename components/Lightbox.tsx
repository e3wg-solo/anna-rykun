'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowsIn,
  ArrowsOut,
  CaretLeft,
  CaretRight,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
  X,
} from '@phosphor-icons/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { imgDims } from '../data/content'
import { useI18n } from '../i18n'
import { EASE } from '../lib/motion'
import { cn } from '../lib/utils'

export interface LightboxItem {
  images: string[]
  title?: string
  subtitle?: string
  desc?: string
  startIndex?: number
  details?: string[]
  role?: string
  roleLabel?: string
  detailsLabel?: string
}

export function Lightbox({ item, onClose }: { item: LightboxItem; onClose: () => void }) {
  const { t, dir } = useI18n()
  const [index, setIndex] = useState(item.startIndex ?? 0)
  const count = item.images.length
  const multiple = count > 1

  // Documents carry dense tables that are unreadable at fit-to-screen size, so
  // the stage doubles as a zoom/pan viewer.
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [fullscreen, setFullscreen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null)
  const zoomed = zoom > 1

  const resetZoom = useCallback(() => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
  }, [])

  const zoomBy = useCallback((factor: number) => {
    setZoom((z) => {
      const next = Math.min(6, Math.max(1, z * factor))
      if (next === 1) setOffset({ x: 0, y: 0 })
      return next
    })
  }, [])

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + count) % count)
      resetZoom()
    },
    [count, resetZoom],
  )

  const toggleFullscreen = useCallback(() => {
    const el = rootRef.current
    if (!el) return
    if (document.fullscreenElement) void document.exitFullscreen()
    else void el.requestFullscreen?.()
  }, [])

  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  // Reopening a different item can reuse this instance while the previous one
  // is still animating out, which otherwise carries the old — possibly
  // out-of-range — index over to the new set.
  const [shownItem, setShownItem] = useState(item)
  if (shownItem !== item) {
    setShownItem(item)
    setIndex(item.startIndex ?? 0)
    setZoom(1)
    setOffset({ x: 0, y: 0 })
  }

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      // The browser handles Escape for fullscreen; don't also tear down the box.
      if (e.key === 'Escape' && !document.fullscreenElement) onClose()
      if (e.key === '+' || e.key === '=') zoomBy(1.4)
      if (e.key === '-') zoomBy(1 / 1.4)
      if (e.key === '0') resetZoom()
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
  }, [dir, go, multiple, onClose, resetZoom, zoomBy])

  if (typeof document === 'undefined') return null

  return createPortal(
    <motion.div
      ref={rootRef}
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

        <div className="flex items-center gap-2">
          <ChromeButton label={t.work.zoomOut} onClick={() => zoomBy(1 / 1.4)} disabled={!zoomed}>
            <MagnifyingGlassMinus size={19} weight="regular" />
          </ChromeButton>
          <button
            type="button"
            onClick={resetZoom}
            aria-label={t.work.zoomReset}
            className="pressable min-w-14 rounded-full border border-cream/20 px-3 py-2.5 font-mono-ui text-xs text-cream/80 tabular-nums touch-manipulation hover:text-cream"
          >
            {Math.round(zoom * 100)}%
          </button>
          <ChromeButton label={t.work.zoomIn} onClick={() => zoomBy(1.4)} disabled={zoom >= 6}>
            <MagnifyingGlassPlus size={19} weight="regular" />
          </ChromeButton>
          <ChromeButton label={t.work.fullscreen} onClick={toggleFullscreen}>
            {fullscreen ? <ArrowsIn size={19} weight="regular" /> : <ArrowsOut size={19} weight="regular" />}
          </ChromeButton>
          <ChromeButton label={t.work.close} onClick={onClose}>
            <X size={20} weight="regular" />
          </ChromeButton>
        </div>
      </div>

      {/* Stage */}
      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 sm:px-16">
        {multiple && (
          <NavArrow side="start" dir={dir} label={t.work.prev} onClick={() => go(-1)} />
        )}

        {/*
         * No AnimatePresence here: nested inside the portal its exit never
         * completed, so the keyed child was never swapped and the stage stayed
         * on the first slide. Remounting on key alone keeps the fade-in.
         */}
        <motion.div
          key={item.images[index]}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: EASE }}
          className={cn(
            'flex h-full min-h-0 w-full select-none items-center justify-center',
            zoomed ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none',
          )}
          onDoubleClick={() => (zoomed ? resetZoom() : zoomBy(2.4))}
          onWheel={(e) => zoomBy(e.deltaY < 0 ? 1.12 : 1 / 1.12)}
          onPointerDown={(e) => {
            if (!zoomed) return
            drag.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y }
            e.currentTarget.setPointerCapture(e.pointerId)
          }}
          onPointerMove={(e) => {
            const d = drag.current
            if (!d) return
            setOffset({ x: d.ox + (e.clientX - d.x), y: d.oy + (e.clientY - d.y) })
          }}
          onPointerUp={(e) => {
            drag.current = null
            e.currentTarget.releasePointerCapture(e.pointerId)
          }}
        >
          {/* Transform sits inside so it never fights the mount animation above. */}
          <div
            className="flex h-full w-full items-center justify-center transition-transform duration-200 ease-out"
            style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }}
          >
            <Image
              src={item.images[index]}
              alt={item.title ?? ''}
              width={imgDims(item.images[index]).width}
              height={imgDims(item.images[index]).height}
              sizes="(min-width: 1024px) 80vw, 96vw"
              priority
              draggable={false}
              className="h-auto max-h-full w-auto max-w-full rounded-sm object-contain shadow-2xl"
            />
          </div>
        </motion.div>

        {multiple && <NavArrow side="end" dir={dir} label={t.work.next} onClick={() => go(1)} />}
      </div>

      {/* Caption + thumbs — above stage, Safari-safe taps */}
      <div
        hidden={zoomed}
        className="relative z-20 max-h-[42dvh] shrink-0 overflow-y-auto overscroll-contain bg-ink/95 px-5 pb-5 pt-4 backdrop-blur-md sm:max-h-[34dvh] sm:px-8 sm:pb-6 sm:pt-5"
      >
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
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="56px"
                      draggable={false}
                      className="pointer-events-none object-cover"
                    />
                  </button>
                )
              })}
            </div>
          )}

          {(item.details?.length || item.role) && (
            <details className="group mx-auto mt-5 max-w-[68ch] border-t border-cream/15 pt-4 text-start">
              <summary className="cursor-pointer list-none font-mono-ui text-xs uppercase tracking-[0.16em] text-accent-soft marker:content-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft">
                <span className="inline-flex items-center gap-2">
                  <span className="text-lg leading-none transition-transform duration-200 group-open:rotate-45">+</span>
                  {item.detailsLabel}
                </span>
              </summary>
              <div className="mt-4 space-y-3 text-pretty text-sm leading-relaxed text-cream/72">
                {item.details?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {item.role && (
                <div className="mt-6 border-s-2 border-accent-soft ps-4">
                  {item.roleLabel && <p className="eyebrow text-accent-soft">{item.roleLabel}</p>}
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-cream">{item.role}</p>
                </div>
              )}
            </details>
          )}
        </div>
      </div>
    </motion.div>,
    document.body,
  )
}

function ChromeButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="pressable grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream touch-manipulation disabled:opacity-35"
    >
      {children}
    </button>
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
