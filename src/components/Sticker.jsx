import { motion } from 'framer-motion'
import { useState } from 'react'

/**
 * A draggable, gently bobbing sticker. Throw it around — it springs back
 * into bounds set by `constraints` (a ref to the container).
 *
 * <Sticker constraints={heroRef} color="lime" rotate={-8}>React</Sticker>
 */
const BG = {
  lime: 'bg-lime',
  cobalt: 'bg-cobalt !text-cream',
  tang: 'bg-tang',
  pink: 'bg-pink',
  sky: 'bg-sky',
  cream: 'bg-cream',
  ink: 'bg-ink !text-cream',
}

export default function Sticker({
  children,
  color = 'lime',
  rotate = 0,
  constraints,
  className = '',
  delay = 0,
  float = true,
  style,
}) {
  const [grabbed, setGrabbed] = useState(false)
  return (
    <motion.div
      drag
      dragConstraints={constraints}
      dragElastic={0.35}
      dragTransition={{ bounceStiffness: 260, bounceDamping: 14 }}
      onDragStart={() => setGrabbed(true)}
      onDragEnd={() => setGrabbed(false)}
      whileHover={{ scale: 1.08, rotate: rotate * -0.5 }}
      whileDrag={{ scale: 1.15, rotate: rotate + 8, zIndex: 30 }}
      initial={{ opacity: 0, scale: 0, rotate: rotate - 40 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ type: 'spring', stiffness: 220, damping: 14, delay }}
      data-cursor="Drag"
      className={`absolute z-10 touch-none select-none ${className}`}
      style={style}
    >
      <motion.div
        animate={float && !grabbed ? { y: [0, -8, 0] } : { y: 0 }}
        transition={{ duration: 3 + (Math.abs(rotate) % 3), repeat: Infinity, ease: 'easeInOut', delay: delay + 0.5 }}
        className={`sticker whitespace-nowrap text-sm md:text-lg ${BG[color] ?? color}`}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
