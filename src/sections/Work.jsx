import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectArt from '../components/ProjectArt'
import SectionLabel from '../components/SectionLabel'
import SplitText from '../components/SplitText'
import { Stage } from '../components/Stage'
import { projects } from '../data/projects'
import { EASE, pad } from '../lib/motion'

export default function Work() {
  return (
    <Stage id="work" tone="light">
      <SectionLabel index="02" aside={`${pad(projects.length)} projects`}>
        Selected work
      </SectionLabel>
      <div className="grid border-b rule md:grid-cols-12">
        <div className="px-4 py-10 md:col-span-8 md:border-r md:rule md:px-8 md:py-16">
          <SplitText as="h2" by="chars" className="display text-[17vw] md:text-[9vw]">
            Selected work
          </SplitText>
        </div>
        <div className="flex items-end px-4 pb-10 md:col-span-4 md:px-8 md:py-16">
          <p className="muted max-w-sm text-lg">
            Products, platforms and brand sites — each with a full case study. Hover a row to preview, click to open.
          </p>
        </div>
      </div>
      <ProjectTable />
    </Stage>
  )
}

/** Ruled project table with a boxed preview that trails the cursor. */
function ProjectTable() {
  const [active, setActive] = useState(-1)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 24, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 180, damping: 24, mass: 0.5 })

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        x.set(e.clientX)
        y.set(e.clientY)
      }}
      onPointerLeave={() => setActive(-1)}
    >
      <div className="eyebrow muted hidden grid-cols-12 border-b rule md:grid">
        <span className="col-span-1 border-r rule px-8 py-3">No.</span>
        <span className="col-span-5 border-r rule px-8 py-3">Project</span>
        <span className="col-span-4 border-r rule px-8 py-3">Type</span>
        <span className="col-span-2 px-8 py-3">Year</span>
      </div>

      {projects.map((p, i) => (
        <Row key={p.slug} p={p} i={i} onEnter={() => setActive(i)} />
      ))}

      {/* preview window (desktop) */}
      <motion.div className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block" style={{ x: sx, y: sy }}>
        <motion.div
          className="ml-8 -mt-[130px] h-[260px] w-[360px] overflow-hidden border border-[var(--fg)]"
          initial={false}
          animate={{ clipPath: active >= 0 ? 'inset(0% 0% 0% 0%)' : 'inset(50% 50% 50% 50%)' }}
          transition={{ duration: 0.6, ease: EASE.expo }}
        >
          <motion.div
            className="h-full w-full"
            animate={{ y: `${-Math.max(active, 0) * 100}%` }}
            transition={{ duration: 0.7, ease: EASE.quart }}
          >
            {projects.map((p) => (
              <ProjectArt key={p.slug} project={p} className="h-full w-full" />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function Row({ p, i, onEnter }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, delay: i * 0.05 }}
      className="border-b rule"
    >
      <Link
        to={`/work/${p.slug}`}
        data-cursor="Case study"
        onPointerEnter={onEnter}
        className="group relative isolate block overflow-hidden"
      >
        <span className="absolute inset-0 -z-10 translate-y-full bg-[var(--fg)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
        <div className="grid grid-cols-12 items-center transition-colors duration-500 group-hover:text-[var(--bg)]">
          <span className="col-span-2 self-stretch px-4 py-6 font-mono text-xs md:col-span-1 md:border-r md:rule md:px-8 md:py-10">
            {pad(i + 1)}
          </span>
          <h3 className="col-span-10 px-4 py-6 text-4xl font-semibold tracking-[-0.035em] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 md:col-span-5 md:border-r md:rule md:px-8 md:py-10 md:text-6xl">
            {p.title}
          </h3>
          <span className="col-span-8 col-start-3 px-4 pb-6 text-sm md:col-span-4 md:col-start-auto md:self-stretch md:border-r md:rule md:px-8 md:py-10 md:text-base md:flex md:items-center">
            {p.category}
          </span>
          <span className="col-span-2 flex items-center justify-between px-4 pb-6 text-sm md:self-stretch md:px-8 md:py-10 md:text-base">
            <span>{p.year}</span>
            <span className="hidden text-2xl transition-transform duration-500 group-hover:-rotate-45 md:inline">→</span>
          </span>
        </div>
        <div className="px-4 pb-6 md:hidden">
          <ProjectArt project={p} className="aspect-[4/3] w-full border rule" />
        </div>
      </Link>
    </motion.div>
  )
}
