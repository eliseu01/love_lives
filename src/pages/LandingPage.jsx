import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PaperTexture, { paperStyle } from '../components/PaperTexture'
import envelopeClosed from '../assets/envelope/envelope_closed.webp'

const PJS = "'Plus Jakarta Sans', sans-serif"

const C = {
  bg: '#FFF8F5',
  text: '#3E2723',
  muted: '#6b5c52',
  primary: '#C2185B',
  accent: '#F48FB1',
  iconBg: '#FFF0F3',
}

// ── Corações flutuantes do Hero ───────────────────────────────────────────────
const FLOATING_HEARTS = [
  { size: 14, x: '12%',  y: '18%', color: C.accent,   delay: 0,    duration: 4.2, rotate: -15 },
  { size: 10, x: '80%',  y: '14%', color: C.primary,  delay: 0.7,  duration: 3.8, rotate:  10 },
  { size: 18, x: '88%',  y: '40%', color: C.accent,   delay: 1.2,  duration: 4.6, rotate:   6 },
  { size: 11, x: '6%',   y: '55%', color: C.primary,  delay: 0.4,  duration: 3.5, rotate: -20 },
  { size: 13, x: '75%',  y: '70%', color: C.accent,   delay: 1.8,  duration: 5.0, rotate:  12 },
  { size:  9, x: '20%',  y: '78%', color: C.primary,  delay: 2.1,  duration: 4.0, rotate:  -8 },
]

// ── Seção 1: Hero ─────────────────────────────────────────────────────────────
function HeroSection({ onCta, onDemo }) {
  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut', delay },
  })

  return (
    <section style={{
      ...paperStyle,
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      overflow: 'hidden',
    }}>
      <PaperTexture />

      {/* Corações flutuantes */}
      {FLOATING_HEARTS.map((h, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: h.duration, delay: h.delay, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: h.x,
            top: h.y,
            fontSize: h.size,
            color: h.color,
            transform: `rotate(${h.rotate}deg)`,
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 1,
          }}
        >
          ♥
        </motion.span>
      ))}

      {/* Conteúdo centralizado */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.0 }}
        >
          <motion.img
            src={envelopeClosed}
            alt="envelope"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut' }}
            style={{
              width: 148,
              display: 'block',
              filter: 'drop-shadow(0 8px 24px rgba(194,24,91,0.18))',
              transform: 'rotate(-4deg)',
              marginBottom: 28,
            }}
          />
        </motion.div>

        <motion.h1
          {...fadeUp(0.15)}
          style={{
            fontFamily: PJS,
            fontWeight: 800,
            fontSize: 'clamp(26px, 7vw, 34px)',
            color: C.text,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          Surpreenda quem você ama{' '}
          <span style={{ color: C.primary }}>♥</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.25)}
          style={{
            fontFamily: PJS,
            fontWeight: 400,
            fontSize: 'clamp(14px, 4vw, 17px)',
            color: C.muted,
            lineHeight: 1.6,
            maxWidth: 320,
            marginTop: 16,
          }}
        >
          Crie um presente digital personalizado com carta, fotos, música e muito mais.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            boxShadow: [
              '0 4px 20px rgba(194,24,91,0.35)',
              '0 4px 28px rgba(194,24,91,0.55)',
              '0 4px 20px rgba(194,24,91,0.35)',
            ],
          }}
          transition={{
            opacity: { duration: 0.5, ease: 'easeOut', delay: 0.4 },
            y: { duration: 0.5, ease: 'easeOut', delay: 0.4 },
            boxShadow: { repeat: Infinity, duration: 2.4, ease: 'easeInOut', delay: 0.9 },
          }}
          onClick={onCta}
          whileHover={{ scale: 1.03 }}
          style={{
            marginTop: 32,
            padding: '16px 32px',
            fontFamily: PJS,
            fontWeight: 700,
            fontSize: 16,
            color: '#ffffff',
            background: C.primary,
            border: 'none',
            borderRadius: 28,
            cursor: 'pointer',
          }}
        >
          Criar meu presente →
        </motion.button>

        <motion.button
          {...fadeUp(0.5)}
          onClick={onDemo}
          style={{
            marginTop: 12,
            padding: '12px 24px',
            fontFamily: PJS,
            fontWeight: 600,
            fontSize: 14,
            color: C.primary,
            background: 'transparent',
            border: `1.5px solid ${C.accent}`,
            borderRadius: 28,
            cursor: 'pointer',
          }}
        >
          Ver demo →
        </motion.button>
      </div>
    </section>
  )
}

