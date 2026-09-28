import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'

/**
 * Animated hairlines for building ruled, boxy layouts.
 * Drop inside a `relative` box; they draw themselves when `play` is true
 * (or when scrolled into view if `play` is undefined).
 *
 * <HRule side="bottom" />   <VRule side="right" delay={0.2} />
 */
const drawn = (play, from, to) =>
  play === undefined
    ? { initial: from, whileInView: to, viewport: { once: true, amount: 0.1 } }
    : { initial: from, animate: play ? to : from }

export function HRule({ side = 'bottom', play, delay = 0, className = '' }) {
  return (
    <motion.span
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 h-px origin-left bg-current ${side === 'top' ? 'top-0' : 'bottom-0'} ${className}`}
      {...drawn(play, { scaleX: 0 }, { scaleX: 1 })}
      transition={{ duration: 1.2, ease: EASE.expo, delay }}
    />
  )
}

export function VRule({ side = 'right', play, delay = 0, className = '' }) {
  return (
    <motion.span
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 w-px origin-top bg-current ${side === 'left' ? 'left-0' : 'right-0'} ${className}`}
      {...drawn(play, { scaleY: 0 }, { scaleY: 1 })}
      transition={{ duration: 1.2, ease: EASE.expo, delay }}
    />
  )
}
