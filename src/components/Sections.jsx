import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Heart, MapPin, Sparkles, Flower2, Music, Sun, Crown, Navigation } from 'lucide-react'
import { useLanguage } from '../i18n.jsx'
import { WEDDING } from '../config.js'
import { CornerFrames, Divider, FallingPetals, FloatingSparkles, Mandala, Photo, SectionHeader } from './Decor.jsx'

const inView = (delay = 0, y = 30) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay },
  viewport: { once: true },
})

export function calendarUrl() {
  const c = WEDDING.calendar
  return (
    'https://www.google.com/calendar/render?action=TEMPLATE' +
    `&text=${encodeURIComponent(c.title)}&dates=${c.start}/${c.end}` +
    `&details=${encodeURIComponent(c.details)}&location=${encodeURIComponent(c.location)}`
  )
}

export function AddToCalendar({ dark = false }) {
  const { t } = useLanguage()
  return (
    <motion.button
      type="button"
      onClick={() => window.open(calendarUrl(), '_blank', 'noopener')}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 font-medium transition-colors
        ${dark ? 'border-gold text-gold hover:bg-gold hover:text-maroon' : 'border-gold text-maroon hover:bg-gold hover:text-white'}`}
    >
      <Calendar className="w-4 h-4" />
      {t('details.add_to_calendar')}
    </motion.button>
  )
}

/* 1. WELCOME ------------------------------------------------------------ */
export function Welcome() {
  const { t } = useLanguage()
  return (
    <section className="min-h-screen w-full bg-cream relative flex items-center justify-center px-4 py-20 overflow-hidden">
      <CornerFrames />
      <FloatingSparkles count={6} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold opacity-5 blur-3xl rounded-full" />

      <motion.div className="max-w-2xl mx-auto text-center relative z-10 space-y-8" {...inView(0, 50)}>
        <motion.div initial={{ rotate: 0, opacity: 0 }} whileInView={{ rotate: 360, opacity: 1 }} transition={{ duration: 2 }} viewport={{ once: true }}>
          <Mandala rays={8} size="w-24 h-24" bar="w-2 h-12" center="w-12 h-12 border-4 border-gold !bg-cream" spin={40} />
        </motion.div>

        <p className="text-sm uppercase tracking-[0.35em] text-gold-dark font-medium">{t('welcome.ceremony')}</p>
        <p className="text-xl text-maroon font-light tracking-wide">{t('welcome.blessing')}</p>

        <div className="space-y-5">
          <div className="space-y-1">
            <h2 className="text-5xl md:text-6xl font-serif text-maroon tracking-wide">{t('bride.name')}</h2>
            <p className="text-sm md:text-base text-maroon/70">{t('bride.parents')}</p>
            <p className="text-sm text-gold-dark">{t('bride.place')}</p>
          </div>
          <div className="text-3xl text-gold font-serif">&amp;</div>
          <div className="space-y-1">
            <h2 className="text-5xl md:text-6xl font-serif text-maroon tracking-wide">{t('groom.name')}</h2>
            <p className="text-sm md:text-base text-maroon/70">{t('groom.parents')}</p>
            <p className="text-sm text-gold-dark">{t('groom.place')}</p>
          </div>
        </div>

        <p className="text-xl text-maroon font-light tracking-wide">{t('welcome.invite')}</p>

        <Divider center={<><Sparkles className="w-6 h-6 text-gold" /><div className="w-3 h-3 bg-gold rounded-full" /><Sparkles className="w-6 h-6 text-gold" /></>} />

        <p className="text-lg text-maroon font-serif italic opacity-70 max-w-md mx-auto">"{t('welcome.quote')}"</p>
      </motion.div>
    </section>
  )
}

/* 2. COUPLE ------------------------------------------------------------- */
function CouplePlaceholder() {
  const { t } = useLanguage()
  return (
    <div className="w-full aspect-[4/3] bg-gradient-to-br from-maroon via-[#6a0000] to-maroon-dark flex flex-col items-center justify-center gap-4 text-gold">
      <Mandala rays={16} size="w-28 h-28" bar="w-1 h-14" center="w-12 h-12" spin={30} />
      <p className="font-serif text-3xl tracking-widest">{t('bride.name')} &amp; {t('groom.name')}</p>
      <p className="text-sm text-cream/70 tracking-wide">{t('couple.photo_soon')}</p>
    </div>
  )
}

function PersonCard({ label, name, parents, place, delay }) {
  return (
    <motion.div {...inView(delay)} whileHover={{ y: -5 }} className="bg-white rounded-2xl p-6 shadow-xl border border-gold/20 text-center space-y-2">
      <p className="text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">{label}</p>
      <h3 className="text-3xl font-serif text-maroon">{name}</h3>
      <p className="text-maroon/70">{parents}</p>
      <p className="inline-flex items-center gap-1 text-sm text-gold-dark"><MapPin className="w-4 h-4" />{place}</p>
    </motion.div>
  )
}

export function Couple() {
  const { t } = useLanguage()
  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-cream to-peach relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      <FallingPetals count={15} />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader icon={<Mandala rays={12} className="mb-4" />} title={t('couple.title')} subtitle={t('couple.subtitle')} />

        <motion.div
          className="relative max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 border-8 border-gold rounded-3xl z-10 pointer-events-none" />
            <CornerFrames size="w-12 h-12 md:w-16 md:h-16" variant="inner" opacity={1} />
            <motion.div className="absolute top-8 right-8 z-20" animate={{ scale: [1, 1.5, 1], rotate: [0, 180, 360], opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}>
              <Sparkles className="w-8 h-8 text-gold" />
            </motion.div>
            <motion.div className="absolute bottom-8 left-8 z-20" animate={{ scale: [1, 1.5, 1], rotate: [360, 180, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}>
              <Sparkles className="w-8 h-8 text-gold" />
            </motion.div>
            <Photo src={WEDDING.photos.couple} alt={`${t('bride.name')} & ${t('groom.name')}`} className="w-full h-auto object-cover" fallback={<CouplePlaceholder />} />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <motion.div className="absolute -top-8 left-1/2 -translate-x-1/2 z-30" animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-6 mt-12 max-w-3xl mx-auto">
          <PersonCard label={t('bride.label')} name={t('bride.name')} parents={t('bride.parents')} place={t('bride.place')} delay={0.2} />
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="mx-auto">
            <Heart className="w-10 h-10 text-gold fill-gold" />
          </motion.div>
          <PersonCard label={t('groom.label')} name={t('groom.name')} parents={t('groom.parents')} place={t('groom.place')} delay={0.4} />
        </div>

        <motion.p {...inView(0.5)} className="text-center text-lg md:text-xl text-maroon/80 max-w-3xl mx-auto leading-relaxed px-4 mt-10">
          {t('couple.description')}
        </motion.p>
      </div>
    </section>
  )
}

/* 3. DETAILS ------------------------------------------------------------ */
function DetailCard({ icon, label, value, note, delay, bgImage, children }) {
  const [bgOk, setBgOk] = useState(true)
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-500 relative overflow-hidden group"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      {bgImage && bgOk ? (
        <>
          <img src={bgImage} alt="" className="hidden" onError={() => setBgOk(false)} />
          <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url("${bgImage}")` }} />
          <div className="absolute inset-0 bg-white/60" />
        </>
      ) : (
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #D4AF37 0px, #D4AF37 1px, transparent 1px, transparent 20px)' }} />
      )}
      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
        <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }} className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-white shadow-lg">
          {icon}
        </motion.div>
        <p className="text-sm uppercase tracking-wider text-maroon/60 font-medium">{label}</p>
        <p className="text-2xl font-serif text-maroon">{value}</p>
        {note && <p className="text-maroon/70">{note}</p>}
        {children && <div className="pt-2 flex flex-wrap gap-3 justify-center">{children}</div>}
      </div>
    </motion.div>
  )
}

