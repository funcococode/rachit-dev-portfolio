import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import FillBox from '../components/FillBox'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import SectionLabel from '../components/SectionLabel'
import SplitText from '../components/SplitText'
import { Stage } from '../components/Stage'
import VariableText from '../components/VariableText'
import Vinyl from '../components/Vinyl'
import Waveform from '../components/Waveform'
import Curiosities from '../sections/Curiosities'
import { music, roles, site, spotifyFor } from '../data/site'
import useSynth from '../hooks/useSynth'
import { useLoader } from '../hooks/useLoader'
import { EASE, pad } from '../lib/motion'

const ROLE_TEXT = [
  'Melodies that won’t leave my head — and a voice to carry them.',
  'Words first, then the tune finds them.',
  'Chords, arrangements, the shape of a track.',
  'From a voice memo to a finished mix.',
]

/** "What else I do" — life outside the editor. */
export default function Else() {
  const { ready } = useLoader()

  useEffect(() => {
    document.title = 'What else I do — Rachit Shrivastava'
  }, [])

  if (!ready) return <div className="min-h-screen" />

  return (
    <PageTransition>
      <main>
        <Stage tone="dark" className="pt-14 md:pt-16">
          <div className="flex min-h-[calc(100svh-4rem)] flex-col">
            <SectionLabel index="—" aside="Off the clock">
              What else I do
            </SectionLabel>
            <div className="flex flex-1 flex-col justify-end border-b rule px-4 py-10 md:px-8">
              <h1 className="display">
                <VariableText text="What else" delay={0.4} min={200} max={700} className="block text-[20vw] md:text-[14vw]" />
                <VariableText text="I do." delay={0.55} min={200} max={700} className="block text-[20vw] md:text-[14vw]" />
              </h1>
            </div>
            <div className="grid md:grid-cols-12">
              <motion.p
                className="border-b rule px-4 py-6 text-lg md:col-span-8 md:border-b-0 md:border-r md:px-8 md:py-8 md:text-xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE.expo, delay: 0.9 }}
              >
                Code pays the bills; curiosity keeps me going. Outside of work I write and produce music, read about
                physics and philosophy, and travel whenever I can.
              </motion.p>
              <div className="grid grid-cols-2 md:col-span-4">
                {['Music', 'Physics', 'Philosophy', 'Travel'].map((r, i) => (
                  <motion.span
                    key={r}
                    className={`flex items-center px-4 py-4 text-sm font-semibold md:px-6 ${i % 2 === 0 ? 'border-r rule' : ''} ${
                      i < 2 ? 'border-b rule' : ''
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 + i * 0.08 }}
                  >
                    {r}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </Stage>

        <MusicPlayer />
        <Releases />

        <Stage tone="light">
          <SectionLabel index="03" aside="Four hats">
            Roles
          </SectionLabel>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((r, i) => (
              <motion.article
                key={r}
                className={`group relative isolate flex min-h-[300px] flex-col justify-between overflow-hidden border-b rule p-4 md:p-8 ${
                  i < roles.length - 1 ? 'lg:border-r' : ''
                } ${i % 2 === 0 ? 'sm:border-r' : ''}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
              >
                <span className="absolute inset-0 -z-10 translate-y-full bg-[var(--fg)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                <span className="font-mono text-xs transition-colors duration-500 group-hover:text-[var(--bg)]">{pad(i + 1)}</span>
                <div className="transition-colors duration-500 group-hover:text-[var(--bg)]">
                  <h3 className="display text-5xl">{r}</h3>
                  <p className="mt-3 leading-snug opacity-80">{ROLE_TEXT[i]}</p>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="grid md:grid-cols-12">
            <span className="flex items-center border-b rule px-4 py-6 text-lg font-semibold md:col-span-4 md:border-r md:px-8">
              Listen & follow
            </span>
            {site.socials
              .filter((s) => ['Spotify', 'Apple Music', 'Instagram'].includes(s.label))
              .map((s, i, arr) => (
                <FillBox
                  key={s.label}
                  as="a"
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`border-b rule px-4 py-6 text-lg md:col-span-4 md:px-8 ${i < arr.length - 1 ? 'md:border-r' : ''}`}
                >
                  <span>{s.label}</span>
                  <span>↗</span>
                </FillBox>
              ))}
          </div>
        </Stage>

        <Curiosities />
      </main>
      <Footer />
    </PageTransition>
  )
}

function MusicPlayer() {
  const ref = useRef(null)
  const { playing, toggle, getLevel } = useSynth()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const vinylX = useTransform(scrollYProgress, [0, 0.45], ['-40%', '0%'])

  return (
    <Stage tone="light">
      <SectionLabel index="01" aside="Side B">
        Music
      </SectionLabel>
      <div ref={ref} className="grid border-b rule md:grid-cols-2">
        <div className="relative overflow-hidden border-b rule p-6 md:border-b-0 md:border-r md:p-14">
          <div className="relative mx-auto w-[74vw] max-w-[460px] md:w-full">
            <motion.div style={{ x: vinylX }} className="relative left-[18%]">
              <Vinyl playing={playing} className="w-full" />
            </motion.div>
            <div className="absolute inset-0 z-10 flex flex-col justify-between border border-green bg-green p-6 text-cream">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em]">{site.name}</span>
              <div>
                <p className="display text-6xl md:text-7xl">Side B</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em]">Original music · Vol. I</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="border-b rule px-4 py-10 md:px-8 md:py-14">
            <SplitText as="h2" className="display text-[11vw] md:text-[4.6vw]">
              When the laptop closes, the studio opens.
            </SplitText>
            <p className="muted mt-6 max-w-md text-lg">
              Melodies taught me pacing; mixing taught me that tiny details change how something feels. Both sneak into
              everything I build.
            </p>
          </div>

          <ListenButtons />

          <div className="grid grid-cols-[auto_1fr] border-b rule">
            <button
              onClick={toggle}
              data-cursor={playing ? 'Pause' : 'Play'}
              aria-label={playing ? 'Pause the ambient loop' : 'Play an ambient loop'}
              className="flex h-24 w-24 items-center justify-center border-r rule bg-[var(--fg)] text-[var(--bg)] md:h-28 md:w-28"
            >
              {playing ? (
                <span className="flex gap-1.5">
                  <span className="h-6 w-1.5 bg-current" />
                  <span className="h-6 w-1.5 bg-current" />
                </span>
              ) : (
                <span className="ml-1 h-0 w-0 border-y-[12px] border-l-[20px] border-y-transparent border-l-current" />
              )}
            </button>
            <div className="flex flex-col justify-center px-4 md:px-8">
              <p className="font-semibold">{playing ? 'Now playing — “Night Build”' : 'Press play'}</p>
              <p className="muted text-sm">A tiny ambient loop, composed live in your browser.</p>
            </div>
          </div>

          <div className="h-28 px-4 py-6 md:px-8">
            <Waveform bars={72} energy={playing ? 0.9 : 0.35} getLevel={getLevel} interactive={!playing} barClassName="bg-current" />
          </div>
        </div>
      </div>
    </Stage>
  )
}

/** The two big streaming buttons. */
function ListenButtons() {
  const links = [
    { label: 'Listen on Spotify', href: music.spotify },
    { label: 'Listen on Apple Music', href: music.appleMusic },
  ]
  return (
    <div className="grid border-b rule sm:grid-cols-2">
      {links.map((l, i) => (
        <FillBox
          key={l.label}
          as="a"
          href={l.href}
          target="_blank"
          rel="noreferrer"
          data-cursor="Listen"
          className={`px-4 py-6 text-lg font-semibold md:px-8 ${i === 0 ? 'max-sm:border-b sm:border-r rule' : ''}`}
        >
          <span>{l.label}</span>
          <span className="transition-transform duration-500 group-hover:-rotate-45">→</span>
        </FillBox>
      ))}
    </div>
  )
}

/** Ruled discography table — every release links out to Apple Music and Spotify. */
function Releases() {
  const rows = music.releases
  return (
    <Stage tone="dark">
      <SectionLabel index="02" aside={`${pad(rows.length)} releases`}>
        Discography
      </SectionLabel>
      <div className="grid border-b rule md:grid-cols-12">
        <div className="px-4 py-10 md:col-span-8 md:border-r md:rule md:px-8 md:py-16">
          <SplitText as="h2" by="chars" className="display text-[17vw] md:text-[9vw]">
            Releases
          </SplitText>
        </div>
        <div className="flex flex-col justify-end gap-6 px-4 pb-10 md:col-span-4 md:px-8 md:py-16">
          <p className="muted max-w-sm text-lg">Singles and collaborations — from ambient sketches to Indian pop. Pick a song, pick a platform.</p>
        </div>
      </div>

      <div className="eyebrow muted hidden grid-cols-12 border-b rule md:grid">
        <span className="col-span-1 border-r rule px-8 py-3">No.</span>
        <span className="col-span-4 border-r rule px-8 py-3">Title</span>
        <span className="col-span-3 border-r rule px-8 py-3">With</span>
        <span className="col-span-1 border-r rule px-4 py-3">Year</span>
        <span className="col-span-1 border-r rule px-4 py-3">Time</span>
        <span className="col-span-2 px-8 py-3">Listen</span>
      </div>

      <ol>
        {rows.map((r, i) => (
          <motion.li
            key={r.title}
            className="group grid grid-cols-12 border-b rule"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE.expo, delay: (i % 4) * 0.05 }}
          >
            <span className="col-span-2 px-4 pt-6 font-mono text-xs md:col-span-1 md:border-r md:rule md:px-8 md:py-8">{pad(i + 1)}</span>
            <div className="col-span-10 px-4 pt-5 md:col-span-4 md:border-r md:rule md:px-8 md:py-7">
              <h3 className="flex items-center gap-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                <span className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">{r.title}</span>
                <Equalizer />
              </h3>
              <p className="muted mt-1 font-mono text-[11px] uppercase tracking-[0.14em]">
                {r.feature ? `Feature · ${r.feature}` : r.genre}
              </p>
            </div>
            <span className="col-span-10 col-start-3 px-4 pt-2 text-sm md:col-span-3 md:col-start-auto md:flex md:items-center md:border-r md:rule md:px-8 md:pt-0 md:text-base">
              {r.with ? `with ${r.with}` : r.feature ? 'Group feature' : 'Solo'}
            </span>
            <span className="col-span-10 col-start-3 flex gap-4 px-4 pb-4 pt-1 font-mono text-xs md:col-span-2 md:col-start-auto md:grid md:grid-cols-2 md:gap-0 md:p-0">
              <span className="md:flex md:items-center md:border-r md:rule md:px-4">{r.year}</span>
              <span className="md:flex md:items-center md:border-r md:rule md:px-4">{r.length}</span>
            </span>
            <div className="col-span-12 grid grid-cols-2 max-md:border-t max-md:rule md:col-span-2">
              <FillBox as="a" href={r.apple} target="_blank" rel="noreferrer" aria-label={`${r.title} on Apple Music`} className="border-r rule px-4 py-4 text-sm font-semibold">
                <span>Apple</span>
                <span>↗</span>
              </FillBox>
              <FillBox as="a" href={spotifyFor(r)} target="_blank" rel="noreferrer" aria-label={`${r.title} on Spotify`} className="px-4 py-4 text-sm font-semibold">
                <span>Spotify</span>
                <span>↗</span>
              </FillBox>
            </div>
          </motion.li>
        ))}
      </ol>
    </Stage>
  )
}

/** Three square bars that start dancing when their row is hovered. */
function Equalizer() {
  return (
    <span aria-hidden className="flex h-5 items-end gap-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      {[0, 1, 2].map((b) => (
        <span key={b} className="eq-bar block h-full w-[4px] origin-bottom bg-current" style={{ animationDelay: `${b * 0.15}s` }} />
      ))}
    </span>
  )
}
