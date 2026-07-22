import type { Variants } from 'framer-motion'

export const EASE = [0.16, 1, 0.3, 1] as const
export const SPRING = { type: 'spring', stiffness: 120, damping: 20, mass: 0.9 } as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

export const staggerFast: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

export const viewportOnce = { once: true, margin: '-80px' } as const
