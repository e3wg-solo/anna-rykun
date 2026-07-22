'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE, viewportOnce } from '../../lib/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'li' | 'span'
}

export function Reveal({ children, className, delay = 0, y = 30 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE, delay } },
      }}
    >
      {children}
    </motion.div>
  )
}
