import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Footer from '../components/Footer'
import Magnetic from '../components/Magnetic'
import PageTransition from '../components/PageTransition'
import SectionLabel from '../components/SectionLabel'
import SplitText from '../components/SplitText'
import { COLORS, Stage } from '../components/Stage'
import Sticker from '../components/Sticker'
import VariableText from '../components/VariableText'
import Vinyl from '../components/Vinyl'
import Waveform from '../components/Waveform'
import { roles, site } from '../data/site'
import useSynth from '../hooks/useSynth'
import { useLoader } from '../hooks/useLoader'
import { EASE } from '../lib/motion'

const ROLE_LOOKS = [
  { cls: 'bg-lime', text: 'I sing — mostly melodies that won’t leave my head.' },
  { cls: 'bg-pink', text: 'I write songs — words first, then the tune finds them.' },
  { cls: 'bg-sky', text: 'I compose — chords, arrangements, the shape of a track.' },
  { cls: 'bg-tang', text: 'I produce — from a voice memo to a finished mix.' },
]

/** "What else I do" — the life outside the editor. */
export default function Else() {
  const { ready } = useLoader()
  const hero = useRef(null)

  useEffect(() => {
    document.title = 'What else I do — Rachit Shrivastava'
  }, [])

  if (!ready) return <div className="min-h-screen" />

  return (
    <PageTransition>
      <main>
        <Stage bg={COLORS.pink} fg={COLORS.ink} className="overflow-hidden">
          <div ref={hero} className="container-x relative flex min-h-[100svh] flex-col justify-end pb-14 pt-32">
            <motion.p
              className="eyebrow mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Off the clock
            </motion.p>
            <h1 className="display lowercase">
              <VariableText text="what else" delay={0.5} className="block text-[21vw] md:text-[15vw]" />
              <VariableText text="i do." delay={0.7} className="block text-[21vw] text-cobalt md:text-[15vw]" />
            </h1>
            <motion.p
              className="mt-8 max-w-xl text-xl md:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              Code pays the bills; music keeps me curious. Outside of work I’m a singer, songwriter, composer and music
              producer.
            </motion.p>
            {['🎤 singer', '✍️ songwriter', '🎹 composer', '🎛 producer'].map((s, i) => (
              <Sticker
                key={s}
                constraints={hero}
                color={['lime', 'cream', 'sky', 'tang'][i]}
                rotate={[-8, 10, -4, 7][i]}
                delay={1 + i * 0.1}
                style={{ top: ['18%', '26%', '12%', '36%'][i], left: ['56%', '78%', '28%', '66%'][i] }}
                className={i > 1 ? 'hidden md:block' : ''}
              >
                {s}
              </Sticker>
            ))}
          </div>
        </Stage>

        <MusicPlayer />

        <Stage bg={COLORS.cream} fg={COLORS.ink} className="py-24 md:py-32">
          <div className="container-x">
            <SectionLabel index="02">Four hats</SectionLabel>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {roles.map((r, i) => (
                <motion.div
                  key={r}
                  className={`card-pop flex min-h-[260px] flex-col justify-between p-6 ${ROLE_LOOKS[i].cls}`}
                  initial={{ opacity: 0, y: 80, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 2 : -2 }}
                  whileHover={{ rotate: 0, y: -8 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ type: 'spring', stiffness: 140, damping: 14, delay: i * 0.08 }}
                >
                  <span className="font-mono text-sm">0{i + 1}</span>
                  <div>
                    <h3 className="display text-5xl lowercase">{r}</h3>
                    <p className="mt-3 leading-snug">{ROLE_LOOKS[i].text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-20 flex flex-wrap items-center gap-4">
              <span className="text-xl font-bold">Listen & follow:</span>
              {site.socials
                .filter((s) => ['Spotify', 'Instagram', 'YouTube'].includes(s.label))
                .map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="sticker bg-lime"
                    whileHover={{ rotate: -4, scale: 1.06 }}
                  >
                    {s.label} ↗
                  </motion.a>
                ))}
            </div>
          </div>
        </Stage>
      </main>
      <Footer />
    </PageTransition>
  )
}

function MusicPlayer() {
  const ref = useRef(null)
  const { playing, toggle, getLevel } = useSynth()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const vinylX = useTransform(scrollYProgress, [0, 0.45], ['-35%', '0%'])

  return (
    <Stage bg={COLORS.ink} fg={COLORS.cream} className="overflow-hidden py-28 md:py-40">
      <div ref={ref} className="container-x">
        <SectionLabel index="01">Side B</SectionLabel>
        <div className="mt-16 grid items-center gap-16 md:grid-cols-2">
          <div className="relative mx-auto w-[78vw] max-w-[520px] md:w-full">
            <motion.div style={{ x: vinylX }} className="relative left-[16%]">
              <Vinyl playing={playing} className="w-full" />
            </motion.div>
            <div className="card-pop absolute inset-0 z-10 flex flex-col justify-between !rounded-md bg-tang p-6 text-ink">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em]">Rachit Shrivastava</span>
              <div>
                <p className="display text-6xl lowercase md:text-7xl">side b</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em]">original music · vol. i</p>
              </div>
            </div>
          </div>

          <div>
            <SplitText as="h2" className="display text-[12vw] lowercase md:text-[5.5vw]">
              when the laptop closes, the studio opens.
            </SplitText>
            <p className="muted mt-6 max-w-md text-lg">
              Melodies taught me pacing; mixing taught me that tiny details change how something feels. Both sneak into
              everything I build.
            </p>

            <div className="mt-10 flex items-center gap-6">
              <Magnetic>
                <button
                  onClick={toggle}
                  data-cursor={playing ? 'Pause' : 'Play'}
                  aria-label={playing ? 'Pause the ambient loop' : 'Play an ambient loop'}
                  className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-cream bg-lime text-ink"
                >
                  {playing && (
                    <motion.span
                      className="absolute inset-0 rounded-full border-2 border-lime"
                      animate={{ scale: [1, 1.7], opacity: [0.8, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    />
                  )}
                  {playing ? (
                    <span className="flex gap-1.5">
                      <span className="h-5 w-1.5 rounded-sm bg-ink" />
                      <span className="h-5 w-1.5 rounded-sm bg-ink" />
                    </span>
                  ) : (
                    <span className="ml-1 h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-ink" />
                  )}
                </button>
              </Magnetic>
              <div>
                <p className="font-bold">{playing ? 'Now playing — “Night Build”' : 'Press play'}</p>
                <p className="muted text-sm">A tiny ambient loop, composed live in your browser.</p>
              </div>
            </div>

            <motion.div
              className="mt-10 h-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE.expo }}
            >
              <Waveform bars={64} energy={playing ? 0.9 : 0.35} getLevel={getLevel} interactive={!playing} accentEvery={7} />
            </motion.div>
          </div>
        </div>
      </div>
    </Stage>
  )
}
