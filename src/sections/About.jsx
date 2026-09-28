import { motion } from 'framer-motion'
import CountUp from '../components/CountUp'
import ScrollRevealText from '../components/ScrollRevealText'
import SectionLabel from '../components/SectionLabel'
import { Stage } from '../components/Stage'
import { projects } from '../data/projects'
import { site } from '../data/site'
import { EASE } from '../lib/motion'

const BIO = `I’m Rachit — a full-stack developer who has spent five years turning ideas into *products* people actually enjoy using. I work across the whole stack: *precise* React interfaces, clean APIs, solid databases and the *cloud* they run on. I care most about the details users feel but never notice.`

const STATS = [
  { value: <CountUp to={site.experience} suffix="+" />, label: 'Years building for the web' },
  { value: <CountUp to={projects.length} />, label: 'Featured launches' },
  { value: <span>04</span>, label: 'Layers — UI, API, data, cloud' },
  { value: <span>01</span>, label: 'Person, end to end' },
]

export default function About() {
  return (
    <Stage id="about" tone="dark">
      <SectionLabel index="01" aside="Who I am">
        About
      </SectionLabel>

      <div className="grid md:grid-cols-12">
        <div className="border-b rule px-4 py-8 md:col-span-3 md:border-b-0 md:border-r md:px-8 md:py-12">
          <p className="eyebrow md:sticky md:top-24">A developer with an eye for detail</p>
        </div>
        <div className="px-4 py-12 md:col-span-9 md:px-8 md:py-24">
          <ScrollRevealText
            text={BIO}
            accentClassName="border border-current px-[0.2em]"
            className="text-[7.5vw] font-semibold leading-[1.1] tracking-[-0.03em] md:text-[3.8vw]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 border-t rule md:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            className={`flex min-h-[200px] flex-col justify-between p-4 md:min-h-[260px] md:p-8 ${
              i % 2 === 0 ? 'border-r rule' : 'md:border-r md:rule'
            } ${i < 2 ? 'max-md:border-b max-md:rule' : ''} ${i === 3 ? 'md:border-r-0' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: EASE.expo, delay: i * 0.07 }}
          >
            <span className="font-mono text-xs">0{i + 1}</span>
            <div>
              <span className="display block text-7xl md:text-8xl">{s.value}</span>
              <span className="muted mt-3 block text-sm">{s.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Stage>
  )
}
