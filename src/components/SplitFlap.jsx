import { useEffect, useRef, useState } from 'react'

const GLYPHS = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ·'

/**
 * An airport-style split-flap board. Each cell shuffles through letters
 * before landing on the next word. Pass `words`; it cycles every `interval` ms.
 */
export default function SplitFlap({ words, length = 11, interval = 3600, className = '' }) {
  const [index, setIndex] = useState(0)
  const target = (words[index] ?? '').toUpperCase().padEnd(length, ' ').slice(0, length)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  return (
    <div className={`flex ${className}`} aria-live="polite" aria-label={words[index]}>
      {[...target].map((ch, i) => (
        <Flap key={i} target={ch} delay={i * 45} />
      ))}
    </div>
  )
}

function Flap({ target, delay }) {
  const [ch, setCh] = useState(target)
  const [flip, setFlip] = useState(0)
  const timer = useRef()

  useEffect(() => {
    let steps = 6 + Math.floor(Math.random() * 6)
    const start = setTimeout(function tick() {
      steps -= 1
      const next = steps <= 0 ? target : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      setCh(next)
      setFlip((f) => f + 1)
      if (steps > 0) timer.current = setTimeout(tick, 55)
    }, delay)
    return () => {
      clearTimeout(start)
      clearTimeout(timer.current)
    }
  }, [target, delay])

  return (
    <span className="relative -ml-px flex aspect-[3/4] flex-1 items-center justify-center overflow-hidden border border-current font-mono font-bold first:ml-0">
      {/* hinge line */}
      <span aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-current opacity-30" />
      <span key={flip} className="flap-in block leading-none">
        {ch === ' ' ? ' ' : ch}
      </span>
    </span>
  )
}
