import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import { ReactLenis, useLenis } from 'lenis/react'
import { useCallback, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Preloader from './components/Preloader'
import { ColorStage } from './components/Stage'
import { LoaderContext } from './hooks/useLoader'
import CaseStudy from './pages/CaseStudy'
import Else from './pages/Else'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

export default function App() {
  const [ready, setReady] = useState(false)
  const done = useCallback(() => setReady(true), [])

  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
      <MotionConfig reducedMotion="user">
        <LoaderContext.Provider value={{ ready }}>
          <ColorStage>
            <AnimatePresence>{!ready && <Preloader key="preloader" onDone={done} />}</AnimatePresence>
            <Cursor />
            <ScrollProgress />
            <Nav />
            <AnimatedRoutes />
          </ColorStage>
        </LoaderContext.Provider>
      </MotionConfig>
    </ReactLenis>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  const lenis = useLenis()
  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        lenis?.scrollTo(0, { immediate: true, force: true })
        window.scrollTo(0, 0)
      }}
    >
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/else" element={<Else />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 })
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[55] h-1 origin-left bg-[linear-gradient(90deg,var(--color-cobalt),var(--color-tang),var(--color-lime))]"
      style={{ scaleX }}
    />
  )
}
