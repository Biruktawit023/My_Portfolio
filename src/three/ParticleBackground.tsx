import { Component, type ReactNode, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points } from 'three'
import { useReducedMotion } from 'framer-motion'

// ── Particle mesh ────────────────────────────────────────────────────────────

function ParticleField() {
  const ref = useRef<Points>(null)
  const shouldReduceMotion = useReducedMotion()

  const positions = useMemo(() => {
    const count = 800
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Distribute across a sphere of radius ~3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.5 + Math.random() * 1.5 // radius 1.5–3
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    if (!ref.current || shouldReduceMotion) return
    ref.current.rotation.y += delta * 0.05
    ref.current.rotation.x += delta * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#F43F5E"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  )
}

// ── Error boundary ───────────────────────────────────────────────────────────

interface ErrorBoundaryState { hasError: boolean }

class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

// ── Fallback gradient ────────────────────────────────────────────────────────

const GradientFallback = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background:
        'radial-gradient(ellipse at 50% 50%, rgba(244,63,94,0.15) 0%, rgba(15,23,42,0) 70%)',
    }}
  />
)

// ── Public component ─────────────────────────────────────────────────────────

export default function ParticleBackground() {
  return (
    <ErrorBoundary fallback={<GradientFallback />}>
      <Canvas
        aria-hidden="true"
        frameloop="demand"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5] }}
        style={{ width: '100%', height: '100%' }}
      >
        <ParticleField />
      </Canvas>
    </ErrorBoundary>
  )
}
