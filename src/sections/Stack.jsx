import { motion } from 'framer-motion'
import Marquee from '../components/Marquee'
import SectionLabel from '../components/SectionLabel'
import SplitText from '../components/SplitText'
import { Stage } from '../components/Stage'
import { marqueeStack, stack } from '../data/site'
import { EASE, pad } from '../lib/motion'

/** The toolkit as a ruled table — one column per layer of the stack. */
export default function Stack() {
  return (
    <Stage id="stack" tone="light">
      <SectionLabel index="04" aside="Toolkit">
        Stack
      </SectionLabel>
      <div className="grid border-b rule md:grid-cols-12">
        <div className="px-4 py-10 md:col-span-8 md:border-r md:rule md:px-8 md:py-16">
          <SplitText as="h2" by="chars" className="display text-[17vw] md:text-[9vw]">
            Tools I use
          </SplitText>
        </div>
        <div className="flex items-end px-4 pb-10 md:col-span-4 md:px-8 md:py-16">
          <p className="muted max-w-sm text-lg">Everything I reach for, from the first component to the last deploy.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
        {stack.map((g, gi) => (
          <div key={g.group} className={`border-b rule ${gi < stack.length - 1 ? 'lg:border-r' : ''} ${gi % 2 === 0 ? 'sm:border-r' : ''}`}>
            <div className="flex items-center justify-between border-b rule bg-[var(--fg)] px-4 py-4 text-[var(--bg)] md:px-8">
              <span className="font-semibold">{g.group}</span>
              <span className="font-mono text-xs">{pad(g.items.length)}</span>
            </div>
            <ul>
              {g.items.map((it, ii) => (
                <motion.li
                  key={it}
                  className="group relative isolate overflow-hidden border-b rule-soft last:border-b-0"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE.expo, delay: gi * 0.06 + ii * 0.04 }}
                >
                  <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-[var(--fg)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                  <span className="flex items-center justify-between px-4 py-3.5 text-lg transition-colors duration-300 group-hover:text-[var(--bg)] md:px-8">
                    {it}
                    <span className="font-mono text-[10px] opacity-60">{pad(ii + 1)}</span>
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-b rule bg-[var(--fg)] py-5 text-[var(--bg)]">
        <Marquee speed={-2.5} skew={false}>
          {marqueeStack.map((t) => (
            <span key={t} className="flex items-center">
              <span className="display px-8 text-4xl md:text-6xl">{t}</span>
              <span className="inline-block h-3 w-3 bg-current" />
            </span>
          ))}
        </Marquee>
      </div>
    </Stage>
  )
}
