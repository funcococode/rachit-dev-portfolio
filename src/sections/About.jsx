import { motion } from 'framer-motion'
import CountUp from '../components/CountUp'
import ScrollRevealText from '../components/ScrollRevealText'
import SectionLabel from '../components/SectionLabel'
import { COLORS, Stage } from '../components/Stage'
import { projects } from '../data/projects'
import { site } from '../data/site'

const BIO = `I’m Rachit — a full-stack developer who has spent the last five years turning ideas into *products* people actually enjoy using. I move comfortably across the whole stack: *pixel-perfect* React interfaces, clean APIs, solid databases and the *cloud* they live on. I care about the details users feel but never notice.`

const STATS = [
  { value: <CountUp to={site.experience} suffix="+" />, label: 'years shipping for the web', bg: 'bg-lime', rotate: -6 },
  { value: <CountUp to={projects.length} />, label: 'featured launches', bg: 'bg-pink', rotate: 4 },
  { value: <span>A–Z</span>, label: 'frontend to deployment', bg: 'bg-tang', rotate: -3 },
  { value: <span>∞</span>, label: 'cups of chai', bg: 'bg-sky', rotate: 7 },
]

export default function About() {
  return (
    <Stage id="about" bg={COLORS.cobalt} fg={COLORS.cream} className="py-28 md:py-40">
      <div className="container-x">
        <SectionLabel index="01">About me</SectionLabel>
        <ScrollRevealText
          text={BIO}
          className="mt-14 text-[8vw] font-bold leading-[1.08] tracking-[-0.035em] md:mt-20 md:text-[4.4vw]"
        />

        <div className="mt-24 grid grid-cols-2 gap-5 md:mt-32 md:grid-cols-4 md:gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              className={`card-pop flex aspect-square flex-col justify-between p-5 text-ink md:p-7 ${s.bg}`}
              initial={{ opacity: 0, y: 80, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: s.rotate }}
              whileHover={{ rotate: 0, scale: 1.04, y: -6 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: 'spring', stiffness: 160, damping: 14, delay: i * 0.08 }}
            >
              <span className="display text-6xl md:text-8xl">{s.value}</span>
              <span className="text-base font-semibold leading-tight md:text-lg">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Stage>
  )
}
