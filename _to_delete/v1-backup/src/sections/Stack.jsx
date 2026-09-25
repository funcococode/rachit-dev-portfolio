import { motion } from 'framer-motion'
import Marquee from '../components/Marquee'
import SectionLabel from '../components/SectionLabel'
import SplitText from '../components/SplitText'
import { marqueeStack, stack } from '../data/site'
import { EASE, pad } from '../lib/motion'

export default function Stack() {
  const half = Math.ceil(marqueeStack.length / 2)
  return (
    <section id="stack" className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div className="container-x">
        <SectionLabel index="04">Toolkit</SectionLabel>
        <div className="mt-14 flex flex-col justify-between gap-6 md:mt-20 md:flex-row md:items-end">
          <SplitText as="h2" className="display max-w-[10ch] text-[14vw] md:text-[7vw]">
            Tools of the trade
          </SplitText>
          <p className="max-w-xs text-ash">The instruments I reach for, from the first component to the last deploy.</p>
        </div>
      </div>

      <div className="my-16 -rotate-2 space-y-2 md:my-24">
        <Marquee speed={-3}>
          {marqueeStack.slice(0, half).map((t) => (
            <Item key={t} text={t} />
          ))}
        </Marquee>
        <Marquee speed={3}>
          {marqueeStack.slice(half).map((t) => (
            <Item key={t} text={t} outline />
          ))}
        </Marquee>
      </div>

      <div className="container-x grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {stack.map((g, gi) => (
          <motion.div
            key={g.group}
            className="bg-ink p-6 md:p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: EASE.expo, delay: gi * 0.08 }}
          >
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-lg font-medium">{g.group}</h3>
              <span className="font-mono text-xs text-ash">{pad(g.items.length)}</span>
            </div>
            <ul>
              {g.items.map((it) => (
                <li
                  key={it}
                  className="group flex items-center justify-between border-t border-line py-3 text-bone/70 transition-colors hover:text-bone"
                >
                  <span className="transition-transform duration-500 group-hover:translate-x-2">{it}</span>
                  <span className="h-1.5 w-1.5 scale-0 rounded-full bg-ember transition-transform duration-500 group-hover:scale-100" />
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Item({ text, outline }) {
  return (
    <span className="flex items-center">
      <span
        className={`display px-6 text-[13vw] leading-[1.05] md:px-10 md:text-[8vw] ${
          outline ? 'text-transparent [-webkit-text-stroke:1px_rgb(239_232_220/0.5)]' : 'text-bone'
        }`}
      >
        {text}
      </span>
      <span className="serif-i text-[7vw] text-ember md:text-[4vw]">✺</span>
    </span>
  )
}
