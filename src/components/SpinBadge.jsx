import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Circular text badge that rotates with scroll (and a little on its own).
 * <SpinBadge text="open to work • open to work •" center="✦" />
 */
export default function SpinBadge({ text, center = '✦', className = '', size = 150 }) {
  const { scrollY } = useScroll()
  const rotate = useTransform(scrollY, (y) => y * 0.25)
  const id = `badge-${text.replace(/\W/g, '').slice(0, 12)}`
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <motion.svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" style={{ rotate }}>
        <defs>
          <path id={id} d="M100 100 m-76 0 a76 76 0 1 1 152 0 a76 76 0 1 1 -152 0" />
        </defs>
        <text className="fill-current font-mono uppercase" fontSize="15" letterSpacing="4">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </motion.svg>
      <motion.span
        className="absolute inset-0 flex items-center justify-center text-4xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      >
        {center}
      </motion.span>
    </div>
  )
}
