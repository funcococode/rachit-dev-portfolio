import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { site } from '../data/site'
import { EASE } from '../lib/motion'

const COLS = 8
const ROWS = 5

/**
 * A boxed counter fills up, then the screen breaks into a grid of tiles
 * that fall away in a diagonal wave to reveal the page.
 */
export default function Preloader({ onDone }) {
  const count = useMotionValue(0)
  const pct = useTransform(count, (v) => String(Math.round(v)).padStart(3, '0'))
  const width = useTransform(count, (v) => `${v}%`)
  const [tiles, setTiles] = useState(false)

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    const c = animate(count, 100, { duration: 1.8, ease: [0.65, 0, 0.35, 1] })
    const t1 = setTimeout(() => setTiles(true), 1950)
    const t2 = setTimeout(() => {
      document.documentElement.style.overflow = ''
      onDone?.()
    }, 2000)
    return () => {
      c.stop()
      clearTimeout(t1)
      clearTimeout(t2)
      document.documentElement.style.overflow = ''
    }
  }, [count, onDone])

  return (
    <motion.div className="fixed inset-0 z-[90]" exit={{ pointerEvents: 'none', transition: { delay: 1.2 } }}>
      {/* tile grid that covers everything, then falls away on exit */}
      <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}>
        {Array.from({ length: COLS * ROWS }).map((_, i) => {
          const x = i % COLS
          const y = Math.floor(i / COLS)
          return (
            <motion.div
              key={i}
              className="-m-px bg-deep"
              initial={{ scaleY: 1 }}
              exit={{ scaleY: 0, transition: { duration: 0.6, ease: EASE.quart, delay: (x + y) * 0.045 } }}
              style={{ originY: 0 }}
            />
          )
        })}
      </div>

      {/* counter panel */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-between p-4 text-bright md:p-8"
        animate={{ opacity: tiles ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="eyebrow flex justify-between border-b border-bright/30 pb-3">
          <span>{site.name}</span>
          <span>Portfolio — {new Date().getFullYear()}</span>
        </div>
        <div className="grid grid-cols-12 items-end gap-4 border-t border-bright/30 pt-4">
          <div className="col-span-12 md:col-span-8">
            <p className="eyebrow mb-3 text-bright/70">Loading</p>
            <div className="h-px w-full bg-bright/25">
              <motion.div className="h-full bg-bright" style={{ width }} />
            </div>
          </div>
          <motion.span className="display col-span-12 text-right text-[26vw] leading-[0.8] tabular-nums md:col-span-4 md:text-[12vw]">
            {pct}
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  )
}
