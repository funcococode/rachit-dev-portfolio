import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

const COUNT = 14

/**
 * A tunnel of nested squares that slowly twist into each other — a little
 * visual koan. Scroll winds the twist tighter; the cursor tilts the whole
 * thing. Pure SVG in currentColor.
 */
export default function ThoughtSquares({ className = '' }) {
  const ref = useRef(null)
  const time = useMotionValue(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const twist = useTransform(scrollYProgress, [0, 1], [2, 14])
  const tx = useSpring(0, { stiffness: 80, damping: 18 })
  const ty = useSpring(0, { stiffness: 80, damping: 18 })

  useAnimationFrame((t) => time.set(t / 1000))

  return (
    <div
      ref={ref}
      className={`relative flex items-center justify-center [perspective:900px] ${className}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        ty.set(((e.clientX - r.left) / r.width - 0.5) * 24)
        tx.set(-((e.clientY - r.top) / r.height - 0.5) * 24)
      }}
      onPointerLeave={() => {
        tx.set(0)
        ty.set(0)
      }}
    >
      <motion.svg viewBox="-110 -110 220 220" className="h-full w-full" style={{ rotateX: tx, rotateY: ty }}>
        {Array.from({ length: COUNT }).map((_, i) => (
          <Square key={i} i={i} time={time} twist={twist} />
        ))}
        <rect x="-3" y="-3" width="6" height="6" fill="currentColor" />
      </motion.svg>
    </div>
  )
}

function Square({ i, time, twist }) {
  const size = 200 * Math.pow(0.84, i)
  const rotate = useTransform([time, twist], ([t, k]) => i * k + Math.sin(t * 0.4 + i * 0.3) * 6)
  return (
    <motion.rect
      x={-size / 2}
      y={-size / 2}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={i === 0 ? 1.2 : 0.8}
      strokeOpacity={1 - i * 0.045}
      style={{ rotate, transformBox: 'fill-box', originX: '50%', originY: '50%' }}
    />
  )
}
