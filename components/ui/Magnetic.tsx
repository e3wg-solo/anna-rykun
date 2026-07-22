'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { ReactNode, PointerEvent } from 'react'
import { useRef } from 'react'

interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
}

/** Pulls its child gently toward the pointer. Uses motion values only — no re-renders. */
export function Magnetic({ children, className, strength = 0.4 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.5 })

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === 'touch') return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const mx = e.clientX - (rect.left + rect.width / 2)
    const my = e.clientY - (rect.top + rect.height / 2)
    x.set(mx * strength)
    y.set(my * strength)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
