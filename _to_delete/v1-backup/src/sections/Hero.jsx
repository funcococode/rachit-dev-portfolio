import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import SplitText from '../components/SplitText'
import Waveform from '../components/Waveform'
import LocalTime from '../components/LocalTime'
import { useGoToSection } from '../hooks/useGoToSection'
import { roles, site } from '../data/site'
import { useLoader } from '../hooks/useLoader'
import { EASE } from '../lib/motion'

export default function Hero() {
  const { ready } = useLoader()
  const ref = useRef(null)
  const go = useGoToSection()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.86])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const radius = useTransform(scrollYProgress, [0, 1], [0, 48])
  const lineX = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const line2X = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const energy = useTransform(scrollYProgress, [0, 0.7], [1, 0.1])

  const fade = (d) => ({
    initial: { opacity: 0, y: 20 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, ease: EASE.expo, delay: d },
  })

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] bg-ink">
      <motion.div
        style={{ scale, y, opacity, borderRadius: radius }}
        className="relative flex h-full flex-col justify-between overflow-hidden bg-ink pt-24 md:pt-28"
      >
        {/* ambient glow */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-[20vw] -top-[20vw] h-[60vw] w-[60vw] rounded-full bg-ember/20 blur-[120px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="container-x relative flex items-start justify-between gap-6">
          <motion.div {...fade(0.9)} className="max-w-[16rem] text-sm leading-relaxed text-ash">
            <span className="text-bone">Full-stack developer</span> with {site.experience}+ years of building products for
            startups & enterprise teams.
          </motion.div>
          <motion.div {...fade(1)} className="hidden text-right text-sm text-ash md:block">
            Based in {site.location}
            <br />
            <LocalTime className="text-bone" />
          </motion.div>
        </div>

        <div className="relative">
          <div className="container-x">
            <motion.div style={{ x: lineX }}>
              <SplitText
                as="h1"
                by="chars"
                play={ready}
                delay={0.15}
                stagger={0.045}
                duration={1.3}
                className="display text-[23vw] md:text-[16.5vw]"
              >
                {site.firstName}
              </SplitText>
            </motion.div>
            <motion.div style={{ x: line2X }} className="flex items-end justify-between gap-6">
              <motion.div {...fade(1.1)} className="mb-[2vw] hidden md:block">
                <RoleRotator active={ready} />
              </motion.div>
              <SplitText
                as="p"
                by="chars"
                play={ready}
                delay={0.4}
                stagger={0.035}
                duration={1.3}
                className="serif-i -mt-[3vw] text-right text-[19vw] leading-[0.9] text-ember md:text-[14vw]"
              >
                {site.lastName}
              </SplitText>
            </motion.div>
            <motion.div {...fade(1.1)} className="mt-3 md:hidden">
              <RoleRotator active={ready} />
            </motion.div>
          </div>
        </div>

        <div className="relative">
          <motion.div
            className="h-20 md:h-28"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={ready ? { opacity: 1, scaleY: 1 } : {}}
            transition={{ duration: 1.6, ease: EASE.expo, delay: 0.7 }}
          >
            <Waveform bars={120} energy={energy} className="container-x" barClassName="bg-bone/80" accentEvery={17} />
          </motion.div>
          <div className="container-x flex items-center justify-between py-5">
            <motion.span {...fade(1.3)} className="eyebrow">
              Code × Composition
            </motion.span>
            <motion.button {...fade(1.35)} onClick={() => go('work')} className="eyebrow flex items-center gap-3 text-bone">
              Scroll to explore
              <span className="relative block h-6 w-px overflow-hidden bg-line">
                <motion.span
                  className="absolute inset-x-0 top-0 h-1/2 bg-ember"
                  animate={{ y: ['-100%', '200%'] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: EASE.quart }}
                />
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function RoleRotator({ active }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!active) return
    const id = setInterval(() => setI((n) => (n + 1) % roles.length), 2000)
    return () => clearInterval(id)
  }, [active])
  return (
    <div className="flex items-center gap-3 text-lg md:text-2xl">
      <span className="text-ash">Also a</span>
      <span className="relative inline-flex h-[1.3em] min-w-[7.5em] overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={roles[i]}
            className="serif-i absolute left-0 text-bone"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE.expo }}
          >
            {roles[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  )
}
