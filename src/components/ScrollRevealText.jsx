import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * Paragraph whose words light up one by one as you scroll through it.
 * Wrap words in *asterisks* to render them boxed.
 */
export default function ScrollRevealText({ text, className = '', accentClassName = 'border border-current px-[0.2em]' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((w, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return <Word key={i} word={w} progress={scrollYProgress} range={[start, end]} accentClassName={accentClassName} />
      })}
    </p>
  )
}

function Word({ word, progress, range, accentClassName }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const y = useTransform(progress, range, [8, 0])
  const accent = word.startsWith('*')
  const clean = word.replace(/\*/g, '')
  return (
    <span className="relative mr-[0.25em] mt-[0.1em]">
      <motion.span
        style={{ opacity, y }}
        className={`inline-block ${accent ? accentClassName : ''}`}
      >
        {clean}
      </motion.span>
    </span>
  )
}
