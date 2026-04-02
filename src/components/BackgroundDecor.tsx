// Floating rose orbs and sparkle stars in the background
export function BackgroundDecor() {
  const orbs = [
    { size: 400, top: '10%',  left: '-10%', opacity: 0.06, duration: '18s' },
    { size: 300, top: '40%',  right: '-8%', opacity: 0.05, duration: '22s' },
    { size: 250, top: '70%',  left: '5%',   opacity: 0.04, duration: '16s' },
    { size: 200, top: '20%',  right: '15%', opacity: 0.05, duration: '20s' },
    { size: 180, top: '85%',  right: '10%', opacity: 0.04, duration: '14s' },
  ];

  const sparkles = [
    { size: 3, top: '15%', left: '20%',  delay: '0s',   duration: '2.5s' },
    { size: 2, top: '25%', left: '75%',  delay: '0.8s', duration: '3.2s' },
    { size: 4, top: '45%', left: '10%',  delay: '1.5s', duration: '2.8s' },
    { size: 2, top: '55%', left: '88%',  delay: '0.3s', duration: '3.5s' },
    { size: 3, top: '65%', left: '35%',  delay: '2s',   duration: '2.2s' },
    { size: 2, top: '75%', left: '60%',  delay: '1.2s', duration: '3s'   },
    { size: 3, top: '30%', left: '50%',  delay: '0.6s', duration: '2.7s' },
    { size: 2, top: '80%', left: '25%',  delay: '1.8s', duration: '3.3s' },
    { size: 4, top: '10%', left: '90%',  delay: '0.4s', duration: '2.4s' },
    { size: 2, top: '90%', left: '70%',  delay: '2.2s', duration: '3.1s' },
    { size: 3, top: '50%', left: '95%',  delay: '1s',   duration: '2.9s' },
    { size: 2, top: '35%', left: '5%',   delay: '1.6s', duration: '3.4s' },
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0,
      pointerEvents: 'none', overflow: 'hidden',
    }}>
      {/* Floating orbs */}
      {orbs.map((orb, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(225,29,72,1) 0%, transparent 70%)',
            opacity: orb.opacity,
            top: orb.top,
            left: 'left' in orb ? orb.left : undefined,
            right: 'right' in orb ? (orb as { right: string }).right : undefined,
            animation: `float-slow ${orb.duration} ease-in-out infinite`,
            animationDelay: `${i * 2}s`,
            filter: 'blur(40px)',
          }}
        />
      ))}

      {/* Sparkle stars */}
      {sparkles.map((s, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            width: s.size,
            height: s.size,
            top: s.top,
            left: s.left,
            '--duration': s.duration,
            '--delay': s.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
