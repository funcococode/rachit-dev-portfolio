import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { COLORS } from './Stage'
import { EASE } from '../lib/motion'

const GREETINGS = ['hello', 'namaste', 'hola', 'bonjour', 'hi there']
const STRIPES = [COLORS.cobalt, COLORS.lime, COLORS.tang, COLORS.pink]

/**
 * Greetings flip through while a counter runs, then four colour
 * stripes sweep up and away to reveal the page.
 */
export default function Preloader({ onDone }) {
  const count = useMotionValue(0)
  const pct = useTransform(count, (v) => `${Math.round(v)}%`)
  const [i, setI] = useState(0)
  const [sweep, setSweep] = useState(false)

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    const c = animate(count, 100, { duration: 1.9, ease: [0.65, 0, 0.35, 1] })
    const id = setInterval(() => setI((n) => Math.min(n + 1, GREETINGS.length - 1)), 380)
    const t1 = setTimeout(() => setSweep(true), 2000)
    const t2 = setTimeout(() => {
      document.documentElement.style.overflow = ''
      onDone?.()
    }, 2650)
    return () => {
      c.stop()
      clearInterval(id)
      clearTimeout(t1)
      clearTimeout(t2)
      document.documentElement.style.overflow = ''
    }
  }, [count, onDone])

  return (
    <motion.div className="fixed inset-0 z-[90]" exit={{ pointerEvents: 'none' }}>
      {/* base */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-between bg-cream p-5 text-ink md:p-10"
        exit={{ opacity: 0, transition: { duration: 0.01, delay: 0.3 } }}
      >
        <div className="eyebrow flex justify-between">
          <span>Rachit Shrivastava</span>
          <motion.span>{pct}</motion.span>
        </div>
        <div className="flex items-center justify-center">
          <motion.h1
            key={GREETINGS[i]}
            className="display text-[18vw] md:text-[12vw]"
            initial={{ y: 40, opacity: 0, rotate: -4 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            {GREETINGS[i]}
            <span className="text-cobalt">.</span>
          </motion.h1>
        </div>
        <div className="bg-line h-1.5 w-full overflow-hidden rounded-full">
          <motion.div className="h-full rounded-full bg-ink" style={{ width: pct }} />
        </div>
      </motion.div>

      {/* colour stripes */}
      {STRIPES.map((c, n) => (
        <motion.div
          key={c}
          className="absolute inset-0"
          style={{ background: c, zIndex: n + 1 }}
          initial={{ y: '100%' }}
          animate={sweep ? { y: '0%' } : { y: '100%' }}
          exit={{ y: '-100%', transition: { duration: 0.8, ease: EASE.quart, delay: (STRIPES.length - 1 - n) * 0.09 } }}
          transition={{ duration: 0.6, ease: EASE.quart, delay: n * 0.09 }}
        />
      ))}
    </motion.div>
  )
}
