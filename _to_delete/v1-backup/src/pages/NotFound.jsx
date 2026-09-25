import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import SplitText from '../components/SplitText'
import Waveform from '../components/Waveform'

export default function NotFound() {
  return (
    <PageTransition label="404">
      <main className="container-x flex min-h-screen flex-col items-start justify-center gap-8">
        <SplitText as="h1" by="chars" delay={0.5} className="display text-[30vw] md:text-[20vw]">
          404
        </SplitText>
        <p className="serif-i text-3xl text-ash md:text-5xl">This track doesn’t exist — yet.</p>
        <div className="h-16 w-full">
          <Waveform bars={80} energy={0.3} />
        </div>
        <Link to="/" className="rounded-full bg-ember px-6 py-3 text-ink">
          Back home
        </Link>
      </main>
    </PageTransition>
  )
}
