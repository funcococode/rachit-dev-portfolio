import { motion } from 'framer-motion'
import SectionLabel from '../components/SectionLabel'
import SplitText from '../components/SplitText'
import { Stage } from '../components/Stage'
import { capabilities } from '../data/site'
import { EASE, pad } from '../lib/motion'

export default function Services() {
  return (
    <Stage tone="dark">
      <SectionLabel index="03" aside="Services">
        What I do
      </SectionLabel>
      <div className="grid border-b rule md:grid-cols-12">
        <div className="px-4 py-10 md:col-span-8 md:border-r md:rule md:px-8 md:py-16">
          <SplitText as="h2" by="chars" className="display text-[17vw] md:text-[9vw]">
            What I do
          </SplitText>
        </div>
        <div className="flex items-end px-4 pb-10 md:col-span-4 md:px-8 md:py-16">
          <p className="muted max-w-sm text-lg">One person across the whole pipeline — nothing gets lost between design, frontend, backend and deployment.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2">
        {capabilities.map((c, i) => (
          <motion.article
            key={c.title}
            className={`group relative isolate flex min-h-[340px] flex-col justify-between overflow-hidden border-b rule p-4 md:min-h-[420px] md:p-8 ${
              i % 2 === 0 ? 'md:border-r' : ''
            }`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: (i % 2) * 0.1 }}
          >
            <span className="absolute inset-0 -z-10 translate-y-full bg-[var(--fg)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
            <div className="flex items-start justify-between transition-colors duration-500 group-hover:text-[var(--bg)]">
              <span className="font-mono text-xs">{pad(i + 1)}</span>
              <motion.span
                className="block h-10 w-10 border border-current"
                initial={{ rotate: 0 }}
                whileInView={{ rotate: 90 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: EASE.expo, delay: 0.3 }}
              />
            </div>
            <div className="transition-colors duration-500 group-hover:text-[var(--bg)]">
              <h3 className="display text-5xl md:text-6xl">{c.title}</h3>
              <p className="mt-4 max-w-md text-lg leading-snug opacity-80">{c.text}</p>
              <div className="mt-6 flex flex-wrap">
                {c.tags.map((t) => (
                  <span key={t} className="-ml-px -mt-px border border-current px-3 py-1.5 font-mono text-xs uppercase first:ml-0">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Stage>
  )
}
