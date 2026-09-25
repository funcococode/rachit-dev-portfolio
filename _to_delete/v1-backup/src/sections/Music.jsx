import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Magnetic from '../components/Magnetic'
import SectionLabel from '../components/SectionLabel'
import SplitText from '../components/SplitText'
import Vinyl from '../components/Vinyl'
import Waveform from '../components/Waveform'
import useSynth from '../hooks/useSynth'
import { roles } from '../data/site'
import { EASE } from '../lib/motion'

export default function Music() {
  const ref = useRef(null)
  const { playing, toggle, getLevel } = useSynth()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const vinylX = useTransform(scrollYProgress, [0, 0.5], ['-30%', '0%'])
  const sleeveX = useTransform(scrollYProgress, [0.1, 0.5], ['0%', '-18%'])

  return (
    <section id="music" ref={ref} className="relative overflow-hidden bg-ink-2 py-28 md:py-40">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-1/3 h-[50vw] w-[50vw] rounded-full bg-ember/10 blur-[140px]"
        animate={{ opacity: playing ? 1 : 0.4, scale: playing ? 1.2 : 1 }}
        transition={{ duration: 2 }}
      />
      <div className="container-x relative">
        <SectionLabel index="05">Side B</SectionLabel>

        <div className="mt-16 grid items-center gap-16 md:mt-24 md:grid-cols-2">
          <div className="relative mx-auto w-[80vw] max-w-[560px] md:w-full">
            {/* sleeve */}
            <motion.div
              style={{ x: sleeveX }}
              className="absolute inset-0 z-10 flex flex-col justify-between rounded-md bg-ember p-6 text-ink shadow-2xl shadow-black/60"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.2em]">Rachit Shrivastava</span>
              <div>
                <p className="serif-i text-6xl leading-none md:text-7xl">Side B</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em]">Original music · Vol. I</p>
              </div>
            </motion.div>
            <motion.div style={{ x: vinylX }} className="relative left-[18%]">
              <Vinyl playing={playing} className="w-full" />
            </motion.div>
          </div>

          <div>
            <SplitText as="h2" className="display text-[12vw] md:text-[5.6vw]">
              When the terminal closes,
            </SplitText>
            <SplitText as="p" delay={0.2} className="serif-i text-[12vw] leading-[0.95] text-ember md:text-[5.6vw]">
              the studio opens.
            </SplitText>
            <motion.p
              className="mt-8 max-w-md text-lg text-ash"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE.expo, delay: 0.3 }}
            >
              Outside of code I’m a singer, songwriter, composer and music producer. Writing melodies taught me pacing;
              mixing taught me that the smallest details change how something feels. Both end up in everything I build.
            </motion.p>

            <ul className="mt-10 flex flex-wrap gap-2">
              {roles.map((r, i) => (
                <motion.li
                  key={r}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE.expo, delay: 0.4 + i * 0.08 }}
                  className="rounded-full border border-line px-4 py-2 text-sm"
                >
                  {r}
                </motion.li>
              ))}
            </ul>

            <div className="mt-12 flex items-center gap-6">
              <Magnetic>
                <button
                  onClick={toggle}
                  data-cursor={playing ? 'Pause' : 'Play'}
                  aria-label={playing ? 'Pause the ambient loop' : 'Play an ambient loop'}
                  className="relative flex h-20 w-20 items-center justify-center rounded-full bg-bone text-ink"
                >
                  {playing && (
                    <motion.span
                      className="absolute inset-0 rounded-full border border-bone"
                      animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
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
                <p className="font-medium">{playing ? 'Now playing — “Night Build”' : 'Press play'}</p>
                <p className="text-sm text-ash">A tiny ambient loop, composed live in your browser.</p>
              </div>
            </div>

            <div className="mt-10 h-16">
              <Waveform bars={64} energy={playing ? 0.9 : 0.35} getLevel={getLevel} interactive={false} barClassName="bg-bone/60" accentEvery={9} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
