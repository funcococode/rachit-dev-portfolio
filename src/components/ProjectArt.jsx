import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'

/**
 * Cover artwork for a project. Uses the first screenshot in
 * `project.images` if present, otherwise draws a generative,
 * gently animated illustration themed to the project.
 */
export default function ProjectArt({ project, className = '', animated = true }) {
  const { theme: palette } = useTheme()
  const { images } = project
  // resolve the project's tone against the active colour theme
  const dark = project.theme.tone !== 'light'
  const theme = {
    art: project.theme.art,
    bg: dark ? palette.dark : palette.light,
    fg: dark ? palette.light : palette.dark,
    accent: dark ? palette.light : palette.dark,
  }
  if (images?.length) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ background: theme.bg }}>
        <img src={images[0]} alt={`${project.title} preview`} className="h-full w-full object-cover" />
      </div>
    )
  }
  const Art = ARTS[theme.art] ?? Sound
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: theme.bg }}>
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <Art t={theme} a={animated} />
      </svg>
    </div>
  )
}

const loop = (a, duration, extra = {}) =>
  a ? { duration, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', ...extra } : { duration: 0 }

/* ── Studio HR: rings of sound ─────────────────────────────── */
function Sound({ t, a }) {
  const bars = Array.from({ length: 36 })
  return (
    <g>
      <defs>
        <radialGradient id="snd-g" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={t.accent} stopOpacity="0.55" />
          <stop offset="1" stopColor={t.accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="400" cy="300" r="300" fill="url(#snd-g)" />
      {[80, 140, 200, 260, 320].map((r, i) => (
        <motion.circle
          key={r}
          cx="400"
          cy="300"
          r={r}
          fill="none"
          stroke={t.fg}
          strokeOpacity={0.18 - i * 0.025}
          style={{ transformBox: 'view-box', transformOrigin: '400px 300px' }}
          animate={a ? { scale: [1, 1 + 18 / r, 1] } : undefined}
          transition={loop(a, 4, { delay: i * 0.3, repeatType: 'loop' })}
        />
      ))}
      {bars.map((_, i) => {
        const h = 20 + Math.abs(Math.sin(i * 0.55)) * 140 * Math.sin((Math.PI * i) / bars.length)
        return (
          <motion.rect
            key={i}
            x={400 - bars.length * 6 + i * 12}
            width="6"
            rx="0"
            fill={i % 7 === 3 ? t.accent : t.fg}
            initial={{ height: h, y: 300 - h / 2 }}
            animate={a ? { height: [h, h * 0.35, h], y: [300 - h / 2, 300 - (h * 0.35) / 2, 300 - h / 2] } : undefined}
            transition={loop(a, 1.2 + (i % 5) * 0.2, { repeatType: 'loop', delay: i * 0.04 })}
          />
        )
      })}
    </g>
  )
}

/* ── SJ Travels: sunrise over layered hills ────────────────── */
function Horizon({ t, a }) {
  return (
    <g>
      <defs>
        <linearGradient id="hz-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.bg} />
          <stop offset="1" stopColor={t.accent} stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#hz-sky)" />
      <motion.circle
        cx="400"
        r="120"
        fill={t.accent}
        initial={{ cy: 360 }}
        animate={a ? { cy: [380, 300] } : undefined}
        transition={loop(a, 6)}
      />
      {[0, 1, 2, 3].map((i) => (
        <motion.path
          key={i}
          d={`M0 ${380 + i * 50} C 160 ${320 + i * 40}, 260 ${420 + i * 40}, 420 ${360 + i * 50} S 700 ${300 + i * 55}, 800 ${360 + i * 45} L800 600 L0 600Z`}
          fill={t.fg}
          fillOpacity={0.12 + i * 0.1}
          animate={a ? { x: [0, i % 2 ? 20 : -20] } : undefined}
          transition={loop(a, 7 + i)}
        />
      ))}
      {[0, 1, 2].map((i) => (
        <motion.path
          key={`b${i}`}
          d="M0 0 q 10 -8 20 0 q 10 -8 20 0"
          stroke={t.fg}
          strokeWidth="2"
          fill="none"
          initial={{ x: 180 + i * 60, y: 160 + i * 25 }}
          animate={a ? { x: [180 + i * 60, 260 + i * 60], y: [160 + i * 25, 140 + i * 25] } : undefined}
          transition={loop(a, 5 + i)}
        />
      ))}
    </g>
  )
}

/* ── Trip Unplanned: a route being drawn ───────────────────── */
function Route({ t, a }) {
  const pins = [
    [120, 460],
    [300, 250],
    [520, 380],
    [680, 150],
  ]
  return (
    <g>
      {Array.from({ length: 16 }).map((_, x) =>
        Array.from({ length: 12 }).map((__, y) => (
          <circle key={`${x}-${y}`} cx={25 + x * 50} cy={25 + y * 50} r="1.5" fill={t.fg} fillOpacity="0.18" />
        )),
      )}
      <motion.path
        d="M120 460 C 180 300, 240 260, 300 250 S 460 420, 520 380 S 620 180, 680 150"
        fill="none"
        stroke={t.accent}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="2 14"
        initial={{ pathLength: a ? 0 : 1 }}
        animate={a ? { pathLength: [0, 1] } : undefined}
        transition={loop(a, 3.5, { repeatDelay: 0.8 })}
      />
      {pins.map(([x, y], i) => (
        <motion.g
          key={i}
          initial={{ x, y }}
          animate={a ? { y: [y, y - 10, y] } : undefined}
          transition={loop(a, 2, { delay: i * 0.3, repeatType: 'loop' })}
        >
          <circle r="22" fill={t.accent} fillOpacity="0.15" />
          <path d="M0 -26 c -12 0 -20 9 -20 20 c 0 14 20 30 20 30 s 20 -16 20 -30 c 0 -11 -8 -20 -20 -20z" fill={i === 3 ? t.accent : t.fg} transform="translate(0 -14) scale(0.8)" />
          <circle cy="-26" r="6" fill={t.bg} />
        </motion.g>
      ))}
    </g>
  )
}

/* ── RateCraft: floating rate cards ────────────────────────── */
function Cards({ t, a }) {
  const cards = [
    { x: 170, y: 150, r: -10, hi: false },
    { x: 330, y: 110, r: 0, hi: true },
    { x: 490, y: 150, r: 10, hi: false },
  ]
  return (
    <g>
      <circle cx="400" cy="300" r="260" fill={t.accent} fillOpacity="0.12" />
      {cards.map((c, i) => (
        <motion.g
          key={i}
          initial={{ x: c.x, y: c.y, rotate: c.r }}
          animate={a ? { y: [c.y, c.y - 18] } : undefined}
          transition={loop(a, 2.6 + i * 0.4)}
          style={{ originX: '70px', originY: '180px' }}
        >
          <rect width="140" height="360" rx="0" fill={c.hi ? t.accent : t.fg} fillOpacity={c.hi ? 1 : 0.1} stroke={t.fg} strokeOpacity="0.25" />
          <rect x="18" y="26" width="60" height="8" rx="0" fill={c.hi ? t.bg : t.fg} fillOpacity="0.8" />
          <text x="18" y="96" fontSize="40" fontFamily="Geist Variable, sans-serif" fontWeight="700" fill={c.hi ? t.bg : t.fg}>
            ₹{[9, 24, 49][i]}k
          </text>
          {[0, 1, 2, 3, 4].map((l) => (
            <rect key={l} x="18" y={140 + l * 30} width={[100, 80, 92, 70, 86][l]} height="6" rx="0" fill={c.hi ? t.bg : t.fg} fillOpacity={c.hi ? 0.5 : 0.25} />
          ))}
          <rect x="18" y="300" width="104" height="36" rx="0" fill={c.hi ? t.bg : t.accent} />
        </motion.g>
      ))}
    </g>
  )
}

/* ── Pro Packages: an isometric stack ──────────────────────── */
function Stack({ t, a }) {
  const layer = (y, i) => (
    <motion.g
      key={i}
      initial={{ y }}
      animate={a ? { y: [y, y - 16 + i * 4] } : undefined}
      transition={loop(a, 2.4, { delay: i * 0.25 })}
    >
      <path d="M400 0 L560 80 L400 160 L240 80Z" fill={i === 0 ? t.accent : t.fg} fillOpacity={i === 0 ? 1 : 0.1 + i * 0.05} stroke={t.fg} strokeOpacity="0.35" />
      <path d="M240 80 L240 104 L400 184 L400 160Z" fill={t.fg} fillOpacity="0.08" />
      <path d="M560 80 L560 104 L400 184 L400 160Z" fill={t.fg} fillOpacity="0.16" />
    </motion.g>
  )
  return (
    <g>
      <text x="60" y="130" fontSize="120" fill={t.fg} fillOpacity="0.07" fontFamily="JetBrains Mono Variable, monospace">{'{ }'}</text>
      <text x="560" y="560" fontSize="120" fill={t.fg} fillOpacity="0.07" fontFamily="JetBrains Mono Variable, monospace">{'</>'}</text>
      {[330, 250, 170, 90].map((y, i) => layer(y, 3 - i))}
    </g>
  )
}

const ARTS = { sound: Sound, horizon: Horizon, route: Route, cards: Cards, stack: Stack }