export function Details() {
  const { t } = useLanguage()
  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-peach via-cream to-peach relative py-20 px-4 overflow-hidden">
      <div className="absolute -top-40 -right-40 opacity-10 pointer-events-none">
        <Mandala rays={24} size="w-[28rem] h-[28rem]" bar="w-1 h-56" center="w-20 h-20" spin={60} />
      </div>
      <FloatingSparkles count={8} />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader
          icon={<motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}><Sparkles className="w-10 h-10 text-gold mx-auto" /></motion.div>}
          title={t('details.title')}
          subtitle={t('details.subtitle')}
        />

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <DetailCard icon={<Calendar className="w-7 h-7" />} label={t('details.date_label')} value={t('details.date_value')} note={t('details.date_note')} delay={0.2}>
            <AddToCalendar />
          </DetailCard>
          <DetailCard icon={<MapPin className="w-7 h-7" />} label={t('details.venue_label')} value={t('details.venue_value')} delay={0.4} bgImage={WEDDING.photos.venue}>
            <motion.a
              href={WEDDING.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold to-gold-dark text-white font-medium shadow-lg"
            >
              <Navigation className="w-4 h-4" />
              {t('details.open_map')}
            </motion.a>
          </DetailCard>
        </div>

        <motion.div {...inView(0.6, 50)} className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
          <CornerFrames size="w-16 h-16 md:w-20 md:h-20" />
          <div className="text-center space-y-6 relative z-10">
            <motion.div whileHover={{ scale: 1.05 }} className="mx-auto w-32 h-32 rounded-full border-4 border-gold bg-gradient-to-br from-maroon to-maroon-dark flex items-center justify-center shadow-xl overflow-hidden">
              <video src={WEDDING.ganeshVideo} autoPlay loop muted playsInline className="w-[180%] h-auto max-w-none" />
            </motion.div>
            <p className="text-gold-dark tracking-widest">{t('intro.blessing')}</p>
            <h3 className="text-3xl md:text-4xl font-serif text-maroon">{t('details.blessing_title')}</h3>
            <p className="text-lg text-maroon/70 max-w-2xl mx-auto leading-relaxed">{t('details.blessing_desc')}</p>
            <Divider />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* 4. SCHEDULE ----------------------------------------------------------- */
function ScheduleItem({ icon, title, time, place, description, delay }) {
  return (
    <motion.div className="flex gap-6" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay }} viewport={{ once: true }}>
      <div className="relative flex flex-col items-center">
        <motion.div whileHover={{ scale: 1.1, rotate: 360 }} transition={{ duration: 0.6 }} className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-white shadow-lg z-10 relative shrink-0">
          {icon}
        </motion.div>
        <motion.div className="absolute top-0 w-16 h-16 rounded-full bg-gold" animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
        <div className="flex-1 w-0.5 bg-gradient-to-b from-gold to-transparent mt-2" />
      </div>
      <motion.div className="flex-1 pb-10" whileHover={{ x: 10 }} transition={{ duration: 0.3 }}>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gold/20">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
            <span className="text-gold-dark font-semibold">{time}</span>
            <span className="inline-flex items-center gap-1 text-sm text-maroon/60"><MapPin className="w-3.5 h-3.5" />{place}</span>
          </div>
          <h3 className="text-2xl font-serif text-maroon mb-2">{title}</h3>
          <p className="text-maroon/70 leading-relaxed">{description}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function DayHeading({ children }) {
  return (
    <motion.div {...inView(0.1)} className="flex items-center gap-4 mb-8">
      <div className="px-5 py-2 rounded-full bg-maroon text-gold font-serif text-xl shadow-lg">{children}</div>
      <div className="h-px flex-1 bg-gradient-to-r from-gold to-transparent" />
    </motion.div>
  )
}

export function Schedule() {
  const { t } = useLanguage()
  const place = t('schedule.at_venue')
  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-cream to-peach relative py-20 px-4 overflow-hidden">
      <div className="absolute -bottom-32 -left-32 opacity-10 pointer-events-none">
        <Mandala rays={16} size="w-96 h-96" bar="w-1 h-48" center="w-16 h-16" spin={30} />
      </div>
      <FloatingSparkles count={6} className="w-5 h-5 text-gold/60" />

      <div className="max-w-3xl mx-auto relative z-10">
        <SectionHeader
          icon={<motion.div className="text-5xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>🌺</motion.div>}
          title={t('schedule.title')}
          subtitle={t('schedule.subtitle')}
        />

        <DayHeading>{t('schedule.day1')}</DayHeading>
        <ScheduleItem icon={<Flower2 className="w-8 h-8" />} title={t('schedule.mehndi')} time={t('schedule.mehndi_time')} place={place} description={t('schedule.mehndi_desc')} delay={0.2} />
        <ScheduleItem icon={<Music className="w-8 h-8" />} title={t('schedule.sangeet')} time={t('schedule.sangeet_time')} place={place} description={t('schedule.sangeet_desc')} delay={0.3} />

        <div className="mt-6" />
        <DayHeading>{t('schedule.day2')}</DayHeading>
        <ScheduleItem icon={<Sun className="w-8 h-8" />} title={t('schedule.haldi')} time={t('schedule.haldi_time')} place={place} description={t('schedule.haldi_desc')} delay={0.2} />
        <ScheduleItem icon={<Crown className="w-8 h-8" />} title={t('schedule.baraat')} time={t('schedule.baraat_time')} place={place} description={t('schedule.baraat_desc')} delay={0.3} />
      </div>
    </section>
  )
}

/* 5. CELEBRATION -------------------------------------------------------- */
function Fireworks({ count = 15 }) {
  const [items] = useState(() => [...Array(count)].map(() => ({ x: Math.random() * 100, y: Math.random() * 60, d: Math.random() * 3 })))
  return (
    <div className="absolute inset-0 pointer-events-none">
      {items.map((f, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${f.x}%`, top: `${f.y}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 2, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: f.d, ease: 'easeOut' }}
        >
          {[...Array(8)].map((_, j) => (
            <div key={j} className="absolute w-6 h-0.5 bg-gradient-to-r from-gold to-transparent origin-left" style={{ transform: `rotate(${j * 45}deg)` }} />
          ))}
        </motion.div>
      ))}
    </div>
  )
}