// ── Seção 2: Como Funciona ────────────────────────────────────────────────────
const STEPS = [
  {
    icon: '✍️',
    title: 'Personalize',
    desc: 'Escolha os nomes, escreva uma carta, adicione fotos e uma música especial.',
  },
  {
    icon: '🔗',
    title: 'Compartilhe',
    desc: 'Envie o link para quem você ama. É só abrir no celular.',
  },
  {
    icon: '💌',
    title: 'Emocione',
    desc: 'Seu par abre o envelope, lê a carta, vê as fotos e ouve a música de vocês.',
  },
]

function HowItWorksSection() {
  return (
    <section style={{ background: C.bg, padding: '64px 24px' }}>
      <h2 style={{
        fontFamily: PJS,
        fontWeight: 700,
        fontSize: 'clamp(22px, 6vw, 28px)',
        color: C.text,
        textAlign: 'center',
        margin: 0,
      }}>
        Como funciona
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 40 }}>
        {STEPS.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: C.iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
            }}>
              {step.icon}
            </div>
            <p style={{
              fontFamily: PJS,
              fontWeight: 700,
              fontSize: 17,
              color: C.text,
              textAlign: 'center',
              marginTop: 16,
              marginBottom: 8,
            }}>
              {step.title}
            </p>
            <p style={{
              fontFamily: PJS,
              fontWeight: 400,
              fontSize: 14,
              color: C.muted,
              textAlign: 'center',
              lineHeight: 1.6,
              maxWidth: 280,
              margin: 0,
            }}>
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ── Seção 3: Demo ao Vivo ─────────────────────────────────────────────────────
function DemoSection({ onDemo }) {
  return (
    <section style={{ background: C.bg, padding: '48px 24px 64px' }}>
      <h2 style={{
        fontFamily: PJS,
        fontWeight: 700,
        fontSize: 'clamp(22px, 6vw, 28px)',
        color: C.text,
        textAlign: 'center',
        margin: 0,
      }}>
        Veja como fica
      </h2>

      <p style={{
        fontFamily: PJS,
        fontWeight: 400,
        fontSize: 14,
        color: C.muted,
        textAlign: 'center',
        marginTop: 8,
      }}>
        Um presente real, criado com LoveStory.
      </p>

      {/* Mockup do celular */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          width: 260,
          height: 520,
          borderRadius: 36,
          border: '6px solid #1a1a1a',
          background: '#f0e6c8',
          overflow: 'hidden',
          margin: '32px auto 0',
          boxShadow: '0 12px 48px rgba(0,0,0,0.15)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: 20,
          gap: 16,
        }}
      >
        {/* Notch */}
        <div style={{
          position: 'absolute',
          top: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 60,
          height: 8,
          background: '#1a1a1a',
          borderRadius: 8,
          zIndex: 1,
        }} />

        {/* Mini envelope */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
          <img
            src={envelopeClosed}
            alt="envelope"
            style={{ width: 110, display: 'block' }}
          />
          <span style={{
            fontFamily: PJS,
            fontSize: 8,
            color: '#7a5c40',
            marginTop: 4,
          }}>
            toque para abrir
          </span>
        </div>

        {/* Mini carta */}
        <div style={{
          width: '88%',
          background: '#F5EDCC',
          borderRadius: 6,
          padding: '10px 10px',
          transform: 'rotate(-1.5deg)',
          flexShrink: 0,
        }}>
          {[70, 90, 80, 60].map((w, i) => (
            <div key={i} style={{
              height: 3,
              width: `${w}%`,
              background: '#ddd',
              borderRadius: 2,
              marginBottom: i < 3 ? 7 : 0,
            }} />
          ))}
        </div>

        {/* Mini polaroid */}
        <div style={{
          width: '60%',
          background: '#E8E3DA',
          borderRadius: 4,
          padding: '6px 6px 18px',
          transform: 'rotate(-3deg)',
          flexShrink: 0,
        }}>
          <div style={{
            width: '100%',
            aspectRatio: '1/1',
            background: '#C8C4BC',
            borderRadius: 2,
          }} />
          <p style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 9,
            color: '#5a4a3a',
            textAlign: 'center',
            margin: '4px 0 0',
          }}>
            nossa história
          </p>
        </div>

        {/* Mini contador */}
        <div style={{
          padding: '6px 14px',
          background: '#fff',
          borderRadius: 20,
          fontFamily: PJS,
          fontWeight: 700,
          fontSize: 10,
          color: C.primary,
          letterSpacing: '0.05em',
          flexShrink: 0,
        }}>
          00 : 00 : 00 : 00
        </div>
      </motion.div>

      {/* Botão demo */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
        <button
          onClick={onDemo}
          style={{
            padding: '14px 28px',
            fontFamily: PJS,
            fontWeight: 700,
            fontSize: 15,
            color: '#ffffff',
            background: C.primary,
            border: 'none',
            borderRadius: 28,
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(194,24,91,0.35)',
          }}
        >
          Ver demo ao vivo →
        </button>
      </div>
    </section>
  )
}

