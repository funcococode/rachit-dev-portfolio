import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import FillBox from '../components/FillBox'
import Footer from '../components/Footer'
import LocalTime from '../components/LocalTime'
import PageTransition from '../components/PageTransition'
import SectionLabel from '../components/SectionLabel'
import { Stage } from '../components/Stage'
import VariableText from '../components/VariableText'
import { contact, site } from '../data/site'
import { useLoader } from '../hooks/useLoader'
import { EASE } from '../lib/motion'

const OWN = '__own__' // "I'll write my own question"
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

/**
 * Contact page: pick a topic → pick (or write) a question → add details →
 * send by email or WhatsApp. Everything is composed into one tidy message.
 */
export default function Contact() {
  const { ready } = useLoader()
  useEffect(() => {
    document.title = 'Contact — Rachit Shrivastava'
  }, [])
  if (!ready) return <div className="min-h-screen" />

  return (
    <PageTransition>
      <main>
        <Stage tone="light" className="pt-14 md:pt-16">
          <SectionLabel index="—" aside={site.available ? 'Available for new projects' : 'Currently booked'}>
            Contact
          </SectionLabel>
          <div className="grid border-b rule md:grid-cols-12">
            <div className="px-4 py-12 md:col-span-8 md:border-r md:rule md:px-8 md:py-16">
              <h1 className="display">
                <VariableText text="Let’s talk." delay={0.4} min={200} max={700} className="block text-[21vw] md:text-[12vw]" />
              </h1>
            </div>
            <motion.p
              className="flex items-end px-4 pb-12 text-lg md:col-span-4 md:px-8 md:py-16"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE.expo, delay: 0.8 }}
            >
              Tell me a little about what you have in mind — pick a topic, choose a question or write your own, and send it
              whichever way you like.
            </motion.p>
          </div>
          <div className="grid md:grid-cols-12">
            <div className="md:col-span-8 md:border-r md:rule">
              <ContactForm />
            </div>
            <Aside />
          </div>
        </Stage>
      </main>
      <Footer minimal />
    </PageTransition>
  )
}

/* ─────────────────────────── form ─────────────────────────── */

