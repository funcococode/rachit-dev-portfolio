import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { useRef, useState } from 'react'
import { site } from '../data/site'
import LocalTime from './LocalTime'
import Magnetic from './Magnetic'
import RollText from './RollText'
import SplitText from './SplitText'

/** Contact call-to-action + footer. Shared by every page. */
export default function Footer() {
  const ref = useRef(null)
  const lenis = useLenis()
  const [copied, setCopied] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const nameY = useTransform(scrollYProgress, [0.4, 1], ['60%', '0%'])
  const btnRotate = useTransform(scrollYProgress, [0, 1], [-90, 0])

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
    <footer id="contact" ref={ref} className="relative overflow-hidden bg-ink-2 pt-28 md:pt-40">
      <div className="container-x">
        <div className="flex items-center gap-4">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ember" />
          </span>
          <span className="eyebrow">{site.available ? 'Available for new projects' : 'Currently booked'}</span>
        </div>

        <div className="relative mt-8 border-b border-line pb-16 md:pb-24">
          <SplitText as="h2" by="words" className="display max-w-[14ch] text-[15vw] md:text-[9.5vw]">
            Let’s make
          </SplitText>
          <SplitText as="h2" by="words" delay={0.15} className="serif-i text-[15vw] leading-[0.9] text-ember md:text-[9.5vw]">
            something sing.
          </SplitText>

          <motion.div style={{ rotate: btnRotate }} className="mt-12 md:absolute md:bottom-24 md:right-0 md:mt-0">
            <Magnetic strength={0.45}>
              <a
                href={`mailto:${site.email}`}
                data-cursor="Write"
                className="group relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-ember text-ink md:h-52 md:w-52"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-bone transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                <span className="relative text-lg font-medium">Get in touch</span>
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow mb-3">Email</p>
            <button onClick={copy} className="group relative text-left text-2xl md:text-3xl" data-cursor={copied ? 'Copied' : 'Copy'}>
              <RollText>{site.email}</RollText>
              <AnimatePresence>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute -top-7 left-0 font-mono text-xs text-ember"
                  >
                    Copied to clipboard ✓
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow mb-3">Socials</p>
            <ul className="space-y-1">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-lg">
                    <RollText>{s.label}</RollText>
                    <span className="text-ash transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow mb-3">Local time</p>
            <LocalTime className="text-lg" />
            <p className="mt-1 text-sm text-ash">{site.location}</p>
          </div>
          <div className="md:col-span-2 md:text-right">
            <p className="eyebrow mb-3">Scroll</p>
            <button onClick={() => lenis?.scrollTo(0, { duration: 2 })} className="group text-lg">
              <RollText>Back to top ↑</RollText>
            </button>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <motion.p
          style={{ y: nameY }}
          className="display select-none whitespace-nowrap text-center text-[21.5vw] leading-[0.78] text-bone/[0.06]"
          aria-hidden
        >
          Shrivastava
        </motion.p>
      </div>
      <div className="container-x flex flex-col justify-between gap-2 border-t border-line py-6 text-xs text-ash md:flex-row">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span>Designed & built with React, Framer Motion & a lot of coffee.</span>
      </div>
    </footer>
  )
}

