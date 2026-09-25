import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EASE } from '../lib/motion'

/**
 * Masked text reveal — words or characters rise out of an invisible line.
 *
 * <SplitText as="h1" by="chars" delay={0.2}>Hello world</SplitText>
 *
 * - `by`       'words' | 'chars'
 * - `play`     force the animation state (otherwise plays when in view)
 * - `stagger`  seconds between each piece
 */
export default function SplitText({
  children,
  as = 'div',
  by = 'words',
  className = '',
  delay = 0,
  stagger,
  duration = 1.1,
  play,
  once = true,
  amount = 0.4,
  pieceClassName = '',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount })
  const show = play ?? inView
  const Tag = motion[as] ?? motion.div
  const text = String(children)
  const words = text.split(' ')
  const step = stagger ?? (by === 'chars' ? 0.025 : 0.06)

  let index = 0
  const piece = (content, key) => {
    const i = index++
    return (
      <span key={key} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
        <motion.span
          className={`inline-block will-change-transform ${pieceClassName}`}
          initial={{ y: '115%', rotate: 6 }}
          animate={show ? { y: '0%', rotate: 0 } : { y: '115%', rotate: 6 }}
          transition={{ duration, ease: EASE.expo, delay: show ? delay + i * step : 0 }}
        >
          {content}
        </motion.span>
      </span>
    )
  }

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden="true" className="inline-block whitespace-nowrap">
          {by === 'chars' ? [...word].map((c, ci) => piece(c, ci)) : piece(word, 0)}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}
