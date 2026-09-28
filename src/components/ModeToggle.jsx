import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { EASE } from '../lib/motion'

/**
 * Light / dark switch drawn as a square: a filled half-square that slides
 * across, plus a label that rolls between "Light" and "Dark".
 */
export default function ModeToggle({ className = '', showLabel = true }) {
  const { mode, toggleMode } = useTheme()
  const dark = mode === 'dark'
  return (
    <button
      onClick={toggleMode}
      role="switch"
      aria-checked={dark}
      aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
      title={`Switch to ${dark ? 'light' : 'dark'} mode`}
      className={`group flex items-center gap-3 ${className}`}
    >
      <span className="relative block h-4 w-8 overflow-hidden border border-current">
        <motion.span
          className="absolute inset-y-0 w-1/2 bg-current"
          initial={false}
          animate={{ left: dark ? '50%' : '0%' }}
          transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        />
      </span>
      {showLabel && (
        <span className="relative inline-flex h-[1.4em] overflow-hidden font-mono text-[11px] uppercase leading-[1.4em] tracking-[0.16em]">
          {/* invisible sizer — reserves room for the longer word */}
          <span className="invisible">Light</span>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={mode}
              className="absolute left-0"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.4, ease: EASE.expo }}
            >
              {dark ? 'Dark' : 'Light'}
            </motion.span>
          </AnimatePresence>
        </span>
      )}
    </button>
  )
}
