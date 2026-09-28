// ─────────────────────────────────────────────────────────────
//  Colour themes. Each theme is two colours per mode:
//    dark  → background of "dark" sections, text on "light" sections
//    light → background of "light" sections, text on "dark" sections
//  `night` is the same theme in dark mode: the page becomes a deep tone
//  with the theme colour as the accent blocks.
//  index.css mirrors these values so the page paints correctly before
//  React loads — keep them in sync.
// ─────────────────────────────────────────────────────────────
export const THEMES = [
  { id: 'forest', name: 'Forest', dark: '#064e3b', light: '#f8e7c9', night: { dark: '#f8e7c9', light: '#05261d' } },
  { id: 'neon', name: 'Neon', dark: '#10140a', light: '#d9ff42', night: { dark: '#d9ff42', light: '#10140a' } },
  { id: 'ember', name: 'Ember', dark: '#c2410c', light: '#fff1e3', night: { dark: '#ff7a3d', light: '#1c0d05' } },
  { id: 'scarlet', name: 'Scarlet', dark: '#b91c1c', light: '#fdeceb', night: { dark: '#ff5c56', light: '#1c0707' } },
  { id: 'cobalt', name: 'Cobalt', dark: '#1e3fd9', light: '#eef1ff', night: { dark: '#8298ff', light: '#070b22' } },
]

export const DEFAULT_THEME = 'forest'
export const THEME_KEY = 'rs-theme'
export const MODE_KEY = 'rs-mode'
export const getTheme = (id) => THEMES.find((t) => t.id === id) ?? THEMES[0]

/** The two colours actually in use for a theme + mode. */
export const paletteFor = (t, mode) => (mode === 'dark' ? t.night : { dark: t.dark, light: t.light })
