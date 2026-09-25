import { useLenis } from 'lenis/react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import Marquee from '../components/Marquee'
import PageTransition from '../components/PageTransition'
import About from '../sections/About'
import ElseTeaser from '../sections/ElseTeaser'
import Hero from '../sections/Hero'
import Services from '../sections/Services'
import Stack from '../sections/Stack'
import Work from '../sections/Work'

const BAND = ['full-stack development', 'web apps', 'mobile apps', 'cloud & devops', 'ui engineering']

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
        <div className="relative z-10 rotate-[1.5deg] scale-[1.03] border-y-2 border-ink bg-ink py-4 text-cream">
          <Marquee speed={-2} skew={false}>
            {BAND.map((t, i) => (
              <span key={t} className="flex items-center">
                <span className="px-6 text-3xl font-bold md:text-4xl">{t}</span>
                <span className={`inline-block h-6 w-6 rounded-full border-2 border-cream ${['bg-lime', 'bg-pink', 'bg-sky', 'bg-tang', 'bg-cobalt'][i]}`} />
              </span>
            ))}
          </Marquee>
        </div>
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
