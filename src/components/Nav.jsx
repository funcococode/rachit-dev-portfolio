import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS, useGoToSection } from '../hooks/useGoToSection'
import { site } from '../data/site'
import { EASE } from '../lib/motion'
import FillBox from './FillBox'
import LocalTime from './LocalTime'
import RollText from './RollText'
import ModeToggle from './ModeToggle'
import ThemeSwitcher from './ThemeSwitcher'

/**
 * A ruled navigation bar split into cells. It takes the colours of whatever
 * section is underneath and slides away while you scroll down.
 */
export default function Nav() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const go = useGoToSection()
  const lenis = useLenis()
  const { pathname } = useLocation()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 160)
  })

  useEffect(() => {
    if (open) lenis?.stop()
    else lenis?.start()
  }, [open, lenis])

  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 border-b rule bg-[var(--bg)] text-[var(--fg)]"
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.5, ease: EASE.expo }}
      >
        <div className="flex h-14 items-stretch md:h-16">
          <Link to="/" className="group flex items-center gap-3 border-r rule px-4 md:px-8" aria-label="Home">
            <span className="flex h-8 w-8 items-center justify-center bg-[var(--fg)] text-xs font-bold text-[var(--bg)]">
              {site.initials}
            </span>
            <span className="hidden text-sm font-semibold sm:inline">
              <RollText>{site.name}</RollText>
            </span>
          </Link>

          <nav className="hidden flex-1 items-stretch justify-end md:flex">
            {NAV_LINKS.map((l) => {
              const active = l.to && pathname === l.to
              return (
                <FillBox
                  key={l.label}
                  onClick={() => go(l.to ?? l.id)}
                  className={`border-l rule px-4 text-sm font-medium lg:px-6 ${active ? 'bg-[var(--fg)] text-[var(--bg)]' : ''}`}
                >
                  {l.label}
                </FillBox>
              )
            })}
            <div className="flex items-center border-l rule px-3 lg:px-4">
              <ThemeSwitcher size={14} />
            </div>
            <div className="flex items-center border-l rule px-4">
              <ModeToggle showLabel={false} className="lg:hidden" />
              <ModeToggle className="hidden lg:flex" />
            </div>
            <div className="hidden items-center border-l rule px-6 font-mono text-xs xl:flex">
              <LocalTime />
            </div>
          </nav>

          <div className="ml-auto flex items-center border-l rule px-4 md:hidden">
            <ModeToggle showLabel={false} />
          </div>
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex w-14 items-center justify-center border-l rule md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className="relative block h-3 w-5">
              <motion.span className="absolute left-0 top-0 h-px w-full bg-current" animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} />
              <motion.span className="absolute left-0 top-1/2 h-px w-full bg-current" animate={{ opacity: open ? 0 : 1 }} />
              <motion.span className="absolute bottom-0 left-0 h-px w-full bg-current" animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>{open && <MenuOverlay onClose={() => setOpen(false)} go={go} />}</AnimatePresence>
    </>
  )
}

function MenuOverlay({ onClose, go }) {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col bg-green pt-14 text-cream"
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.7, ease: EASE.quart }}
    >
      <ul className="mt-auto border-t border-cream">
        {NAV_LINKS.map((l, i) => (
          <li key={l.label} className="overflow-hidden border-b border-cream">
            <motion.button
              className="flex w-full items-baseline justify-between px-4 py-5 text-left"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.7, ease: EASE.expo, delay: 0.2 + i * 0.05 }}
              onClick={() => {
                onClose()
                setTimeout(() => go(l.to ?? l.id), 400)
              }}
            >
              <span className="display text-5xl">{l.label}</span>
              <span className="font-mono text-xs">0{i + 1}</span>
            </motion.button>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-b border-cream px-4 py-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em]">Theme</span>
        <ThemeSwitcher size={22} />
      </div>
      <div className="flex items-center justify-between border-b border-cream px-4 py-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em]">Mode</span>
        <ModeToggle />
      </div>
      <div className="grid grid-cols-2 text-sm">
        <a href={`mailto:${site.email}`} className="truncate border-r border-cream px-4 py-5">
          {site.email}
        </a>
        <div className="px-4 py-5 text-right font-mono">
          <LocalTime />
        </div>
      </div>
    </motion.div>
  )
}
