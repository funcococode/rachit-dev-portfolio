import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'

/** Small numbered section marker: ( 02 ) Selected work ———— */
export default function SectionLabel({ index, children, className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="eyebrow">({index})</span>
      <span className="eyebrow muted">{children}</span>
      <motion.span
        className="bg-line h-px flex-1 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE.expo }}
      />
    </div>
  )
}
