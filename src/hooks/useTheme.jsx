import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { DEFAULT_THEME, MODE_KEY, THEME_KEY, getTheme, paletteFor } from '../lib/themes'
import { EASE } from '../lib/motion'

const ThemeContext = createContext(null)
/**
 * { theme, mode, setTheme, setMode, toggleMode }
 * `theme.dark` / `theme.light` are already resolved for the current mode.
 */
export const useTheme = () => useContext(ThemeContext)

const read = (key, fallback) => {
  try {
    return localStorage.getItem(key) || fallback
  } catch {
    return fallback
  }
}
const save = (key, value) => {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* private mode — preference just won't persist */
  }
}
const systemMode = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const COLS = 6

/**
 * Holds the colour theme and light/dark mode. Any change plays a column
 * wipe in the incoming page colour, swaps the palette while the screen is
 * covered, then pulls the columns away.
 */
export function ThemeProvider({ children }) {
  const [id, setId] = useState(() => read(THEME_KEY, DEFAULT_THEME))
  const [mode, setModeState] = useState(() => read(MODE_KEY, systemMode()))
  const [wipe, setWipe] = useState(null) // { color, apply }
  const reduce = useReducedMotion()
  const busy = useRef(false)

  const base = getTheme(id)
  const palette = paletteFor(base, mode)

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = base.id
    root.dataset.mode = mode
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', palette.light)
    save(THEME_KEY, base.id)
    save(MODE_KEY, mode)
  }, [base.id, mode, palette.light])

  const transition = useCallback(
    (color, applyChange) => {
      if (busy.current) return
      if (reduce) return applyChange()
      busy.current = true
      setWipe({ color, apply: applyChange })
    },
    [reduce],
  )

  const setTheme = useCallback(
    (next) => {
      if (next === id) return
      transition(paletteFor(getTheme(next), mode).dark, () => setId(next))
    },
    [id, mode, transition],
  )

  const setMode = useCallback(
    (next) => {
      if (next === mode) return
      transition(paletteFor(base, next).light, () => setModeState(next))
    },
    [mode, base, transition],
  )

  const toggleMode = useCallback(() => setMode(mode === 'dark' ? 'light' : 'dark'), [mode, setMode])

  return (
    <ThemeContext.Provider value={{ theme: { ...base, ...palette }, mode, setTheme, setMode, toggleMode }}>
      {children}
      <AnimatePresence onExitComplete={() => (busy.current = false)}>
        {wipe && (
          <div key="wipe" aria-hidden className="pointer-events-none fixed inset-0 z-[95] flex">
            {Array.from({ length: COLS }).map((_, i) => (
              <motion.div
                key={i}
                className="-mx-px h-full flex-1"
                style={{ background: wipe.color, originY: 1 }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0, originY: 0, transition: { duration: 0.5, ease: EASE.quart, delay: i * 0.04 } }}
                transition={{ duration: 0.45, ease: EASE.quart, delay: i * 0.04 }}
                onAnimationComplete={() => {
                  if (i !== COLS - 1) return
                  wipe.apply()
                  setTimeout(() => setWipe(null), 60)
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </ThemeContext.Provider>
  )
}
