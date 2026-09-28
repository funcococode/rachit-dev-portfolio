import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Custom cursor. No context needed — any element can opt in with:
 *   data-cursor="View"        → a solid label box
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

  return (
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100]" style={{ x: sx, y: sy }}>
      <AnimatePresence mode="wait" initial={false}>
        {label ? (
          <motion.div
            key="label"
            className="-translate-x-1/2 -translate-y-1/2 whitespace-nowrap border border-[var(--bg)] bg-[var(--fg)] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--bg)]"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: down ? 0.9 : 1, opacity: hidden ? 0 : 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
          >
            {label} ↗
          </motion.div>
        ) : (
          <motion.div
            key="dot"
            className="-ml-[20px] -mt-[20px] h-10 w-10 bg-white mix-blend-difference"
            initial={{ scale: 0 }}
            animate={{ scale: hidden ? 0 : down ? 0.18 : hover ? 0.7 : 0.26, rotate: hover ? 45 : 0 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
