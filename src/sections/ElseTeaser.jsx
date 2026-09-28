import { Link } from 'react-router-dom'
import FillBox from '../components/FillBox'
import SectionLabel from '../components/SectionLabel'
import { Stage } from '../components/Stage'

/** Understated link to the "What else I do" page. */
export default function ElseTeaser() {
  return (
    <Stage tone="dark">
      <SectionLabel index="05" aside="Off the clock">
        Beyond code
      </SectionLabel>
      <FillBox as={Link} to="/else" data-cursor="Explore" className="block w-full border-b rule px-4 py-14 text-left md:px-8 md:py-24">
        <span>
          <span className="display block text-[12vw] md:text-[7vw]">What else I do</span>
          <span className="mt-4 block max-w-lg text-lg opacity-80">Music, physics, philosophy and a lot of travel — the rest of me.</span>
        </span>
        <span className="display text-[12vw] transition-transform duration-700 group-hover:translate-x-2 group-hover:-rotate-45 md:text-[7vw]">→</span>
      </FillBox>
    </Stage>
  )
}
