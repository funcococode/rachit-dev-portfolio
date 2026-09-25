import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'

/** Small numbered section marker: ( 02 ) — About ——————— */
export default function SectionLabel({ index, children, className = '', light = false }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className={`eyebrow ${light ? '!text-ink' : 'text-bone'}`}>({index})</span>
      <span className={`eyebrow ${light ? '!text-ink/60' : ''}`}>{children}</span>
      <motion.span
        className={`h-px flex-1 origin-left ${light ? 'bg-ink/15' : 'bg-line'}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE.expo }}
      />
    </div>
  )
}
