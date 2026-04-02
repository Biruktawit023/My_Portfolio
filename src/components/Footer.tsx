import { Mail, Github, Shield, Box, Heart } from 'lucide-react';

const SOCIAL_LINKS = [
  { label: 'Gmail',        href: 'mailto:biruktawitmasresha6@gmail.com', icon: Mail   },
  { label: 'GitHub',       href: 'https://github.com/Biruktawit023',     icon: Github },
  { label: 'TryHackMe',   href: 'https://tryhackme.com/',                icon: Shield },
  { label: 'Hack The Box', href: 'https://hackthebox.com/',              icon: Box    },
];

export function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(to top, rgba(15,5,12,1) 0%, rgba(10,10,20,0.8) 100%)',
      borderTop: '1px solid rgba(225,29,72,0.2)',
      padding: '3.5rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Rose glow top */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '60%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(225,29,72,0.6), transparent)',
      }} />

      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem',
      }}>
        {/* Logo */}
        <span style={{
          background: 'linear-gradient(135deg, #FB7185, #E11D48)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          fontWeight: 800, fontSize: '1.2rem', letterSpacing: '0.1em',
        }}>
          BIRUKTAWIT MASRESHA
        </span>

        {/* Social icons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(225,29,72,0.1)',
                border: '1px solid rgba(225,29,72,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#94A3B8',
                transition: 'all 150ms ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = '#FB7185';
                el.style.background = 'rgba(225,29,72,0.2)';
                el.style.borderColor = 'rgba(225,29,72,0.5)';
                el.style.boxShadow = '0 0 16px rgba(225,29,72,0.3)';
                el.style.transform = 'scale(1.15)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = '#94A3B8';
                el.style.background = 'rgba(225,29,72,0.1)';
                el.style.borderColor = 'rgba(225,29,72,0.2)';
                el.style.boxShadow = 'none';
                el.style.transform = 'scale(1)';
              }}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p style={{
          margin: 0, fontSize: '0.8rem', color: '#64748B', textAlign: 'center',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
        }}>
          © {new Date().getFullYear()} Biruktawit Masresha. Made with
          <Heart size={12} color="#E11D48" fill="#E11D48" />
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
