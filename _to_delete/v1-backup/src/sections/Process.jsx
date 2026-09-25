import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import SectionLabel from '../components/SectionLabel'
import { process } from '../data/site'
import { pad } from '../lib/motion'

/** Pinned section whose cards scroll horizontally as you scroll down. */
export default function Process() {
  const section = useRef(null)
  const track = useRef(null)
  const [distance, setDistance] = useState(0)
  const dist = useRef(0)
  dist.current = distance

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, (v) => -v * dist.current)
  const sx = useSpring(x, { stiffness: 120, damping: 30, mass: 0.4 })
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={section} className="relative bg-bone text-ink" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container-x mb-10 md:mb-14">
          <SectionLabel index="03" light>
            Process
          </SectionLabel>
        </div>
        <motion.div ref={track} style={{ x: sx }} className="flex w-max gap-5 px-5 md:gap-8 md:px-10">
          <div className="flex w-[80vw] shrink-0 flex-col justify-end md:w-[38vw]">
            <h2 className="display text-[15vw] md:text-[7.5vw]">
              How a <span className="serif-i text-ember">track</span> gets made.
            </h2>
            <p className="mt-6 max-w-sm text-ink/60">
              I build software the way I produce songs — listen, arrange, record in takes, then master until every detail is
              right.
            </p>
          </div>
          {process.map((s, i) => (
            <article
              key={s.k}
              className="group relative flex h-[62vh] w-[80vw] shrink-0 flex-col justify-between overflow-hidden rounded-3xl bg-ink p-7 text-bone md:h-[64vh] md:w-[32vw] md:p-10"
            >
              <span
                aria-hidden
                className="absolute -right-6 -top-10 font-serif text-[16rem] italic leading-none text-bone/[0.04] transition-transform duration-1000 group-hover:-translate-x-4"
              >
                {i + 1}
              </span>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ash">{pad(i + 1)} / {pad(process.length)}</span>
                <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-ember">
                  {s.k}
                </span>
              </div>
              <div>
                <h3 className="text-4xl font-medium tracking-[-0.035em] md:text-5xl">{s.title}</h3>
                <p className="mt-4 max-w-sm text-ash">{s.text}</p>
              </div>
            </article>
          ))}
          <div className="w-[5vw] shrink-0" />
        </motion.div>
        <div className="container-x mt-10">
          <div className="h-px w-full bg-ink/15">
            <motion.div className="h-full bg-ink" style={{ width: progress }} />
          </div>
        </div>
      </div>
    </section>
  )
}
