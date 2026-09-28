import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import BrowserFrame from '../components/BrowserFrame'
import FillBox from '../components/FillBox'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import ProjectArt from '../components/ProjectArt'
import RollText from '../components/RollText'
import SectionLabel from '../components/SectionLabel'
import SplitText from '../components/SplitText'
import { Stage } from '../components/Stage'
import VariableText from '../components/VariableText'
import { getNextProject, getProject, projects } from '../data/projects'
import { useLoader } from '../hooks/useLoader'
import { EASE, pad } from '../lib/motion'

export default function CaseStudy() {
  const { slug } = useParams()
  const project = getProject(slug)
  const { ready } = useLoader()
  if (!project) return <Navigate to="/" replace />
  // wait for the preloader on a direct visit so the intro animation is seen
  if (!ready) return <div className="min-h-screen" />
  return <CaseStudyView key={slug} project={project} />
}

function CaseStudyView({ project: p }) {
  const index = projects.findIndex((x) => x.slug === p.slug)
  const next = getNextProject(p.slug)

  useEffect(() => {
    document.title = `${p.title} — Case Study · Rachit Shrivastava`
  }, [p.title])

  return (
    <PageTransition>
      <main>
        <Intro p={p} index={index} />
        <Cover p={p} />
        <Stage tone="light">
          <Block label="Overview" index="01">
            <Lead>{p.overview}</Lead>
          </Block>
          <Block label="The challenge" index="02">
            <Lead>{p.challenge}</Lead>
          </Block>
          <Block label="Approach" index="03" flush>
            <ol>
              {p.approach.map((a, i) => (
                <motion.li
                  key={i}
                  className="grid grid-cols-12 border-b rule last:border-b-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.9, ease: EASE.expo, delay: i * 0.05 }}
                >
                  <span className="col-span-2 border-r rule px-4 py-6 font-mono text-xs md:col-span-1 md:px-6">{pad(i + 1)}</span>
                  <p className="col-span-10 px-4 py-6 text-lg md:col-span-11 md:px-8 md:text-xl">{a}</p>
                </motion.li>
              ))}
            </ol>
          </Block>
        </Stage>
        <Features p={p} />
        <Showcase p={p} />
        <Stage tone="light">
          <Block label="Tech stack" index="05" flush>
            <div className="flex flex-wrap">
              {p.stack.map((s, i) => (
                <motion.span
                  key={s}
                  className="border-b border-r rule px-6 py-5 text-lg"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </Block>
          <Block label="Outcome" index="06">
            <p className="display text-4xl leading-[1.05] md:text-6xl">“{p.outcome}”</p>
          </Block>
          <div className="grid border-b rule md:grid-cols-2">
            <FillBox
              as="a"
              href={p.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="Visit"
              className="border-b rule px-4 py-8 text-2xl md:border-b-0 md:border-r md:px-8 md:text-3xl"
            >
              <span>Visit live site</span>
              <span>↗</span>
            </FillBox>
            <FillBox as={Link} to="/#work" className="px-4 py-8 text-2xl md:px-8 md:text-3xl">
              <span>All work</span>
              <span>←</span>
            </FillBox>
          </div>
        </Stage>
        <NextProject next={next} />
      </main>
      <Footer />
    </PageTransition>
  )
}

function Intro({ p, index }) {
  const meta = [
    ['Role', p.role],
    ['Year', p.year],
    ['Type', p.category],
    ['Live', p.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')],
  ]
  return (
    <Stage tone="light" className="pt-14 md:pt-16">
      <SectionLabel index={pad(index + 1)} aside={`Case study ${pad(index + 1)} / ${pad(projects.length)}`}>
        <Link to="/#work" className="group inline-flex items-center gap-2">
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          <RollText>All work</RollText>
        </Link>
      </SectionLabel>

      <div className="border-b rule px-4 py-10 md:px-8 md:py-16">
        <VariableText text={p.title} delay={0.5} min={200} max={700} className="display block text-[17vw] md:text-[11vw]" />
      </div>

      <div className="grid md:grid-cols-12">
        <motion.p
          className="border-b rule px-4 py-8 text-2xl leading-snug md:col-span-6 md:border-r md:px-8 md:text-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE.expo, delay: 0.8 }}
        >
          {p.tagline}
        </motion.p>
        <dl className="grid grid-cols-2 md:col-span-6">
          {meta.map(([k, v], i) => (
            <motion.div
              key={k}
              className={`border-b rule px-4 py-6 md:px-8 ${i % 2 === 0 ? 'border-r' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 + i * 0.07 }}
            >
              <dt className="eyebrow muted mb-2">{k}</dt>
              <dd className="text-sm font-semibold md:text-base">
                {k === 'Live' ? (
                  <a href={p.url} target="_blank" rel="noreferrer" className="group inline-flex gap-1">
                    <RollText>{v}</RollText> ↗
                  </a>
                ) : (
                  v
                )}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </Stage>
  )
}

function Cover({ p }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const inset = useTransform(scrollYProgress, [0, 0.45], [8, 0])
  const clip = useTransform(inset, (v) => `inset(${v}% ${v}% ${v}% ${v}%)`)
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1])

  return (
    <Stage tone="light" ref={ref} className="border-b rule p-4 md:p-8">
      <motion.div
        style={{ clipPath: clip }}
        className="relative h-[60vh] overflow-hidden border rule md:h-[88vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.9 }}
      >
        <motion.div style={{ scale }} className="h-full w-full">
          <ProjectArt project={p} className="h-full w-full" />
        </motion.div>
      </motion.div>
    </Stage>
  )
}

/** A ruled row: label cell on the left, content on the right. */
function Block({ label, index, children, flush = false }) {
  return (
    <div className="grid border-b rule md:grid-cols-12">
      <div className="border-b rule px-4 py-6 md:col-span-3 md:border-b-0 md:border-r md:px-8 md:py-10">
        <div className="md:sticky md:top-24">
          <span className="eyebrow muted block">({index})</span>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">{label}</h2>
        </div>
      </div>
      <div className={`md:col-span-9 ${flush ? '' : 'px-4 py-10 md:px-8 md:py-14'}`}>{children}</div>
    </div>
  )
}

function Lead({ children }) {
  return (
    <motion.p
      className="text-2xl leading-[1.35] tracking-[-0.015em] md:text-[2.3rem]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.1, ease: EASE.expo }}
    >
      {children}
    </motion.p>
  )
}

function Features({ p }) {
  return (
    <Stage tone="dark">
      <SectionLabel index="04" aside={`${pad(p.features.length)} features`}>
        Key features
      </SectionLabel>
      <div className="grid border-b rule md:grid-cols-12">
        <div className="px-4 py-10 md:col-span-8 md:border-r md:rule md:px-8 md:py-14">
          <SplitText as="h2" by="chars" className="display text-6xl md:text-8xl">
            Key features
          </SplitText>
        </div>
        <p className="muted flex items-end px-4 pb-10 md:col-span-4 md:px-8 md:py-14">
          The pieces that make {p.title} work — and the thinking behind each.
        </p>
      </div>
      <div className="grid overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
        {p.features.map((f, i) => (
          <motion.article
            key={f.title}
            className="group relative isolate -mb-px -mr-px flex min-h-[260px] flex-col justify-between overflow-hidden border-b border-r rule p-4 md:p-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: (i % 3) * 0.08 }}
          >
            <span className="absolute inset-0 -z-10 translate-y-full bg-[var(--fg)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
            <span className="font-mono text-xs transition-colors duration-500 group-hover:text-[var(--bg)]">{pad(i + 1)}</span>
            <div className="transition-colors duration-500 group-hover:text-[var(--bg)]">
              <h3 className="text-2xl font-semibold tracking-[-0.02em] md:text-3xl">{f.title}</h3>
              <p className="mt-3 opacity-80">{f.text}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </Stage>
  )
}

function Showcase({ p }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [140, -100])

  return (
    <Stage ref={ref} tone="light" className="overflow-hidden border-b rule">
      <div className="grid items-center gap-8 px-4 py-16 md:grid-cols-12 md:px-8 md:py-28">
        <motion.div style={{ y: y1 }} className="md:col-span-8">
          <BrowserFrame url={p.url}>
            <ProjectArt
              project={{ ...p, images: p.images.slice(1, 2).length ? p.images.slice(1, 2) : p.images }}
              className="aspect-[16/10] w-full"
            />
          </BrowserFrame>
        </motion.div>
        <motion.div style={{ y: y2 }} className="mx-auto w-[60%] md:col-span-4 md:w-full">
          <div className="border border-current p-2">
            <div className="mb-2 flex justify-center border-b border-current pb-2">
              <span className="h-2 w-16 bg-current" />
            </div>
            <ProjectArt project={{ ...p, images: p.images.slice(2, 3) }} className="aspect-[9/17] w-full" />
          </div>
        </motion.div>
      </div>
    </Stage>
  )
}

function NextProject({ next }) {
  const navigate = useNavigate()
  return (
    <Stage tone="dark">
      <FillBox
        onClick={() => navigate(`/work/${next.slug}`)}
        data-cursor="Next"
        className="w-full px-4 py-20 text-left md:px-8 md:py-32"
      >
        <span>
          <span className="eyebrow block">Next project</span>
          <span className="display mt-6 block text-[15vw] md:text-[10vw]">{next.title}</span>
          <span className="mt-4 block max-w-md opacity-80">{next.tagline}</span>
        </span>
        <span className="display hidden text-[8vw] transition-transform duration-700 group-hover:-rotate-45 md:block">→</span>
      </FillBox>
    </Stage>
  )
}
