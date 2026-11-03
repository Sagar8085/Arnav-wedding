// Background music controller.
// Uses /music.mp3 when present; otherwise synthesizes a soft, looping
// raga Bhupali melody over a tanpura-style drone with the Web Audio API.

const SA = 261.63 // C4 as Sa
// Bhupali scale ratios: Sa Re Ga Pa Dha Sa'
const RATIOS = { S: 1, R: 9 / 8, G: 5 / 4, P: 3 / 2, D: 5 / 3, 'S\'': 2, 'R\'': 9 / 4, '.D': 5 / 6, '.P': 3 / 4 }

// [note, beats]
const MELODY = [
  ['S', 2], ['R', 1], ['G', 2], ['P', 1], ['G', 1], ['R', 1], ['S', 2],
  ['.D', 1], ['S', 1], ['R', 1], ['G', 3],
  ['P', 1], ['D', 1], ['S\'', 2], ['D', 1], ['P', 1], ['G', 2],
  ['R', 1], ['G', 1], ['P', 1], ['G', 1], ['R', 1], ['S', 3],
  ['G', 1], ['P', 1], ['D', 2], ['S\'', 1], ['R\'', 1], ['S\'', 2],
  ['D', 1], ['P', 1], ['G', 1], ['P', 1], ['D', 1], ['P', 1], ['G', 2],
  ['R', 1], ['S', 1], ['.D', 1], ['.P', 1], ['.D', 1], ['S', 4],
]
const BEAT = 0.55 // seconds

class SynthMusic {
  constructor() {
    this.ctx = null
    this.master = null
    this.timer = null
    this.droneNodes = []
    this.playing = false
  }

  ensureContext() {
    if (this.ctx) return
    const Ctx = window.AudioContext || window.webkitAudioContext
    this.ctx = new Ctx()
    this.master = this.ctx.createGain()
    this.master.gain.value = 0

    // simple echo for a spacious, temple-like feel
    const delay = this.ctx.createDelay()
    delay.delayTime.value = 0.38
    const feedback = this.ctx.createGain()
    feedback.gain.value = 0.32
    const wet = this.ctx.createGain()
    wet.gain.value = 0.35
    this.bus = this.ctx.createGain()
    this.bus.connect(this.master)
    this.bus.connect(delay)
    delay.connect(feedback).connect(delay)
    delay.connect(wet).connect(this.master)
    this.master.connect(this.ctx.destination)
  }

  startDrone() {
    const t = this.ctx.currentTime
    ;[SA / 2, (SA * 3) / 4, SA / 2 * 1.002, SA].forEach((f, i) => {
      const osc = this.ctx.createOscillator()
      osc.type = 'sawtooth'
      osc.frequency.value = f
      const filter = this.ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 700
      const g = this.ctx.createGain()
      g.gain.value = i === 3 ? 0.012 : 0.022
      // slow swell, like a tanpura being plucked in turn
      const lfo = this.ctx.createOscillator()
      lfo.frequency.value = 0.25 + i * 0.07
      const lfoGain = this.ctx.createGain()
      lfoGain.gain.value = 0.01
      lfo.connect(lfoGain).connect(g.gain)
      osc.connect(filter).connect(g).connect(this.bus)
      osc.start(t)
      lfo.start(t)
      this.droneNodes.push(osc, lfo)
    })
  }

  playNote(freq, start, dur) {
    const osc = this.ctx.createOscillator()
    osc.type = 'triangle'
    osc.frequency.value = freq
    // vibrato
    const vib = this.ctx.createOscillator()
    vib.frequency.value = 5.2
    const vibGain = this.ctx.createGain()
    vibGain.gain.value = freq * 0.006
    vib.connect(vibGain).connect(osc.frequency)

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 1800

    const g = this.ctx.createGain()
    g.gain.setValueAtTime(0.0001, start)
    g.gain.exponentialRampToValueAtTime(0.11, start + 0.08)
    g.gain.exponentialRampToValueAtTime(0.06, start + dur * 0.6)
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur + 0.25)

    osc.connect(filter).connect(g).connect(this.bus)
    osc.start(start)
    vib.start(start)
    osc.stop(start + dur + 0.3)
    vib.stop(start + dur + 0.3)
  }

  scheduleLoop(startAt) {
    let t = startAt
    for (const [note, beats] of MELODY) {
      this.playNote(SA * RATIOS[note], t, beats * BEAT)
      t += beats * BEAT
    }
    t += BEAT * 2 // breath between phrases
    const ms = (t - this.ctx.currentTime - 1) * 1000
    this.timer = setTimeout(() => this.playing && this.scheduleLoop(t), Math.max(ms, 0))
  }

  async play() {
    this.ensureContext()
    if (this.ctx.state === 'suspended') await this.ctx.resume()
    if (this.playing) return
    this.playing = true
    this.startDrone()
    this.master.gain.cancelScheduledValues(this.ctx.currentTime)
    this.master.gain.setValueAtTime(0, this.ctx.currentTime)
    this.master.gain.linearRampToValueAtTime(0.6, this.ctx.currentTime + 2)
    this.scheduleLoop(this.ctx.currentTime + 0.5)
  }

  pause() {
    if (!this.ctx || !this.playing) return
    this.playing = false
    clearTimeout(this.timer)
    const t = this.ctx.currentTime
    this.master.gain.cancelScheduledValues(t)
    this.master.gain.setValueAtTime(this.master.gain.value, t)
    this.master.gain.linearRampToValueAtTime(0, t + 0.6)
    const nodes = this.droneNodes
    this.droneNodes = []
    setTimeout(() => nodes.forEach((n) => { try { n.stop() } catch { /* already stopped */ } }), 700)
    // detach any scheduled notes by swapping the bus
    setTimeout(() => {
      if (this.playing) return
      this.bus.disconnect()
      this.bus = this.ctx.createGain()
      this.bus.connect(this.master)
    }, 700)
  }

  destroy() {
    this.pause()
    setTimeout(() => this.ctx && this.ctx.close(), 800)
  }
}

class FileMusic {
  constructor(src) {
    this.audio = new Audio(src)
    this.audio.loop = true
    this.audio.volume = 0.3
  }
  play() { return this.audio.play() }
  pause() { this.audio.pause() }
  destroy() { this.audio.pause(); this.audio.src = '' }
}

// Returns a controller with play()/pause()/destroy().
export async function createMusic(src) {
  try {
    const res = await fetch(src, { method: 'HEAD' })
    const type = res.headers.get('content-type') || ''
    if (res.ok && type.startsWith('audio')) return new FileMusic(src)
  } catch { /* fall through to synth */ }
  return new SynthMusic()
}
