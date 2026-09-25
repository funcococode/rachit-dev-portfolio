import { motion } from 'framer-motion'
import SectionLabel from '../components/SectionLabel'
import SplitText from '../components/SplitText'
import { COLORS, Stage } from '../components/Stage'
import { capabilities } from '../data/site'
import { pad } from '../lib/motion'

const LOOKS = [
  { cls: 'bg-cobalt text-cream', icon: '◐', rotate: -2 },
  { cls: 'bg-tang text-ink', icon: '⌘', rotate: 1.5 },
  { cls: 'bg-sky text-ink', icon: '☁', rotate: 2 },
  { cls: 'bg-ink text-cream', icon: '▣', rotate: -1.5 },
]

export default function Services() {
  return (
    <Stage bg={COLORS.cream} fg={COLORS.ink} className="py-28 md:py-40">
      <div className="container-x">
        <SectionLabel index="03">What I do</SectionLabel>
        <div className="mt-12 flex flex-col justify-between gap-6 md:mt-16 md:flex-row md:items-end">
          <SplitText as="h2" by="chars" className="display text-[15vw] lowercase md:text-[9vw]">
            what i do
          </SplitText>
          <p className="muted max-w-sm text-lg">
            One person, the whole pipeline — nothing gets lost between design, frontend, backend and deployment.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
          {capabilities.map((c, i) => {
            const look = LOOKS[i % LOOKS.length]
            return (
              <motion.article
                key={c.title}
                className={`group card-pop relative flex min-h-[340px] flex-col justify-between overflow-hidden p-7 md:min-h-[420px] md:p-10 ${look.cls}`}
                initial={{ opacity: 0, y: 100, rotate: look.rotate * 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: look.rotate }}
                whileHover={{ rotate: 0, y: -8, scale: 1.015 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: 'spring', stiffness: 120, damping: 15, delay: (i % 2) * 0.1 }}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm opacity-70">{pad(i + 1)}</span>
                  <span className="text-6xl leading-none transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[360deg] group-hover:scale-125 md:text-7xl">
                    {look.icon}
                  </span>
                </div>
                <div>
                  <h3 className="display text-5xl lowercase md:text-6xl">{c.title}</h3>
                  <p className="mt-4 max-w-md text-lg leading-snug opacity-80">{c.text}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {c.tags.map((t, ti) => (
                      <span
                        key={t}
                        className="translate-y-3 rounded-full border-2 border-current px-3 py-1 text-sm font-semibold opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100"
                        style={{ transitionDelay: `${ti * 60}ms` }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </Stage>
  )
}
