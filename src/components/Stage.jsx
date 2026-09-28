import { motion, useInView, useMotionValue } from 'framer-motion'
import { createContext, forwardRef, useCallback, useContext, useEffect, useRef } from 'react'

/**
 * Two-tone colour system.
 *
 * Every <Stage> is a solid block: tone="light" is green on cream,
 * tone="dark" is cream on green. It exposes its colours as the CSS
 * variables --bg / --fg so children (FillBox hovers, tables, borders)
 * can invert themselves without knowing which tone they're in.
 *
 * <ColorStage> tracks which stage is currently under the navigation bar,
 * so the fixed nav and the cursor always match the block beneath them.
 */

// CSS variables, so every section re-colours instantly when the theme changes
export const COLORS = {
  green: 'var(--theme-dark)',
  cream: 'var(--theme-light)',
}

const StageContext = createContext(null)
export const useStage = () => useContext(StageContext)

export function ColorStage({ children, bg = COLORS.cream, fg = COLORS.green }) {
  const bgMV = useMotionValue(bg)
  const fgMV = useMotionValue(fg)

  const setColors = useCallback(
    (next) => {
      if (bgMV.get() === next.bg && fgMV.get() === next.fg) return
      bgMV.set(next.bg)
      fgMV.set(next.fg)
      const resolved = getComputedStyle(document.documentElement).getPropertyValue(next.bg.slice(4, -1)).trim()
      if (resolved) document.querySelector('meta[name="theme-color"]')?.setAttribute('content', resolved)
    },
    [bgMV, fgMV],
  )

  return (
    <StageContext.Provider value={{ bg: bgMV, fg: fgMV, setColors }}>
      <motion.div style={{ '--bg': bgMV, '--fg': fgMV }} className="min-h-screen bg-cream text-green">
        {children}
      </motion.div>
    </StageContext.Provider>
  )
}

export const Stage = forwardRef(function Stage(
  { as = 'section', tone = 'light', bg: bgProp, fg: fgProp, children, className = '', style, ...rest },
  outerRef,
) {
  const bg = bgProp ?? (tone === 'dark' ? COLORS.green : COLORS.cream)
  const fg = fgProp ?? (tone === 'dark' ? COLORS.cream : COLORS.green)
  const innerRef = useRef(null)
  const ref = outerRef ?? innerRef
  const stage = useStage()
  // "in view" = overlapping the strip at the very top of the screen, under the nav
  const underNav = useInView(ref, { margin: '0px 0px -94% 0px' })

  useEffect(() => {
    if (underNav) stage?.setColors({ bg, fg })
  }, [underNav, bg, fg, stage])

  const Tag = as
  return (
    <Tag
      ref={ref}
      className={`relative ${className}`}
      style={{ backgroundColor: bg, color: fg, '--bg': bg, '--fg': fg, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
})
