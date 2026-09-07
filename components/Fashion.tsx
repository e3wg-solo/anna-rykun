'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Stack } from '@phosphor-icons/react'
import { useI18n } from '../i18n'
import { COLOUR_SYSTEM, FASHION_ITEMS, imgDims } from '../data/content'
import { cn } from '../lib/utils'

export function Fashion() {
  const { t } = useI18n()
  const f = t.fashion

  return (
    <section id="fashion" className="border-t border-line bg-paper-3/55 text-ink">
      <div className="relative isolate overflow-hidden">
        {/*
         * The colour system that underpins every case, laid in as a soft field
         * behind the intro and faded out so the copy keeps its contrast.
         */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 select-none">
          <Image src={COLOUR_SYSTEM} alt="" fill sizes="100vw" className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-paper-3/70 via-paper-3/88 to-paper-3" />
        </div>

        <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28 md:pb-32 md:pt-36">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <header className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="eyebrow text-accent">05</span>
                <span className="h-px w-8 bg-ink/20" />
                <span className="eyebrow text-ink-soft">{f.eyebrow}</span>
              </div>
              <h2 className="mt-7 max-w-[18ch] font-display text-[clamp(2.7rem,6.6vw,6.4rem)] leading-[0.94] tracking-[-0.035em] text-ink">
                {f.title}
              </h2>
            </header>

            <div className="lg:col-span-5 lg:pt-16">
              <div className="space-y-4 text-pretty text-base leading-[1.68] text-ink-soft sm:text-lg">
                <p>{f.intro[0]}</p>
                <p className="border-s-2 border-accent bg-paper/70 py-4 pe-4 ps-5 font-medium text-ink shadow-diffuse">
                  {f.intro[1]}
                </p>
                <p>{f.intro[2]}</p>
              </div>

              <p className="mt-8 border-t border-ink/15 pt-6 text-pretty text-base font-semibold leading-relaxed text-accent sm:text-lg">
                {f.introRole}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 pb-4 pt-16 sm:px-8 sm:pt-20">
          <p className="eyebrow text-accent">{f.projectsLabel}</p>
        </div>

        {FASHION_ITEMS.map((item, itemIndex) => {
          const meta = f.items[item.slug]
          const reverse = itemIndex % 2 === 1

          return (
            <article
              key={item.slug}
              className="mx-auto max-w-[1400px] border-b border-line px-5 py-16 sm:px-8 sm:py-24 md:py-28"
            >
              <header className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-10">
                <div className="lg:col-span-7">
                  <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-accent">
                    {f.caseLabel} {String(itemIndex + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-3 max-w-[15ch] font-display text-[clamp(2.5rem,5.5vw,5.4rem)] leading-[0.95] tracking-tight text-ink">
                    {meta?.title}
                  </h3>
                </div>
                <div className="lg:col-span-5 lg:pb-1">
                  <p className="eyebrow text-ink-faint">{meta?.category}</p>
                  <p className="mt-3 max-w-[48ch] text-pretty text-base leading-relaxed text-ink-soft">{meta?.dek}</p>
                </div>
              </header>

              <div className="mt-9 grid gap-4 lg:mt-12 lg:grid-cols-12 lg:gap-5">
                <CaseImage
                  image={item.images[0]}
                  title={meta?.title ?? item.slug}
                  href={`/fashion/${item.slug}`}
                  className={cn('lg:col-span-8', reverse && 'lg:order-2')}
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  primary
                />
                <CaseImage
                  image={item.images[1]}
                  title={`${meta?.title ?? item.slug} moodboard`}
                  href={`/fashion/${item.slug}`}
                  className={cn('lg:col-span-4', reverse && 'lg:order-1')}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </div>

              <div className="mt-6 flex justify-end border-t border-line pt-5">
                <Link
                  href={`/fashion/${item.slug}`}
                  className="pressable group inline-flex min-h-11 shrink-0 items-center justify-center gap-3 rounded-full bg-ink px-5 py-3 text-sm text-cream hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function CaseImage({
  image,
  title,
  href,
  className,
  sizes,
  primary = false,
}: {
  image: string
  title: string
  href: string
  className: string
  sizes: string
  primary?: boolean
}) {
  const dimensions = imgDims(image)

  return (
    <Link
      href={href}
      aria-label={title}
      className={cn(
        'group relative flex min-h-72 items-center justify-center overflow-hidden bg-paper-2 p-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:p-4',
        className,
      )}
    >
      <Image
        src={image}
        alt={title}
        width={dimensions.width}
        height={dimensions.height}
        sizes={sizes}
        className={cn(
          'img-outline h-auto w-full object-contain transition-transform duration-[900ms] ease-out group-hover:scale-[1.012]',
          primary ? 'max-h-[82dvh]' : 'max-h-[72dvh]',
        )}
      />
      <span className="absolute end-3 bottom-3 grid h-10 w-10 place-items-center rounded-full bg-cream text-ink shadow-diffuse transition-transform duration-300 group-hover:-translate-y-1">
        <ArrowUpRight size={16} weight="bold" className="rtl:-scale-x-100" />
      </span>
    </Link>
  )
}