// ── Seção 4: CTA Final ────────────────────────────────────────────────────────
function CtaSection({ onCta, onLogin }) {
  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.5, ease: 'easeOut', delay },
  })

  return (
    <section style={{
      ...paperStyle,
      position: 'relative',
      padding: '64px 24px',
      overflow: 'hidden',
    }}>
      <PaperTexture />

      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        <motion.span
          {...fadeUp(0.05)}
          style={{ fontSize: 56, lineHeight: 1 }}
        >
          💌
        </motion.span>

        <motion.h2
          {...fadeUp(0.15)}
          style={{
            fontFamily: PJS,
            fontWeight: 800,
            fontSize: 'clamp(22px, 6vw, 28px)',
            color: C.text,
            marginTop: 16,
            marginBottom: 0,
          }}
        >
          Crie seu presente agora
        </motion.h2>

        <motion.p
          {...fadeUp(0.25)}
          style={{
            fontFamily: PJS,
            fontWeight: 400,
            fontSize: 'clamp(13px, 3.5vw, 15px)',
            color: C.muted,
            lineHeight: 1.6,
            maxWidth: 300,
            marginTop: 12,
          }}
        >
          É grátis, leva poucos minutos e vai fazer alguém sorrir.
        </motion.p>

        <motion.button
          {...fadeUp(0.35)}
          onClick={onCta}
          style={{
            marginTop: 28,
            padding: '16px 32px',
            fontFamily: PJS,
            fontWeight: 700,
            fontSize: 16,
            color: '#ffffff',
            background: C.primary,
            border: 'none',
            borderRadius: 28,
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(194,24,91,0.35)',
          }}
        >
          Começar agora ♥
        </motion.button>

        <motion.button
          {...fadeUp(0.45)}
          onClick={onLogin}
          style={{
            marginTop: 16,
            padding: '8px 0',
            fontFamily: PJS,
            fontWeight: 500,
            fontSize: 13,
            color: C.primary,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
            textUnderlineOffset: 3,
          }}
        >
          Já tem conta? Entrar
        </motion.button>

        <motion.p
          {...fadeUp(0.55)}
          style={{
            fontFamily: PJS,
            fontWeight: 400,
            fontSize: 11,
            color: '#a08060',
            marginTop: 48,
            paddingBottom: 32,
          }}
        >
          LoveStory — feito com ♥
        </motion.p>
      </div>
    </section>
  )
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <>
      <HeroSection
        onCta={() => navigate('/criar')}
        onDemo={() => navigate('/p/dev')}
      />
      <HowItWorksSection />
      <DemoSection onDemo={() => navigate('/p/dev')} />
      <CtaSection
        onCta={() => navigate('/criar')}
        onLogin={() => navigate('/login')}
      />
    </>
  )
}
