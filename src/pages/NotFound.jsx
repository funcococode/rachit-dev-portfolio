import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import { COLORS, Stage } from '../components/Stage'
import Sticker from '../components/Sticker'
import VariableText from '../components/VariableText'
import { useRef } from 'react'

export default function NotFound() {
  const ref = useRef(null)
  return (
    <PageTransition>
      <Stage bg={COLORS.pink} fg={COLORS.ink}>
        <main ref={ref} className="container-x relative flex min-h-screen flex-col items-start justify-center gap-8 overflow-hidden">
          <VariableText text="404" className="display text-[34vw] md:text-[22vw]" />
          <p className="text-3xl font-bold md:text-5xl">this page wandered off.</p>
          <Link to="/" className="sticker bg-lime text-lg">
            ← take me home
          </Link>
          <Sticker constraints={ref} color="cobalt" rotate={-12} style={{ top: '22%', right: '12%' }}>
            lost?
          </Sticker>
        </main>
      </Stage>
    </PageTransition>
  )
}
