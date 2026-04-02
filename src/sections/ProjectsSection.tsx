import { motion, useMotionValue, useTransform } from 'framer-motion';
import { projects, type Project } from '../data/projects';
import { SectionWrapper } from '../components/SectionWrapper';
import { ArrowUpRight } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function ProjectCard({ project }: { project: Project }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const rx = useTransform(rotateX, (v) => `${v}deg`);
  const ry = useTransform(rotateY, (v) => `${v}deg`);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rotateX.set(((y - rect.height / 2) / rect.height) * -10);
    rotateY.set(((x - rect.width / 2) / rect.width) * 10);
  };

  const handleMouseLeave = () => { rotateX.set(0); rotateY.set(0); };

  return (
    <motion.div variants={cardVariants} style={{ perspective: '1000px' }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rx, rotateY: ry,
          background: 'linear-gradient(135deg, rgba(35,10,28,0.75) 0%, rgba(20,10,35,0.65) 100%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(251,113,133,0.18)',
          borderRadius: '1.25rem',
          padding: '2rem',
          height: '100%', boxSizing: 'border-box',
          position: 'relative', overflow: 'hidden',
        }}
        whileHover={{
          boxShadow: '0 0 40px rgba(225,29,72,0.2), 0 0 80px rgba(225,29,72,0.06)',
          borderColor: 'rgba(251,113,133,0.4)',
          transition: { duration: 0.15 },
        }}
      >
        {/* Top gradient line */}
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(251,113,133,0.5), transparent)',
        }} />

        {/* Corner glow */}
        <div style={{
          position: 'absolute', top: -30, right: -30,
          width: 120, height: 120, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(225,29,72,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Arrow icon */}
        <div style={{
          position: 'absolute', top: '1.25rem', right: '1.25rem',
          color: 'rgba(251,113,133,0.3)',
        }}>
          <ArrowUpRight size={18} />
        </div>

        <h3 style={{
          background: 'linear-gradient(135deg, #F8FAFC, #FB7185)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem',
        }}>
          {project.title}
        </h3>

        <p style={{ color: '#94A3B8', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          {project.description}
        </p>

        {/* Tool badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
          {project.tools.map((tool) => (
            <span key={tool} style={{
              background: 'rgba(225,29,72,0.12)',
              border: '1px solid rgba(225,29,72,0.25)',
              color: '#FB7185',
              borderRadius: '999px',
              padding: '0.2rem 0.7rem',
              fontSize: '0.72rem', fontWeight: 600,
            }}>
              {tool}
            </span>
          ))}
        </div>

        {/* Outcome */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(225,29,72,0.08)',
          border: '1px solid rgba(225,29,72,0.15)',
          borderRadius: '0.5rem', padding: '0.5rem 0.75rem',
        }}>
          <span style={{ color: '#E11D48', fontSize: '0.8rem' }}>✓</span>
          <span style={{ color: '#CBD5E1', fontSize: '0.8rem', fontWeight: 500 }}>{project.outcome}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <SectionWrapper id="projects">
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '8rem 1.5rem 6rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h2 className="rose-heading" style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, margin: 0,
          }}>
            Projects
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
            gap: '1.5rem',
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
