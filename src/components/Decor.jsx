import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

// Mandala / sun emblem built from N rotated gold bars
export function Mandala({ rays = 12, size = 'w-16 h-16', bar = 'w-1 h-8', center = 'w-8 h-8', spin = 20, className = '' }) {
  return (
    <motion.div
      className={`relative mx-auto ${size} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: spin, repeat: Infinity, ease: 'linear' }}
    >
      {[...Array(rays)].map((_, i) => (
        <div key={i} className="absolute inset-0" style={{ transform: `rotate(${(360 / rays) * i}deg)` }}>
          <div className={`${bar} mx-auto rounded-full bg-gradient-to-b from-gold to-transparent`} />
        </div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`${center} rounded-full bg-gold`} />
      </div>
    </motion.div>
  )
}

export function Divider({ center }) {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold" />
      {center ?? <Sparkles className="w-5 h-5 text-gold" />}
      <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold" />
    </div>
  )
}

const CORNERS = {
  edge: [
    'top-0 left-0 border-t-4 border-l-4',
    'top-0 right-0 border-t-4 border-r-4',
    'bottom-0 left-0 border-b-4 border-l-4',
    'bottom-0 right-0 border-b-4 border-r-4',
  ],
  inner: [
    'top-6 left-6 border-t-4 border-l-4',
    'top-6 right-6 border-t-4 border-r-4',
    'bottom-6 left-6 border-b-4 border-l-4',
    'bottom-6 right-6 border-b-4 border-r-4',
  ],
}

export function CornerFrames({ size = 'w-24 h-24 md:w-32 md:h-32', variant = 'edge', opacity = 0.3 }) {
  return CORNERS[variant].map((p, i) => (
    <motion.div
      key={i}
      className={`absolute ${size} ${p} border-gold pointer-events-none z-20`}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity, scale: 1 }}
      transition={{ duration: 1 }}
    />
  ))
}

// Falling gold petals / dust
export function FallingPetals({ count = 15, className = 'w-2 h-2 bg-gold opacity-30', minDur = 6, spread = 6 }) {
  const [items] = useState(() =>
    [...Array(count)].map(() => ({
      x1: Math.random() * 100,
      x2: Math.random() * 100,
      dur: Math.random() * spread + minDur,
      delay: Math.random() * 5,
    }))
  )
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${className}`}
          style={{ left: `${p.x1}%`, top: '-5%' }}
          animate={{ top: '105%', left: `${p.x2}%`, rotate: 360 }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'linear', delay: p.delay }}
        />
      ))}
    </div>
  )
}

export function FloatingSparkles({ count = 6, className = 'w-6 h-6 text-gold' }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${10 + ((i * 83) % 80)}%`, top: `${15 + ((i * 37) % 70)}%` }}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.5 }}
        >
          <Sparkles className={className} />
        </motion.div>
      ))}
    </div>
  )
}

// Image with a decorative fallback when the photo file does not exist yet
export function Photo({ src, alt, className = '', fallback }) {
  const [failed, setFailed] = useState(false)
  if (failed || !src) return fallback
  return <motion.img src={src} alt={alt} className={className} onError={() => setFailed(true)} whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} />
}

export function SectionHeader({ icon, title, subtitle, light = false }) {
  return (
    <motion.div
      className="text-center mb-14 space-y-4"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {icon}
      <h2 className={`text-4xl md:text-5xl font-serif tracking-wide ${light ? 'text-gold' : 'text-maroon'}`}>{title}</h2>
      {subtitle && <p className={`text-lg max-w-2xl mx-auto ${light ? 'text-cream/80' : 'text-maroon/70'}`}>{subtitle}</p>}
      <Divider />
    </motion.div>
  )
}
