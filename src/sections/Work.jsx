import { animate, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectArt from '../components/ProjectArt'
import SectionLabel from '../components/SectionLabel'
import SplitText from '../components/SplitText'
import { COLORS, Stage } from '../components/Stage'
import { projects } from '../data/projects'
import { pad } from '../lib/motion'

/**
 * Horizontal, draggable gallery of project cards (mouse, touch or the
 * arrow buttons). Cards tilt toward the cursor and open their case study.
 */
export default function Work() {
  const viewport = useRef(null)
  const track = useRef(null)
  const x = useMotionValue(0)
  const [bounds, setBounds] = useState(0)
  const dragged = useRef(false)
  const progress = useTransform(x, (v) => (bounds ? Math.min(1, Math.max(0, -v / bounds)) : 0))
  const bar = useSpring(progress, { stiffness: 200, damping: 30 })
  const barScale = useTransform(bar, (v) => 0.12 + v * 0.88)

  useEffect(() => {
    const measure = () => setBounds(Math.max(0, track.current.scrollWidth - viewport.current.offsetWidth))
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const step = (dir) => {
    const card = track.current.firstElementChild?.getBoundingClientRect().width ?? 400
    const target = Math.min(0, Math.max(-bounds, x.get() - dir * (card + 24)))
    animate(x, target, { type: 'spring', stiffness: 120, damping: 22 })
  }

  return (
    <Stage id="work" bg={COLORS.lime} fg={COLORS.ink} className="overflow-hidden py-28 md:py-36">
      <div className="container-x">
        <SectionLabel index="02">Selected work</SectionLabel>
        <div className="mt-12 flex flex-col justify-between gap-8 md:mt-16 md:flex-row md:items-end">
          <SplitText as="h2" by="chars" className="display text-[17vw] lowercase md:text-[10vw]">
            things i built
          </SplitText>
          <div className="flex items-center gap-3">
            <span className="eyebrow muted mr-2 hidden md:block">drag or use arrows</span>
            {[-1, 1].map((d) => (
              <motion.button
                key={d}
                onClick={() => step(d)}
                whileHover={{ scale: 1.08, rotate: d * 6 }}
                whileTap={{ scale: 0.92 }}
                className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-cream text-2xl shadow-[3px_3px_0_0_var(--color-ink)]"
                aria-label={d < 0 ? 'Previous project' : 'Next project'}
              >
                {d < 0 ? '←' : '→'}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div ref={viewport} className="mt-14 md:mt-20" data-cursor="Drag">
        <motion.div
          ref={track}
          drag="x"
          dragConstraints={{ left: -bounds, right: 0 }}
          dragElastic={0.12}
          dragTransition={{ power: 0.25, timeConstant: 250 }}
          style={{ x }}
          onDragStart={() => (dragged.current = true)}
          onPointerDown={() => (dragged.current = false)}
          className="flex w-max cursor-grab gap-6 px-5 active:cursor-grabbing md:px-10"
        >
          {projects.map((p, i) => (
            <Card key={p.slug} project={p} index={i} dragged={dragged} />
          ))}
        </motion.div>
      </div>

      <div className="container-x mt-12 flex items-center gap-6">
        <span className="font-mono text-sm">{pad(1)}</span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/15">
          <motion.div className="h-full origin-left rounded-full bg-ink" style={{ scaleX: barScale }} />
        </div>
        <span className="font-mono text-sm">{pad(projects.length)}</span>
      </div>
    </Stage>
  )
}

function Card({ project: p, index, dragged }) {
  const navigate = useNavigate()
  const ref = useRef(null)
  const rx = useSpring(0, { stiffness: 200, damping: 18 })
  const ry = useSpring(0, { stiffness: 200, damping: 18 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onClick={() => !dragged.current && navigate(`/work/${p.slug}`)}
      initial={{ opacity: 0, y: 80, rotate: index % 2 ? 3 : -3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 120, damping: 16, delay: index * 0.07 }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="group card-pop relative flex w-[82vw] shrink-0 select-none flex-col overflow-hidden bg-cream md:w-[44vw] lg:w-[36vw]"
      role="link"
      aria-label={`${p.title} case study`}
      data-cursor="View"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/work/${p.slug}`)}
    >
      <div className="relative m-3 overflow-hidden rounded-[20px] border-2 border-ink">
        <div className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
          <ProjectArt project={p} className="pointer-events-none aspect-[4/3] w-full" />
        </div>
        <span className="sticker absolute left-4 top-4 bg-cream text-xs">{p.category}</span>
        <motion.span
          className="absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink text-2xl text-ink"
          style={{ background: p.theme.accent }}
          initial={false}
          whileHover={{ rotate: 45 }}
        >
          ↗
        </motion.span>
      </div>
      <div className="flex items-end justify-between gap-4 px-6 pb-6 pt-3">
        <div>
          <span className="font-mono text-xs opacity-60">
            {pad(index + 1)} — {p.year}
          </span>
          <h3 className="display mt-2 text-4xl md:text-5xl">{p.title}</h3>
        </div>
        <p className="max-w-[16rem] text-right text-sm leading-snug opacity-70">{p.tagline}</p>
      </div>
      {/* fill-up on hover */}
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
        style={{ background: p.theme.accent === '#d7ff3a' || p.theme.accent === '#c6f432' ? COLORS.ink : p.theme.accent }}
      />
    </motion.article>
  )
}

