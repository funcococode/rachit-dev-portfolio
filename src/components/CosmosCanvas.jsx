import { useEffect, useRef } from 'react'

/**
 * A spiral galaxy drawn with tiny square "stars" on a canvas.
 * Stars orbit faster near the core (roughly Keplerian) and the cursor acts
 * like a gravitational lens, bending the light of stars that pass near it.
 * Uses the element's text colour, so it follows the active theme.
 */
export default function CosmosCanvas({ className = '', stars = 900 }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let dpr = 1
    let raf = 0
    let visible = true
    let color = getComputedStyle(canvas).color
    let frame = 0
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 }

    // build the galaxy: 3 arms, denser toward the core
    const arms = 3
    const pts = Array.from({ length: stars }, (_, i) => {
      const r = Math.pow(Math.random(), 1.8) // 0..1, biased to the centre
      const arm = i % arms
      const twist = r * 5.2
      const scatter = (Math.random() - 0.5) * (0.5 + r * 0.9)
      return {
        r,
        a: (arm / arms) * Math.PI * 2 + twist + scatter,
        size: Math.random() < 0.06 ? 2.4 : Math.random() < 0.3 ? 1.6 : 1,
        tw: Math.random() * Math.PI * 2, // twinkle phase
      }
    })

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (t) => {
      raf = requestAnimationFrame(draw)
      if (!visible) return
      if (++frame % 30 === 0) color = getComputedStyle(canvas).color

      mouse.x += (mouse.tx - mouse.x) * 0.12
      mouse.y += (mouse.ty - mouse.y) * 0.12

      const cx = w / 2
      const cy = h / 2
      const R = Math.min(w, h) * 0.46
      const time = t / 1000
      const speed = reduce ? 0.02 : 0.12

      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = color

      for (const p of pts) {
        const angle = p.a + (time * speed) / (0.25 + p.r) // faster near the core
        let x = cx + Math.cos(angle) * p.r * R
        let y = cy + Math.sin(angle) * p.r * R * 0.62 // tilted disc
        // gravitational lensing around the cursor
        const dx = x - mouse.x
        const dy = y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < 16000) {
          const d = Math.sqrt(d2) || 1
          const push = (1 - d / 126) * 26
          x += (dx / d) * push
          y += (dy / d) * push
        }
        ctx.globalAlpha = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(time * 2 + p.tw))
        ctx.fillRect(x, y, p.size, p.size)
      }

      // core
      ctx.globalAlpha = 1
      ctx.fillRect(cx - 3, cy - 3, 6, 6)
      // lens ring
      if (mouse.x > -1000) {
        ctx.globalAlpha = 0.5
        ctx.strokeStyle = color
        ctx.strokeRect(mouse.x - 24, mouse.y - 24, 48, 48)
      }
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.tx = e.clientX - r.left
      mouse.ty = e.clientY - r.top
      if (mouse.x < -1000) {
        mouse.x = mouse.tx
        mouse.y = mouse.ty
      }
    }
    const onLeave = () => {
      mouse.tx = mouse.ty = mouse.x = mouse.y = -9999
    }

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(canvas)
    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [stars])

  return <canvas ref={ref} className={`block h-full w-full ${className}`} aria-label="An animated spiral galaxy" role="img" />
}
