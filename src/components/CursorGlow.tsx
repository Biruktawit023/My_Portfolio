import { motion } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';

export function CursorGlow() {
  const { x, y, visible } = useMousePosition();

  return (
    <motion.div
      aria-hidden="true"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'fixed',
        top: y - 300,
        left: x - 300,
        width: 600,
        height: 600,
        pointerEvents: 'none',
        zIndex: 9999,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(244,63,94,0.15) 0%, transparent 70%)',
      }}
    />
  );
}
