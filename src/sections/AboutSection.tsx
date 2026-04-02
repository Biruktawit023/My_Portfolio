import { motion } from 'framer-motion';
import { Heart, Shield, Zap } from 'lucide-react';
import { SectionWrapper } from '../components/SectionWrapper';

const highlights = [
  { icon: Shield, label: 'SOC Operations' },
  { icon: Zap,    label: 'Threat Detection' },
  { icon: Heart,  label: 'Incident Response' },
];

export function AboutSection() {
  return (
    <SectionWrapper id="about">
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '8rem 1.5rem 6rem' }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <h2 className="rose-heading" style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 800, margin: 0, lineHeight: 1.1,
          }}>
            About Me
          </h2>
          <div style={{
            marginTop: '0.75rem', height: '2px', width: '4rem',
            background: 'linear-gradient(90deg, #E11D48, #FB7185, transparent)',
            borderRadius: '2px',
          }} />
        </motion.div>

        {/* Glass card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            background: 'linear-gradient(135deg, rgba(30,10,25,0.7) 0%, rgba(20,10,30,0.6) 100%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(251,113,133,0.2)',
            borderRadius: '1.25rem',
            padding: '2.5rem',
            boxShadow: '0 0 40px rgba(225,29,72,0.08), inset 0 1px 0 rgba(251,113,133,0.1)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Corner glow */}
          <div style={{
            position: 'absolute', top: -40, right: -40,
            width: 160, height: 160, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(225,29,72,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Profile photo + name row */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1.5rem',
            marginBottom: '1.75rem', flexWrap: 'wrap',
          }}>
            <div style={{
              width: 90, height: 90, borderRadius: '50%', flexShrink: 0,
              border: '2px solid rgba(225,29,72,0.5)',
              boxShadow: '0 0 20px rgba(225,29,72,0.3)',
              overflow: 'hidden',
              background: 'rgba(30,10,25,0.8)',
            }}>
              <img
                src="/profile_Pic.jpg"
                alt="Biruktawit Masresha"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <p style={{
                background: 'linear-gradient(135deg, #F8FAFC, #FB7185)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                fontWeight: 800, fontSize: '1.3rem', margin: '0 0 0.25rem',
              }}>
                Biruktawit Masresha
              </p>
              <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: 0 }}>
                SOC Analyst · Cybersecurity Enthusiast
              </p>
            </div>
          </div>

          <p style={{
            color: '#CBD5E1', lineHeight: 1.9, fontSize: '1.05rem',
            margin: '0 0 2rem',
          }}>
            I'm a passionate cybersecurity enthusiast currently studying SOC operations, threat detection,
            and incident response — driven by the challenge of staying one step ahead of adversaries.
            I'm building hands-on experience through SIEM platforms, network analysis, and the MITRE ATT&CK framework,
            learning to turn raw log data into actionable intelligence.
            I actively sharpen my skills through TryHackMe, Hack The Box, and real-world lab environments
            to keep pace with an ever-evolving threat landscape.
          </p>

          {/* Highlight chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {highlights.map(({ icon: Icon, label }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(225,29,72,0.12)',
                border: '1px solid rgba(225,29,72,0.25)',
                borderRadius: '2rem',
                padding: '0.4rem 1rem',
              }}>
                <Icon size={14} color="#FB7185" />
                <span style={{ color: '#FB7185', fontSize: '0.8rem', fontWeight: 600 }}>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
