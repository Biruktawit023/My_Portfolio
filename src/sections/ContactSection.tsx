import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Shield, Box, Send, CheckCircle } from 'lucide-react';
import { SectionWrapper } from '../components/SectionWrapper';

const rippleKeyframes = `
@keyframes ripple-expand {
  0%   { transform: scale(0); opacity: 0.6; }
  100% { transform: scale(4); opacity: 0; }
}`;
if (typeof document !== 'undefined') {
  const s = document.createElement('style');
  s.textContent = rippleKeyframes;
  document.head.appendChild(s);
}

interface FieldProps {
  id: string; label: string; value: string;
  error?: string; multiline?: boolean; type?: string;
  onChange: (v: string) => void;
}

function FloatingField({ id, label, value, error, multiline, type = 'text', onChange }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  const base: React.CSSProperties = {
    width: '100%',
    background: 'rgba(10,5,15,0.6)',
    border: `1px solid ${focused ? '#E11D48' : 'rgba(251,113,133,0.15)'}`,
    borderRadius: '0.75rem',
    color: '#F8FAFC',
    padding: '1rem', paddingTop: '1.5rem',
    fontSize: '1rem', outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 100ms ease, box-shadow 100ms ease',
    boxShadow: focused ? '0 0 0 3px rgba(225,29,72,0.15), 0 0 20px rgba(225,29,72,0.1)' : 'none',
    resize: multiline ? 'vertical' : undefined,
    fontFamily: 'inherit',
    backdropFilter: 'blur(10px)',
  };

  const labelStyle: React.CSSProperties = {
    position: 'absolute', left: '1rem',
    top: lifted ? '0.35rem' : '1rem',
    fontSize: lifted ? '0.68rem' : '1rem',
    color: lifted ? '#FB7185' : '#64748B',
    pointerEvents: 'none',
    transition: 'top 120ms ease, font-size 120ms ease, color 120ms ease',
    lineHeight: 1, fontWeight: lifted ? 600 : 400,
    letterSpacing: lifted ? '0.05em' : 'normal',
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <label htmlFor={id} style={labelStyle}>{label}</label>
      {multiline ? (
        <textarea id={id} value={value} rows={5} style={base}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={error ? `${id}-error` : undefined} aria-invalid={!!error} />
      ) : (
        <input id={id} type={type} value={value} style={base}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={error ? `${id}-error` : undefined} aria-invalid={!!error} />
      )}
      <AnimatePresence>
        {error && (
          <motion.p id={`${id}-error`} role="alert"
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }}
            style={{ color: '#FB7185', fontSize: '0.72rem', marginTop: '0.35rem', fontWeight: 500 }}>
            ⚠ {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function RippleButton({ children }: { children: React.ReactNode }) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute; width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY - rect.top - size / 2}px;
      border-radius:50%; background:rgba(255,255,255,0.25);
      animation:ripple-expand 600ms ease-out forwards; pointer-events:none;`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 620);
  };

  return (
    <button ref={btnRef} type="submit" onClick={handleClick} style={{
      position: 'relative', overflow: 'hidden', width: '100%',
      background: 'linear-gradient(135deg, #E11D48, #FB7185)',
      color: '#F8FAFC', border: 'none', borderRadius: '0.75rem',
      padding: '0.9rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
      boxShadow: '0 0 20px rgba(225,29,72,0.3)',
      transition: 'opacity 150ms ease, box-shadow 150ms ease',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 35px rgba(225,29,72,0.5)';
        e.currentTarget.style.opacity = '0.95';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 0 20px rgba(225,29,72,0.3)';
        e.currentTarget.style.opacity = '1';
      }}
    >
      <Send size={16} />
      {children}
    </button>
  );
}

const socials = [
  { label: 'Gmail',        href: 'mailto:bruktawit@example.com', Icon: Mail   },
  { label: 'GitHub',       href: 'https://github.com/',          Icon: Github },
  { label: 'TryHackMe',   href: 'https://tryhackme.com/',        Icon: Shield },
  { label: 'Hack The Box', href: 'https://hackthebox.com/',      Icon: Box    },
];

function ContactForm() {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors]   = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!name.trim())    errs.name    = 'Name is required';
    if (!email.trim())   errs.email   = 'Email is required';
    if (!message.trim()) errs.message = 'Message is required';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(35,10,28,0.75) 0%, rgba(20,10,35,0.65) 100%)',
      backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
      border: '1px solid rgba(251,113,133,0.2)',
      borderRadius: '1.25rem', padding: '2.5rem',
      boxShadow: '0 0 40px rgba(225,29,72,0.08)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Top glow line */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(251,113,133,0.5), transparent)',
      }} />

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div key="success"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{ textAlign: 'center', padding: '3rem 0' }}>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: '1rem' }}>
              <CheckCircle size={48} color="#FB7185" style={{ margin: '0 auto' }} />
            </motion.div>
            <p style={{
              background: 'linear-gradient(135deg, #F8FAFC, #FB7185)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.5rem',
            }}>
              Message Sent!
            </p>
            <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>
              Thank you — I'll get back to you soon.
            </p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} noValidate
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FloatingField id="contact-name" label="Your Name" value={name} error={errors.name}
              onChange={(v) => { setName(v); if (errors.name) setErrors((p) => ({ ...p, name: undefined })); }} />
            <FloatingField id="contact-email" label="Email Address" type="email" value={email} error={errors.email}
              onChange={(v) => { setEmail(v); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }} />
            <FloatingField id="contact-message" label="Your Message" value={message} error={errors.message} multiline
              onChange={(v) => { setMessage(v); if (errors.message) setErrors((p) => ({ ...p, message: undefined })); }} />
            <RippleButton>Send Message</RippleButton>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Social links */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid rgba(251,113,133,0.1)',
      }}>
        {socials.map(({ label, href, Icon }) => (
          <motion.a key={label} href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer" aria-label={label}
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.15 }}
            style={{
              width: 42, height: 42, borderRadius: '50%',
              background: 'rgba(225,29,72,0.1)',
              border: '1px solid rgba(225,29,72,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#94A3B8', textDecoration: 'none',
              transition: 'all 150ms ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = '#FB7185';
              el.style.background = 'rgba(225,29,72,0.2)';
              el.style.borderColor = 'rgba(225,29,72,0.4)';
              el.style.boxShadow = '0 0 16px rgba(225,29,72,0.3)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = '#94A3B8';
              el.style.background = 'rgba(225,29,72,0.1)';
              el.style.borderColor = 'rgba(225,29,72,0.2)';
              el.style.boxShadow = 'none';
            }}
          >
            <Icon size={17} />
          </motion.a>
        ))}
      </div>
    </div>
  );
}

export function ContactSection() {
  return (
    <SectionWrapper id="contact">
      <div style={{ maxWidth: '620px', margin: '0 auto', padding: '6rem 1.5rem' }}>
        <ContactForm />
      </div>
    </SectionWrapper>
  );
}