function ContactForm() {
  const [topicId, setTopicId] = useState(contact.topics[0].id)
  const [question, setQuestion] = useState(contact.topics[0].questions[0])
  const [own, setOwn] = useState('')
  const [budget, setBudget] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [tried, setTried] = useState(null) // 'email' | 'whatsapp' — show errors after a send attempt
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [bot, setBot] = useState('') // honeypot

  const topic = contact.topics.find((t) => t.id === topicId)
  const finalQuestion = question === OWN ? own.trim() : question
  const showBudget = topicId === 'project'

  const pickTopic = (id) => {
    setTopicId(id)
    setQuestion(contact.topics.find((t) => t.id === id).questions[0])
  }

  const errors = {
    name: !name.trim() && 'Please add your name',
    question: !finalQuestion && 'Write your question',
    email: tried === 'email' && !emailOk(email) && 'Add a valid email so I can reply',
  }
  const invalid = Object.values(errors).some(Boolean)

  const composed = useMemo(() => {
    const lines = [
      `Hi Rachit, I'm ${name.trim() || '—'}${email.trim() ? ` (${email.trim()})` : ''}.`,
      '',
      `Topic: ${topic.label}`,
      `Question: ${finalQuestion || '—'}`,
    ]
    if (showBudget && budget) lines.push(`Budget: ${budget}`)
    if (message.trim()) lines.push('', message.trim())
    return lines.join('\n')
  }, [name, email, topic.label, finalQuestion, showBudget, budget, message])

  const subject = `[Portfolio] ${topic.label} — ${finalQuestion || 'New message'}`.slice(0, 120)

  const sendWhatsApp = () => {
    setTried('whatsapp')
    if (errors.name || errors.question) return
    window.open(`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(composed)}`, '_blank', 'noopener')
    setStatus('sent')
  }

  const sendEmail = async () => {
    setTried('email')
    if (errors.name || errors.question || !emailOk(email)) return
    if (bot) return setStatus('sent') // quietly drop bots
    if (!contact.web3formsKey) {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(composed)}`
      setStatus('sent')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: contact.web3formsKey,
          subject,
          from_name: 'Portfolio contact form',
          name: name.trim(),
          email: email.trim(),
          replyto: email.trim(),
          topic: topic.label,
          question: finalQuestion,
          budget: showBudget ? budget : undefined,
          message: composed,
        }),
      })
      const data = await res.json()
      setStatus(data.success ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') return <Sent name={name} onReset={() => setStatus('idle')} />

  return (
    <form onSubmit={(e) => (e.preventDefault(), sendEmail())} noValidate>
      {/* honeypot — hidden from humans */}
      <input type="text" tabIndex={-1} autoComplete="off" value={bot} onChange={(e) => setBot(e.target.value)} className="hidden" aria-hidden />

      <Step n="01" title="What’s it about?">
        <div className="grid grid-cols-2 sm:grid-cols-3">
          {contact.topics.map((t) => (
            <Choice key={t.id} active={t.id === topicId} onClick={() => pickTopic(t.id)}>
              {t.label}
            </Choice>
          ))}
        </div>
      </Step>

      <Step n="02" title="Pick a question — or ask your own">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={topicId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE.expo }}
          >
            {[...topic.questions, OWN].map((q) => (
              <Choice key={q} row active={question === q} onClick={() => setQuestion(q)}>
                {q === OWN ? 'Something else — I’ll write my own' : q}
              </Choice>
            ))}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence initial={false}>
          {question === OWN && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
              <Field label="Your question" error={tried && errors.question}>
                <input autoFocus value={own} onChange={(e) => setOwn(e.target.value)} placeholder="Type your question…" className={inputCls} />
              </Field>
            </motion.div>
          )}
        </AnimatePresence>
      </Step>

      <AnimatePresence initial={false}>
        {showBudget && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <Step n="02b" title="Rough budget (optional)">
              <div className="grid grid-cols-2 sm:grid-cols-5">
                {contact.budgets.map((b) => (
                  <Choice key={b} active={budget === b} onClick={() => setBudget(budget === b ? '' : b)}>
                    {b}
                  </Choice>
                ))}
              </div>
            </Step>
          </motion.div>
        )}
      </AnimatePresence>

      <Step n="03" title="About you">
        <div className="grid sm:grid-cols-2">
          <Field label="Name" error={tried && errors.name} className="sm:border-r sm:rule">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" className={inputCls} />
          </Field>
          <Field label="Email (needed for email replies)" error={errors.email}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className={inputCls}
            />
          </Field>
        </div>
        <Field label="Anything else? (optional)" className="border-t rule">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder="Links, timelines, context — whatever helps."
            className={`${inputCls} resize-y`}
          />
        </Field>
      </Step>

      <Step n="04" title="Send it">
        <div className="grid sm:grid-cols-2">
          <FillBox type="submit" data-cursor="Email" disabled={status === 'sending'} className="border-b rule px-4 py-7 text-left text-xl font-semibold sm:border-b-0 sm:border-r md:px-8">
            <span>
              <span className="eyebrow mb-2 block opacity-70">Email</span>
              {status === 'sending' ? 'Sending…' : 'Send by email'}
            </span>
            <span className="transition-transform duration-500 group-hover:-rotate-45">→</span>
          </FillBox>
          <FillBox type="button" onClick={sendWhatsApp} data-cursor="WhatsApp" className="px-4 py-7 text-left text-xl font-semibold md:px-8">
            <span>
              <span className="eyebrow mb-2 block opacity-70">WhatsApp</span>
              Send on WhatsApp
            </span>
            <span className="transition-transform duration-500 group-hover:-rotate-45">→</span>
          </FillBox>
        </div>
        <AnimatePresence>
          {(status === 'error' || (tried && invalid)) && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t rule px-4 py-3 font-mono text-xs md:px-8"
              role="alert"
            >
              {status === 'error'
                ? `Something went wrong sending that. Try WhatsApp, or email ${site.email} directly.`
                : 'A couple of fields need attention above.'}
            </motion.p>
          )}
        </AnimatePresence>
      </Step>

      <Preview text={composed} />
    </form>
  )
}

const inputCls =
  'w-full bg-transparent px-0 py-2 text-xl outline-none placeholder:opacity-40 md:text-2xl focus-visible:outline-none'

function Step({ n, title, children }) {
  return (
    <section className="border-b rule">
      <div className="flex items-center gap-4 border-b rule px-4 py-3 md:px-8">
        <span className="font-mono text-xs">{n}</span>
        <span className="font-semibold">{title}</span>
      </div>
      {children}
    </section>
  )
}

/** Selectable box. `row` = full-width list item with a square radio mark. */
function Choice({ active, onClick, children, row = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group relative isolate -mb-px -mr-px flex items-center gap-4 overflow-hidden border-b border-r rule text-left transition-colors ${
        row ? 'w-full px-4 py-4 text-lg md:px-8' : 'px-4 py-5 text-base md:px-6'
      } ${active ? 'bg-[var(--fg)] text-[var(--bg)]' : ''}`}
    >
      {!active && (
        <span className="absolute inset-0 -z-10 translate-y-full bg-[var(--fg)] opacity-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
      )}
      {row && (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center border border-current">
          {active && <motion.span layoutId="q-dot" className="block h-2 w-2 bg-current" />}
        </span>
      )}
      <span>{children}</span>
    </button>
  )
}

