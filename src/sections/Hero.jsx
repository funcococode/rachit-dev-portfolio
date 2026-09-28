import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import FillBox from '../components/FillBox'
import { HRule, VRule } from '../components/Rules'
import { Stage } from '../components/Stage'
import VariableText from '../components/VariableText'
import { site } from '../data/site'
import { useGoToSection } from '../hooks/useGoToSection'
import { useLoader } from '../hooks/useLoader'
import { EASE } from '../lib/motion'

const META = [
  { k: 'Role', v: 'Full-stack developer' },
  { k: 'Experience', v: `${site.experience}+ years` },
  { k: 'Focus', v: 'Web · Mobile · Cloud' },
  { k: 'Based in', v: site.location },
]

export default function Hero() {
  const { ready } = useLoader()
  const ref = useRef(null)
  const go = useGoToSection()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  const fade = (d) => ({
    initial: { opacity: 0, y: 16 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, ease: EASE.expo, delay: d },
  })

  return (
    <Stage tone="light" className="pt-14 md:pt-16">
      <div ref={ref} className="flex min-h-[calc(100svh-3.5rem)] flex-col md:min-h-[calc(100svh-4rem)]">
        {/* meta row */}
        <div className="relative grid grid-cols-2 md:grid-cols-4">
          {META.map((m, i) => (
            <div key={m.k} className="relative px-4 py-4 md:px-8 md:py-5">
              <motion.p {...fade(0.3 + i * 0.06)} className="eyebrow muted">
                {m.k}
              </motion.p>
              <motion.p {...fade(0.36 + i * 0.06)} className="mt-1 text-sm font-semibold md:text-base">
                {m.v}
              </motion.p>
              {i < META.length - 1 && <VRule play={ready} delay={0.1 + i * 0.08} className={i === 1 ? 'max-md:hidden' : ''} />}
              {i < 2 && <HRule play={ready} className="md:hidden" />}
            </div>
          ))}
          <HRule play={ready} />
        </div>

        {/* the name */}
        <div className="relative flex flex-1 flex-col justify-center overflow-hidden px-4 py-10 md:px-8">
          <motion.h1 style={{ y: nameY }} className="display">
            <VariableText text={site.firstName} play={ready} delay={0.25} min={200} max={700} className="block text-[25vw] md:text-[16vw]" />
            <VariableText text={site.lastName} play={ready} delay={0.4} min={200} max={700} className="block text-[15.5vw] md:text-[15.4vw]" />
          </motion.h1>
          <HRule play={ready} delay={0.2} />
        </div>

        {/* bottom row */}
        <div className="grid md:grid-cols-12">
          <div className="relative px-4 py-6 md:col-span-6 md:px-8 md:py-8">
            <motion.p {...fade(0.9)} className="max-w-xl text-lg leading-snug md:text-xl">
              I design and build web & mobile products end to end — React and Next.js on the front, Node and Laravel behind
              it, and AWS or Google Cloud underneath. Quietly obsessed with the details.
            </motion.p>
            <VRule play={ready} delay={0.3} className="max-md:hidden" />
            <HRule play={ready} className="md:hidden" />
          </div>
          <div className="relative flex items-center gap-3 px-4 py-6 md:col-span-3 md:px-8">
            <motion.span {...fade(1)} className="flex items-center gap-3 text-sm font-semibold">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping bg-current opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 bg-current" />
              </span>
              {site.available ? 'Available for new projects' : 'Currently booked'}
            </motion.span>
            <VRule play={ready} delay={0.4} className="max-md:hidden" />
            <HRule play={ready} className="md:hidden" />
          </div>
          <motion.div {...fade(1.05)} className="md:col-span-3">
            <FillBox onClick={() => go('work')} className="h-full w-full px-4 py-6 text-left text-lg font-semibold md:px-8">
              <span>See selected work</span>
              <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
                ↓
              </motion.span>
            </FillBox>
          </motion.div>
        </div>
      </div>
    </Stage>
  )
}
