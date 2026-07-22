'use client'

import { cn } from '../../lib/utils'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  index?: string
  eyebrow: string
  title: string
  lead?: string
  className?: string
  align?: 'start' | 'center'
  tone?: 'ink' | 'cream'
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  className,
  align = 'start',
  tone = 'ink',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <Reveal>
        <div className="flex items-center gap-3">
          {index && (
            <span className="eyebrow text-accent">{index}</span>
          )}
          <span className={cn('h-px w-8', tone === 'cream' ? 'bg-cream/30' : 'bg-line-strong')} />
          <span className={cn('eyebrow', tone === 'cream' ? 'text-cream/70' : 'text-ink-soft')}>
            {eyebrow}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2
          className={cn(
            'font-display max-w-[20ch] text-[2.1rem] leading-[1.05] tracking-tight sm:text-5xl md:text-[3.4rem]',
            tone === 'cream' ? 'text-cream' : 'text-ink',
            align === 'center' && 'mx-auto',
          )}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              'max-w-[56ch] text-pretty text-base leading-relaxed sm:text-lg',
              tone === 'cream' ? 'text-cream/70' : 'text-ink-soft',
              align === 'center' && 'mx-auto',
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  )
}
