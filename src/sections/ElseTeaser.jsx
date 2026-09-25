import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Magnetic from '../components/Magnetic'
import SpinBadge from '../components/SpinBadge'
import SplitText from '../components/SplitText'
import { COLORS, Stage } from '../components/Stage'

/** Small nudge toward the "What else I do" page. */
export default function ElseTeaser() {
  return (
    <Stage bg={COLORS.tang} fg={COLORS.ink} className="py-28 md:py-36">
      <div className="container-x grid items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="eyebrow mb-6">(05) Off the clock</p>
          <SplitText as="h2" className="display text-[13vw] lowercase md:text-[7.5vw]">
            there’s more to me than code.
          </SplitText>
          <motion.p
            className="mt-6 max-w-lg text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            When the laptop closes, a different kind of making begins.
          </motion.p>
        </div>
        <div className="flex md:col-span-4 md:justify-end">
          <Magnetic strength={0.4}>
            <Link to="/else" data-cursor="Peek" className="group relative block">
              <motion.div
                whileHover={{ scale: 1.08, rotate: -8 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                className="flex h-56 w-56 items-center justify-center rounded-full border-2 border-ink bg-cream text-ink shadow-[6px_6px_0_0_var(--color-ink)] md:h-64 md:w-64"
              >
                <SpinBadge text="what else i do • what else i do • " center="→" size={200} />
              </motion.div>
            </Link>
          </Magnetic>
        </div>
      </div>
    </Stage>
  )
}
