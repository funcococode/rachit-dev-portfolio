import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CosmosCanvas from '../components/CosmosCanvas'
import FillBox from '../components/FillBox'
import SectionLabel from '../components/SectionLabel'
import SplitFlap from '../components/SplitFlap'
import SplitText from '../components/SplitText'
import { Stage } from '../components/Stage'
import ThoughtSquares from '../components/ThoughtSquares'
import VariableText from '../components/VariableText'
import { curiosities } from '../data/site'
import { EASE } from '../lib/motion'

/**
 * Three chapters — physics, philosophy, travel. Each is a ruled block with
 * its own interactive two-tone visual; tones alternate down the page.
 */
export default function Curiosities() {
  const { physics, philosophy, travel } = curiosities
  return (
    <>
      <Stage tone="dark">
        <SectionLabel index="04" aside="Things I can’t stop reading about">
          Curiosities
        </SectionLabel>
        <Chapter n="01" data={physics} visual={<CosmosCanvas />} visualHint="Move your cursor to bend the light">
          <blockquote className="border-t rule px-4 py-6 md:px-8">
            <p className="text-2xl leading-snug md:text-3xl">“{physics.quote.text}”</p>
            <footer className="eyebrow muted mt-3">— {physics.quote.by}</footer>
          </blockquote>
        </Chapter>
      </Stage>

      <Stage tone="light">
        <Chapter n="02" data={philosophy} flip visual={<ThoughtSquares className="h-full w-full p-6 md:p-10" />} visualHint="Scroll to wind it tighter">
          <QuestionCycler questions={philosophy.questions} />
        </Chapter>
      </Stage>

      <Stage tone="dark">
        <Chapter
          n="03"
          data={travel}
          visual={
            <div className="flex h-full w-full flex-col justify-center gap-4 p-5 md:p-10">
              <p className="eyebrow flex justify-between">
                <span>Departures</span>
                <span className="muted">Gate ∞</span>
              </p>
              <p className="eyebrow muted">Next stop</p>
              <SplitFlap words={travel.board} length={11} className="text-[5.2vw] md:text-[2.1vw]" />
              <div className="eyebrow mt-2 grid grid-cols-3 border-t rule pt-3">
                <span>Status</span>
                <span className="text-center">Boarding</span>
                <span className="animate-pulse text-right">● Soon</span>
              </div>
            </div>
          }
          visualHint="Destinations update every few seconds"
        >
          <FillBox as={Link} to={`/work/${travel.project}`} data-cursor="Case study" className="border-t rule px-4 py-6 text-lg font-semibold md:px-8">
            <span>See Trip Unplanned — the travel app I built</span>
            <span className="transition-transform duration-500 group-hover:-rotate-45">→</span>
          </FillBox>
        </Chapter>
      </Stage>
    </>
  )
}

function Chapter({ n, data, visual, visualHint, flip = false, children }) {
  return (
    <div className="grid border-b rule md:grid-cols-12">
      {/* visual box */}
      <motion.div
        className={`relative flex aspect-square flex-col border-b rule md:col-span-5 md:aspect-auto md:min-h-[640px] md:border-b-0 ${
          flip ? 'md:order-2 md:border-l' : 'md:border-r'
        }`}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* the visual is revealed top-down when its box scrolls into view */}
        <motion.div
          className="relative flex-1 overflow-hidden"
          variants={{ hidden: { clipPath: 'inset(0% 0% 100% 0%)' }, shown: { clipPath: 'inset(0% 0% 0% 0%)' } }}
          transition={{ duration: 1.2, ease: EASE.quart }}
        >
          {visual}
        </motion.div>
        <p className="eyebrow muted border-t rule px-4 py-3 md:px-6">{visualHint}</p>
      </motion.div>

      {/* text */}
      <div className="flex flex-col md:col-span-7">
        <div className="flex items-center justify-between border-b rule px-4 py-3 md:px-8">
          <span className="font-mono text-xs">{n}</span>
          <span className="eyebrow muted">{data.kicker}</span>
        </div>
        <div className="flex-1 px-4 py-10 md:px-8 md:py-14">
          <h3 className="display">
            <VariableText text={data.title} min={200} max={700} className="block text-[17vw] md:text-[8vw]" />
          </h3>
          <SplitText as="p" by="words" stagger={0.012} duration={0.9} className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
            {data.text}
          </SplitText>
        </div>
        <ul className="flex flex-wrap border-t rule">
          {data.topics.map((t, i) => (
            <motion.li
              key={t}
              className="group relative isolate -mb-px overflow-hidden border-b border-r rule px-4 py-3 text-sm md:px-5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE.expo, delay: i * 0.05 }}
            >
              <span className="absolute inset-0 -z-10 translate-y-full bg-[var(--fg)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              <span className="transition-colors duration-300 group-hover:text-[var(--bg)]">{t}</span>
            </motion.li>
          ))}
        </ul>
        {children}
      </div>
    </div>
  )
}

/** Big rotating philosophical question with a "next" control. */
function QuestionCycler({ questions }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setI((n) => (n + 1) % questions.length), 5200)
    return () => clearInterval(id)
  }, [paused, questions.length])

  const q = questions[i]
  return (
    <div className="grid border-t rule md:grid-cols-[1fr_auto]" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div className="relative min-h-[150px] overflow-hidden px-4 py-6 md:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE.expo }}
          >
            <p className="text-2xl leading-snug md:text-3xl">{q.q}</p>
            <p className="eyebrow muted mt-3">— {q.by}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <FillBox
        onClick={() => setI((n) => (n + 1) % questions.length)}
        data-cursor="Ponder"
        className="border-t rule px-4 py-6 text-left md:w-56 md:flex-col md:border-l md:border-t-0 md:px-8"
      >
        <span className="font-mono text-xs">
          {String(i + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}
        </span>
        <span className="font-semibold">Next question →</span>
      </FillBox>
    </div>
  )
}
