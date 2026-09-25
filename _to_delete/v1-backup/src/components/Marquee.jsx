import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion'
import { useRef } from 'react'

/**
 * Infinite marquee that speeds up, reverses and skews with scroll velocity.
 * `speed` is % of one copy per second; negative = right-to-left reversed.
 */
export default function Marquee({ children, speed = 2, className = '', skew = true, copies = 4 }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [-1000, 0, 1000], [-4, 0, 4], { clamp: false })
  const skewX = useTransform(smooth, [-2500, 0, 2500], skew ? [12, 0, -12] : [0, 0, 0])
  const x = useTransform(baseX, (v) => `${wrap(-100 / copies, 0, v)}%`)
  const dir = useRef(1)

  useAnimationFrame((_, delta) => {
    let move = dir.current * speed * (delta / 1000)
    const f = factor.get()
    if (f < 0) dir.current = -1
    else if (f > 0) dir.current = 1
    move += dir.current * move * Math.abs(f)
    baseX.set(baseX.get() + move)
  })

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div className="flex w-max flex-nowrap" style={{ x, skewX }}>
        {Array.from({ length: copies }).map((_, i) => (
          <div key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
