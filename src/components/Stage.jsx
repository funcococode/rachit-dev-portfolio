import { animate, motion, useInView, useMotionValue } from 'framer-motion'
import { createContext, forwardRef, useCallback, useContext, useEffect, useRef } from 'react'

/**
 * Kinetic colour system.
 *
 * <ColorStage> owns two motion values — the page background and foreground —
 * and paints them on a full-page wrapper. Each <Stage bg fg> section tells the
 * stage "I'm on screen now", and the whole page smoothly morphs to its colours.
 */

export const COLORS = {
  cream: '#f3eee3',
  ink: '#141414',
  cobalt: '#2f3cff',
  lime: '#d4ff3a',
  tang: '#ff6a3d',
  pink: '#ffb4dc',
  sky: '#9fd8ff',
}

const StageContext = createContext(null)
export const useStage = () => useContext(StageContext)

export function ColorStage({ children, bg = COLORS.cream, fg = COLORS.ink }) {
  const bgMV = useMotionValue(bg)
  const fgMV = useMotionValue(fg)
  const current = useRef({ bg, fg })

  const setColors = useCallback(
    (next) => {
      if (current.current.bg === next.bg && current.current.fg === next.fg) return
      current.current = next
      animate(bgMV, next.bg, { duration: 0.9, ease: [0.33, 1, 0.68, 1] })
      animate(fgMV, next.fg, { duration: 0.9, ease: [0.33, 1, 0.68, 1] })
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next.bg)
    },
    [bgMV, fgMV],
  )

  return (
    <StageContext.Provider value={{ bg: bgMV, fg: fgMV, setColors }}>
      <motion.div style={{ backgroundColor: bgMV, color: fgMV }} className="min-h-screen">
        {children}
      </motion.div>
    </StageContext.Provider>
  )
}

/** A section that claims the page colours while it's in the middle of the viewport. */
export const Stage = forwardRef(function Stage({ as = 'section', bg, fg, children, className = '', ...rest }, outerRef) {
  const innerRef = useRef(null)
  const ref = outerRef ?? innerRef
  const stage = useStage()
  const inView = useInView(ref, { margin: '-50% 0px -50% 0px' })

  useEffect(() => {
    if (inView) stage?.setColors({ bg, fg })
  }, [inView, bg, fg, stage])

  const Tag = as
  return (
    <Tag ref={ref} className={`relative ${className}`} {...rest}>
      {children}
    </Tag>
  )
})
