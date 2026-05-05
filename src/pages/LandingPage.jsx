import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useEdition } from '../contexts/EditionContext'

const PJS = "'Plus Jakarta Sans', sans-serif"
const DS  = "'Dancing Script', cursive"

const C = {
  bg:          '#FFF8F5',
  bgAlt:       '#FFF0F3',
  bgDark:      '#1a0a10',
  text:        '#3E2723',
  muted:       '#7a5c52',
  primary:     '#C2185B',
  primaryDark: '#9c1348',
  accent:      '#F48FB1',
  accentLight: '#FFE4EC',
  card:        '#FFFDF9',
  cardBorder:  '#F0D9C8',
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '80px' },
  transition: { duration: 0.5, ease: 'easeOut', delay },
})

function PrimaryBtn({ children, onClick, style = {} }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        padding: '16px 32px',
        fontFamily: PJS,
        fontWeight: 700,
        fontSize: 16,
        color: '#fff',
        background: C.primary,
        border: 'none',
        borderRadius: 28,
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(194,24,91,0.35)',
        ...style,
      }}
    >
      {children}
    </motion.button>
  )
}

// ── Header ────────────────────────────────────────────────────────────────────
function Header({ onCta }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(255,248,245,0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${C.cardBorder}`,
      padding: '14px 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <PrimaryBtn onClick={onCta} style={{ padding: '10px 22px', fontSize: 14, borderRadius: 20 }}>
        Criar presente
      </PrimaryBtn>
    </header>
  )
}

// ── Mockup do celular mostrando o presente ────────────────────────────────────
function GiftPhoneMockup() {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      style={{
        width: 170,
        borderRadius: 32,
        border: '5px solid #1a0a10',
        background: C.bg,
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(194,24,91,0.28)',
        flexShrink: 0,
        rotate: '3deg',
      }}
    >
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 8, left: '50%',
          transform: 'translateX(-50%)',
          width: 44, height: 6, background: '#1a0a10', borderRadius: 8, zIndex: 2,
        }} />
      </div>
      <div style={{ padding: '28px 12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: DS, fontSize: 22, color: C.primary, margin: 0 }}>Maria,</p>
          <p style={{ fontFamily: PJS, fontSize: 8, color: C.muted, margin: '4px 0 0', lineHeight: 1.5 }}>
            Você é tudo pra mim desde o primeiro dia...
          </p>
        </div>
        <div style={{
          height: 78, borderRadius: 10,
          background: `linear-gradient(135deg, ${C.accentLight}, ${C.accent})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28,
        }}>📸</div>
        <div style={{
          background: C.accentLight, borderRadius: 8,
          padding: '6px 8px', textAlign: 'center',
        }}>
          <p style={{ fontFamily: PJS, fontSize: 7, color: C.muted, margin: 0 }}>juntos há</p>
          <p style={{ fontFamily: PJS, fontWeight: 800, fontSize: 15, color: C.primary, margin: '2px 0 0' }}>
            365 dias ♥
          </p>
        </div>
        <div style={{
          background: '#fff', borderRadius: 8, padding: '6px 8px',
          display: 'flex', alignItems: 'center', gap: 6,
          border: `1px solid ${C.cardBorder}`,
        }}>
          <div style={{
            width: 22, height: 22, borderRadius: '50%',
            background: C.primary,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ color: '#fff', fontSize: 8 }}>▶</span>
          </div>
          <div>
            <p style={{ fontFamily: PJS, fontWeight: 700, fontSize: 7, color: C.text, margin: 0 }}>nossa música</p>
            <p style={{ fontFamily: PJS, fontSize: 6, color: C.muted, margin: 0 }}>Ed Sheeran</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Seção 1: Hero ─────────────────────────────────────────────────────────────
