import { useLenis } from 'lenis/react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import Marquee from '../components/Marquee'
import PageTransition from '../components/PageTransition'
import { Stage } from '../components/Stage'
import About from '../sections/About'
import ElseTeaser from '../sections/ElseTeaser'
import Hero from '../sections/Hero'
import Services from '../sections/Services'
import Stack from '../sections/Stack'
import Work from '../sections/Work'

const BAND = ['Full-stack development', 'Web apps', 'Mobile apps', 'Cloud & DevOps', 'UI engineering']

export default function Home() {
  const { hash } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    document.title = 'Rachit Shrivastava — Full-stack Developer'
  }, [])

  // arriving from another page with /#section
  useEffect(() => {
    if (!hash || !lenis) return
    const t = setTimeout(() => {
      const el = document.querySelector(hash)
      if (el) lenis.scrollTo(el, { duration: 1.6 })
    }, 900)
    return () => clearTimeout(t)
  }, [hash, lenis])

  return (
    <PageTransition>
      <main>
        <Hero />
        <Stage as="div" tone="dark" className="border-y rule py-4">
          <Marquee speed={-2} skew={false}>
            {BAND.map((t) => (
              <span key={t} className="flex items-center">
                <span className="px-8 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">{t}</span>
                <span className="inline-block h-2.5 w-2.5 bg-current" />
              </span>
            ))}
          </Marquee>
        </Stage>
        <About />
        <Work />
        <Services />
        <Stack />
        <ElseTeaser />
      </main>
      <Footer />
    </PageTransition>
  )
}
