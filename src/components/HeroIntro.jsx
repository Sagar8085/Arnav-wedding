import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Heart } from 'lucide-react'
import { useLanguage } from '../i18n.jsx'
import { WEDDING } from '../config.js'
import { FallingLeaves, HeartDivider, OliveBranch } from './Decor.jsx'

const ease = [0.16, 1, 0.3, 1]

function Medallion({ size = 'w-36 h-36 md:w-44 md:h-44' }) {
  return (
    <div className={`${size} rounded-full p-1.5 bg-gradient-to-br from-gold-light via-gold to-bronze shadow-[0_10px_40px_-10px_rgba(60,70,50,.5)]`}>
      <div className="w-full h-full rounded-full overflow-hidden bg-olive-dark flex items-center justify-center border-2 border-ivory/70">
        <video src={WEDDING.ganeshVideo} autoPlay loop muted playsInline className="w-[180%] h-auto max-w-none" />
      </div>
    </div>
  )
}

/** Full-screen cover shown before the guest taps to open the invitation */
export function Cover({ onOpen }) {
  const { t } = useLanguage()

  // Lock page scroll while the cover is up
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-grace flex items-center justify-center overflow-hidden px-6"
      exit={{ opacity: 0, scale: 1.06, filter: 'blur(8px)' }}
      transition={{ duration: 1.2, ease }}
    >
      <FallingLeaves count={10} />
      <OliveBranch className="absolute top-6 left-1/2 -translate-x-1/2 w-64 opacity-70" />
      <OliveBranch className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 opacity-70 rotate-180" />

      {/* arch frame */}
      <div className="absolute inset-x-6 inset-y-16 md:inset-x-[28%] rounded-t-full border border-moss/40 pointer-events-none" />
      <div className="absolute inset-x-9 inset-y-[4.6rem] md:inset-x-[29%] rounded-t-full border border-bronze/25 pointer-events-none" />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center gap-5"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease }}
      >
        <p className="font-caps text-xs md:text-sm tracking-[0.3em] text-bronze">{t('intro.blessing')}</p>
        <Medallion />
        <p className="font-caps text-xs tracking-[0.35em] uppercase text-sage">{t('intro.ceremony')}</p>
        <h1 className="font-script text-5xl md:text-6xl text-olive text-glow leading-tight">
          {t('bride.name')} <span className="text-3xl text-bronze">&amp;</span> {t('groom.name')}
        </h1>
        <HeartDivider color="#6b7d55" width="w-14" size={10} />

        <motion.button
          type="button"
          onClick={onOpen}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="relative mt-2 px-9 py-3 rounded-full bg-sage text-ivory font-caps tracking-[0.25em] text-sm shadow-[0_10px_30px_-10px_rgba(60,70,50,.7)] border border-gold-light/50"
        >
          <motion.span
            className="absolute inset-0 rounded-full border border-sage"
            animate={{ scale: [1, 1.25], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {t('intro.tap')}
        </motion.button>
        <p className="text-sm italic text-sage/80">{t('intro.sound')}</p>
      </motion.div>
    </motion.div>
  )
}

/** First section of the invitation: names in script, revealed one after another */
export function Hero({ opened }) {
  const { t } = useLanguage()
  const show = (delay, y = 24) => ({
    initial: { opacity: 0, y },
    animate: opened ? { opacity: 1, y: 0 } : { opacity: 0, y },
    transition: { delay, duration: 1.1, ease },
  })

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center bg-grace px-6">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(247,242,230,.9) 0%, rgba(247,242,230,0) 65%)' }} />
      <FallingLeaves count={14} />
      <OliveBranch className="absolute -top-2 -left-10 w-72 md:w-96 rotate-[25deg] opacity-60" />
      <OliveBranch className="absolute -top-2 -right-10 w-72 md:w-96 -scale-x-100 -rotate-[25deg] opacity-60" />
      <OliveBranch className="absolute -bottom-2 -left-10 w-72 md:w-96 -rotate-[20deg] opacity-50" />
      <OliveBranch className="absolute -bottom-2 -right-10 w-72 md:w-96 -scale-x-100 rotate-[20deg] opacity-50" />

      <div className="relative z-10 -mt-10 flex flex-col items-center text-center">
        <motion.div {...show(0.2, 0)} className="mb-3">
          <Heart size={26} className="text-olive mx-auto" fill="currentColor" />
        </motion.div>
        <motion.p {...show(0.4, 14)} className="font-script text-2xl md:text-4xl text-olive text-glow whitespace-pre-line">
          {t('hero.together')}
        </motion.p>
        <motion.div {...show(0.5, 0)} className="my-4">
          <HeartDivider color="rgba(59,68,50,0.5)" width="w-16" size={10} />
        </motion.div>
        <motion.h1 {...show(0.6)} className="font-script text-7xl md:text-9xl leading-none text-olive text-glow">
          {t('bride.name')}
        </motion.h1>
        <motion.p {...show(0.85, 0)} className="my-2 font-script text-4xl text-olive/80">&amp;</motion.p>
        <motion.h1 {...show(1.05)} className="font-script text-7xl md:text-9xl leading-none text-olive text-glow">
          {t('groom.name')}
        </motion.h1>
        <motion.p {...show(1.3, 10)} className="mt-6 font-caps tracking-[0.3em] text-sm md:text-base text-sage">
          {t('hero.getting_married')}
        </motion.p>
        <motion.p {...show(1.45, 10)} className="mt-2 font-caps tracking-[0.25em] text-lg md:text-xl text-olive">
          19 · 01 · 2027
        </motion.p>
      </div>

      <AnimatePresence>
        {opened && (
          <motion.div
            className="absolute inset-x-0 bottom-10 z-10 flex flex-col items-center gap-1 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ opacity: { delay: 1.8, duration: 0.8 }, y: { duration: 2, repeat: Infinity } }}
          >
            <span className="font-caps text-xs font-bold tracking-[0.35em] uppercase text-olive">{t('nav.scroll')}</span>
            <ChevronDown size={26} strokeWidth={3} className="text-olive" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export { Medallion }