function HeroSection({ onCta, onDemo }) {
  const { copy } = useEdition()
  return (
    <section style={{ background: C.bg, padding: '40px 24px 52px' }}>
      {/* Badge social proof */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: C.accentLight, border: `1px solid ${C.accent}`,
          borderRadius: 100, padding: '5px 14px', marginBottom: 22,
        }}
      >
        <span style={{ fontSize: 11 }}>♥</span>
        <span style={{ fontFamily: PJS, fontWeight: 600, fontSize: 12, color: C.primary }}>
          {copy.landing.socialProof}
        </span>
      </motion.div>

      {/* Conteúdo + mockup lado a lado */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: PJS, fontWeight: 800,
              fontSize: 'clamp(25px, 7vw, 34px)',
              color: C.text, lineHeight: 1.15,
              letterSpacing: '-0.02em', margin: '0 0 6px',
            }}
          >
            Crie presentes{' '}
            <span style={{ color: C.primary }}>inesquecíveis</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontFamily: PJS, fontWeight: 400,
              fontSize: 'clamp(13px, 3.5vw, 15px)',
              color: C.muted, lineHeight: 1.65,
              margin: '0 0 24px',
            }}
          >
            Fotos, carta especial e a música de vocês numa página para compartilhar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
          >
            <PrimaryBtn onClick={onCta} style={{ width: '100%', borderRadius: 14, padding: '14px 20px', fontSize: 15 }}>
              {copy.landing.heroCtaPrimary}
            </PrimaryBtn>
            <button
              onClick={onDemo}
              style={{
                padding: '11px',
                fontFamily: PJS, fontWeight: 600, fontSize: 13,
                color: C.primary, background: 'transparent',
                border: `1.5px solid ${C.accent}`, borderRadius: 14, cursor: 'pointer',
              }}
            >
              Ver exemplo →
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ fontFamily: PJS, fontSize: 11, color: C.muted, marginTop: 12, lineHeight: 1.5 }}
          >
            Compartilhe por link ou QR Code
          </motion.p>
        </div>

        {/* Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GiftPhoneMockup />
        </motion.div>
      </div>

      {/* Seta scroll */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          marginTop: 32, opacity: 0.5,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M6 9l8 8 8-8" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 15l8 8 8-8" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
        </svg>
      </motion.div>
    </section>
  )
}

