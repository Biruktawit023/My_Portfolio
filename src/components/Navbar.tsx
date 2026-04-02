import { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useActiveSection } from '../hooks/useActiveSection';

const SECTION_IDS = ['hero', 'about', 'skills', 'tools', 'projects', 'certifications'];
const SECTION_LABELS: Record<string, string> = {
  hero: 'Home', about: 'About', skills: 'Skills', tools: 'Tools',
  projects: 'Projects', certifications: 'Certs',
};

export function Navbar() {
  const activeSection = useActiveSection(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      aria-label="Main navigation"
      style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(10,5,12,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(225,29,72,0.12)' : '1px solid transparent',
      }}
    >
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem',
        height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={16} color="#E11D48" />
          <span style={{
            background: 'linear-gradient(135deg, #FB7185, #E11D48)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            fontWeight: 800, fontSize: '1rem', letterSpacing: '0.05em',
          }}>
            B.M
          </span>
        </div>

        {/* Desktop links */}
        <ul
          className="hidden md:flex"
          role="list"
          style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}
        >
          {SECTION_IDS.map((id) => (
            <li key={id}>
              <button
                onClick={() => handleNavClick(id)}
                aria-current={activeSection === id ? 'page' : undefined}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '0.25rem 0',
                  fontSize: '0.875rem',
                  fontWeight: activeSection === id ? 600 : 400,
                  color: activeSection === id ? '#FB7185' : '#94A3B8',
                  letterSpacing: '0.02em',
                  transition: 'color 200ms ease',
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== id)
                    (e.currentTarget as HTMLButtonElement).style.color = '#CBD5E1';
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== id)
                    (e.currentTarget as HTMLButtonElement).style.color = '#94A3B8';
                }}
              >
                {SECTION_LABELS[id]}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((p) => !p)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FB7185' }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'rgba(10,5,12,0.97)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(225,29,72,0.15)',
            }}
          >
            <ul role="list" style={{ listStyle: 'none', margin: 0, padding: '0.5rem 0' }}>
              {SECTION_IDS.map((id) => (
                <li key={id}>
                  <button
                    onClick={() => handleNavClick(id)}
                    aria-current={activeSection === id ? 'page' : undefined}
                    style={{
                      width: '100%', textAlign: 'left',
                      background: 'none', border: 'none', cursor: 'pointer',
                      padding: '0.75rem 1.5rem',
                      fontSize: '0.95rem',
                      fontWeight: activeSection === id ? 600 : 400,
                      color: activeSection === id ? '#FB7185' : '#94A3B8',
                      borderLeft: `2px solid ${activeSection === id ? '#E11D48' : 'transparent'}`,
                      transition: 'all 150ms ease',
                    }}
                  >
                    {SECTION_LABELS[id]}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
