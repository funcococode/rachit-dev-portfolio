import { useLenis } from 'lenis/react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import Marquee from '../components/Marquee'
import PageTransition from '../components/PageTransition'
import About from '../sections/About'
import Hero from '../sections/Hero'
import Music from '../sections/Music'
import Process from '../sections/Process'
import Stack from '../sections/Stack'
import Work from '../sections/Work'

export default function Home() {
  const { hash } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    document.title = 'Rachit Shrivastava — Full-stack Developer & Music Producer'
  }, [])

  // arriving from another page with /#section
  useEffect(() => {
    if (!hash || !lenis) return
    const t = setTimeout(() => lenis.scrollTo(hash, { duration: 1.6 }), 900)
    return () => clearTimeout(t)
  }, [hash, lenis])

  return (
    <PageTransition label="Home">
      <main>
        <Hero />
        <div className="border-y border-line bg-ember py-4 text-ink">
          <Marquee speed={-2} skew={false}>
            {['Full-stack development', 'Web & mobile apps', 'Cloud & DevOps', 'Songwriting', 'Music production'].map((t) => (
              <span key={t} className="flex items-center">
                <span className="px-6 text-2xl font-medium tracking-[-0.02em] md:text-3xl">{t}</span>
                <span className="serif-i text-2xl md:text-3xl">✺</span>
              </span>
            ))}
          </Marquee>
        </div>
        <About />
        <Work />
        <Process />
        <Stack />
        <Music />
      </main>
      <Footer />
    </PageTransition>
  )
}
