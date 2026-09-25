import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import SpinBadge from '../components/SpinBadge'
import { COLORS, Stage } from '../components/Stage'
import Sticker from '../components/Sticker'
import VariableText from '../components/VariableText'
import { site } from '../data/site'
import { useGoToSection } from '../hooks/useGoToSection'
import { useLoader } from '../hooks/useLoader'
import { EASE } from '../lib/motion'

// position (in % of the hero) + look for each floating sticker
const STICKERS = [
  // t/l = desktop position, mt/ml = mobile position (only the first five show on mobile)
  { label: 'React', color: 'sky', rotate: -10, t: '10%', l: '40%', mt: '14%', ml: '48%' },
  { label: 'Next.js', color: 'cream', rotate: 7, t: '30%', l: '64%', mt: '26%', ml: '8%' },
  { label: `${site.experience}+ yrs`, color: 'lime', rotate: 12, t: '12%', l: '10%', mt: '34%', ml: '58%' },
  { label: 'Node.js', color: 'tang', rotate: -6, t: '42%', l: '80%', mt: '20%', ml: '68%' },
  { label: 'AWS ☁', color: 'pink', rotate: 9, t: '8%', l: '66%', mt: '40%', ml: '14%' },
  { label: 'Laravel', color: 'cobalt', rotate: -14, t: '58%', l: '86%' },
  { label: 'Docker 🐳', color: 'cream', rotate: 5, t: '82%', l: '36%' },
  { label: 'Postgres', color: 'lime', rotate: -8, t: '24%', l: '88%' },
]

export default function Hero() {
  const { ready } = useLoader()
  const ref = useRef(null)
  const go = useGoToSection()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -4])

  const pop = (d) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, ease: EASE.expo, delay: d },
  })

  return (
    <Stage bg={COLORS.cream} fg={COLORS.ink} className="overflow-hidden">
      <div ref={ref} className="relative flex min-h-[100svh] flex-col justify-end pb-8 pt-28 md:pb-12">
        {/* stickers — hidden until the loader is done so they pop in on cue */}
        {ready && (
          <div className="pointer-events-none absolute inset-0 [&>*]:pointer-events-auto">
            {STICKERS.map((s, i) => (
              <Sticker
                key={s.label}
                color={s.color}
                rotate={s.rotate}
                constraints={ref}
                delay={0.9 + i * 0.07}
                className={`top-[var(--mt)] left-[var(--ml)] md:top-[var(--t)] md:left-[var(--l)] ${i > 4 ? 'hidden md:block' : ''}`}
                style={{ '--t': s.t, '--l': s.l, '--mt': s.mt ?? s.t, '--ml': s.ml ?? s.l }}
              >
                {s.label}
              </Sticker>
            ))}
          </div>
        )}

        <motion.div style={{ y, rotate }} className="container-x relative">
          <motion.p {...pop(0.2)} className="mb-2 flex items-center gap-3 text-xl font-medium md:text-3xl">
            <motion.span
              className="inline-block origin-[70%_70%]"
              animate={ready ? { rotate: [0, 18, -8, 18, 0] } : {}}
              transition={{ duration: 1.4, delay: 1, repeat: Infinity, repeatDelay: 3 }}
            >
              👋
            </motion.span>
            hi, i’m
          </motion.p>
          <h1 className="display lowercase">
            <VariableText text={site.firstName.toLowerCase()} play={ready} delay={0.25} className="block text-[27vw] md:text-[19vw]" />
            <VariableText
              text={site.lastName.toLowerCase()}
              play={ready}
              delay={0.45}
              className="-mt-[0.08em] block text-[14vw] text-cobalt md:text-[14.4vw]"
            />
          </h1>
        </motion.div>

        <div className="container-x relative mt-8 grid items-end gap-8 md:mt-12 md:grid-cols-12">
          <motion.p {...pop(1)} className="max-w-md text-xl leading-snug md:col-span-6 md:text-2xl">
            Full-stack developer with <strong className="font-extrabold">{site.experience} years</strong> of building web &
            mobile products that people love to use — from React front-ends to the clouds they run on.
          </motion.p>
          <motion.div {...pop(1.1)} className="flex items-center gap-4 md:col-span-4 md:col-start-7">
            <button onClick={() => go('work')} className="sticker group flex items-center gap-2 bg-ink !text-cream">
              See my work
              <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
                ↓
              </motion.span>
            </button>
            <span className="muted hidden font-mono text-xs md:block">psst — the stickers are draggable</span>
          </motion.div>
          <motion.div {...pop(1.2)} className="hidden justify-end md:col-span-2 md:flex">
            <SpinBadge text="full-stack • web • mobile • cloud • " center="✦" size={130} />
          </motion.div>
        </div>
      </div>
    </Stage>
  )
}
