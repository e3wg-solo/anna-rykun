'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react'
import { useState } from 'react'
import { useI18n } from '../i18n'
import { FASHION_ITEMS, imgDims } from '../data/content'
import { Lightbox } from './Lightbox'
import type { LightboxItem } from './Lightbox'

export function FashionCase({ slug }: { slug: string }) {
  const { t } = useI18n()
  const [active, setActive] = useState<LightboxItem | null>(null)
  const f = t.fashion

  const index = FASHION_ITEMS.findIndex((i) => i.slug === slug)
  const item = FASHION_ITEMS[index]
  const meta = f.items[slug]
  if (!item) return null

  const next = FASHION_ITEMS[(index + 1) % FASHION_ITEMS.length]
  const nextMeta = f.items[next.slug]
  const [hero, ...rest] = item.images

  function openAt(startIndex: number) {
    setActive({
      images: item.images,
      startIndex,
      title: meta?.title,
      subtitle: meta?.category,
      desc: meta?.dek,
    })
  }

  return (
    <article className="pb-24 pt-28 sm:pt-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Link
          href="/#fashion"
          className="inline-flex items-center gap-2 font-mono-ui text-xs uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-accent"
        >
          <ArrowLeft size={14} weight="bold" className="rtl:-scale-x-100" />
          {f.backLabel}
        </Link>

        <header className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-accent">
              {f.caseLabel} {String(index + 1).padStart(2, '0')}
            </p>
            <h1 className="mt-3 max-w-[15ch] font-display text-[clamp(2.6rem,6vw,5.6rem)] leading-[0.95] tracking-tight text-ink">
              {meta?.title}
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="eyebrow text-ink-faint">{meta?.category}</p>
            <p className="mt-3 text-pretty text-lg leading-relaxed text-ink-soft">{meta?.dek}</p>
          </div>
        </header>
      </div>

      {/* Hero frame — capped against the viewport so a tall board cannot run away. */}
      <div className="mx-auto mt-12 max-w-[1400px] px-5 sm:px-8">
        <button
          type="button"
          onClick={() => openAt(0)}
          aria-label={meta?.title}
          className="group flex w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-sm border border-line bg-paper-2 p-2 sm:p-4"
        >
          <Image
            src={hero}
            alt={meta?.title ?? slug}
            {...imgDims(hero)}
            sizes="(min-width: 1440px) 1400px, 100vw"
            priority
            className="h-auto max-h-[72dvh] w-auto max-w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.01]"
          />
        </button>
      </div>

      <div className="mx-auto mt-16 max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Notes read as plain prose here — no disclosure widget to discover. */}
          <div className="lg:col-span-7">
            <h2 className="font-mono-ui text-xs uppercase tracking-[0.2em] text-accent">{f.notesLabel}</h2>
            <div className="mt-6 space-y-5 text-pretty text-base leading-[1.72] text-ink-soft sm:text-lg">
              {meta?.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>

          <aside className="lg:col-span-5 lg:pt-9">
            <div className="border-s-2 border-accent bg-paper-2 py-6 pe-6 ps-7 shadow-diffuse">
              <p className="eyebrow text-accent">{f.roleLabel}</p>
              <p className="mt-3 text-pretty text-sm font-medium leading-relaxed text-ink sm:text-base">
                {meta?.role}
              </p>
            </div>
          </aside>
        </div>

        <h2 className="mt-20 font-mono-ui text-xs uppercase tracking-[0.2em] text-accent">
          {f.galleryLabel}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((image, i) => (
            <button
              key={image}
              type="button"
              onClick={() => openAt(i + 1)}
              aria-label={`${meta?.title} ${i + 2}`}
              className="group flex cursor-zoom-in items-center justify-center overflow-hidden rounded-sm border border-line bg-paper-2 p-2"
            >
              <Image
                src={image}
                alt=""
                {...imgDims(image)}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto max-h-[52dvh] w-auto max-w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </button>
          ))}
        </div>

        <Link
          href={`/fashion/${next.slug}`}
          className="group mt-20 flex flex-col gap-2 border-t border-line pt-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <span>
            <span className="eyebrow text-ink-faint">{f.nextCase}</span>
            <span className="mt-2 block font-display text-3xl leading-tight text-ink transition-colors group-hover:text-accent sm:text-4xl">
              {nextMeta?.title}
            </span>
          </span>
          <ArrowUpRight
            size={26}
            weight="bold"
            className="text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 rtl:-scale-x-100"
          />
        </Link>
      </div>

      <AnimatePresence initial={false}>
        {active && <Lightbox item={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </article>
  )
}
