import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { NAV_LINKS, useGoToSection } from '../hooks/useGoToSection'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { site } from '../data/site'
import { EASE } from '../lib/motion'
import Magnetic from './Magnetic'
import RollText from './RollText'

export default function Nav() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const go = useGoToSection()
  const lenis = useLenis()
  const { pathname } = useLocation()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 200 && !open)
  })

  useEffect(() => {
    if (open) lenis?.stop()
    else lenis?.start()
  }, [open, lenis])

  useEffect(() => setOpen(false), [pathname])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 mix-blend-difference"
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.6, ease: EASE.expo }}
      >
        <div className="container-x flex items-center justify-between py-5 md:py-7">
          <Link to="/" className="group flex items-center gap-3 text-bone" aria-label="Home">
            <span className="display text-xl tracking-[-0.04em]">
              <RollText>{site.initials}©</RollText>
            </span>
            <span className="hidden text-sm text-bone/70 md:inline">
              <RollText>Code by Rachit</RollText>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => go(l.id)} className="group relative text-sm text-bone">
                <RollText>{l.label}</RollText>
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-bone transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </button>
            ))}
          </nav>

          <Magnetic className="md:hidden">
            <button
              onClick={() => setOpen((o) => !o)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-bone/40 text-bone"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <motion.span className="absolute h-px w-4 bg-bone" animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3 }} />
              <motion.span className="absolute h-px w-4 bg-bone" animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 3 }} />
            </button>
          </Magnetic>
        </div>
      </motion.header>

      <AnimatePresence>{open && <MenuOverlay onClose={() => setOpen(false)} go={go} />}</AnimatePresence>
    </>
  )
}

function MenuOverlay({ onClose, go }) {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col justify-end bg-ink-2 px-5 pb-10 pt-28"
      initial={{ clipPath: 'circle(0% at 92% 5%)' }}
      animate={{ clipPath: 'circle(150% at 92% 5%)' }}
      exit={{ clipPath: 'circle(0% at 92% 5%)' }}
      transition={{ duration: 0.9, ease: EASE.quart }}
    >
      <p className="eyebrow mb-6">Navigation</p>
      <ul className="border-t border-line">
        {NAV_LINKS.map((l, i) => (
          <li key={l.id} className="overflow-hidden border-b border-line">
            <motion.button
              className="flex w-full items-baseline justify-between py-4 text-left"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.8, ease: EASE.expo, delay: 0.25 + i * 0.06 }}
              onClick={() => {
                onClose()
                setTimeout(() => go(l.id), 350)
              }}
            >
              <span className="display text-5xl">{l.label}</span>
              <span className="font-mono text-xs text-ash">0{i + 1}</span>
            </motion.button>
          </li>
        ))}
      </ul>
      <motion.div
        className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ash"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.6 } }}
        exit={{ opacity: 0 }}
      >
        {site.socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
            {s.label}
          </a>
        ))}
      </motion.div>
    </motion.div>
  )
}
