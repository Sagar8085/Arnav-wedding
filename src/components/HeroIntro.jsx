import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import { useLanguage } from '../i18n.jsx'
import { WEDDING } from '../config.js'
import { FallingPetals } from './Decor.jsx'

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

function Door({ side, stage }) {
  const open = stage !== 'initial' && stage !== 'doors'
  const isLeft = side === 'left'
  return (
    <motion.div
      className={`absolute top-0 w-1/2 h-full ${isLeft ? 'left-0 origin-left' : 'right-0 origin-right'}`}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: open ? (isLeft ? -90 : 90) : 0 }}
      transition={{ duration: 2, ease: 'easeInOut' }}
      style={{ transformStyle: 'preserve-3d', transformPerspective: 1000 }}
    >
      <div
        className={`w-full h-full border-4 border-gold relative overflow-hidden flex items-center justify-center
          ${isLeft ? 'bg-gradient-to-r rounded-l-lg' : 'bg-gradient-to-l rounded-r-lg'} from-maroon to-maroon-dark`}
      >
        <div className="absolute inset-0 opacity-25 flex flex-col items-center justify-center gap-8">
          <Sparkles className="w-12 h-12 text-gold" />
          <div className="w-28 h-28 border-2 border-gold rounded-full" />
          <Sparkles className="w-12 h-12 text-gold" />
        </div>
        <div className={`absolute top-1/2 -translate-y-1/2 w-5 h-16 bg-gold rounded-full shadow-lg ${isLeft ? 'right-4' : 'left-4'}`} />
      </div>
    </motion.div>
  )
}

export default function HeroIntro({ onOpen, onComplete }) {
  const [stage, setStage] = useState('initial')
  const { t } = useLanguage()

  const start = async () => {
    if (stage !== 'initial') return
    onOpen?.()
    setStage('doors')
    await wait(2500)
    setStage('opening')
    await wait(3000)
    setStage('silhouettes')
    await wait(2500)
    setStage('text')
    await wait(3500)
    onComplete()
  }

  const opened = stage !== 'initial' && stage !== 'doors'

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-maroon via-[#5a0000] to-[#3d0000] flex items-center justify-center">
      <FallingPetals count={30} className="w-1 h-1 bg-gold opacity-50" minDur={5} spread={5} />
      {opened && <FallingPetals count={20} className="w-2 h-2 bg-gold opacity-60" minDur={4} spread={3} />}

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <div className="relative h-[400px] md:h-[500px] flex items-center justify-center -mt-12 md:mt-0">
          {opened && (
            <motion.div
              className="absolute inset-0 rounded-full bg-gold/40 blur-3xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.6, opacity: 0.5 }}
              transition={{ duration: 1.5 }}
            />
          )}

          <Door side="left" stage={stage} />
          <Door side="right" stage={stage} />

          {(stage === 'initial' || stage === 'doors' || stage === 'opening') && (
            <motion.div
              className="absolute z-30 w-32 h-32 md:w-40 md:h-40 pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: stage === 'opening' ? 0 : 1, scale: stage === 'opening' ? 1.2 : 1 }}
              transition={{ duration: 1 }}
            >
              <div className="w-full h-full p-2 bg-gradient-to-br from-maroon to-maroon-dark rounded-full border-4 border-gold shadow-2xl overflow-hidden flex items-center justify-center">
                <video
                  src={WEDDING.ganeshVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-[180%] h-auto max-w-none"
                />
              </div>
            </motion.div>
          )}

          {stage === 'initial' && (
            <motion.button
              type="button"
              className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-lg cursor-pointer"
              onClick={start}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center gap-3 p-8 bg-maroon/80 border-2 border-gold rounded-2xl shadow-2xl">
                <p className="text-sm text-gold/90 tracking-widest">{t('intro.blessing')}</p>
                <Sparkles className="w-8 h-8 text-gold animate-pulse" />
                <p className="text-xl md:text-2xl text-gold font-serif tracking-widest text-center">{t('intro.tap')}</p>
                <p className="text-sm text-gold/80 text-center font-light mt-1">{t('intro.sound')}</p>
              </div>
            </motion.button>
          )}

          {(stage === 'silhouettes' || stage === 'text') && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: stage === 'text' ? 0.35 : 1, scale: 1 }}
              transition={{ duration: 1.5 }}
            >
              <div className="flex items-end gap-4">
                <motion.div
                  className="w-24 h-40 bg-gradient-to-b from-gold to-gold-dark rounded-t-full opacity-80"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 0.8 }}
                  transition={{ duration: 1 }}
                />
                <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 0.5, delay: 0.5 }}>
                  <Heart className="w-8 h-8 text-gold fill-gold mb-20" />
                </motion.div>
                <motion.div
                  className="w-32 h-48 bg-gradient-to-b from-gold to-gold-dark rounded-t-full opacity-80"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 0.8 }}
                  transition={{ duration: 1 }}
                />
              </div>
            </motion.div>
          )}

          {stage === 'text' && (
            <motion.div
              className="absolute inset-0 z-40 flex flex-col items-center justify-center text-center space-y-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-cream/80">{t('intro.ceremony')}</p>
              <div className="space-y-1">
                <h1 className="text-5xl md:text-6xl text-gold font-serif tracking-wider drop-shadow-lg">{t('bride.name')}</h1>
                <p className="text-xs md:text-sm text-gold/80 tracking-wide px-4">{t('bride.parents')}</p>
              </div>
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}>
                <Heart className="w-8 h-8 text-gold fill-gold mx-auto drop-shadow-lg" />
              </motion.div>
              <div className="space-y-1">
                <h1 className="text-5xl md:text-6xl text-gold font-serif tracking-wider drop-shadow-lg">{t('groom.name')}</h1>
                <p className="text-xs md:text-sm text-gold/80 tracking-wide px-4">{t('groom.parents')}</p>
              </div>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-2xl text-cream font-light tracking-wide">
                {t('hero.getting_married')}
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-lg text-gold">
                {t('date.short')}
              </motion.p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