// ── Seção 2: Como funciona ────────────────────────────────────────────────────
function EditorMockup() {
  return (
    <div style={{
      width: 155, flexShrink: 0,
      borderRadius: 24,
      border: '4px solid #1a0a10',
      background: '#fff',
      overflow: 'hidden',
      boxShadow: '0 12px 40px rgba(194,24,91,0.18)',
    }}>
      <div style={{
        background: C.primary, height: 28,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 10px',
      }}>
        <span style={{ fontFamily: DS, fontSize: 13, color: '#fff' }}>LoveStory</span>
        <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.7)', letterSpacing: 2 }}>●●●</span>
      </div>
      <div style={{ padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div style={{ background: C.accentLight, borderRadius: 6, padding: '6px 8px' }}>
          <p style={{ fontFamily: PJS, fontSize: 7, color: C.muted, margin: '0 0 4px' }}>Estilo</p>
          <div style={{ display: 'flex', gap: 5 }}>
            {[C.primary, '#e91e63', '#9c27b0', '#ff5722'].map((c, i) => (
              <div key={i} style={{
                width: 14, height: 14, borderRadius: '50%', background: c,
                border: i === 0 ? '2px solid #3E2723' : 'none',
              }} />
            ))}
          </div>
        </div>
        <div style={{
          background: C.bg, borderRadius: 6, padding: '6px 8px',
          border: `1px dashed ${C.accent}`,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <span style={{ fontSize: 10 }}>📷</span>
          <p style={{ fontFamily: PJS, fontSize: 7, color: C.muted, margin: 0 }}>Adicionar fotos</p>
        </div>
        <div style={{
          background: C.bg, borderRadius: 6, padding: '6px 8px',
          border: `1px solid ${C.cardBorder}`,
          height: 44,
        }}>
          <p style={{ fontFamily: DS, fontSize: 8, color: C.muted, margin: 0, lineHeight: 1.6 }}>
            Escreva sua carta...
          </p>
        </div>
        <div style={{
          background: C.bg, borderRadius: 6, padding: '6px 8px',
          border: `1px solid ${C.cardBorder}`,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <span style={{ fontSize: 10 }}>🎵</span>
          <p style={{ fontFamily: PJS, fontSize: 7, color: C.muted, margin: 0 }}>Link do YouTube</p>
        </div>
        <div style={{
          background: C.primary, borderRadius: 6, padding: '8px',
          textAlign: 'center',
        }}>
          <span style={{ fontFamily: PJS, fontWeight: 700, fontSize: 9, color: '#fff' }}>Continuar →</span>
        </div>
      </div>
    </div>
  )
}

const STEPS = [
  { num: '1', title: 'Escolha o estilo', desc: 'Cores e visual que combinam com quem vai receber.' },
  { num: '2', title: 'Adicione o conteúdo', desc: 'Fotos, carta especial e a música de vocês.' },
  { num: '3', title: 'Pague uma vez', desc: 'R$ 24,90 único. Sem mensalidade. Link ativo por 1 ano.' },
  { num: '4', title: 'Surpreenda', desc: 'Envie o link ou imprima o QR Code num cartão físico.' },
]

function HowItWorksSection({ onCta }) {
  return (
    <section style={{ background: C.bgAlt, padding: '56px 24px' }}>
      <motion.p {...fadeUp(0)} style={{
        fontFamily: PJS, fontWeight: 600, fontSize: 11,
        letterSpacing: '0.14em', color: C.primary,
        textTransform: 'uppercase', textAlign: 'center', margin: '0 0 8px',
      }}>
        Simples assim
      </motion.p>

      <motion.h2 {...fadeUp(0.08)} style={{
        fontFamily: PJS, fontWeight: 800,
        fontSize: 'clamp(22px, 6vw, 28px)',
        color: C.text, textAlign: 'center', margin: '0 0 4px',
      }}>
        Pronto em menos de{' '}
        <span style={{ color: C.primary }}>5 minutos</span>
      </motion.h2>

      <motion.p {...fadeUp(0.12)} style={{
        fontFamily: PJS, fontSize: 13, color: C.muted,
        textAlign: 'center', margin: '0 0 36px',
      }}>
        Simples, rápido e sem complicação
      </motion.p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <motion.div {...fadeUp(0.1)}>
          <EditorMockup />
        </motion.div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 22 }}>
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.1 + 0.15)}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
            >
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: C.primary,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontFamily: PJS, fontWeight: 800, fontSize: 13, color: '#fff' }}>
                  {step.num}
                </span>
              </div>
              <div>
                <p style={{ fontFamily: PJS, fontWeight: 700, fontSize: 13, color: C.text, margin: '2px 0 4px' }}>
                  {step.title}
                </p>
                <p style={{ fontFamily: PJS, fontWeight: 400, fontSize: 11, color: C.muted, lineHeight: 1.5, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div {...fadeUp(0.55)} style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
        <PrimaryBtn onClick={onCta}>Começar agora →</PrimaryBtn>
      </motion.div>
    </section>
  )
}

// ── Seção 3: Vídeo ────────────────────────────────────────────────────────────
function VideoSection() {
  return (
    <section style={{ background: C.bg, padding: '56px 24px' }}>
      <motion.p {...fadeUp(0)} style={{
        fontFamily: PJS, fontWeight: 600, fontSize: 11,
        letterSpacing: '0.14em', color: C.primary,
        textTransform: 'uppercase', textAlign: 'center', margin: '0 0 8px',
      }}>
        Tutorial
      </motion.p>

      <motion.h2 {...fadeUp(0.08)} style={{
        fontFamily: PJS, fontWeight: 800,
        fontSize: 'clamp(22px, 6vw, 28px)',
        color: C.text, textAlign: 'center', margin: '0 0 4px',
      }}>
        Veja como é{' '}
        <span style={{ color: C.primary }}>fácil criar</span>
      </motion.h2>

      <motion.p {...fadeUp(0.12)} style={{
        fontFamily: PJS, fontSize: 13, color: C.muted,
        textAlign: 'center', margin: '0 0 28px',
      }}>
        Passo a passo em menos de 2 minutos
      </motion.p>

      <motion.div
        {...fadeUp(0.15)}
        style={{
          borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 12px 48px rgba(194,24,91,0.20)',
          border: `2px solid ${C.accent}`,
          aspectRatio: '9/16',
          maxWidth: 340,
          margin: '0 auto',
          background: C.accentLight,
        }}
      >
        <iframe
          src="https://drive.google.com/file/d/12xefYuokGvlOS2KCHBVpo2zE3NMczCV5/preview"
          width="100%"
          height="100%"
          style={{ border: 'none', display: 'block', minHeight: 520 }}
          allow="autoplay"
          title="Como funciona o LoveStory"
        />
      </motion.div>
    </section>
  )
}

// ── Seção 4: Features grid ────────────────────────────────────────────────────
const FEATURES = [
  { icon: '📸', title: 'Suas fotos', desc: 'Até 5 fotos com legendas personalizadas' },
  { icon: '💌', title: 'Carta especial', desc: 'Escreva a mensagem do seu jeito' },
  { icon: '🎵', title: 'Música de vocês', desc: 'Integração direta com YouTube' },
  { icon: '⏱️', title: 'Contador ao vivo', desc: 'Dias e horas juntos em tempo real' },
]

function FeaturesSection({ onCta }) {
  return (
    <section style={{ background: C.bgAlt, padding: '56px 24px' }}>
      <motion.h2 {...fadeUp(0)} style={{
        fontFamily: PJS, fontWeight: 800,
        fontSize: 'clamp(22px, 6vw, 28px)',
        color: C.text, textAlign: 'center', margin: '0 0 6px',
      }}>
        Tudo para criar um presente que{' '}
        <span style={{ color: C.primary }}>emociona</span>
      </motion.h2>

      <motion.p {...fadeUp(0.08)} style={{
        fontFamily: PJS, fontSize: 13, color: C.muted,
        textAlign: 'center', margin: '0 0 32px',
      }}>
        Cada detalhe pensado para surpreender
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {FEATURES.map((f, i) => (
          <motion.div
            key={i}
            {...fadeUp(i * 0.08 + 0.1)}
            style={{
              background: C.card, border: `1px solid ${C.cardBorder}`,
              borderRadius: 16, padding: '20px 16px',
              display: 'flex', flexDirection: 'column', gap: 8,
            }}
          >
            <span style={{ fontSize: 28 }}>{f.icon}</span>
            <p style={{ fontFamily: PJS, fontWeight: 700, fontSize: 14, color: C.text, margin: 0 }}>
              {f.title}
            </p>
            <p style={{ fontFamily: PJS, fontWeight: 400, fontSize: 12, color: C.muted, lineHeight: 1.5, margin: 0 }}>
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div {...fadeUp(0.4)} style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
        <PrimaryBtn onClick={onCta}>Quero criar agora →</PrimaryBtn>
      </motion.div>
    </section>
  )
}

// ── Seção 5: Depoimentos ──────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: 'Mariana Costa',
    avatar: 'MC',
    avatarBg: '#e91e8c',
    text: 'Consegui criar um presente emocionante para meu namorado em menos de 10 minutos. Ele chorou muito!',
    stars: 5,
  },
  {
    name: 'João Pereira',
    avatar: 'JP',
    avatarBg: '#C2185B',
    text: 'Minha namorada ficou sem palavras. Cada detalhe ficou perfeito e personalizado do jeito que eu queria.',
    stars: 5,
  },
  {
    name: 'Ana Silva',
    avatar: 'AS',
    avatarBg: '#ad1457',
    text: 'O resultado ficou incrível. As fotos, a carta, a música... ela abriu na frente de todo mundo e chorou de emoção.',
    stars: 5,
  },
]

function TestimonialsSection() {
  return (
    <section style={{ background: C.bg, padding: '56px 24px' }}>
      <motion.h2 {...fadeUp(0)} style={{
        fontFamily: PJS, fontWeight: 800,
        fontSize: 'clamp(22px, 6vw, 28px)',
        color: C.text, textAlign: 'center', margin: '0 0 4px',
      }}>
        Histórias reais de quem já usou o{' '}
        <span style={{ color: C.primary }}>LoveStory</span>
      </motion.h2>

      <motion.p {...fadeUp(0.08)} style={{
        fontFamily: PJS, fontSize: 13, color: C.muted,
        textAlign: 'center', margin: '0 0 32px',
      }}>
        Pessoas que transformaram memórias em presentes únicos
      </motion.p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            {...fadeUp(i * 0.1 + 0.1)}
            style={{
              background: C.card, border: `1px solid ${C.cardBorder}`,
              borderRadius: 16, padding: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: t.avatarBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontFamily: PJS, fontWeight: 700, fontSize: 13, color: '#fff' }}>
                  {t.avatar}
                </span>
              </div>
              <div>
                <p style={{ fontFamily: PJS, fontWeight: 700, fontSize: 14, color: C.text, margin: 0 }}>
                  {t.name}
                </p>
                <div style={{ display: 'flex', gap: 2, marginTop: 2 }}>
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <span key={si} style={{ color: '#f59e0b', fontSize: 12 }}>★</span>
                  ))}
                </div>
              </div>
            </div>
            <p style={{ fontFamily: PJS, fontWeight: 400, fontSize: 13, color: C.muted, lineHeight: 1.65, margin: 0 }}>
              "{t.text}"
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ── Seção 6: Preço ────────────────────────────────────────────────────────────
const PLAN_FEATURES = [
  '5 fotos com legendas personalizadas',
  'Carta escrita por você',
  'Música do YouTube integrada',
  'Contador ao vivo do relacionamento',
  'Link + QR Code para compartilhar',
  'Acesso por 1 ano',
]

function PricingSection({ onCta }) {
  return (
    <section style={{ background: C.bgAlt, padding: '56px 24px' }}>
      <motion.h2 {...fadeUp(0)} style={{
        fontFamily: PJS, fontWeight: 800,
        fontSize: 'clamp(22px, 6vw, 28px)',
        color: C.text, textAlign: 'center', margin: '0 0 6px',
      }}>
        Investimento único
      </motion.h2>

      <motion.p {...fadeUp(0.08)} style={{
        fontFamily: PJS, fontSize: 13, color: C.muted,
        textAlign: 'center', margin: '0 0 32px',
      }}>
        Pague apenas uma vez. Sem mensalidades.
      </motion.p>

      <motion.div
        {...fadeUp(0.1)}
        style={{
          background: C.card,
          border: `2px solid ${C.accent}`,
          borderRadius: 24, overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(194,24,91,0.12)',
        }}
      >
        <div style={{
          background: C.primary, padding: '10px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <span style={{ fontSize: 14 }}>★</span>
          <span style={{ fontFamily: PJS, fontWeight: 700, fontSize: 13, color: '#fff', letterSpacing: '0.08em' }}>
            MAIS POPULAR
          </span>
        </div>

        <div style={{ padding: '28px 24px 20px', borderBottom: `1px solid ${C.cardBorder}` }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <p style={{ fontFamily: PJS, fontWeight: 600, fontSize: 14, color: C.muted, margin: '0 0 4px' }}>
                Carta Infinita
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontFamily: PJS, fontWeight: 400, fontSize: 16, color: C.text }}>R$</span>
                <span style={{ fontFamily: PJS, fontWeight: 800, fontSize: 44, color: C.text, lineHeight: 1 }}>24</span>
                <span style={{ fontFamily: PJS, fontWeight: 600, fontSize: 20, color: C.text }}>,90</span>
              </div>
              <p style={{ fontFamily: PJS, fontSize: 12, color: C.muted, margin: '6px 0 0' }}>
                pagamento único · 1 ano de acesso
              </p>
            </div>
            <span style={{ fontSize: 44, marginLeft: 'auto' }}>💌</span>
          </div>
        </div>

        <div style={{ padding: '20px 24px 28px' }}>
          {PLAN_FEATURES.map((feat, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
            }}>
              <span style={{ color: C.primary, fontSize: 16, flexShrink: 0 }}>✓</span>
              <span style={{ fontFamily: PJS, fontWeight: 600, fontSize: 14, color: C.text }}>
                {feat}
              </span>
            </div>
          ))}

          <PrimaryBtn onClick={onCta} style={{ width: '100%', marginTop: 8, borderRadius: 14 }}>
            Criar minha carta agora
          </PrimaryBtn>
        </div>
      </motion.div>

      <motion.p {...fadeUp(0.3)} style={{
        fontFamily: PJS, fontSize: 12, color: C.muted,
        textAlign: 'center', marginTop: 16,
      }}>
        Pagamento seguro · Garantia de satisfação · Suporte dedicado
      </motion.p>
    </section>
  )
}

