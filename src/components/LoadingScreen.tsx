import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9998,
            background: 'radial-gradient(ellipse at center, #1a0a14 0%, #0A0A14 70%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '1.5rem',
          }}
        >
          {/* Outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              width: 120, height: 120,
              borderRadius: '50%',
              border: '1px solid transparent',
              borderTopColor: '#E11D48',
              borderRightColor: 'rgba(251,113,133,0.3)',
            }}
          />
          {/* Middle ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              width: 96, height: 96,
              borderRadius: '50%',
              border: '1px solid transparent',
              borderTopColor: '#FB7185',
              borderLeftColor: 'rgba(225,29,72,0.3)',
            }}
          />
          {/* Core */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                '0 0 20px rgba(225,29,72,0.5), 0 0 60px rgba(225,29,72,0.2)',
                '0 0 40px rgba(225,29,72,0.8), 0 0 100px rgba(225,29,72,0.3)',
                '0 0 20px rgba(225,29,72,0.5), 0 0 60px rgba(225,29,72,0.2)',
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'linear-gradient(135deg, #1E0A18, #2d1020)',
              border: '2px solid rgba(225,29,72,0.6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <span style={{
              background: 'linear-gradient(135deg, #FB7185, #E11D48)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              fontSize: '1.3rem', fontWeight: 800, letterSpacing: '0.05em',
            }}>
              B.M
            </span>
          </motion.div>

          {/* Loading text */}
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ color: '#FB7185', fontSize: '0.75rem', letterSpacing: '0.2em', marginTop: '3.5rem' }}
          >
            LOADING...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
