import { useAnimationFrame } from 'framer-motion'
import { useEffect, useRef } from 'react'

/**
 * A living audio waveform — the visual signature of the site.
 * Bars breathe on layered sine waves, swell around the cursor, and
 * can be driven by real audio via `getLevel` (returns 0–1).
 *
 * `energy` can be a number or a MotionValue (e.g. scroll-linked).
 */
export default function Waveform({
  bars = 96,
  className = '',
  barClassName = 'bg-bone',
  energy = 1,
  interactive = true,
  getLevel,
  accentEvery = 0,
}) {
  const wrap = useRef(null)
  const refs = useRef([])
  const mouse = useRef({ x: -1, active: 0, target: 0 })
  const live = useRef({ energy, getLevel })
  live.current = { energy, getLevel }

  useEffect(() => {
    if (!interactive) return
    const onMove = (e) => {
      const r = wrap.current?.getBoundingClientRect()
      if (!r) return
      const inside = e.clientY > r.top - 200 && e.clientY < r.bottom + 200
      mouse.current.x = (e.clientX - r.left) / r.width
      mouse.current.target = inside ? 1 : 0
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [interactive])

  useAnimationFrame((t) => {
    const time = t / 1000
    const m = mouse.current
    m.active += (m.target - m.active) * 0.06
    const { energy: en, getLevel: gl } = live.current
    const e = typeof en === 'number' ? en : en.get()
    const level = gl ? gl() : 0
    for (let i = 0; i < bars; i++) {
      const el = refs.current[i]
      if (!el) continue
      const p = i / bars
      // layered sines → organic motion
      let h =
        0.28 +
        0.22 * Math.sin(time * 1.6 + p * 9) +
        0.16 * Math.sin(time * 2.7 - p * 17) +
        0.1 * Math.sin(time * 0.7 + p * 31)
      // envelope: quieter at the edges
      h *= 0.35 + 0.65 * Math.sin(Math.PI * p)
      // cursor swell
      if (m.x >= 0) {
        const d = Math.abs(p - m.x)
        h += m.active * Math.exp(-(d * d) / 0.004) * 0.75
      }
      // live audio
      h += level * (0.4 + 0.6 * Math.abs(Math.sin(p * 40 + time * 8))) * Math.sin(Math.PI * p)
      h = Math.max(0.04, Math.min(1, h * e))
      el.style.transform = `scaleY(${h.toFixed(3)})`
    }
  })

  return (
    <div ref={wrap} className={`flex h-full w-full items-center justify-between gap-[2px] ${className}`}>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          ref={(el) => (refs.current[i] = el)}
          className={`block h-full flex-1 origin-center rounded-full will-change-transform ${
            accentEvery && i % accentEvery === 0 ? 'bg-ember' : barClassName
          }`}
          style={{ transform: 'scaleY(0.1)', maxWidth: 6 }}
        />
      ))}
    </div>
  )
}
