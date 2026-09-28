import { AnimatePresence, motion } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { useState } from 'react'
import { site } from '../data/site'
import FillBox from './FillBox'
import LocalTime from './LocalTime'
import RollText from './RollText'
import SectionLabel from './SectionLabel'
import SplitText from './SplitText'
import { Stage } from './Stage'
import VariableText from './VariableText'

/** Contact call-to-action + footer. Shared by every page. */
export default function Footer() {
  const lenis = useLenis()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  return (
    <Stage as="footer" id="contact" tone="light" className="overflow-hidden">
      <SectionLabel index="—" aside={site.available ? 'Available for new projects' : 'Currently booked'}>
        Contact
      </SectionLabel>

      <div className="grid border-b rule md:grid-cols-12">
        <div className="px-4 py-12 md:col-span-8 md:border-r md:rule md:px-8 md:py-20">
          <SplitText as="h2" className="display text-[14vw] md:text-[8vw]">
            Let’s build
          </SplitText>
          <SplitText as="h2" delay={0.12} className="display text-[14vw] md:text-[8vw]">
            something good.
          </SplitText>
        </div>
        <div className="flex items-stretch md:col-span-4">
          <a
              href={`mailto:${site.email}`}
              data-cursor="Write to me"
              className="group relative isolate flex w-full flex-col justify-between overflow-hidden bg-[var(--fg)] p-4 text-[var(--bg)] max-md:min-h-[220px] md:p-8"
            >
              <span className="absolute inset-0 -z-10 translate-y-full bg-[var(--bg)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              <span className="flex justify-between font-mono text-xs uppercase tracking-[0.16em] transition-colors duration-500 group-hover:text-[var(--fg)]">
                <span>Start a project</span>
                <span className="text-2xl leading-none transition-transform duration-500 group-hover:-rotate-45">→</span>
              </span>
              <span className="display text-5xl transition-colors duration-500 group-hover:text-[var(--fg)] md:text-6xl">Get in touch</span>
          </a>
        </div>
      </div>

      <div className="grid border-b rule md:grid-cols-12">
        <div className="border-b rule px-4 py-6 md:col-span-5 md:border-b-0 md:border-r md:px-8 md:py-8">
          <p className="eyebrow muted mb-3">Email</p>
          <button onClick={copy} className="group relative text-left text-2xl md:text-3xl" data-cursor={copied ? 'Copied' : 'Copy'}>
            <RollText>{site.email}</RollText>
            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute -top-6 left-0 font-mono text-xs"
                >
                  Copied to clipboard ✓
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
        <div className="border-b rule px-4 py-6 md:col-span-3 md:border-b-0 md:border-r md:px-8 md:py-8">
          <p className="eyebrow muted mb-3">Socials</p>
          <ul className="space-y-1">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-lg">
                  <RollText>{s.label}</RollText>
                  <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-b rule px-4 py-6 md:col-span-2 md:border-b-0 md:border-r md:px-8 md:py-8">
          <p className="eyebrow muted mb-3">Local time</p>
          <LocalTime className="text-lg" />
          <p className="muted mt-1 text-sm">{site.location}</p>
        </div>
        <FillBox
          onClick={() => lenis?.scrollTo(0, { duration: 2 })}
          className="px-4 py-6 text-left text-lg md:col-span-2 md:px-8 md:py-8"
        >
          <span>
            <span className="eyebrow mb-3 block opacity-70">Scroll</span>
            <RollText>Back to top</RollText>
          </span>
          <span>↑</span>
        </FillBox>
      </div>

      {/* full name, set large — letters change weight near the cursor */}
      <div className="border-b rule px-4 pb-4 pt-10 md:px-8 md:pt-16">
        <VariableText
          text={site.name}
          min={200}
          max={600}
          radius={220}
          className="display block whitespace-nowrap text-center text-[10.4vw] leading-none tracking-[-0.035em]"
        />
      </div>
      <div className="grid text-xs md:grid-cols-2">
        <span className="border-b rule px-4 py-4 md:border-b-0 md:border-r md:px-8">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>
        <span className="px-4 py-4 md:px-8 md:text-right">Designed & built with React and Framer Motion.</span>
      </div>
    </Stage>
  )
}
