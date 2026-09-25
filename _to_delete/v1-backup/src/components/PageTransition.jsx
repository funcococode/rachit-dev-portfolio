import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'

/**
 * Wrap every routed page. On leave, an ember curtain rises from the bottom;
 * on enter, an ink curtain peels away upward to reveal the new page.
 */
export default function PageTransition({ children, label }) {
  return (
    <>
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[80] origin-bottom bg-ember"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.75, ease: EASE.quart }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[80] flex origin-top items-center justify-center bg-ink-2"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.9, ease: EASE.quart, delay: 0.15 } }}
        exit={{ scaleY: 0 }}
      >
        {label && (
          <motion.span
            className="serif-i text-5xl text-bone md:text-8xl"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </>
  )
}
