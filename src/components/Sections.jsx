import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, CalendarCheck, Clock, Crown, Flower2, Heart, MapPin, Music, Navigation, Send, Sun } from 'lucide-react'
import { useLanguage } from '../i18n.jsx'
import { WEDDING } from '../config.js'
import { CornerBranches, HeartDivider, OliveBranch, Photo, SectionTitle, reveal } from './Decor.jsx'
import { Medallion } from './HeroIntro.jsx'

export function calendarUrl() {
  const c = WEDDING.calendar
  return (
    'https://www.google.com/calendar/render?action=TEMPLATE' +
    `&text=${encodeURIComponent(c.title)}&dates=${c.start}/${c.end}` +
    `&details=${encodeURIComponent(c.details)}&location=${encodeURIComponent(c.location)}`
  )
}

const btnSolid =
  'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-sage text-ivory font-caps text-xs tracking-[0.2em] uppercase shadow-[0_10px_25px_-10px_rgba(60,70,50,.7)] hover:bg-olive transition-colors'
const btnOutline =
  'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-sage text-olive font-caps text-xs tracking-[0.2em] uppercase hover:bg-sage hover:text-ivory transition-colors'

function Section({ children, className = '', id }) {
  return (
    <section id={id} className={`relative w-full px-5 py-20 md:py-28 overflow-hidden ${className}`}>
      {children}
    </section>
  )
}

/* 1. WELCOME MESSAGE ------------------------------------------------------ */
export function Welcome() {
  const { t } = useLanguage()
  return (
    <Section>
      <motion.div className="max-w-2xl mx-auto text-center" {...reveal()}>
        <HeartDivider className="mb-8" />
        <p className="font-script text-3xl md:text-4xl leading-relaxed text-olive text-glow">
          {t('welcome.blessing')}
          <br />
          {t('welcome.invite')}
        </p>
        <HeartDivider className="mt-8" />
        <p className="mt-8 text-xl italic text-sage">“{t('welcome.quote')}”</p>
      </motion.div>
    </Section>
  )
}

/* 2. SCRATCH CARD + SAVE THE DATE ----------------------------------------- */
const CONFETTI = ['#b5bf9f', '#4f5a42', '#e3cf9f', '#f2ecdc', '#8a7a4e']

