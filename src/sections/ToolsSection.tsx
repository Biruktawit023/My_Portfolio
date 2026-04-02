import { motion } from 'framer-motion';
import { Shield, Box, Radar, Waves, Zap, Github, type LucideIcon } from 'lucide-react';
import { tools } from '../data/tools';
import { SectionWrapper } from '../components/SectionWrapper';

const iconMap: Record<string, LucideIcon> = { Shield, Box, Radar, Waves, Zap, Github };

export function ToolsSection() {
  return (
    <SectionWrapper id="tools">
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '8rem 1.5rem 6rem' }}>

        {/* Heading */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 className="rose-heading" style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, margin: 0,
          }}>
            Tools &amp; Platforms
          </h2>
          <div style={{
            marginTop: '0.75rem', height: '2px', width: '4rem',
            background: 'linear-gradient(90deg, #E11D48, #FB7185, transparent)',
            borderRadius: '2px',
          }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '1rem',
        }}>
          {tools.map((tool, i) => {
            const Icon = iconMap[tool.icon] ?? Shield;

            const tile = (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{
                  scale: 1.08,
                  boxShadow: '0 0 30px rgba(225,29,72,0.35), 0 0 60px rgba(225,29,72,0.1)',
                  borderColor: 'rgba(251,113,133,0.5)',
                  transition: { duration: 0.15 },
                }}
                style={{
                  background: 'linear-gradient(135deg, rgba(30,10,25,0.7) 0%, rgba(20,10,30,0.6) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(251,113,133,0.15)',
                  borderRadius: '1rem',
                  padding: '1.5rem 1rem',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: '0.75rem',
                  cursor: tool.url ? 'pointer' : 'default',
                  textDecoration: 'none',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Glow bg */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(circle at 50% 30%, rgba(225,29,72,0.06) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />

                <div style={{
                  width: 48, height: 48, borderRadius: '0.75rem',
                  background: 'rgba(225,29,72,0.12)',
                  border: '1px solid rgba(225,29,72,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={24} color="#FB7185" aria-hidden="true" />
                </div>

                <span style={{
                  color: '#CBD5E1', fontSize: '0.78rem', fontWeight: 600,
                  textAlign: 'center', lineHeight: 1.3,
                }}>
                  {tool.name}
                </span>
              </motion.div>
            );

            if (tool.url) {
              return (
                <a key={tool.id} href={tool.url} target="_blank" rel="noopener noreferrer"
                  aria-label={tool.name} style={{ textDecoration: 'none' }}>
                  {tile}
                </a>
              );
            }
            return <div key={tool.id}>{tile}</div>;
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
