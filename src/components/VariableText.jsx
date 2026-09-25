import { useEffect, useRef } from 'react'

/**
 * Text whose letters get heavier (or lighter) as the cursor approaches —
 * powered by the variable `wght` axis of Bricolage Grotesque.
 * Letters also rise in on mount when `play` is true.
 *
 * <VariableText text="rachit" min={300} max={800} radius={260} />
 */
export default function VariableText({
  text,
  as: Tag = 'span',
  className = '',
  min = 250,
  max = 800,
  radius = 280,
  play = true,
  delay = 0,
}) {
  const refs = useRef([])
  const state = useRef({ x: -9999, y: -9999, raf: 0, weights: [] })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const s = state.current
    const tick = () => {
      let settled = true
      refs.current.forEach((el, i) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        const d = Math.hypot(s.x - (r.left + r.width / 2), s.y - (r.top + r.height / 2))
        const t = Math.max(0, 1 - d / radius)
        const target = max - (max - min) * t * t * (3 - 2 * t)
        const cur = s.weights[i] ?? max
        const next = cur + (target - cur) * 0.18
        if (Math.abs(next - target) > 0.5) settled = false
        s.weights[i] = next
        el.style.fontVariationSettings = `'wght' ${next.toFixed(0)}`
      })
      s.raf = settled ? 0 : requestAnimationFrame(tick)
    }
    const kick = () => {
      if (!s.raf) s.raf = requestAnimationFrame(tick)
    }
    const move = (e) => {
      s.x = e.clientX
      s.y = e.clientY
      kick()
    }
    const leave = () => {
      s.x = s.y = -9999
      kick()
    }
    if (fine) {
      window.addEventListener('pointermove', move)
      document.addEventListener('pointerleave', leave)
    }
    return () => {
      cancelAnimationFrame(s.raf)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [min, max, radius])

  return (
    <Tag className={className} aria-label={text}>
      {[...text].map((c, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.06em] align-bottom">
          <span
            ref={(el) => (refs.current[i] = el)}
            className="inline-block transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              fontVariationSettings: `'wght' ${max}`,
              transform: play ? 'translateY(0) rotate(0)' : 'translateY(110%) rotate(8deg)',
              transitionDelay: `${delay + i * 0.045}s`,
            }}
          >
            {c === ' ' ? ' ' : c}
          </span>
        </span>
      ))}
    </Tag>
  )
}