function Field({ label, error, children, className = '' }) {
  return (
    <label className={`block px-4 py-4 md:px-8 ${className}`}>
      <span className="eyebrow flex justify-between opacity-70">
        <span>{label}</span>
        {error && <span className="opacity-100">↳ {error}</span>}
      </span>
      <span className={`mt-2 block border-b ${error ? 'border-current' : 'rule-soft'} focus-within:border-current`}>{children}</span>
    </label>
  )
}

/** Live preview of exactly what will be sent. */
function Preview({ text }) {
  return (
    <details className="group border-b rule">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] md:px-8">
        <span>Preview message</span>
        <span className="transition-transform group-open:rotate-45">+</span>
      </summary>
      <pre className="whitespace-pre-wrap border-t rule px-4 py-5 font-mono text-sm leading-relaxed md:px-8">{text}</pre>
    </details>
  )
}

function Sent({ name, onReset }) {
  return (
    <motion.div
      className="flex min-h-[520px] flex-col justify-between border-b rule"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="px-4 py-12 md:px-8 md:py-16">
        <motion.span
          className="mb-8 block h-14 w-14 bg-current"
          initial={{ rotate: 0, scale: 0 }}
          animate={{ rotate: 45, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14 }}
        />
        <h2 className="display text-6xl md:text-7xl">Thank you{name.trim() ? `, ${name.trim().split(' ')[0]}` : ''}.</h2>
        <p className="mt-6 max-w-md text-lg">
          Your message is on its way. If WhatsApp or your email app opened, just hit send there. I’ll get back to you soon.
        </p>
      </div>
      <FillBox onClick={onReset} className="border-t rule px-4 py-6 text-left text-lg md:px-8">
        <span>Send another message</span>
        <span>↺</span>
      </FillBox>
    </motion.div>
  )
}

/* ─────────────────────────── aside ─────────────────────────── */

function Aside() {
  const wa = contact.whatsapp
  const pretty = `+${wa.slice(0, 2)} ${wa.slice(2, 7)} ${wa.slice(7)}`
  return (
    <aside className="md:col-span-4">
      <div className="md:sticky md:top-16">
        <p className="eyebrow border-b rule px-4 py-3 md:px-8">Or reach me directly</p>
        <FillBox as="a" href={`mailto:${site.email}`} data-cursor="Email" className="border-b rule px-4 py-6 text-left md:px-8">
          <span>
            <span className="eyebrow mb-2 block opacity-70">Email</span>
            <span className="break-all text-lg font-semibold">{site.email}</span>
          </span>
          <span>↗</span>
        </FillBox>
        <FillBox as="a" href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" data-cursor="WhatsApp" className="border-b rule px-4 py-6 text-left md:px-8">
          <span>
            <span className="eyebrow mb-2 block opacity-70">WhatsApp</span>
            <span className="text-lg font-semibold">{pretty}</span>
          </span>
          <span>↗</span>
        </FillBox>
        <div className="grid grid-cols-2 border-b rule">
          <div className="border-r rule px-4 py-5 md:px-8">
            <p className="eyebrow mb-2 opacity-70">Local time</p>
            <LocalTime className="font-semibold" />
          </div>
          <div className="px-4 py-5 md:px-8">
            <p className="eyebrow mb-2 opacity-70">Based in</p>
            <p className="font-semibold">{site.location}</p>
          </div>
        </div>
        <div className="border-b rule px-4 py-5 md:px-8">
          <p className="eyebrow mb-3 opacity-70">Elsewhere</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}
