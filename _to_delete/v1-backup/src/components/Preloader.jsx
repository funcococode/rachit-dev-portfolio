import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { EASE } from '../lib/motion'
import { site } from '../data/site'

const WORDS = ['Code', 'Compose', 'Produce', 'Ship', 'Hello']

/** Counter → word cycle → the curtain lifts. Calls onDone when finished. */
export default function Preloader({ onDone }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => String(Math.round(v)).padStart(3, '0'))
  const width = useTransform(count, (v) => `${v}%`)
  const [word, setWord] = useState(0)

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    const c = animate(count, 100, { duration: 2.4, ease: [0.65, 0, 0.35, 1] })
    const id = setInterval(() => setWord((w) => Math.min(w + 1, WORDS.length - 1)), 480)
    const t = setTimeout(() => {
      document.documentElement.style.overflow = ''
      onDone?.()
    }, 2750)
    return () => {
      c.stop()
      clearInterval(id)
      clearTimeout(t)
      document.documentElement.style.overflow = ''
    }
  }, [count, onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink-2 p-5 md:p-10"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 1.1, ease: EASE.quart } }}
    >
      {/* curved bottom edge that stretches on exit */}
      <motion.svg
        className="pointer-events-none absolute left-0 top-full h-[18vh] w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        initial={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 1.1, ease: EASE.quart } }}
        style={{ originY: 0 }}
      >
        <path d="M0 0 Q50 100 100 0 Z" className="fill-ink-2" />
      </motion.svg>

      <div className="flex items-center justify-between eyebrow">
        <span>{site.name}</span>
        <span>Portfolio © {new Date().getFullYear()}</span>
      </div>

      <div className="flex items-center justify-center">
        <div className="relative h-[1.25em] overflow-hidden px-6 text-5xl leading-[1.2] md:text-7xl">
          {WORDS.map((w, i) => (
            <motion.span
              key={w}
              className="serif-i absolute inset-x-0 top-0 text-center leading-[1.2] text-bone"
              initial={false}
              animate={{ y: `${(i - word) * 110}%`, opacity: i === word ? 1 : 0 }}
              transition={{ duration: 0.6, ease: EASE.expo }}
            >
              {w}
              <span className="text-ember">.</span>
            </motion.span>
          ))}
          <span className="invisible serif-i">Compose.</span>
        </div>
      </div>

      <div>
        <div className="flex items-end justify-between">
          <motion.span className="display text-[22vw] leading-[0.8] md:text-[14vw]">{rounded}</motion.span>
          <span className="eyebrow mb-3 hidden md:block">Loading experience</span>
        </div>
        <div className="mt-4 h-px w-full bg-line">
          <motion.div className="h-full bg-ember" style={{ width }} />
        </div>
      </div>
    </motion.div>
  )
}
