import { motion, useInView } from 'framer-motion'
import { useMemo, useRef } from 'react'
import Marquee from '../components/Marquee'
import SectionLabel from '../components/SectionLabel'
import SplitText from '../components/SplitText'
import { COLORS, Stage } from '../components/Stage'
import { marqueeStack, stack } from '../data/site'

const CHIP_COLORS = ['bg-lime', 'bg-pink', 'bg-sky', 'bg-tang', 'bg-cream', 'bg-cobalt !text-cream']

/**
 * The toolkit as a pile of draggable chips that tumble into place when the
 * section scrolls into view.
 */
export default function Stack() {
  const pile = useRef(null)
  const inView = useInView(pile, { once: true, amount: 0.3 })
  const chips = useMemo(
    () =>
      stack.flatMap((g, gi) =>
        g.items.map((item, ii) => ({
          item,
          group: g.group,
          color: CHIP_COLORS[(gi * 3 + ii) % CHIP_COLORS.length],
          rotate: ((gi * 7 + ii * 13) % 24) - 12,
          delay: (gi * g.items.length + ii) * 0.035,
        })),
      ),
    [],
  )

  return (
    <Stage id="stack" bg={COLORS.ink} fg={COLORS.cream} className="overflow-hidden py-28 md:py-40">
      <div className="container-x">
        <SectionLabel index="04">Toolkit</SectionLabel>
        <div className="mt-12 flex flex-col justify-between gap-6 md:mt-16 md:flex-row md:items-end">
          <SplitText as="h2" by="chars" className="display text-[15vw] lowercase md:text-[9vw]">
            my toolbox
          </SplitText>
          <p className="muted max-w-xs text-lg">Everything I reach for, from the first component to the last deploy. Go on, throw them around.</p>
        </div>

        <div
          ref={pile}
          className="relative mt-14 flex min-h-[380px] flex-wrap content-end items-end justify-center gap-3 rounded-[32px] border-2 border-dashed border-cream/20 p-6 md:mt-20 md:gap-4 md:p-12"
        >
          {chips.map((c) => (
            <motion.div
              key={c.item}
              drag
              dragConstraints={pile}
              dragElastic={0.3}
              whileDrag={{ scale: 1.15, zIndex: 20 }}
              whileHover={{ scale: 1.08, rotate: 0 }}
              initial={{ y: -500, opacity: 0, rotate: c.rotate * 3 }}
              animate={inView ? { y: 0, opacity: 1, rotate: c.rotate } : {}}
              transition={{ type: 'spring', stiffness: 140, damping: 11, delay: c.delay }}
              data-cursor="Drag"
              className={`sticker touch-none select-none text-base md:text-2xl ${c.color}`}
              title={c.group}
            >
              {c.item}
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stack.map((g) => (
            <div key={g.group} className="line border-t-2 pt-3">
              <p className="font-bold">{g.group}</p>
              <p className="muted mt-1 text-sm">{g.items.join(' · ')}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24 -rotate-3 border-y-2 border-ink bg-lime py-4 text-ink md:mt-32">
        <Marquee speed={-2.5} skew={false}>
          {marqueeStack.map((t) => (
            <span key={t} className="flex items-center">
              <span className="display px-6 text-4xl lowercase md:text-6xl">{t}</span>
              <span className="text-3xl md:text-5xl">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </Stage>
  )
}
