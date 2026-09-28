import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'

/**
 * Ruled section header strip:  | (02) | Selected work ········ | aside |
 * The top rule draws itself in when it scrolls into view.
 */
export default function SectionLabel({ index, children, aside, className = '' }) {
  return (
    <div className={`relative flex items-stretch border-b rule ${className}`}>
      <motion.span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left bg-current"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE.expo }}
      />
      <span className="eyebrow flex items-center border-r rule px-4 py-3 md:px-8">({index})</span>
      <span className="eyebrow flex flex-1 items-center px-4 py-3">{children}</span>
      {aside && <span className="eyebrow muted hidden items-center border-l rule px-4 py-3 md:flex md:px-8">{aside}</span>}
    </div>
  )
}
