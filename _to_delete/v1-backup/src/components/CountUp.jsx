import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

/** Number that counts up when scrolled into view. */
export default function CountUp({ to, pad = 2, duration = 2, className = '', suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const v = useMotionValue(0)
  const text = useTransform(v, (n) => String(Math.round(n)).padStart(pad, '0') + suffix)
  useEffect(() => {
    if (!inView) return
    const c = animate(v, to, { duration, ease: [0.16, 1, 0.3, 1] })
    return () => c.stop()
  }, [inView, to, duration, v])
  return (
    <motion.span ref={ref} className={`tabular-nums ${className}`}>
      {text}
    </motion.span>
  )
}
