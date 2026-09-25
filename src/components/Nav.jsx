import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS, useGoToSection } from '../hooks/useGoToSection'
import { site } from '../data/site'
import { EASE } from '../lib/motion'
import Magnetic from './Magnetic'
import RollText from './RollText'
import { COLORS, useStage } from './Stage'

/**
 * Floating pill nav. Its colours are the inverse of whatever section is on
 * screen, so it always stands out as the page morphs.
 */
export default function Nav() {
  const [compact, setCompact] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const go = useGoToSection()
  const lenis = useLenis()
  const { pathname } = useLocation()
  const stage = useStage()

  useMotionValueEvent(scrollY, 'change', (y) => setCompact(y > 120))

  useEffect(() => {
    if (open) lenis?.stop()
    else lenis?.start()
  }, [open, lenis])

  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  const isActive = (l) => (l.to ? pathname === l.to : false)

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="container-x flex items-start justify-between pt-4 md:pt-6">
          <Magnetic className="pointer-events-auto">
            <Link to="/" aria-label="Home">
              <motion.span
                className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-extrabold md:h-14 md:w-14"
                style={{ backgroundColor: stage?.fg, color: stage?.bg }}
                whileHover={{ rotate: -12, scale: 1.05 }}
              >
                {site.initials}
              </motion.span>
            </Link>
          </Magnetic>

          <motion.nav
            className="pointer-events-auto hidden items-center gap-1 rounded-full p-1.5 md:flex"
            style={{ backgroundColor: stage?.fg, color: stage?.bg }}
            animate={{ scale: compact ? 0.92 : 1, y: compact ? -4 : 0 }}
            transition={{ duration: 0.5, ease: EASE.expo }}
          >
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => go(l.to ?? l.id)}
                className={`group relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(l) ? 'bg-lime text-ink' : 'hover:bg-[color-mix(in_srgb,currentColor_14%,transparent)]'
                }`}
              >
                <RollText>{l.label}</RollText>
              </button>
            ))}
          </motion.nav>

          <div className="pointer-events-auto flex items-center gap-3">
            <motion.a
              href={`mailto:${site.email}`}
              className="sticker hidden bg-lime text-sm lg:inline-flex lg:items-center lg:gap-2"
              whileHover={{ rotate: -4, scale: 1.05 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
              </span>
              Open to work
            </motion.a>
            <Magnetic className="md:hidden">
              <motion.button
                onClick={() => setOpen((o) => !o)}
                className="relative flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: open ? COLORS.lime : stage?.fg, color: open ? COLORS.ink : stage?.bg }}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
              >
                <motion.span className="absolute h-0.5 w-5 rounded bg-current" animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }} />
                <motion.span className="absolute h-0.5 w-5 rounded bg-current" animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }} />
              </motion.button>
            </Magnetic>
          </div>
        </div>
      </header>

      <AnimatePresence>{open && <MenuOverlay onClose={() => setOpen(false)} go={go} />}</AnimatePresence>
    </>
  )
}

const MENU_COLORS = ['bg-cobalt text-cream', 'bg-lime text-ink', 'bg-tang text-ink', 'bg-pink text-ink', 'bg-sky text-ink']

function MenuOverlay({ onClose, go }) {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col justify-end bg-ink px-4 pb-8 pt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 0.3 } }}
    >
      <ul className="flex flex-col gap-2">
        {NAV_LINKS.map((l, i) => (
          <motion.li
            key={l.label}
            initial={{ x: '-110%', rotate: -6 }}
            animate={{ x: 0, rotate: i % 2 ? 1.5 : -1.5 }}
            exit={{ x: '110%', rotate: 6, transition: { duration: 0.4, ease: EASE.quart, delay: i * 0.03 } }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.05 + i * 0.06 }}
          >
            <button
              className={`flex w-full items-center justify-between rounded-3xl border-2 border-ink px-6 py-4 text-left ${MENU_COLORS[i % MENU_COLORS.length]}`}
              onClick={() => {
                onClose()
                setTimeout(() => go(l.to ?? l.id), 350)
              }}
            >
              <span className="display text-5xl">{l.label}</span>
              <span className="text-2xl">↗</span>
            </button>
          </motion.li>
        ))}
      </ul>
      <p className="eyebrow mt-8 text-cream/60">{site.email}</p>
    </motion.div>
  )
}
