import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectArt from '../components/ProjectArt'
import SectionLabel from '../components/SectionLabel'
import SplitText from '../components/SplitText'
import { projects } from '../data/projects'
import { EASE, pad } from '../lib/motion'

export default function Work() {
  return (
    <section id="work" className="relative bg-ink py-28 md:py-40">
      <div className="container-x">
        <SectionLabel index="02">Selected Work</SectionLabel>
        <div className="mt-14 flex flex-col justify-between gap-6 md:mt-20 md:flex-row md:items-end">
          <h2 className="display text-[16vw] md:text-[9vw]">
            <SplitText as="span" by="chars" className="block">
              Selected
            </SplitText>
            <SplitText as="span" by="chars" delay={0.2} className="serif-i block text-ember">
              work
            </SplitText>
          </h2>
          <p className="max-w-xs text-ash">
            A handful of products, platforms and brand sites — each one with its own case study. Hover to preview, click to
            dive in.
          </p>
        </div>
        <ProjectIndex />
      </div>
    </section>
  )
}

/**
 * Project list with a floating preview window that follows the cursor.
 * The window holds every cover stacked vertically and slides between them.
 */
export function ProjectIndex() {
  const [active, setActive] = useState(-1)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 })
  const vx = useVelocity(sx)
  const rotate = useTransform(vx, [-2000, 0, 2000], [-12, 0, 12], { clamp: true })

  const onMove = (e) => {
    x.set(e.clientX)
    y.set(e.clientY)
  }

  return (
    <div className="relative mt-16 md:mt-24" onPointerMove={onMove} onPointerLeave={() => setActive(-1)}>
      <ul className="border-t border-line">
        {projects.map((p, i) => (
          <ProjectRow key={p.slug} project={p} index={i} active={active} onEnter={() => setActive(i)} />
        ))}
      </ul>

      {/* floating preview — desktop only */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
        style={{ x: sx, y: sy, rotate }}
      >
        <motion.div
          className="-mt-[140px] ml-8 h-[280px] w-[400px] overflow-hidden rounded-xl"
          initial={false}
          animate={{ scale: active >= 0 ? 1 : 0, opacity: active >= 0 ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE.expo }}
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

function ProjectRow({ project: p, index, active, onEnter }) {
  const dim = active >= 0 && active !== index
  return (
    <motion.li
      className="border-b border-line"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: EASE.expo, delay: index * 0.06 }}
    >
      <Link
        to={`/work/${p.slug}`}
        data-cursor="View"
        onPointerEnter={onEnter}
        className="group relative block py-8 md:py-12"
      >
        {/* sweep fill */}
        <span
          className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
          style={{ background: `linear-gradient(90deg, ${p.theme.accent}14, transparent 70%)` }}
        />
        <div
          className={`relative grid grid-cols-12 items-center gap-4 transition-opacity duration-500 ${dim ? 'opacity-30' : 'opacity-100'}`}
        >
          <span className="col-span-2 font-mono text-xs text-ash md:col-span-1">{pad(index + 1)}</span>
          <h3 className="col-span-10 text-[11vw] font-medium leading-none tracking-[-0.045em] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4 md:col-span-6 md:text-[5.2vw]">
            {p.title}
          </h3>
          <span className="col-span-7 col-start-3 text-sm text-ash md:col-span-3 md:col-start-auto">{p.category}</span>
          <span className="col-span-3 flex items-center justify-end gap-4 text-sm md:col-span-2">
            <span className="text-ash">{p.year}</span>
            <span className="flex h-9 w-9 -rotate-45 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:rotate-0 group-hover:border-ember group-hover:bg-ember group-hover:text-ink">
              →
            </span>
          </span>
        </div>
        {/* inline cover on touch screens */}
        <ProjectArt project={p} className="relative mt-6 aspect-[4/3] w-full rounded-xl md:hidden" />
      </Link>
    </motion.li>
  )
}
