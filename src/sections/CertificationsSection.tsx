import { motion } from 'framer-motion';
import { certifications } from '../data/certifications';
import { SectionWrapper } from '../components/SectionWrapper';
import { Award } from 'lucide-react';

export function CertificationsSection() {
  return (
    <SectionWrapper id="certifications">
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '8rem 1.5rem 6rem' }}>

        <div style={{ marginBottom: '3rem' }}>
          <h2 className="rose-heading" style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, margin: 0,
          }}>
            Certifications &amp; Learning
          </h2>
          <div style={{
            marginTop: '0.75rem', height: '2px', width: '4rem',
            background: 'linear-gradient(90deg, #E11D48, #FB7185, transparent)',
            borderRadius: '2px',
          }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              whileHover={{
                boxShadow: '0 0 30px rgba(225,29,72,0.2)',
                borderColor: 'rgba(251,113,133,0.35)',
                transition: { duration: 0.15 },
              }}
              style={{
                background: 'linear-gradient(135deg, rgba(30,10,25,0.7) 0%, rgba(20,10,30,0.6) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(251,113,133,0.15)',
                borderRadius: '1rem',
                padding: '1.75rem',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Top line */}
              <div style={{
                position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(251,113,133,0.4), transparent)',
              }} />

              {/* Header */}
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-start', marginBottom: '0.75rem', gap: '0.75rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '0.5rem',
                    background: 'rgba(225,29,72,0.15)',
                    border: '1px solid rgba(225,29,72,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Award size={16} color="#FB7185" />
                  </div>
                  <h3 style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '0.95rem', margin: 0 }}>
                    {cert.name}
                  </h3>
                </div>

                <span style={{
                  flexShrink: 0, fontSize: '0.65rem', fontWeight: 700,
                  borderRadius: '999px', padding: '0.2rem 0.65rem',
                  background: cert.status === 'completed'
                    ? 'rgba(34,197,94,0.12)' : 'rgba(225,29,72,0.12)',
                  border: `1px solid ${cert.status === 'completed' ? 'rgba(34,197,94,0.25)' : 'rgba(225,29,72,0.25)'}`,
                  color: cert.status === 'completed' ? '#4ade80' : '#FB7185',
                  letterSpacing: '0.05em',
                }}>
                  {cert.status === 'completed' ? '✓ DONE' : '● ACTIVE'}
                </span>
              </div>

              <p style={{ color: '#94A3B8', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {cert.description}
              </p>

              {/* Progress */}
              <div style={{
                background: 'rgba(225,29,72,0.08)',
                borderRadius: '999px', height: '5px', overflow: 'hidden',
                border: '1px solid rgba(225,29,72,0.1)', marginBottom: '0.4rem',
              }}>
                <motion.div
                  role="progressbar"
                  aria-valuenow={cert.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${cert.name} progress`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${cert.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #E11D48, #FB7185)',
                    borderRadius: '999px',
                    boxShadow: '0 0 10px rgba(225,29,72,0.6)',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B', fontSize: '0.7rem' }}>Progress</span>
                <span style={{
                  background: 'linear-gradient(135deg, #FB7185, #E11D48)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  fontSize: '0.75rem', fontWeight: 700,
                }}>
                  {cert.progress}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
