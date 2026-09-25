import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import CountUp from '../components/CountUp'
import ScrollRevealText from '../components/ScrollRevealText'
import SectionLabel from '../components/SectionLabel'
import SplitText from '../components/SplitText'
import { capabilities, site } from '../data/site'
import { projects } from '../data/projects'
import { EASE, pad } from '../lib/motion'

const BIO = `I’m Rachit — a full-stack developer with five years of turning ideas into *products* people actually enjoy using. I work across the whole stack, from pixel-perfect React interfaces to APIs, databases and the clouds they live on. And when the terminal closes, I write, sing and *produce* music — which is probably why I care so much about rhythm, timing and feel.`

export default function About() {
  return (
    <section id="about" className="relative bg-ink py-28 md:py-40">
      <div className="container-x">
        <SectionLabel index="01">About</SectionLabel>

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="eyebrow sticky top-32">A developer with an ear for detail</p>
          </div>
          <div className="md:col-span-9">
            <ScrollRevealText text={BIO} className="text-[7.5vw] font-medium leading-[1.12] tracking-[-0.03em] md:text-[3.6vw]" />
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-32 md:grid-cols-4">
          <Stat label="Years building for the web">
            <CountUp to={site.experience} suffix="+" />
          </Stat>
          <Stat label="Featured launches">
            <CountUp to={projects.length} />
          </Stat>
          <Stat label="Layers of the stack">
            <span>Full</span>
          </Stat>
          <Stat label="Songs in the drafts folder">
            <span className="serif-i">∞</span>
          </Stat>
        </div>

        <Capabilities />
      </div>
    </section>
  )
}

function Stat({ label, children }) {
  return (
    <div className="flex flex-col justify-between gap-10 bg-ink p-6 md:p-8">
      <span className="display text-6xl md:text-7xl">{children}</span>
      <span className="text-sm text-ash">{label}</span>
    </div>
  )
}

function Capabilities() {
  const [open, setOpen] = useState(0)
  return (
    <div className="mt-28 md:mt-40">
      <div className="mb-10 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
        <SplitText as="h3" className="display max-w-[12ch] text-5xl md:text-7xl">
          What I bring to the table
        </SplitText>
        <p className="max-w-sm text-ash">
          One person, the whole pipeline — so nothing gets lost between design, frontend, backend and deployment.
        </p>
      </div>
      <ul className="border-t border-line">
        {capabilities.map((c, i) => {
          const isOpen = open === i
          return (
            <li
              key={c.title}
              className="border-b border-line"
              onMouseEnter={() => setOpen(i)}
              onClick={() => setOpen(i)}
            >
              <div className="group grid cursor-pointer grid-cols-12 items-center gap-4 py-6 md:py-8">
                <span className="col-span-2 font-mono text-xs text-ash md:col-span-1">{pad(i + 1)}</span>
                <h4
                  className={`col-span-9 text-3xl font-medium tracking-[-0.03em] transition-all duration-500 md:col-span-6 md:text-5xl ${
                    isOpen ? 'translate-x-2 text-bone' : 'text-bone/40'
                  }`}
                >
                  {c.title}
                </h4>
                <div className="col-span-1 flex justify-end md:col-span-5">
                  <motion.span
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-lg"
                    animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? '#ff5b24' : 'rgba(0,0,0,0)', color: isOpen ? '#0b0a09' : '#efe8dc' }}
                    transition={{ duration: 0.5, ease: EASE.expo }}
                  >
                    +
                  </motion.span>
                </div>
              </div>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE.expo }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-12 gap-4 pb-8">
                      <p className="col-span-12 max-w-xl text-lg text-ash md:col-span-6 md:col-start-2">{c.text}</p>
                      <div className="col-span-12 flex flex-wrap items-start gap-2 md:col-span-5 md:justify-end">
                        {c.tags.map((t) => (
                          <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-bone/80">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
