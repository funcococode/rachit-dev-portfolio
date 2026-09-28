import { Link } from 'react-router-dom'
import FillBox from '../components/FillBox'
import PageTransition from '../components/PageTransition'
import { Stage } from '../components/Stage'
import VariableText from '../components/VariableText'

export default function NotFound() {
  return (
    <PageTransition>
      <Stage tone="dark">
        <main className="flex min-h-screen flex-col justify-end pt-16">
          <div className="border-y rule px-4 md:px-8">
            <VariableText text="404" className="display block text-[36vw] leading-[0.85] md:text-[24vw]" />
          </div>
          <div className="grid md:grid-cols-2">
            <p className="border-b rule px-4 py-8 text-2xl md:border-b-0 md:border-r md:px-8 md:text-3xl">This page doesn’t exist.</p>
            <FillBox as={Link} to="/" className="px-4 py-8 text-2xl md:px-8 md:text-3xl">
              <span>Back home</span>
              <span>→</span>
            </FillBox>
          </div>
        </main>
      </Stage>
    </PageTransition>
  )
}
