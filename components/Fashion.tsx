'use client'

import Image from 'next/image'
import { AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Stack } from '@phosphor-icons/react'
import { useState } from 'react'
import { useI18n } from '../i18n'
import { FASHION_COLOUR_SYSTEM, FASHION_ITEMS } from '../data/content'
import { cn } from '../lib/utils'
import { Lightbox } from './Lightbox'
import type { LightboxItem } from './Lightbox'

export function Fashion() {
  const { t } = useI18n()
  const [active, setActive] = useState<LightboxItem | null>(null)
  const f = t.fashion

  function openStory(slug: string, images: string[], startIndex = 0) {
    const meta = f.items[slug]
    setActive({
      images,
      startIndex,
      title: meta?.title,
      subtitle: meta?.category,
      desc: meta?.dek,
    })
  }

  return (
    <section id="fashion" className="border-t border-cream/10 bg-espresso text-cream">
      <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28 md:pb-36 md:pt-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="flex max-w-4xl flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="eyebrow text-accent-soft">05</span>
                <span className="h-px w-8 bg-cream/30" />
                <span className="eyebrow text-cream/70">{f.eyebrow}</span>
              </div>
              <h2 className="font-display max-w-[20ch] text-[2.1rem] leading-[1.05] tracking-tight text-cream sm:text-5xl md:text-[3.4rem]">
                {f.title}
              </h2>
              <p className="max-w-[56ch] text-pretty text-base leading-relaxed text-cream/70 sm:text-lg">
                {f.lead}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-16">
            <div className="grid gap-5 text-pretty text-sm leading-relaxed text-cream/66 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {f.intro.map((paragraph, index) => (
                <p key={paragraph} className={cn(index === 0 && 'dropcap text-cream/85')}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 border-y border-cream/15 py-10 sm:mt-24 sm:py-14">
          <p className="max-w-[23ch] font-display text-[clamp(2.2rem,5.2vw,5rem)] leading-[0.98] tracking-tight text-cream">
            {f.statement}
          </p>
        </div>

        <div className="mt-16 grid items-center gap-8 sm:mt-24 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-accent-soft">{f.colourTitle}</p>
            <p className="mt-5 max-w-[42ch] text-pretty leading-relaxed text-cream/66">{f.colourBody}</p>
          </div>

          <div className="lg:col-span-8">
            <button
              type="button"
              onClick={() =>
                setActive({
                  images: [FASHION_COLOUR_SYSTEM],
                  title: f.colourTitle,
                  subtitle: f.eyebrow,
                  desc: f.colourBody,
                })
              }
              className="group relative block aspect-[2/1] w-full overflow-hidden rounded-sm border border-cream/10 bg-cream/5"
            >
              <Image
                src={FASHION_COLOUR_SYSTEM}
                alt={f.colourTitle}
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.025]"
              />
              <span className="absolute end-3 bottom-3 grid h-10 w-10 place-items-center rounded-full bg-cream text-ink shadow-diffuse transition-transform duration-300 group-hover:-translate-y-1">
                <ArrowUpRight size={16} weight="bold" className="rtl:-scale-x-100" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-paper text-ink">
        <div className="mx-auto max-w-[1400px] px-5 pt-20 sm:px-8 sm:pt-28">
          <p className="eyebrow text-accent">{f.projectsLabel}</p>
        </div>

        {FASHION_ITEMS.map((item, itemIndex) => {
          const meta = f.items[item.slug]
          const reverse = itemIndex % 2 === 1
          const supportingImages = item.images.slice(1, 3)

          return (
            <article
              key={item.slug}
              className="mx-auto max-w-[1400px] border-b border-line px-5 py-20 sm:px-8 sm:py-28 md:py-36"
            >
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                <div className={cn('lg:col-span-5', reverse && 'lg:order-2')}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono-ui text-xs text-accent">{String(itemIndex + 1).padStart(2, '0')}</span>
                    <span className="eyebrow text-ink-faint">{meta?.category}</span>
                  </div>

                  <h3 className="mt-5 max-w-[12ch] font-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.96] tracking-tight text-ink">
                    {meta?.title}
                  </h3>
                  <p className="mt-6 max-w-[46ch] text-pretty text-lg leading-relaxed text-ink-soft">{meta?.dek}</p>

                  <div className="mt-10 grid gap-5 text-pretty text-sm leading-relaxed text-ink-soft sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {meta?.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>

                  <div className="mt-10 border-s-2 border-accent ps-5">
                    <p className="eyebrow text-accent">{f.roleLabel}</p>
                    <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-ink">{meta?.role}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => openStory(item.slug, item.images)}
                    className="pressable group mt-10 inline-flex min-h-11 items-center gap-3 rounded-full bg-ink px-5 py-3 text-sm text-cream hover:bg-accent"
                  >
                    {f.openProject}
                    <span className="flex items-center gap-1 text-cream/55">
                      <Stack size={14} weight="bold" />
                      {item.images.length} {f.frames}
                    </span>
                    <ArrowUpRight
                      size={15}
                      weight="bold"
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100"
                    />
                  </button>
                </div>

                <div className={cn('lg:col-span-7', reverse && 'lg:order-1')}>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <MediaButton
                      image={item.images[0]}
                      title={meta?.title ?? item.slug}
                      onClick={() => openStory(item.slug, item.images, 0)}
                      className="col-span-2 aspect-[4/5] bg-paper-2 sm:aspect-[5/4]"
                      contain
                    />
                    {supportingImages.map((image, imageIndex) => (
                      <MediaButton
                        key={image}
                        image={image}
                        title={meta?.title ?? item.slug}
                        onClick={() => openStory(item.slug, item.images, imageIndex + 1)}
                        className="aspect-[4/5]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <AnimatePresence initial={false}>
        {active && <Lightbox item={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}

function MediaButton({
  image,
  title,
  onClick,
  className,
  contain = false,
}: {
  image: string
  title: string
  onClick: () => void
  className: string
  contain?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('group relative overflow-hidden rounded-sm border border-line bg-paper-2', className)}
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 1024px) 58vw, 100vw"
        className={cn(
          'transition-transform duration-[900ms] ease-out group-hover:scale-[1.025]',
          contain ? 'object-contain' : 'object-cover',
        )}
      />
      <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
      <span className="absolute end-3 bottom-3 grid h-10 w-10 place-items-center rounded-full bg-cream text-ink opacity-0 shadow-diffuse transition-[opacity,transform] duration-300 group-hover:-translate-y-1 group-hover:opacity-100 max-lg:opacity-100">
        <ArrowUpRight size={16} weight="bold" className="rtl:-scale-x-100" />
      </span>
    </button>
  )
}