// ── Seção 7: FAQ ──────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'O que é a LoveStory?',
    a: 'LoveStory é uma plataforma que permite criar páginas personalizadas de presente. Você adiciona fotos, uma carta especial, a música de vocês e um contador ao vivo do relacionamento.',
  },
  {
    q: 'Como o meu amor vai receber?',
    a: 'Você recebe um link único. Pode enviar pelo WhatsApp, Instagram, ou imprimir um QR Code num cartão físico. É só apontar a câmera e a mágica acontece.',
  },
  {
    q: 'Preciso pagar mensalidade?',
    a: 'Não. É um pagamento único de R$ 24,90 com 1 ano de acesso. Sem cobranças escondidas.',
  },
  {
    q: 'Posso editar a página depois de criar?',
    a: 'Sim! Você pode acessar e editar sua página a qualquer momento pelo painel.',
  },
  {
    q: 'Em quanto tempo fica pronto?',
    a: 'Você cria e já recebe o link na hora. Demora menos de 5 minutos.',
  },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: `1px solid ${C.cardBorder}` }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 0', textAlign: 'left', gap: 12,
        }}
      >
        <span style={{ fontFamily: PJS, fontWeight: 700, fontSize: 15, color: C.text }}>{q}</span>
        <span style={{
          width: 26, height: 26, borderRadius: '50%',
          border: `1.5px solid ${open ? C.primary : C.cardBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, color: open ? C.primary : C.muted, fontSize: 18,
          transition: 'all 0.2s',
        }}>
          {open ? '−' : '+'}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              fontFamily: PJS, fontWeight: 400, fontSize: 14,
              color: C.muted, lineHeight: 1.65,
              margin: '0 0 18px', paddingRight: 16,
            }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FaqSection() {
  return (
    <section style={{ background: C.bg, padding: '56px 24px' }}>
      <motion.h2 {...fadeUp(0)} style={{
        fontFamily: PJS, fontWeight: 800,
        fontSize: 'clamp(22px, 6vw, 28px)',
        color: C.text, textAlign: 'center', margin: '0 0 32px',
      }}>
        Perguntas frequentes
      </motion.h2>
      <motion.div
        {...fadeUp(0.1)}
        style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 20, padding: '0 20px' }}
      >
        {FAQS.map(({ q, a }) => (
          <FaqItem key={q} q={q} a={a} />
        ))}
      </motion.div>
    </section>
  )
}

// ── Seção 8: CTA Final (fundo escuro) ────────────────────────────────────────
function CtaFinalSection({ onCta, onLogin }) {
  return (
    <section style={{
      background: C.bgDark,
      padding: '72px 24px',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', textAlign: 'center',
    }}>
      <motion.div {...fadeUp(0)} style={{ fontSize: 44, marginBottom: 16 }}>
        💌
      </motion.div>

      <motion.h2 {...fadeUp(0.08)} style={{
        fontFamily: PJS, fontWeight: 800,
        fontSize: 'clamp(24px, 6.5vw, 32px)',
        color: '#fff', margin: '0 0 8px', lineHeight: 1.2, maxWidth: 300,
      }}>
        Alguém especial merece saber o{' '}
        <span style={{ color: C.accent }}>quanto importa</span>
      </motion.h2>

      <motion.p {...fadeUp(0.14)} style={{
        fontFamily: PJS, fontWeight: 400, fontSize: 14,
        color: 'rgba(255,255,255,0.6)', lineHeight: 1.65,
        maxWidth: 260, marginTop: 12, marginBottom: 32,
      }}>
        Junte-se a milhares de pessoas que já transformaram suas memórias em presentes únicos. Comece agora!
      </motion.p>

      <motion.div {...fadeUp(0.2)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <PrimaryBtn onClick={onCta} style={{ padding: '16px 40px' }}>
          Criar presente ♥
        </PrimaryBtn>
        <button
          onClick={onLogin}
          style={{
            padding: '8px 0',
            fontFamily: PJS, fontWeight: 500, fontSize: 13,
            color: 'rgba(255,255,255,0.45)', background: 'transparent',
            border: 'none', cursor: 'pointer',
            textDecoration: 'underline', textUnderlineOffset: 3,
          }}
        >
          Já tem conta? Entrar
        </button>
      </motion.div>

      <motion.p {...fadeUp(0.35)} style={{
        fontFamily: PJS, fontWeight: 400, fontSize: 11,
        color: 'rgba(255,255,255,0.2)', marginTop: 52,
      }}>
        LoveStory — feito com ♥
      </motion.p>
    </section>
  )
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function LandingPage() {
  const navigate = useNavigate()
  const goCriar = () => navigate('/criar')

  return (
    <>
      <Header onCta={goCriar} />
      <HeroSection onCta={goCriar} onDemo={() => navigate('/p/dev')} />
      <HowItWorksSection onCta={goCriar} />
      <VideoSection />
      <FeaturesSection onCta={goCriar} />
      <TestimonialsSection />
      <PricingSection onCta={goCriar} />
      <FaqSection />
      <CtaFinalSection onCta={goCriar} onLogin={() => navigate('/login')} />
    </>
  )
}
