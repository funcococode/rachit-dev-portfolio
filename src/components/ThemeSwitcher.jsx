import { motion } from 'framer-motion'
import { THEMES, paletteFor } from '../lib/themes'
import { useTheme } from '../hooks/useTheme'

/**
 * A row of square swatches — each split diagonally into the theme's two
 * colours. `size` is the swatch edge in px.
 */
export default function ThemeSwitcher({ size = 16, className = '', showLabel = false }) {
  const { theme, mode, setTheme } = useTheme()
  return (
    <div className={`flex items-center gap-2 ${className}`} role="radiogroup" aria-label="Colour theme">
      {THEMES.map((t) => {
        const active = t.id === theme.id
        const c = paletteFor(t, mode)
        return (
          <button
            key={t.id}
            role="radio"
            aria-checked={active}
            aria-label={`${t.name} theme`}
            title={t.name}
            onClick={() => setTheme(t.id)}
            className="relative flex items-center justify-center p-1"
          >
            <motion.span
              className="block border border-current"
              style={{
                width: size,
                height: size,
                background: `linear-gradient(135deg, ${c.dark} 0 50%, ${c.light} 50% 100%)`,
              }}
              whileHover={{ scale: 1.2, rotate: 45 }}
              animate={{ rotate: active ? 45 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            />
            {active && (
              <motion.span
                layoutId={`theme-ring-${size}`}
                className="absolute inset-0 border border-current"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        )
      })}
      {showLabel && <span className="ml-1 font-mono text-[11px] uppercase tracking-[0.16em]">{theme.name}</span>}
    </div>
  )
}
