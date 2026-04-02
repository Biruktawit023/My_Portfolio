import { motion } from 'framer-motion';
import {
  BarChart2, Network, ShieldAlert, Terminal, ScanSearch, Crosshair, type LucideIcon,
} from 'lucide-react';
import { skills } from '../data/skills';
import { SectionWrapper } from '../components/SectionWrapper';

const iconMap: Record<string, LucideIcon> = {
  BarChart2, Network, ShieldAlert, Terminal, ScanSearch, Crosshair,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export function SkillsSection() {
  return (
    <SectionWrapper id="skills">
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '8rem 1.5rem 6rem' }}>

        {/* Heading */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 className="rose-heading" style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, margin: 0,
          }}>
            Skills &amp; Expertise
          </h2>
          <div style={{
            marginTop: '0.75rem', height: '2px', width: '4rem',
            background: 'linear-gradient(90deg, #E11D48, #FB7185, transparent)',
            borderRadius: '2px',
          }} />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {skills.map((skill) => {
            const Icon = iconMap[skill.icon] ?? ShieldAlert;
            return (
              <motion.div
                key={skill.id}
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 0 30px rgba(225,29,72,0.25), 0 0 60px rgba(225,29,72,0.08)',
                  borderColor: 'rgba(251,113,133,0.4)',
                  transition: { duration: 0.15 },
                }}
                style={{
                  background: 'linear-gradient(135deg, rgba(30,10,25,0.7) 0%, rgba(20,10,30,0.6) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(251,113,133,0.15)',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Top-right glow dot */}
                <div style={{
                  position: 'absolute', top: 12, right: 12,
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#E11D48',
                  boxShadow: '0 0 8px rgba(225,29,72,0.8)',
                }} />

                {/* Icon + name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '0.6rem',
                    background: 'rgba(225,29,72,0.15)',
                    border: '1px solid rgba(225,29,72,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={20} color="#FB7185" aria-hidden="true" />
                  </div>
                  <span style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '0.95rem' }}>
                    {skill.name}
                  </span>
                </div>

                <p style={{ color: '#94A3B8', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {skill.description}
                </p>

                {/* Progress track */}
                <div style={{
                  background: 'rgba(225,29,72,0.08)',
                  borderRadius: '999px', height: '5px', overflow: 'hidden',
                  border: '1px solid rgba(225,29,72,0.1)',
                }}>
                  <motion.div
                    role="progressbar"
                    aria-valuenow={skill.proficiency}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${skill.name} proficiency`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #E11D48, #FB7185)',
                      borderRadius: '999px',
                      boxShadow: '0 0 10px rgba(225,29,72,0.7)',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem' }}>
                  <span style={{ color: '#64748B', fontSize: '0.7rem' }}>Proficiency</span>
                  <span style={{
                    background: 'linear-gradient(135deg, #FB7185, #E11D48)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    fontSize: '0.75rem', fontWeight: 700,
                  }}>
                    {skill.proficiency}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
