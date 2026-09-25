import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * A tiny generative ambient loop built with the Web Audio API —
 * no audio files. Lush 9th-chord pad + a wandering arpeggio + delay.
 *
 * const { playing, toggle, getLevel } = useSynth()
 */
const PROGRESSION = [
  [48, 55, 59, 62, 64], // Cmaj9
  [45, 52, 55, 59, 60], // Am9
  [41, 48, 52, 55, 57], // Fmaj7(9)
  [43, 50, 53, 57, 62], // G9sus-ish
]
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12)

export default function useSynth({ bpm = 84 } = {}) {
  const [playing, setPlaying] = useState(false)
  const ctx = useRef(null)
  const nodes = useRef(null)
  const timer = useRef(null)
  const step = useRef(0)
  const nextTime = useRef(0)
  const data = useRef(null)

  const build = () => {
    const ac = new (window.AudioContext || window.webkitAudioContext)()
    const master = ac.createGain()
    master.gain.value = 0
    const filter = ac.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 2400
    filter.Q.value = 0.6
    const delay = ac.createDelay(2)
    delay.delayTime.value = (60 / bpm) * 0.75
    const fb = ac.createGain()
    fb.gain.value = 0.38
    const wet = ac.createGain()
    wet.gain.value = 0.35
    const analyser = ac.createAnalyser()
    analyser.fftSize = 256

    filter.connect(master)
    filter.connect(delay)
    delay.connect(fb).connect(delay)
    delay.connect(wet).connect(master)
    master.connect(analyser)
    analyser.connect(ac.destination)

    ctx.current = ac
    nodes.current = { master, filter, analyser }
    data.current = new Uint8Array(analyser.frequencyBinCount)
  }

  const voice = (freq, time, dur, gain, type = 'triangle') => {
    const ac = ctx.current
    const { filter } = nodes.current
    const g = ac.createGain()
    g.gain.setValueAtTime(0, time)
    g.gain.linearRampToValueAtTime(gain, time + Math.min(0.02 + dur * 0.1, 0.8))
    g.gain.exponentialRampToValueAtTime(0.0001, time + dur)
    g.connect(filter)
    ;[-5, 5].forEach((detune) => {
      const o = ac.createOscillator()
      o.type = type
      o.frequency.value = freq
      o.detune.value = detune
      o.connect(g)
      o.start(time)
      o.stop(time + dur + 0.05)
    })
  }

  const schedule = useCallback(() => {
    const ac = ctx.current
    const sixteenth = 60 / bpm / 2
    while (nextTime.current < ac.currentTime + 0.2) {
      const s = step.current
      const bar = Math.floor(s / 16) % PROGRESSION.length
      const chord = PROGRESSION[bar]
      const t = nextTime.current
      if (s % 16 === 0) {
        chord.forEach((n) => voice(mtof(n), t, sixteenth * 17, 0.035, 'sine'))
        voice(mtof(chord[0] - 12), t, sixteenth * 16, 0.06, 'sine')
      }
      const pattern = [0, 2, 4, 3, 1, 4, 2, 3]
      if (s % 2 === 0 || Math.random() > 0.7) {
        const n = chord[pattern[(s >> 1) % pattern.length]] + 12 + (Math.random() > 0.85 ? 12 : 0)
        voice(mtof(n), t, sixteenth * 3.5, 0.05)
      }
      nextTime.current += sixteenth
      step.current++
    }
  }, [bpm])

  const start = useCallback(async () => {
    if (!ctx.current) build()
    const ac = ctx.current
    await ac.resume()
    const { master } = nodes.current
    master.gain.cancelScheduledValues(ac.currentTime)
    master.gain.setTargetAtTime(0.9, ac.currentTime, 0.4)
    nextTime.current = ac.currentTime + 0.05
    timer.current = setInterval(schedule, 50)
    setPlaying(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule])

  const stop = useCallback(() => {
    const ac = ctx.current
    if (!ac) return
    nodes.current.master.gain.setTargetAtTime(0, ac.currentTime, 0.25)
    clearInterval(timer.current)
    setPlaying(false)
  }, [])

  const toggle = useCallback(() => (playing ? stop() : start()), [playing, start, stop])

  const getLevel = useCallback(() => {
    if (!nodes.current || !playing) return 0
    nodes.current.analyser.getByteFrequencyData(data.current)
    let sum = 0
    for (let i = 0; i < data.current.length; i++) sum += data.current[i]
    return Math.min(1, (sum / data.current.length / 255) * 3)
  }, [playing])

  useEffect(
    () => () => {
      clearInterval(timer.current)
      ctx.current?.close()
    },
    [],
  )

  return { playing, toggle, start, stop, getLevel }
}
