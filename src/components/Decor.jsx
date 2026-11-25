import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export const reveal = (delay = 0, y = 30) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  viewport: { once: true, amount: 0.3 },
})

// Hand-drawn olive branch: curved stem with alternating leaves and a few olives
export function OliveBranch({ className = '', color = '#6b7d55', berry = '#5c6650' }) {
  const leaves = [...Array(9)].map((_, i) => {
    const t = (i + 0.6) / 10
    const x = 5 + t * 190
    const y = 30 - 40 * t * (1 - t)
    const up = i % 2 === 0
    return { x, y: y + (up ? -7 : 7), r: up ? -28 : 28, s: 1 - Math.abs(t - 0.5) * 0.5 }
  })
  return (
    <svg viewBox="0 0 200 60" className={className} fill="none" aria-hidden="true">
      <path d="M5 30 Q100 10 195 30" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      {leaves.map((l, i) => (
        <ellipse key={i} cx={l.x} cy={l.y} rx={13 * l.s} ry={4 * l.s} fill={color} opacity="0.85" transform={`rotate(${l.r} ${l.x} ${l.y})`} />
      ))}
      {[55, 120, 165].map((x, i) => (
        <circle key={x} cx={x} cy={30 - 40 * ((x - 5) / 190) * (1 - (x - 5) / 190) + (i % 2 ? -11 : 11)} r="3" fill={berry} />
      ))}
    </svg>
  )
}

// Olive branches tucked into the four corners of a section
export function CornerBranches({ opacity = 0.55, size = 'w-40 md:w-56' }) {
  const pos = [
    'top-2 -left-6 rotate-[35deg]',
    'top-2 -right-6 -scale-x-100 -rotate-[35deg]',
    'bottom-2 -left-6 -rotate-[35deg]',
    'bottom-2 -right-6 -scale-x-100 rotate-[35deg]',
  ]
  return pos.map((p, i) => (
    <motion.div
      key={i}
      className={`absolute pointer-events-none ${p}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity }}
      transition={{ duration: 1.4, delay: i * 0.1 }}
      viewport={{ once: true }}
    >
      <OliveBranch className={size} />
    </motion.div>
  ))
}

export function HeartDivider({ color = '#8a7a4e', width = 'w-20', size = 14, className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className={`h-px ${width}`} style={{ background: `linear-gradient(to right, transparent, ${color})` }} />
      <Heart size={size} style={{ color }} fill="currentColor" />
      <div className={`h-px ${width}`} style={{ background: `linear-gradient(to left, transparent, ${color})` }} />
    </div>
  )
}

export function SectionTitle({ label, title, subtitle, light = false }) {
  return (
    <motion.div className="text-center mb-12 space-y-3" {...reveal()}>
      {label && (
        <p className={`font-caps text-xs md:text-sm tracking-[0.35em] uppercase ${light ? 'text-gold-light' : 'text-bronze'}`}>{label}</p>
      )}
      <h2 className={`font-script text-5xl md:text-6xl leading-tight ${light ? 'text-ivory' : 'text-olive'}`}>{title}</h2>
      {subtitle && <p className={`text-lg md:text-xl italic max-w-xl mx-auto ${light ? 'text-ivory/80' : 'text-sage'}`}>{subtitle}</p>}
      <HeartDivider color={light ? '#e3cf9f' : '#8a7a4e'} className="pt-2" />
    </motion.div>
  )
}

// Slow drifting leaves
export function FallingLeaves({ count = 12, color = '#9aa584' }) {
  const [items] = useState(() =>
    [...Array(count)].map(() => ({
      x1: Math.random() * 100,
      x2: Math.random() * 100,
      dur: Math.random() * 8 + 10,
      delay: Math.random() * 8,
      s: Math.random() * 0.6 + 0.6,
    }))
  )
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map((p, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 20 8"
          className="absolute w-5"
          style={{ left: `${p.x1}%`, top: '-5%', scale: p.s }}
          animate={{ top: '105%', left: `${p.x2}%`, rotate: [0, 120, 240, 360] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'linear', delay: p.delay }}
        >
          <ellipse cx="10" cy="4" rx="9" ry="3" fill={color} opacity="0.55" />
        </motion.svg>
      ))}
    </div>
  )
}

// Image with a decorative fallback when the photo file does not exist yet
export function Photo({ src, alt, className = '', fallback }) {
  const [failed, setFailed] = useState(false)
  if (failed || !src) return fallback
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
}
