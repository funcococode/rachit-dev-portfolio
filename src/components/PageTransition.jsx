import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'
import { COLORS } from './Stage'

const COLUMNS = [COLORS.cobalt, COLORS.lime, COLORS.tang, COLORS.pink, COLORS.ink]

/**
 * Wrap every routed page. Leaving: five colour columns grow up from the
 * bottom one after another. Entering: they shrink away to the top.
 */
export default function PageTransition({ children }) {
  return (
    <>
      {children}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] flex">
        {COLUMNS.map((c, i) => (
          <motion.div
            key={c}
            className="h-full flex-1"
            style={{ background: c }}
            initial={{ scaleY: 1, originY: 0 }}
            animate={{ scaleY: 0, originY: 0, transition: { duration: 0.6, ease: EASE.quart, delay: 0.1 + i * 0.06 } }}
            exit={{ scaleY: [0, 1], originY: 1, transition: { duration: 0.55, ease: EASE.quart, delay: i * 0.06 } }}
          />
        ))}
      </div>
    </>
  )
}
