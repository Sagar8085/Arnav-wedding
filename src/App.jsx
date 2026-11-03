import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronUp, Languages, MapPin, Navigation, Volume2, VolumeX } from 'lucide-react'
import { useLanguage } from './i18n.jsx'
import { WEDDING } from './config.js'
import { createMusic } from './lib/music.js'
import HeroIntro from './components/HeroIntro.jsx'
import { Celebration, Couple, Details, Schedule, ThankYou, Welcome } from './components/Sections.jsx'

function MusicToggle({ playing, onToggle }) {
  return (
    <motion.button
      type="button"
      aria-label={playing ? 'Pause music' : 'Play music'}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className={`fixed top-5 left-5 z-[100] w-12 h-12 rounded-full shadow-2xl backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors duration-300
        ${playing ? 'bg-gradient-to-br from-gold to-gold-dark text-white' : 'bg-white/80 text-maroon'}`}
    >
      {playing ? (
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          <Volume2 className="w-5 h-5" />
        </motion.div>
      ) : (
        <VolumeX className="w-5 h-5" />
      )}
      {playing && (
        <motion.div className="absolute inset-0 rounded-full border-2 border-gold" animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity }} />
      )}
    </motion.button>
  )
}

function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const btn = (lang, label) => (
    <motion.button
      type="button"
      onClick={() => setLanguage(lang)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-4 py-1.5 rounded-full font-medium transition-all duration-300
        ${language === lang ? 'bg-gradient-to-r from-gold to-gold-dark text-white shadow-lg' : 'text-maroon hover:bg-cream'}`}
    >
      {label}
    </motion.button>
  )
  return (
    <motion.div
      className="fixed top-5 right-5 z-[100]"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
    >
      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md rounded-full p-1 pl-3 shadow-2xl border border-gold/30">
        <Languages className="w-4 h-4 text-gold-dark mr-1" />
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
      className="fixed bottom-24 right-5 z-40 group"
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 2.2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1, rotate: -5 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div className="absolute inset-0 rounded-full bg-gold" animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.div className="absolute inset-0 rounded-full bg-gold" animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
      <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-maroon to-maroon-dark border-2 border-gold text-gold flex items-center justify-center shadow-2xl">
        <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <MapPin className="w-6 h-6" />
        </motion.div>
        <motion.div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gold text-maroon flex items-center justify-center" animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <Navigation className="w-3 h-3" />
        </motion.div>
      </div>
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-white text-maroon px-4 py-2 rounded-full shadow-xl border-2 border-gold/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="text-sm font-medium">{t('map.navigate')}</span>
      </div>
    </motion.a>
  )
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true)
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

  // Scroll-to-top visibility
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Auto-scroll tour through the sections after the intro; stops if the guest scrolls themselves
  useEffect(() => {
    if (showIntro) return
    window.scrollTo({ top: 0 })
    const timers = sectionRefs.current.map((el, i) =>
      setTimeout(() => el?.scrollIntoView({ behavior: 'smooth' }), (i + 1) * 5000)
    )
    const stop = () => timers.forEach(clearTimeout)
    const events = ['wheel', 'touchstart', 'keydown']
    events.forEach((e) => window.addEventListener(e, stop, { once: true, passive: true }))
    return () => {
      stop()
      events.forEach((e) => window.removeEventListener(e, stop))
    }
  }, [showIntro])

  const sections = [Welcome, Couple, Details, Schedule, Celebration, ThankYou]

  return (
    <div className="min-h-screen w-full">
      {!showIntro && <MusicToggle playing={playing} onToggle={toggleMusic} />}

      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div key="intro" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.8 }}>
            <HeroIntro onOpen={playMusic} onComplete={() => setShowIntro(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {!showIntro && (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <LanguageToggle />
          {sections.map((Section, i) => (
            <div key={i} ref={(el) => (sectionRefs.current[i] = el)}>
              <Section />
            </div>
          ))}
          <MapButton />
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                type="button"
                aria-label="Scroll to top"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-6 right-5 z-50 w-14 h-14 bg-gradient-to-br from-gold to-gold-dark text-white rounded-full shadow-2xl flex items-center justify-center"
              >
                <ChevronUp className="w-6 h-6" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.main>
      )}
    </div>
  )
}
