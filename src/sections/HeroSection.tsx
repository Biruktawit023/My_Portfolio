import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import ParticleBackground from '../three/ParticleBackground'

// ── Typewriter hook ──────────────────────────────────────────────────────────

const PHRASES = ['SOC Analyst', 'Threat Detection', 'Incident Response']
const TYPE_MS   = 80
const DELETE_MS = 40
const PAUSE_MS  = 1500

function useTypewriter(skip: boolean): string {
  const [displayed, setDisplayed] = useState(skip ? PHRASES[0] : '')

  useEffect(() => {
    if (skip) return

    let phraseIdx = 0
    let charIdx   = 0
    let deleting  = false
    let timerId: ReturnType<typeof setTimeout>

    function tick() {
      const phrase = PHRASES[phraseIdx]

      if (!deleting) {
        charIdx++
        setDisplayed(phrase.slice(0, charIdx))

        if (charIdx === phrase.length) {
          // Pause at full phrase then start deleting
          timerId = setTimeout(() => {
            deleting = true
            tick()
          }, PAUSE_MS)
          return
        }
        timerId = setTimeout(tick, TYPE_MS)
      } else {
        charIdx--
        setDisplayed(phrase.slice(0, charIdx))

        if (charIdx === 0) {
          deleting  = false
          phraseIdx = (phraseIdx + 1) % PHRASES.length
          timerId   = setTimeout(tick, TYPE_MS)
          return
        }
        timerId = setTimeout(tick, DELETE_MS)
      }
    }

    timerId = setTimeout(tick, TYPE_MS)
    return () => clearTimeout(timerId)
  }, [skip])

  return displayed
}

// ── Smooth-scroll helper ─────────────────────────────────────────────────────

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

// ── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

// ── Component ────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion() ?? false
  const typed = useTypewriter(shouldReduceMotion)

  // Parallax
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const translateY = useTransform(scrollY, [0, 600], ['0%', '-40%'])

  // Reduced-motion overrides
  const motionProps = shouldReduceMotion
    ? { initial: false }
    : { initial: 'hidden', animate: 'visible', variants: containerVariants }

  const itemProps = shouldReduceMotion
    ? {}
    : { variants: itemVariants }

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Particle background with parallax */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          translateY: shouldReduceMotion ? undefined : translateY,
        }}
      >
        <ParticleBackground />
      </motion.div>

      {/* Rose radial overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 60%, rgba(225,29,72,0.12) 0%, transparent 65%)',
      }} />

      {/* Text content */}
      <motion.div
        {...motionProps}
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: '0 1.5rem',
          maxWidth: '56rem',
          width: '100%',
        }}
      >
        {/* Profile photo */}
        <motion.div
          {...itemProps}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}
        >
          <div style={{
            width: 120, height: 120, borderRadius: '50%',
            border: '3px solid rgba(225,29,72,0.6)',
            boxShadow: '0 0 30px rgba(225,29,72,0.4), 0 0 60px rgba(225,29,72,0.15)',
            overflow: 'hidden',
            background: 'rgba(30,10,25,0.8)',
          }}>
            <img
              src="/profile_Pic.jpg"
              alt="Biruktawit Masresha"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          {...itemProps}
          style={{
            background: 'linear-gradient(135deg, #F8FAFC 0%, #FCA5A5 50%, #FB7185 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            lineHeight: 1.1,
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
          }}
        >
          Biruktawit Masresha
        </motion.h1>

        {/* Typewriter */}
        <motion.p
          {...itemProps}
          style={{
            color: '#F43F5E',
            fontSize: 'clamp(1.25rem, 3vw, 1.875rem)',
            fontWeight: 600,
            minHeight: '2.5rem',
            marginBottom: '1rem',
          }}
        >
          {typed}
          <span
            style={{
              display: 'inline-block',
              width: '2px',
              height: '1.2em',
              background: '#F43F5E',
              marginLeft: '2px',
              verticalAlign: 'text-bottom',
              animation: shouldReduceMotion ? 'none' : 'blink 1s step-end infinite',
            }}
          />
        </motion.p>

        {/* Tagline */}
        <motion.p
          {...itemProps}
          style={{
            color: '#94A3B8',
            fontSize: 'clamp(0.95rem, 2vw, 1.125rem)',
            marginBottom: '2.5rem',
            maxWidth: '40rem',
            margin: '0 auto 1.5rem',
          }}
        >
          Protecting systems, analyzing threats, and securing the digital world
        </motion.p>

        {/* Rose quote */}
        <motion.p
          {...itemProps}
          style={{
            color: 'rgba(251,113,133,0.6)',
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
            marginBottom: '2.5rem',
            fontStyle: 'italic',
          }}
        >
          ✦ &nbsp; Cybersecurity Student &nbsp; · &nbsp; Lifelong Learner &nbsp; · &nbsp; Future SOC Analyst &nbsp; ✦
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...itemProps}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.button
            onClick={() => scrollTo('projects')}
            whileHover={
              shouldReduceMotion
                ? {}
                : { scale: 1.05, boxShadow: '0 0 30px rgba(225,29,72,0.6)' }
            }
            transition={{ duration: 0.15 }}
            style={{
              background: 'linear-gradient(135deg, #E11D48, #FB7185)',
              color: '#F8FAFC',
              border: 'none',
              borderRadius: '0.6rem',
              padding: '0.8rem 2rem',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(225,29,72,0.35)',
            }}
          >
            View Projects
          </motion.button>

          <motion.button
            onClick={() => scrollTo('contact')}
            whileHover={
              shouldReduceMotion
                ? {}
                : { scale: 1.05, boxShadow: '0 0 30px rgba(225,29,72,0.4)' }
            }
            transition={{ duration: 0.15 }}
            style={{
              background: 'rgba(225,29,72,0.1)',
              color: '#FB7185',
              border: '1px solid rgba(225,29,72,0.4)',
              borderRadius: '0.6rem',
              padding: '0.8rem 2rem',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
            }}
          >
            Contact Me
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Blinking cursor keyframe + hero gradient overlay */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes bounce-down {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
      `}</style>

      {/* Scroll down indicator */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
        zIndex: 2,
      }}>
        <span style={{ color: 'rgba(251,113,133,0.5)', fontSize: '0.65rem', letterSpacing: '0.15em' }}>
          SCROLL
        </span>
        <div style={{
          width: 1, height: 40,
          background: 'linear-gradient(180deg, rgba(225,29,72,0.6), transparent)',
          animation: 'bounce-down 1.5s ease-in-out infinite',
        }} />
      </div>
    </section>
  )
}
