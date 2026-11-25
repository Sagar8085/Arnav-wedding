import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronUp, Languages, MapPin, Volume2, VolumeX } from 'lucide-react'
import { useLanguage } from './i18n.jsx'
import { WEDDING } from './config.js'
import { createMusic } from './lib/music.js'
import { Cover, Hero } from './components/HeroIntro.jsx'
import { Blessing, Countdown, Couple, Rsvp, SaveTheDate, Schedule, ThankYou, Venue, Welcome } from './components/Sections.jsx'

const pill = 'bg-paper/90 backdrop-blur-md border border-line shadow-[0_8px_24px_-10px_rgba(60,70,50,.5)]'

function MusicToggle({ playing, onToggle }) {
  return (
    <motion.button
      type="button"
      aria-label={playing ? 'Pause music' : 'Play music'}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className={`fixed top-4 left-4 z-[100] w-11 h-11 rounded-full flex items-center justify-center ${playing ? 'bg-sage text-ivory border border-gold-light/50 shadow-lg' : `${pill} text-olive`}`}
    >
      {playing ? (
        <motion.span animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <Volume2 size={18} />
        </motion.span>
      ) : (
        <VolumeX size={18} />
      )}
      {playing && (
        <motion.span className="absolute inset-0 rounded-full border border-sage" animate={{ scale: [1, 1.5], opacity: [0.6, 0] }} transition={{ duration: 2, repeat: Infinity }} />
      )}
    </motion.button>
  )
}

function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const btn = (lang, label) => (
    <button
      type="button"
      onClick={() => setLanguage(lang)}
      className={`px-3.5 py-1 rounded-full font-caps text-xs tracking-wider transition-colors ${language === lang ? 'bg-sage text-ivory' : 'text-olive hover:bg-linen'}`}
    >
      {label}
    </button>
  )
  return (
    <motion.div className="fixed top-4 right-4 z-[100]" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }}>
      <div className={`flex items-center gap-1 rounded-full p-1 pl-3 ${pill}`}>
        <Languages size={15} className="text-bronze mr-1" />
        {btn('en', 'EN')}
        {btn('hi', 'हि')}
      </div>
    </motion.div>
  )
}

function MapButton() {
  const { t } = useLanguage()
  return (
    <motion.a
      href={WEDDING.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('map.navigate')}
      title={t('map.navigate')}
      className="fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-sage text-ivory border border-gold-light/50 shadow-lg flex items-center justify-center"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.span className="absolute inset-0 rounded-full bg-sage" animate={{ scale: [1, 1.5], opacity: [0.4, 0] }} transition={{ duration: 2, repeat: Infinity }} />
      <MapPin size={20} className="relative" />
    </motion.a>
  )
}

export default function App() {
  const [opened, setOpened] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [playing, setPlaying] = useState(false)
  const musicRef = useRef(null)
  const musicReady = useRef(null)
  const sectionRefs = useRef([])

  // Prepare music (real mp3 if present, generated melody otherwise)
  useEffect(() => {
    let cancelled = false
    musicReady.current = createMusic(WEDDING.music).then((m) => {
      if (cancelled) { m.destroy(); return null }
      musicRef.current = m
      return m
    })
    return () => {
      cancelled = true
      musicRef.current?.destroy()
      musicRef.current = null
    }
  }, [])

  const playMusic = async () => {
    const m = musicRef.current || (await musicReady.current)
    if (!m) return
    try {
      await m.play()
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }

  const toggleMusic = () => {
    if (playing) {
      musicRef.current?.pause()
      setPlaying(false)
    } else {
      playMusic()
    }
  }

  const open = () => {
    if (opened) return
    playMusic()
    window.scrollTo({ top: 0 })
    setOpened(true)
  }

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Gentle auto-scroll tour after opening; stops as soon as the guest scrolls or touches
  useEffect(() => {
    if (!opened) return
    const timers = sectionRefs.current.map((el, i) =>
      setTimeout(() => el?.scrollIntoView({ behavior: 'smooth' }), 6000 + i * 6000)
    )
    const stop = () => timers.forEach(clearTimeout)
    const events = ['wheel', 'touchstart', 'keydown', 'pointerdown']
    events.forEach((e) => window.addEventListener(e, stop, { once: true, passive: true }))
    return () => {
      stop()
      events.forEach((e) => window.removeEventListener(e, stop))
    }
  }, [opened])

  const sections = [Welcome, SaveTheDate, Countdown, Couple, Schedule, Venue, Blessing, Rsvp, ThankYou]

  return (
    <div className="min-h-screen w-full">
      <AnimatePresence>{!opened && <Cover key="cover" onOpen={open} />}</AnimatePresence>

      {opened && <MusicToggle playing={playing} onToggle={toggleMusic} />}
      {opened && <LanguageToggle />}

      <main>
        <Hero opened={opened} />
        <div className="bg-grace">
          {sections.map((Section, i) => (
            <div key={i} ref={(el) => (sectionRefs.current[i] = el)}>
              <Section />
            </div>
          ))}
        </div>
      </main>

      {opened && <MapButton />}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileTap={{ scale: 0.9 }}
            className={`fixed bottom-5 right-4 z-50 w-12 h-12 rounded-full text-olive flex items-center justify-center ${pill}`}
          >
            <ChevronUp size={22} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