function Confetti() {
  const [bits] = useState(() =>
    [...Array(46)].map((_, i) => ({
      x: (Math.random() - 0.5) * 340,
      y: -(Math.random() * 220 + 80),
      r: Math.random() * 540 - 270,
      c: CONFETTI[i % CONFETTI.length],
      w: Math.random() * 6 + 5,
      d: Math.random() * 0.25,
    }))
  )
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30">
      {bits.map((b, i) => (
        <motion.span
          key={i}
          className="absolute rounded-sm"
          style={{ width: b.w, height: b.w * 0.45, background: b.c }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: b.x, y: [0, b.y, b.y + 320], opacity: [1, 1, 0], rotate: b.r }}
          transition={{ duration: 2.4, delay: b.d, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

function ScratchCard() {
  const { t } = useLanguage()
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const drawing = useRef(false)
  const moves = useRef(0)
  const [revealed, setRevealed] = useState(false)

  // Paint the sage "foil" layer
  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const { width, height } = wrap.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    const g = ctx.createLinearGradient(0, 0, width, height)
    g.addColorStop(0, '#eee6d2')
    g.addColorStop(0.5, '#9aa584')
    g.addColorStop(1, '#4a5540')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, width, height)
    for (let i = 0; i < 900; i++) {
      const c = ['238,230,210', '154,165,132', '74,85,64', '247,242,230'][i % 4]
      ctx.fillStyle = `rgba(${c},${Math.random() * 0.5 + 0.2})`
      ctx.beginPath()
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.6 + 0.3, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.fillStyle = '#f7f2e6'
    ctx.textAlign = 'center'
    ctx.font = '600 15px Cinzel, serif'
    ctx.fillText(t('scratch.hint').toUpperCase(), width / 2, height / 2 + 5)
    ctx.globalCompositeOperation = 'destination-out'
  }, [t])

  const clearedRatio = () => {
    const c = canvasRef.current
    const data = c.getContext('2d').getImageData(0, 0, c.width, c.height).data
    let clear = 0
    let total = 0
    for (let i = 3; i < data.length; i += 4 * 40) {
      total++
      if (data[i] === 0) clear++
    }
    return clear / total
  }

  const scratch = (e) => {
    if (!drawing.current || revealed) return
    const c = canvasRef.current
    const rect = c.getBoundingClientRect()
    const ctx = c.getContext('2d')
    ctx.beginPath()
    ctx.arc(e.clientX - rect.left, e.clientY - rect.top, 24, 0, Math.PI * 2)
    ctx.fill()
    if (++moves.current % 12 === 0 && clearedRatio() > 0.45) setRevealed(true)
  }

  return (
    <div ref={wrapRef} className="relative w-full max-w-sm mx-auto aspect-[4/3] rounded-2xl overflow-hidden paper-card">
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-1 p-6">
        <p className="font-script text-3xl text-sage">{t('scratch.title')}</p>
        <p className="font-caps text-4xl md:text-5xl text-olive-dark tracking-wider">19</p>
        <p className="font-caps text-lg tracking-[0.3em] text-olive">{t('scratch.month')}</p>
        <p className="font-caps text-sm tracking-[0.3em] text-sage">{t('scratch.day')}</p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-base italic text-sage"><Clock size={15} />{t('details.date_note')}</p>
      </div>
      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer touch-none"
        animate={{ opacity: revealed ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        style={{ pointerEvents: revealed ? 'none' : 'auto' }}
        onPointerDown={(e) => { drawing.current = true; e.currentTarget.setPointerCapture(e.pointerId); scratch(e) }}
        onPointerMove={scratch}
        onPointerUp={() => { drawing.current = false }}
        onPointerCancel={() => { drawing.current = false }}
      />
      {revealed && <Confetti />}
    </div>
  )
}

export function SaveTheDate() {
  const { t } = useLanguage()
  return (
    <Section>
      <div className="max-w-3xl mx-auto">
        <SectionTitle label={t('details.date_label')} title={t('save.title')} />
        <motion.div {...reveal(0.15)}>
          <ScratchCard />
        </motion.div>
        <motion.div {...reveal(0.3)} className="mt-10 text-center space-y-4">
          <p className="italic text-lg text-sage">{t('save.note')}</p>
          <a href={calendarUrl()} target="_blank" rel="noopener noreferrer" className={btnSolid}>
            <CalendarCheck size={16} />
            {t('details.add_to_calendar')}
          </a>
        </motion.div>
      </div>
    </Section>
  )
}

/* 3. COUNTDOWN ------------------------------------------------------------- */
const TARGET = new Date('2027-01-19T19:00:00+05:30').getTime()

function useCountdown() {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const diff = Math.max(0, TARGET - now)
  return {
    done: diff === 0,
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  }
}

export function Countdown() {
  const { t } = useLanguage()
  const c = useCountdown()
  const units = [
    ['days', c.days],
    ['hours', c.hours],
    ['minutes', c.minutes],
    ['seconds', c.seconds],
  ]
  return (
    <Section className="bg-sage text-ivory">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #f7f2e6 1px, transparent 1px)', backgroundSize: '26px 26px' }} />
      <OliveBranch className="absolute -left-12 top-6 w-64 rotate-[20deg] opacity-30" color="#e9dec7" berry="#e3cf9f" />
      <OliveBranch className="absolute -right-12 bottom-6 w-64 -scale-x-100 rotate-[20deg] opacity-30" color="#e9dec7" berry="#e3cf9f" />
      <div className="relative max-w-3xl mx-auto">
        <SectionTitle light label={t('date.short')} title={t('countdown.title')} />
        {c.done ? (
          <p className="text-center font-script text-4xl">{t('countdown.done')}</p>
        ) : (
          <motion.div {...reveal(0.2)} className="grid grid-cols-4 gap-3 md:gap-6 max-w-xl mx-auto">
            {units.map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-ivory/30 bg-ivory/10 backdrop-blur-sm py-4 md:py-6 text-center">
                <motion.p key={v} initial={{ opacity: 0.4, y: -6 }} animate={{ opacity: 1, y: 0 }} className="font-caps text-3xl md:text-5xl text-ivory">
                  {String(v).padStart(2, '0')}
                </motion.p>
                <p className="mt-1 font-caps text-[10px] md:text-xs tracking-[0.2em] uppercase text-gold-light">{t(`countdown.${k}`)}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </Section>
  )
}

/* 4. COUPLE ---------------------------------------------------------------- */
function PersonCard({ label, name, parents, place, delay }) {
  return (
    <motion.div {...reveal(delay)} className="paper-card rounded-t-full rounded-b-3xl px-6 pt-14 pb-8 text-center space-y-2">
      <Heart size={18} className="mx-auto text-bronze" fill="currentColor" />
      <p className="font-caps text-xs tracking-[0.35em] uppercase text-bronze">{label}</p>
      <h3 className="font-script text-5xl text-olive">{name}</h3>
      <HeartDivider width="w-10" size={8} color="#6b7d55" />
      <p className="text-lg text-sage leading-snug">{parents}</p>
      <p className="inline-flex items-center gap-1 text-base italic text-bronze"><MapPin size={15} />{place}</p>
    </motion.div>
  )
}

export function Couple() {
  const { t } = useLanguage()
  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        <SectionTitle label={t('couple.subtitle')} title={t('couple.title')} />

        <motion.div {...reveal(0.1)} className="relative max-w-md mx-auto mb-14">
          <div className="rounded-t-full overflow-hidden p-2 paper-card">
            <Photo
              src={WEDDING.photos.couple}
              alt={`${t('bride.name')} & ${t('groom.name')}`}
              className="w-full aspect-[3/4] object-cover rounded-t-full"
              fallback={
                <div className="w-full aspect-[3/4] rounded-t-full bg-gradient-to-b from-sage-light/50 via-linen to-ivory flex flex-col items-center justify-center gap-4">
                  <OliveBranch className="w-44" />
                  <p className="font-script text-5xl text-olive">{t('bride.name')} &amp; {t('groom.name')}</p>
                  <p className="italic text-sage">{t('couple.photo_soon')}</p>
                  <OliveBranch className="w-44 rotate-180" />
                </div>
              }
            />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-6">
          <PersonCard label={t('bride.label')} name={t('bride.name')} parents={t('bride.parents')} place={t('bride.place')} delay={0.1} />
          <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.6, repeat: Infinity }} className="mx-auto font-script text-5xl text-bronze">
            &amp;
          </motion.div>
          <PersonCard label={t('groom.label')} name={t('groom.name')} parents={t('groom.parents')} place={t('groom.place')} delay={0.25} />
        </div>

        <motion.p {...reveal(0.3)} className="mt-12 text-center text-xl italic text-sage max-w-2xl mx-auto">{t('couple.description')}</motion.p>
      </div>
    </Section>
  )
}

/* 5. PROGRAM TIMELINE ------------------------------------------------------ */
function EventCard({ icon, title, time, desc, delay }) {
  return (
    <motion.div {...reveal(delay)} className="relative pl-16">
      <div className="absolute left-0 top-2 w-12 h-12 rounded-full bg-sage text-ivory flex items-center justify-center border-4 border-ivory shadow-md">{icon}</div>
      <div className="paper-card rounded-2xl p-6">
        <p className="inline-flex items-center gap-1.5 font-caps text-xs tracking-[0.2em] uppercase text-bronze"><Clock size={13} />{time}</p>
        <h3 className="mt-1 font-script text-4xl text-olive">{title}</h3>
        <p className="mt-2 text-lg text-sage leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  )
}

function DayBadge({ children }) {
  return (
    <motion.div {...reveal()} className="flex items-center gap-4 mb-6">
      <div className="px-5 py-2 rounded-full border border-sage bg-ivory font-caps text-sm tracking-[0.2em] text-olive">{children}</div>
      <div className="h-px flex-1 bg-gradient-to-r from-moss/60 to-transparent" />
    </motion.div>
  )
}

export function Schedule() {
  const { t } = useLanguage()
  return (
    <Section>
      <div className="max-w-2xl mx-auto">
        <SectionTitle label={t('schedule.subtitle')} title={t('schedule.title')} />
        <div className="relative">
          <div className="absolute left-6 top-16 bottom-6 w-px bg-gradient-to-b from-moss/60 via-moss/30 to-transparent" />
          <DayBadge>{t('schedule.day1')}</DayBadge>
          <div className="space-y-6 mb-12">
            <EventCard icon={<Flower2 size={20} />} title={t('schedule.mehndi')} time={t('schedule.mehndi_time')} desc={t('schedule.mehndi_desc')} delay={0.1} />
            <EventCard icon={<Music size={20} />} title={t('schedule.sangeet')} time={t('schedule.sangeet_time')} desc={t('schedule.sangeet_desc')} delay={0.2} />
          </div>
          <DayBadge>{t('schedule.day2')}</DayBadge>
          <div className="space-y-6">
            <EventCard icon={<Sun size={20} />} title={t('schedule.haldi')} time={t('schedule.haldi_time')} desc={t('schedule.haldi_desc')} delay={0.1} />
            <EventCard icon={<Crown size={20} />} title={t('schedule.baraat')} time={t('schedule.baraat_time')} desc={t('schedule.baraat_desc')} delay={0.2} />
          </div>
        </div>
      </div>
    </Section>
  )
}

/* 6. VENUE ----------------------------------------------------------------- */
export function Venue() {
  const { t } = useLanguage()
  return (
    <Section>
      <div className="max-w-2xl mx-auto">
        <SectionTitle label={t('details.venue_label')} title={t('venue.title')} />
        <motion.div {...reveal(0.1)} className="paper-card rounded-3xl overflow-hidden">
          <Photo
            src={WEDDING.photos.venue}
            alt={t('details.venue_value')}
            className="w-full aspect-[16/9] object-cover"
            fallback={
              <div className="w-full aspect-[16/9] bg-gradient-to-br from-sage to-olive flex items-center justify-center">
                <MapPin size={56} className="text-gold-light" />
              </div>
            }
          />
          <div className="p-8 text-center space-y-3">
            <h3 className="font-script text-4xl md:text-5xl text-olive">{t('details.venue_value')}</h3>
            <p className="inline-flex items-center gap-1.5 italic text-lg text-sage"><Calendar size={16} />{t('thankyou.datetime')}</p>
            <div className="pt-3 flex flex-wrap justify-center gap-3">
              <a href={WEDDING.mapsUrl} target="_blank" rel="noopener noreferrer" className={btnSolid}>
                <Navigation size={15} />
                {t('label.view_maps')}
              </a>
              <a href={calendarUrl()} target="_blank" rel="noopener noreferrer" className={btnOutline}>
                <CalendarCheck size={15} />
                {t('details.add_to_calendar')}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

/* 7. BLESSING -------------------------------------------------------------- */
export function Blessing() {
  const { t } = useLanguage()
  return (
    <Section>
      <motion.div {...reveal()} className="relative max-w-2xl mx-auto paper-card rounded-3xl px-6 py-14 text-center overflow-hidden">
        <CornerBranches size="w-28 md:w-36" opacity={0.45} />
        <div className="relative flex flex-col items-center gap-5">
          <Medallion size="w-28 h-28" />
          <p className="font-caps text-sm tracking-[0.25em] text-bronze">{t('intro.blessing')}</p>
          <h3 className="font-script text-4xl md:text-5xl text-olive">{t('details.blessing_title')}</h3>
          <p className="text-lg text-sage max-w-lg leading-relaxed">{t('details.blessing_desc')}</p>
          <HeartDivider />
        </div>
      </motion.div>
    </Section>
  )
}

/* 8. RSVP (Netlify Forms) -------------------------------------------------- */
const EVENTS = ['mehndi', 'sangeet', 'haldi', 'baraat']

export function Rsvp() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', attending: '', guests: '1', events: [], message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const toggleEvent = (e) => set('events', form.events.includes(e) ? form.events.filter((x) => x !== e) : [...form.events, e])

  const submit = async (ev) => {
    ev.preventDefault()
    if (!form.attending) return setError(t('rsvp.err_attending'))
    if (form.attending === 'yes' && form.events.length === 0) return setError(t('rsvp.err_events'))
    setError('')
    setStatus('sending')
    try {
      const body = new URLSearchParams({
        'form-name': 'rsvp',
        name: form.name,
        attending: form.attending,
        guests: form.attending === 'yes' ? form.guests : '0',
        events: form.events.join(', '),
        message: form.message,
      })
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const field = 'w-full rounded-xl border border-line bg-ivory/80 px-4 py-3 text-lg text-olive placeholder:text-sage/60 focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20'
  const choice = (active) =>
    `flex-1 rounded-xl border px-4 py-3 text-lg transition-colors ${active ? 'bg-sage text-ivory border-sage' : 'bg-ivory/80 border-line text-olive hover:border-sage'}`

  return (
    <Section id="rsvp">
      <div className="max-w-xl mx-auto">
        <SectionTitle label={t('rsvp.label')} title={t('rsvp.title')} subtitle={t('rsvp.subtitle')} />
        <motion.div {...reveal(0.1)} className="paper-card rounded-3xl p-6 md:p-10">
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div key="sent" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 space-y-4">
                <Heart size={40} className="mx-auto text-sage" fill="currentColor" />
                <p className="font-script text-4xl text-olive">{t('rsvp.sent')}</p>
                <p className="italic text-sage">{t('rsvp.sent_note')}</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} className="space-y-6" exit={{ opacity: 0 }}>
                <label className="block space-y-2">
                  <span className="font-caps text-xs tracking-[0.2em] uppercase text-bronze">{t('rsvp.name')}</span>
                  <input required value={form.name} onChange={(e) => set('name', e.target.value)} className={field} autoComplete="name" />
                </label>

                <div className="space-y-2">
                  <span className="font-caps text-xs tracking-[0.2em] uppercase text-bronze">{t('rsvp.attending')}</span>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button type="button" className={choice(form.attending === 'yes')} onClick={() => set('attending', 'yes')}>{t('rsvp.yes')}</button>
                    <button type="button" className={choice(form.attending === 'no')} onClick={() => set('attending', 'no')}>{t('rsvp.no')}</button>
                  </div>
                </div>

                {form.attending === 'yes' && (
                  <>
                    <label className="block space-y-2">
                      <span className="font-caps text-xs tracking-[0.2em] uppercase text-bronze">{t('rsvp.guests')}</span>
                      <select value={form.guests} onChange={(e) => set('guests', e.target.value)} className={field}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </label>
                    <div className="space-y-2">
                      <span className="font-caps text-xs tracking-[0.2em] uppercase text-bronze">{t('rsvp.events')}</span>
                      <div className="grid grid-cols-2 gap-3">
                        {EVENTS.map((e) => (
                          <button key={e} type="button" className={choice(form.events.includes(e))} onClick={() => toggleEvent(e)}>
                            {t(`schedule.${e}`)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <label className="block space-y-2">
                  <span className="font-caps text-xs tracking-[0.2em] uppercase text-bronze">{t('rsvp.message')}</span>
                  <textarea rows={3} value={form.message} onChange={(e) => set('message', e.target.value)} className={field} />
                </label>

                {error && <p className="text-base text-red-800">{error}</p>}
                {status === 'error' && <p className="text-base text-red-800">{t('rsvp.error')}</p>}

                <button type="submit" disabled={status === 'sending'} className={`${btnSolid} w-full disabled:opacity-60`}>
                  <Send size={15} />
                  {status === 'sending' ? t('rsvp.sending') : t('rsvp.send')}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Section>
  )
}

/* 9. THANK YOU ------------------------------------------------------------- */
export function ThankYou() {
  const { t } = useLanguage()
  return (
    <Section className="bg-olive text-ivory min-h-[80svh] flex items-center">
      <OliveBranch className="absolute top-6 left-1/2 -translate-x-1/2 w-72 opacity-40" color="#e9dec7" berry="#e3cf9f" />
      <OliveBranch className="absolute bottom-6 left-1/2 -translate-x-1/2 w-72 rotate-180 opacity-40" color="#e9dec7" berry="#e3cf9f" />
      <motion.div {...reveal()} className="relative max-w-2xl mx-auto text-center space-y-6">
        <p className="font-caps text-xs tracking-[0.35em] uppercase text-gold-light">{t('thankyou.see_you')}</p>
        <h2 className="font-script text-6xl md:text-7xl">{t('thankyou.title')}</h2>
        <HeartDivider color="#e3cf9f" />
        <p className="font-script text-4xl md:text-5xl">
          {t('bride.name')} <span className="text-gold-light">&amp;</span> {t('groom.name')}
        </p>
        <p className="font-caps tracking-[0.2em] text-gold-light">{t('thankyou.datetime')}</p>
        <p className="inline-flex items-center gap-1.5 text-lg italic text-ivory/80"><MapPin size={16} />{t('thankyou.location')}</p>
        <p className="pt-4 text-lg md:text-xl italic text-ivory/85 leading-relaxed">{t('thankyou.quote')}</p>
      </motion.div>
    </Section>
  )
}
