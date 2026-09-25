import { motion, useAnimationFrame, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

/** A spinning record. Idles slowly, spins up to 33⅓ when `playing`. */
export default function Vinyl({ playing = false, className = '', label = 'SIDE B' }) {
  const rotate = useMotionValue(0)
  const speed = useMotionValue(12)
  const smooth = useSpring(speed, { stiffness: 20, damping: 12 })

  useEffect(() => speed.set(playing ? 200 : 12), [playing, speed])
  useAnimationFrame((_, d) => rotate.set((rotate.get() + (smooth.get() * d) / 1000) % 360))

  const grooves = Array.from({ length: 22 }, (_, i) => 96 + i * 6.4)

  return (
    <motion.div className={`relative aspect-square ${className}`} style={{ rotate }}>
      <svg viewBox="0 0 500 500" className="h-full w-full">
        <defs>
          <radialGradient id="vinyl-shine" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3a342e" />
            <stop offset="100%" stopColor="#1a1714" />
          </radialGradient>
          <linearGradient id="vinyl-sheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.09" />
            <stop offset="0.65" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <path id="vinyl-text" d="M250 250 m-62 0 a62 62 0 1 1 124 0 a62 62 0 1 1 -124 0" />
        </defs>
        <circle cx="250" cy="250" r="248" fill="url(#vinyl-shine)" />
        {grooves.map((r) => (
          <circle key={r} cx="250" cy="250" r={r} fill="none" stroke="#efe8dc" strokeOpacity="0.09" />
        ))}
        <circle cx="250" cy="250" r="248" fill="url(#vinyl-sheen)" />
        <circle cx="250" cy="250" r="247" fill="none" stroke="#efe8dc" strokeOpacity="0.15" strokeWidth="2" />
        <circle cx="250" cy="250" r="82" className="fill-tang" />
        <text className="fill-ink font-mono" fontSize="11" letterSpacing="3">
          <textPath href="#vinyl-text">RACHIT SHRIVASTAVA • {label} • ORIGINALS •</textPath>
        </text>
        <circle cx="250" cy="250" r="7" className="fill-ink" />
      </svg>
    </motion.div>
  )
}
