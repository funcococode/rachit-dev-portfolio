import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'

const COLS = 6

/**
 * Wrap every routed page. Leaving: six green columns drop down one after
 * another. Entering: they retract upward to reveal the new page.
 */
export default function PageTransition({ children }) {
  return (
    <>
      {children}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] flex">
        {Array.from({ length: COLS }).map((_, i) => (
          <motion.div
            key={i}
            className="-mx-px h-full flex-1 border-x border-bright/15 bg-deep"
            initial={{ scaleY: 1, originY: 0 }}
            animate={{ scaleY: 0, originY: 0, transition: { duration: 0.6, ease: EASE.quart, delay: 0.1 + i * 0.05 } }}
            exit={{ scaleY: [0, 1], originY: 1, transition: { duration: 0.5, ease: EASE.quart, delay: i * 0.05 } }}
          />
        ))}
      </div>
    </>
  )
}
