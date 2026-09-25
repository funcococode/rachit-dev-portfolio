import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Custom cursor. No context needed — any element can opt in with:
 *   data-cursor="View"        → big lime disc with a label
 *   data-cursor-hide          → hides the cursor (e.g. over iframes)
 * Links and buttons automatically get a hover state.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [state, setState] = useState({ label: '', hover: false, hidden: false, down: false })
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 900, damping: 60, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 900, damping: 60, mass: 0.35 })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mq.matches) return
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => {
      const t = e.target instanceof Element ? e.target : null
      const labelled = t?.closest('[data-cursor]')
      const hidden = !!t?.closest('[data-cursor-hide]')
      const hover = !!t?.closest('a, button, [role="button"], input, textarea, label')
      setState((s) => ({ ...s, label: labelled?.getAttribute('data-cursor') || '', hover, hidden }))
    }
    const down = () => setState((s) => ({ ...s, down: true }))
    const up = () => setState((s) => ({ ...s, down: false }))
    const leave = () => setState((s) => ({ ...s, hidden: true }))
    const enter = () => setState((s) => ({ ...s, hidden: false }))

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    document.addEventListener('pointerleave', leave)
    document.addEventListener('pointerenter', enter)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      document.removeEventListener('pointerleave', leave)
      document.removeEventListener('pointerenter', enter)
    }
  }, [x, y])

  if (!enabled) return null

  const { label, hover, hidden, down } = state
  const scale = hidden ? 0 : label ? 1 : hover ? 0.42 : 0.14
  const size = 104

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className={`-ml-[52px] -mt-[52px] flex items-center justify-center rounded-full ${
          label ? 'border-2 border-ink bg-lime' : 'bg-white mix-blend-difference'
        }`}
        style={{ width: size, height: size }}
        animate={{ scale: down ? scale * 0.8 : scale }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      >
        <AnimatePresence mode="wait">
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
