import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import BrowserFrame from '../components/BrowserFrame'
import Footer from '../components/Footer'
import Magnetic from '../components/Magnetic'
import PageTransition from '../components/PageTransition'
import ProjectArt from '../components/ProjectArt'
import RollText from '../components/RollText'
import SplitText from '../components/SplitText'
import { getNextProject, getProject, projects } from '../data/projects'
import { EASE, pad } from '../lib/motion'
import { useLoader } from '../hooks/useLoader'

export default function CaseStudy() {
  const { slug } = useParams()
  const project = getProject(slug)
  const { ready } = useLoader()
  if (!project) return <Navigate to="/" replace />
  // wait for the preloader on a direct visit so the intro animation is seen
  if (!ready) return <div className="min-h-screen bg-ink" />
  return <CaseStudyView key={slug} project={project} />
}

function CaseStudyView({ project: p }) {
  const index = projects.findIndex((x) => x.slug === p.slug)
  const next = getNextProject(p.slug)

  useEffect(() => {
    document.title = `${p.title} — Case Study · Rachit Shrivastava`
  }, [p.title])

  return (
    <PageTransition label={p.title}>
      <main style={{ '--accent': p.theme.accent }}>
        <Intro p={p} index={index} />
        <Cover p={p} />
        <Block label="Overview" index="01">
          <Lead>{p.overview}</Lead>
        </Block>
        <Block label="The challenge" index="02">
          <Lead>{p.challenge}</Lead>
        </Block>
        <Block label="Approach" index="03">
          <ol className="space-y-0 border-t border-line">
            {p.approach.map((a, i) => (
              <motion.li
                key={i}
                className="grid grid-cols-12 gap-4 border-b border-line py-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, ease: EASE.expo, delay: i * 0.05 }}
              >
                <span className="col-span-2 font-mono text-xs md:col-span-1" style={{ color: p.theme.accent }}>
                  {pad(i + 1)}
                </span>
                <p className="col-span-10 text-lg text-bone/85 md:col-span-11 md:text-xl">{a}</p>
              </motion.li>
            ))}
          </ol>
        </Block>
        <Features p={p} />
        <Showcase p={p} />
        <Block label="Tech stack" index="05">
          <div className="flex flex-wrap gap-3">
            {p.stack.map((s, i) => (
              <motion.span
                key={s}
                className="rounded-full border border-line px-5 py-2.5 text-lg"
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE.expo, delay: i * 0.05 }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </Block>
        <Block label="Outcome" index="06">
          <p className="serif-i text-4xl leading-[1.1] md:text-6xl">“{p.outcome}”</p>
          <div className="mt-12">
            <VisitButton p={p} />
          </div>
        </Block>
        <NextProject next={next} />
      </main>
      <Footer />
    </PageTransition>
  )
}

function Intro({ p, index }) {
  return (
    <section className="container-x pb-16 pt-32 md:pb-24 md:pt-44">
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE.expo, delay: 0.6 }}
      >
        <Link to="/#work" className="group eyebrow flex items-center gap-2 !text-bone">
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          <RollText>All work</RollText>
        </Link>
        <span className="eyebrow">
          Case study {pad(index + 1)} / {pad(projects.length)}
        </span>
      </motion.div>

      <SplitText as="h1" by="chars" delay={0.55} stagger={0.03} duration={1.2} className="display mt-14 text-[17vw] md:text-[11vw]">
        {p.title}
      </SplitText>

      <div className="mt-10 grid gap-10 md:grid-cols-12">
        <motion.p
          className="text-2xl leading-snug text-bone/85 md:col-span-6 md:text-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE.expo, delay: 0.9 }}
        >
          {p.tagline}
        </motion.p>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 md:col-span-5 md:col-start-8">
          {[
            ['Role', p.role],
            ['Year', p.year],
            ['Type', p.category],
            ['Live', p.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')],
          ].map(([k, v], i) => (
            <motion.div
              key={k}
              className="border-t border-line pt-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE.expo, delay: 1 + i * 0.07 }}
            >
              <dt className="eyebrow mb-1">{k}</dt>
              <dd className="text-sm">
                {k === 'Live' ? (
                  <a href={p.url} target="_blank" rel="noreferrer" className="group inline-flex gap-1" style={{ color: p.theme.accent }}>
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
    </section>
  )
}

function Cover({ p }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const inset = useTransform(scrollYProgress, [0, 0.45], [12, 0])
  const clip = useTransform(inset, (v) => `inset(${v}% ${v}% ${v}% ${v}% round ${v * 1.5}px)`)
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1])

  return (
    <section ref={ref} className="px-3 md:px-5">
      <motion.div
        style={{ clipPath: clip }}
        className="relative h-[70vh] overflow-hidden rounded-2xl md:h-[92vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.9 }}
      >
        <motion.div style={{ scale }} className="h-full w-full">
          <ProjectArt project={p} className="h-full w-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

function Block({ label, index, children }) {
  return (
    <section className="container-x py-20 md:py-28">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-3">
          <div className="md:sticky md:top-28">
            <span className="eyebrow block">({index})</span>
            <h2 className="mt-2 text-2xl font-medium tracking-[-0.02em]">{label}</h2>
          </div>
        </div>
        <div className="md:col-span-9">{children}</div>
      </div>
    </section>
  )
}

function Lead({ children }) {
  return (
    <motion.p
      className="text-2xl leading-[1.35] tracking-[-0.015em] md:text-[2.4rem]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.2, ease: EASE.expo }}
    >
      {children}
    </motion.p>
  )
}

function Features({ p }) {
  return (
    <section className="py-20 md:py-28" style={{ background: p.theme.bg }}>
      <div className="container-x">
        <div className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="eyebrow block">(04)</span>
            <SplitText as="h2" className="display mt-3 text-6xl md:text-8xl">
              Key features
            </SplitText>
          </div>
          <p className="max-w-xs" style={{ color: `${p.theme.fg}99` }}>
            The pieces that make {p.title} work — and the thinking behind each.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {p.features.map((f, i) => (
            <motion.article
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border p-7 md:p-8"
              style={{ borderColor: `${p.theme.fg}22`, color: p.theme.fg }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: EASE.expo, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <span
                className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                style={{ background: p.theme.accent }}
              />
              <div className="relative transition-colors duration-500 group-hover:text-ink">
                <span className="font-mono text-xs opacity-60">{pad(i + 1)}</span>
                <h3 className="mt-14 text-2xl font-medium tracking-[-0.02em] md:text-3xl">{f.title}</h3>
                <p className="mt-3 opacity-70">{f.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Showcase({ p }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80])
  const y2 = useTransform(scrollYProgress, [0, 1], [160, -120])
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 4])

  return (
    <section ref={ref} className="container-x py-20 md:py-32">
      <div className="grid items-center gap-8 md:grid-cols-12">
        <motion.div style={{ y: y1 }} className="md:col-span-8">
          <BrowserFrame url={p.url}>
            <ProjectArt project={{ ...p, images: p.images.slice(1, 2).length ? p.images.slice(1, 2) : p.images }} className="aspect-[16/10] w-full" />
          </BrowserFrame>
        </motion.div>
        <motion.div style={{ y: y2, rotate }} className="mx-auto w-[60%] md:col-span-4 md:w-full">
          <div className="overflow-hidden rounded-[2rem] border-[6px] border-ink-3 bg-ink-3 shadow-2xl shadow-black/60">
            <div className="mx-auto mb-1 mt-2 h-4 w-20 rounded-full bg-ink" />
            <ProjectArt project={{ ...p, images: p.images.slice(2, 3) }} className="aspect-[9/17] w-full rounded-[1.5rem]" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function VisitButton({ p }) {
  return (
    <Magnetic>
      <a
        href={p.url}
        target="_blank"
        rel="noreferrer"
        data-cursor="Visit"
        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-line px-8 py-5 text-lg"
      >
        <span
          className="absolute inset-0 translate-y-full rounded-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
          style={{ background: p.theme.accent }}
        />
        <span className="relative transition-colors duration-500 group-hover:text-ink">Visit live site ↗</span>
      </a>
    </Magnetic>
  )
}

function NextProject({ next }) {
  const navigate = useNavigate()
  return (
    <section className="border-t border-line">
      <button
        onClick={() => navigate(`/work/${next.slug}`)}
        data-cursor="Next"
        className="group relative block w-full overflow-hidden py-24 text-left md:py-36"
      >
        <span
          className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100"
          style={{ background: next.theme.bg }}
        />
        <div className="container-x relative">
          <span className="eyebrow">Next project</span>
          <div className="mt-6 flex items-end justify-between gap-6">
            <h2 className="display text-[15vw] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4 md:text-[10vw]">
              {next.title}
            </h2>
            <span
              className="mb-4 hidden h-24 w-24 shrink-0 -rotate-45 items-center justify-center rounded-full text-3xl text-ink transition-transform duration-700 group-hover:rotate-0 md:flex"
              style={{ background: next.theme.accent }}
            >
              →
            </span>
          </div>
          <p className="mt-4 max-w-md text-ash">{next.tagline}</p>
        </div>
      </button>
    </section>
  )
}