export function Celebration() {
  const { t } = useLanguage()
  const glow = { textShadow: ['0 0 20px rgba(212,175,55,.5)', '0 0 40px rgba(212,175,55,.8)', '0 0 20px rgba(212,175,55,.5)'] }
  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-peach via-maroon to-maroon-dark relative overflow-hidden flex items-center justify-center py-20 px-4">
      <Fireworks />
      <FallingPetals count={25} className="w-3 h-3 bg-gradient-to-br from-gold to-pink-300 opacity-70" minDur={5} spread={3} />
      <FloatingSparkles count={12} className="w-4 h-4 text-gold" />

      <div className="max-w-3xl mx-auto text-center relative z-10 space-y-10">
        <motion.div className="flex items-end justify-center gap-4" initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>
          <motion.div className="w-20 h-36 bg-gradient-to-b from-gold to-gold-dark rounded-t-full opacity-90 shadow-2xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} />
          <div className="relative h-36 w-10">
            <motion.div className="absolute bottom-16 left-1" animate={{ scale: [1, 1.3, 1], y: [0, -20, -40], opacity: [1, 0.5, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}>
              <Heart className="w-8 h-8 text-gold fill-gold" />
            </motion.div>
          </div>
          <motion.div className="w-24 h-44 bg-gradient-to-b from-gold to-gold-dark rounded-t-full opacity-90 shadow-2xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} />
        </motion.div>

        <motion.div {...inView(0.5)} className="space-y-6">
          <motion.h2 className="text-4xl md:text-6xl font-serif text-gold" animate={glow} transition={{ duration: 2, repeat: Infinity }}>
            {t('celebration.title1')}
          </motion.h2>
          <motion.h3 className="text-3xl md:text-5xl font-serif text-cream" animate={{ opacity: [0.9, 1, 0.9] }} transition={{ duration: 2, repeat: Infinity }}>
            {t('celebration.title2')}
          </motion.h3>
          <motion.div className="flex justify-center" animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity }}>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-2xl">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
          </motion.div>
          <p className="text-xl md:text-2xl text-cream/90 max-w-2xl mx-auto leading-relaxed">
            {t('celebration.message')}
            <br />
            {t('celebration.see_you')}
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold" />
            {['🌟', '💫', '✨'].map((e, i) => (
              <motion.span key={e} className="text-2xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}>{e}</motion.span>
            ))}
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* 6. THANK YOU ---------------------------------------------------------- */
export function ThankYou() {
  const { t } = useLanguage()
  const [hearts] = useState(() => [...Array(12)].map(() => ({ x: Math.random() * 100, y: Math.random() * 100 })))
  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-maroon-dark via-maroon to-[#4a0000] relative overflow-hidden flex items-center justify-center py-20 px-4">
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full bg-gold blur-3xl" animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.16, 0.08] }} transition={{ duration: 4, repeat: Infinity }} />
      {hearts.map((h, i) => (
        <motion.div key={i} className="absolute pointer-events-none" style={{ left: `${h.x}%`, top: `${h.y}%` }} animate={{ y: [0, -50, 0], opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.4 }}>
          <Heart className="w-5 h-5 text-gold/60 fill-gold/30" />
        </motion.div>
      ))}
      <FloatingSparkles count={10} className="w-4 h-4 text-gold" />

      <div className="max-w-3xl mx-auto text-center relative z-10 space-y-10">
        <motion.div initial={{ opacity: 0, scale: 0, rotate: 0 }} whileInView={{ opacity: 1, scale: 1, rotate: 360 }} transition={{ duration: 1.5 }} viewport={{ once: true }} className="relative w-32 h-32 mx-auto">
          <Mandala rays={16} size="w-32 h-32" bar="w-1 h-16" center="w-0 h-0" spin={20} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-2xl">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
          </div>
        </motion.div>

        <motion.div {...inView(0.3)} className="space-y-8">
          <motion.h2 className="text-5xl md:text-7xl font-serif text-gold" animate={{ textShadow: ['0 0 20px rgba(212,175,55,.5)', '0 0 40px rgba(212,175,55,.8)', '0 0 20px rgba(212,175,55,.5)'] }} transition={{ duration: 3, repeat: Infinity }}>
            {t('thankyou.title')}
          </motion.h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex flex-col">
              <span className="text-4xl font-serif text-cream">{t('bride.name')}</span>
              <span className="text-sm text-gold/80">{t('bride.parents')}</span>
            </div>
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <Heart className="w-8 h-8 text-gold fill-gold" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-4xl font-serif text-cream">{t('groom.name')}</span>
              <span className="text-sm text-gold/80">{t('groom.parents')}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 text-2xl">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold" />
            <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity }}>✨</motion.span>
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>🌸</motion.span>
            <motion.span animate={{ rotate: [360, 0] }} transition={{ duration: 2, repeat: Infinity }}>✨</motion.span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold" />
          </div>

          <div className="space-y-4">
            <h3 className="text-3xl md:text-4xl font-serif text-cream">{t('thankyou.see_you')}</h3>
            <p className="text-2xl md:text-3xl text-gold font-bold tracking-widest">{t('thankyou.datetime')}</p>
            <p className="inline-flex items-center gap-2 text-lg text-cream/80"><MapPin className="w-5 h-5 text-gold" />{t('thankyou.location')}</p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <AddToCalendar dark />
              <a href={WEDDING.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold to-gold-dark text-white font-medium shadow-lg hover:scale-105 transition-transform">
                <Navigation className="w-4 h-4" />
                {t('details.open_map')}
              </a>
            </div>
          </div>

          <p className="text-lg md:text-xl font-serif italic text-white/90 max-w-2xl mx-auto leading-relaxed">{t('thankyou.quote')}</p>
        </motion.div>
      </div>
    </section>
  )
}
