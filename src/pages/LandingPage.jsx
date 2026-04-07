import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PaperTexture, { paperStyle } from '../components/PaperTexture'
import envelopeClosed from '../assets/envelope/envelope_closed.webp'

const PJS = "'Plus Jakarta Sans', sans-serif"
const DS  = "'Dancing Script', cursive"

const C = {
  bg:          '#FFF8F5',
  bgAlt:       '#FFF0F3',
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
  viewport: { once: true, margin: '-48px' },
  transition: { duration: 0.5, ease: 'easeOut', delay },
})

// ── Botão primário reutilizável ───────────────────────────────────────────────
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

// ── Corações flutuantes do Hero ───────────────────────────────────────────────
const HEARTS = [
  { size: 14, x: '10%',  y: '15%', color: C.accent,   delay: 0,    dur: 4.2, rot: -15 },
  { size: 10, x: '82%',  y: '12%', color: C.primary,  delay: 0.7,  dur: 3.8, rot:  10 },
  { size: 18, x: '86%',  y: '38%', color: C.accent,   delay: 1.2,  dur: 4.6, rot:   6 },
  { size: 11, x: '5%',   y: '52%', color: C.primary,  delay: 0.4,  dur: 3.5, rot: -20 },
  { size: 13, x: '76%',  y: '68%', color: C.accent,   delay: 1.8,  dur: 5.0, rot:  12 },
  { size:  9, x: '18%',  y: '76%', color: C.primary,  delay: 2.1,  dur: 4.0, rot:  -8 },
]

// ── Seção 1: Hero ─────────────────────────────────────────────────────────────
function HeroSection({ onCta, onDemo }) {
  return (
    <section style={{
      ...paperStyle,
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '56px 24px',
      overflow: 'hidden',
    }}>
      <PaperTexture />

      {HEARTS.map((h, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: h.dur, delay: h.delay, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: h.x, top: h.y,
            fontSize: h.size,
            color: h.color,
            transform: `rotate(${h.rot}deg)`,
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 1,
          }}
        >♥</motion.span>
      ))}

      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.img
            src={envelopeClosed}
            alt="envelope"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut' }}
            style={{
              width: 148,
              display: 'block',
              filter: 'drop-shadow(0 8px 24px rgba(194,24,91,0.20))',
              transform: 'rotate(-4deg)',
              marginBottom: 28,
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          style={{
            fontFamily: PJS, fontWeight: 600,
            fontSize: 12, letterSpacing: '0.14em',
            color: C.primary, textTransform: 'uppercase',
            margin: '0 0 12px',
          }}
        >
          Presente digital para casais
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          style={{
            fontFamily: PJS, fontWeight: 800,
            fontSize: 'clamp(28px, 8vw, 36px)',
            color: C.text, lineHeight: 1.15,
            letterSpacing: '-0.02em', margin: 0,
          }}
        >
          Surpreenda quem{' '}
          <span style={{ color: C.primary }}>você ama</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          style={{
            fontFamily: PJS, fontWeight: 400,
            fontSize: 'clamp(14px, 4vw, 16px)',
            color: C.muted, lineHeight: 1.65,
            maxWidth: 300, marginTop: 14,
          }}
        >
          Crie uma página personalizada com carta, fotos e a música de vocês.
          Compartilhe o link — eles nunca vão esquecer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginTop: 32 }}
        >
          <PrimaryBtn onClick={onCta}>
            Criar minha carta ♥
          </PrimaryBtn>

          <button
            onClick={onDemo}
            style={{
              padding: '12px 24px',
              fontFamily: PJS, fontWeight: 600, fontSize: 14,
              color: C.primary, background: 'transparent',
              border: `1.5px solid ${C.accent}`, borderRadius: 28, cursor: 'pointer',
            }}
          >
            Ver exemplo ao vivo →
          </button>
        </motion.div>

        {/* Prova social pequena */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            marginTop: 32,
          }}
        >
          <div style={{ display: 'flex' }}>
            {['#f9c', '#f7b', '#f5a', '#f48'].map((bg, i) => (
              <div key={i} style={{
                width: 28, height: 28, borderRadius: '50%',
                background: bg, border: '2px solid #FFF8F5',
                marginLeft: i > 0 ? -8 : 0,
                fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>♥</div>
            ))}
          </div>
          <span style={{ fontFamily: PJS, fontSize: 13, color: C.muted }}>
            <strong style={{ color: C.text }}>+2.800 casais</strong> surpreendidos
          </span>
        </motion.div>
      </div>
    </section>
  )
}

// ── Seção 2: Prova social — viralizou ─────────────────────────────────────────
function ViralSection({ onCta }) {
  return (
    <section style={{ background: C.bgAlt, padding: '64px 24px' }}>
      <motion.p
        {...fadeUp(0)}
        style={{
          fontFamily: PJS, fontWeight: 600, fontSize: 11,
          letterSpacing: '0.14em', color: C.primary,
          textTransform: 'uppercase', textAlign: 'center', margin: '0 0 10px',
        }}
      >
        Em destaque no TikTok e Instagram
      </motion.p>

      <motion.h2 {...fadeUp(0.08)} style={{
        fontFamily: PJS, fontWeight: 800,
        fontSize: 'clamp(24px, 6.5vw, 30px)',
        color: C.text, textAlign: 'center',
        margin: 0, lineHeight: 1.2,
      }}>
        Surpresas que{' '}
        <span style={{ color: C.primary }}>viralizaram</span>
      </motion.h2>

      {/* Mockup de celular estilo TikTok */}
      <motion.div
        {...fadeUp(0.15)}
        style={{
          width: 220, height: 390, borderRadius: 30,
          border: '5px solid #2a1a1a', background: C.accentLight,
          overflow: 'hidden', margin: '32px auto 0',
          boxShadow: '0 12px 48px rgba(194,24,91,0.18)',
          position: 'relative',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 12, padding: '16px 12px',
        }}
      >
        {/* Notch */}
        <div style={{
          position: 'absolute', top: 8, left: '50%',
          transform: 'translateX(-50%)',
          width: 50, height: 7, background: '#2a1a1a', borderRadius: 8,
        }} />

        {/* QR code mockup */}
        <div style={{
          width: 110, height: 110,
          background: '#fff', borderRadius: 10, padding: 8,
          boxShadow: `0 0 0 3px ${C.accent}, 0 0 18px rgba(194,24,91,0.25)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <QrCodeSVG />
        </div>

        {/* Texto abaixo do QR */}
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: DS, fontSize: 18, color: C.primary,
            margin: 0, lineHeight: 1.3,
          }}>Te amo ♥</p>
          <p style={{
            fontFamily: PJS, fontSize: 10, color: C.muted,
            margin: '4px 0 0',
          }}>aponta a câmera aqui</p>
        </div>

        {/* Likes & comentários */}
        <div style={{
          position: 'absolute', right: 10, bottom: 48,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        }}>
          {[
            { icon: '♥', count: '87 mil' },
            { icon: '💬', count: '312' },
            { icon: '🔖', count: '44 mil' },
          ].map(({ icon, count }) => (
            <div key={count} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <span style={{ fontFamily: PJS, fontSize: 9, color: C.text, fontWeight: 700 }}>{count}</span>
            </div>
          ))}
        </div>

        {/* Username */}
        <div style={{
          position: 'absolute', bottom: 14, left: 10,
          fontFamily: PJS, fontSize: 9, color: C.text, fontWeight: 600,
        }}>
          @seu_casal · contando o tempo juntos 🥰
        </div>
      </motion.div>

      {/* Stats */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 32, marginTop: 32,
      }}>
        {[
          { num: '+2.800', label: 'casais felizes' },
          { num: '5 min', label: 'para criar' },
          { num: '100%', label: 'personalizado' },
        ].map(({ num, label }, i) => (
          <motion.div key={label} {...fadeUp(0.05 * i + 0.2)} style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: PJS, fontWeight: 800, fontSize: 20, color: C.primary, margin: 0 }}>{num}</p>
            <p style={{ fontFamily: PJS, fontWeight: 400, fontSize: 11, color: C.muted, margin: '2px 0 0' }}>{label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div {...fadeUp(0.35)} style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
        <PrimaryBtn onClick={onCta}>Criar minha carta →</PrimaryBtn>
      </motion.div>
    </section>
  )
}

// ── Seção 3: Como funciona ────────────────────────────────────────────────────
const STEPS = [
  {
    num: '1',
    icon: '✍️',
    title: 'Crie a sua carta',
    desc: 'Escreva a mensagem, escolha as fotos e adicione a música especial de vocês.',
  },
  {
    num: '2',
    icon: '💳',
    title: 'Faça o pagamento',
    desc: 'Pagamento único, sem mensalidade. Acesso por 1 ano.',
  },
  {
    num: '3',
    icon: '🎁',
    title: 'Surpreenda',
    desc: 'Envie o link ou imprima o QR Code num cartão físico. Eles jamais vão esquecer.',
  },
]

function HowItWorksSection() {
  return (
    <section style={{ background: C.bg, padding: '64px 24px' }}>
      <motion.p {...fadeUp(0)} style={{
        fontFamily: PJS, fontWeight: 600, fontSize: 11,
        letterSpacing: '0.14em', color: C.primary,
        textTransform: 'uppercase', textAlign: 'center', margin: '0 0 10px',
      }}>
        Simples assim
      </motion.p>

      <motion.h2 {...fadeUp(0.08)} style={{
        fontFamily: PJS, fontWeight: 800,
        fontSize: 'clamp(22px, 6vw, 28px)',
        color: C.text, textAlign: 'center', margin: 0,
      }}>
        Como funciona?
      </motion.h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 40 }}>
        {STEPS.map((step, i) => (
          <motion.div
            key={i}
            {...fadeUp(i * 0.12 + 0.1)}
            style={{
              background: C.card, border: `1px solid ${C.cardBorder}`,
              borderRadius: 18, padding: '24px 20px',
              display: 'flex', alignItems: 'flex-start', gap: 16,
            }}
          >
            {/* Número */}
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: C.accentLight, border: `2px solid ${C.accent}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontFamily: PJS, fontWeight: 800, fontSize: 16, color: C.primary }}>
                {step.num}
              </span>
            </div>

            <div>
              <p style={{
                fontFamily: PJS, fontWeight: 700, fontSize: 16,
                color: C.text, margin: '0 0 6px',
              }}>
                {step.icon} {step.title}
              </p>
              <p style={{
                fontFamily: PJS, fontWeight: 400, fontSize: 13,
                color: C.muted, lineHeight: 1.6, margin: 0,
              }}>
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ── Seção 4: O que está incluído ──────────────────────────────────────────────
const FEATURES = [
  '5 fotos com legendas personalizadas',
  'Carta escrita por você',
  'Música do YouTube integrada',
  'Contador ao vivo do relacionamento',
  'Link para compartilhar',
  'Acesso por 1 ano',
]

function FeaturesSection({ onCta }) {
  return (
    <section style={{ background: C.bgAlt, padding: '64px 24px' }}>
      <motion.h2 {...fadeUp(0)} style={{
        fontFamily: PJS, fontWeight: 800,
        fontSize: 'clamp(22px, 6vw, 28px)',
        color: C.text, textAlign: 'center', margin: '0 0 32px',
      }}>
        O que está incluído
      </motion.h2>

      <motion.div
        {...fadeUp(0.1)}
        style={{
          background: C.card, border: `1px solid ${C.cardBorder}`,
          borderRadius: 20, padding: '28px 24px',
        }}
      >
        {FEATURES.map((feat, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            paddingBottom: i < FEATURES.length - 1 ? 16 : 0,
            marginBottom: i < FEATURES.length - 1 ? 16 : 0,
            borderBottom: i < FEATURES.length - 1 ? `1px solid ${C.cardBorder}` : 'none',
          }}>
            <div style={{
              width: 24, height: 24, borderRadius: '50%',
              background: C.accentLight, border: `1.5px solid ${C.primary}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ color: C.primary, fontSize: 12, fontWeight: 700 }}>✓</span>
            </div>
            <span style={{ fontFamily: PJS, fontWeight: 600, fontSize: 14, color: C.text }}>
              {feat}
            </span>
          </div>
        ))}
      </motion.div>

      <motion.div {...fadeUp(0.2)} style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
        <PrimaryBtn onClick={onCta}>Quero criar agora →</PrimaryBtn>
      </motion.div>
    </section>
  )
}

// ── Seção 5: Preço ────────────────────────────────────────────────────────────
function PricingSection({ onCta }) {
  return (
    <section style={{ background: C.bg, padding: '64px 24px' }}>
      <motion.h2 {...fadeUp(0)} style={{
        fontFamily: PJS, fontWeight: 800,
        fontSize: 'clamp(22px, 6vw, 28px)',
        color: C.text, textAlign: 'center', margin: '0 0 32px',
      }}>
        Preço
      </motion.h2>

      <motion.div
        {...fadeUp(0.1)}
        style={{
          background: C.card,
          border: `2px solid ${C.accent}`,
          borderRadius: 24, overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(194,24,91,0.12)',
        }}
      >
        {/* Badge */}
        <div style={{
          background: C.primary, padding: '10px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <span style={{ fontSize: 14 }}>★</span>
          <span style={{ fontFamily: PJS, fontWeight: 700, fontSize: 13, color: '#fff', letterSpacing: '0.08em' }}>
            MAIS POPULAR
          </span>
        </div>

        {/* Preço */}
        <div style={{ padding: '28px 24px 20px', borderBottom: `1px solid ${C.cardBorder}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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

        {/* Features */}
        <div style={{ padding: '20px 24px 28px' }}>
          {FEATURES.map((feat, i) => (
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
            Criar minha carta
          </PrimaryBtn>
        </div>
      </motion.div>
    </section>
  )
}

// ── Seção 6: FAQ ──────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'O que é a LoveStory?',
    a: 'LoveStory é uma plataforma que permite criar páginas personalizadas de presente para casais. Você adiciona fotos, uma carta especial, a música de vocês e um contador ao vivo do relacionamento.',
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
    <div
      style={{
        borderBottom: `1px solid ${C.cardBorder}`,
        paddingBottom: 0,
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 0', textAlign: 'left', gap: 12,
        }}
      >
        <span style={{ fontFamily: PJS, fontWeight: 700, fontSize: 15, color: C.text }}>
          {q}
        </span>
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
    <section style={{ background: C.bgAlt, padding: '64px 24px' }}>
      <motion.h2 {...fadeUp(0)} style={{
        fontFamily: PJS, fontWeight: 800,
        fontSize: 'clamp(22px, 6vw, 28px)',
        color: C.text, textAlign: 'center', margin: '0 0 32px',
      }}>
        Perguntas frequentes
      </motion.h2>

      <motion.div
        {...fadeUp(0.1)}
        style={{
          background: C.card, border: `1px solid ${C.cardBorder}`,
          borderRadius: 20, padding: '0 20px',
        }}
      >
        {FAQS.map(({ q, a }) => (
          <FaqItem key={q} q={q} a={a} />
        ))}
      </motion.div>
    </section>
  )
}

// ── Seção 7: CTA Final ────────────────────────────────────────────────────────
function CtaFinalSection({ onCta, onLogin }) {
  return (
    <section style={{
      ...paperStyle,
      position: 'relative',
      padding: '64px 24px 72px',
      overflow: 'hidden',
    }}>
      <PaperTexture />

      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center',
      }}>
        {/* QR code decorativo */}
        <motion.div
          {...fadeUp(0)}
          style={{
            width: 140, height: 140,
            background: '#fff', borderRadius: 16, padding: 10,
            boxShadow: `0 0 0 4px ${C.accent}, 0 8px 32px rgba(194,24,91,0.20)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 28,
          }}
        >
          <QrCodeSVG size={112} />
        </motion.div>

        <motion.h2
          {...fadeUp(0.1)}
          style={{
            fontFamily: PJS, fontWeight: 800,
            fontSize: 'clamp(22px, 6vw, 28px)',
            color: C.text, margin: 0, lineHeight: 1.2,
          }}
        >
          Vamos fazer um presente surpresa para o seu amor?
        </motion.h2>

        <motion.p
          {...fadeUp(0.18)}
          style={{
            fontFamily: PJS, fontWeight: 400, fontSize: 14,
            color: C.muted, lineHeight: 1.6,
            maxWidth: 280, marginTop: 12,
          }}
        >
          Demora menos de 5 minutos. É sério.
        </motion.p>

        <motion.div {...fadeUp(0.26)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginTop: 28 }}>
          <PrimaryBtn onClick={onCta}>
            Criar minha carta agora ♥
          </PrimaryBtn>

          <button
            onClick={onLogin}
            style={{
              padding: '8px 0',
              fontFamily: PJS, fontWeight: 500, fontSize: 13,
              color: C.primary, background: 'transparent',
              border: 'none', cursor: 'pointer',
              textDecoration: 'underline', textUnderlineOffset: 3,
            }}
          >
            Já tem conta? Entrar
          </button>
        </motion.div>

        <motion.p
          {...fadeUp(0.38)}
          style={{
            fontFamily: PJS, fontWeight: 400, fontSize: 11,
            color: '#a08060', marginTop: 52,
          }}
        >
          LoveStory — feito com ♥
        </motion.p>
      </div>
    </section>
  )
}

// ── QR Code SVG decorativo ────────────────────────────────────────────────────
function QrCodeSVG({ size = 90 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Canto superior esquerdo */}
      <rect x="4"  y="4"  width="28" height="28" rx="4" stroke="#3E2723" strokeWidth="4" fill="none" />
      <rect x="12" y="12" width="12" height="12" rx="2" fill="#C2185B" />
      {/* Canto superior direito */}
      <rect x="58" y="4"  width="28" height="28" rx="4" stroke="#3E2723" strokeWidth="4" fill="none" />
      <rect x="66" y="12" width="12" height="12" rx="2" fill="#C2185B" />
      {/* Canto inferior esquerdo */}
      <rect x="4"  y="58" width="28" height="28" rx="4" stroke="#3E2723" strokeWidth="4" fill="none" />
      <rect x="12" y="66" width="12" height="12" rx="2" fill="#C2185B" />
      {/* Dados do meio — padrão decorativo */}
      <rect x="40" y="4"  width="6"  height="6"  rx="1" fill="#3E2723" />
      <rect x="50" y="4"  width="6"  height="6"  rx="1" fill="#3E2723" />
      <rect x="40" y="14" width="6"  height="6"  rx="1" fill="#C2185B" />
      <rect x="40" y="24" width="6"  height="6"  rx="1" fill="#3E2723" />
      <rect x="50" y="18" width="6"  height="6"  rx="1" fill="#3E2723" />
      <rect x="50" y="28" width="6"  height="6"  rx="1" fill="#C2185B" />
      <rect x="4"  y="40" width="6"  height="6"  rx="1" fill="#3E2723" />
      <rect x="14" y="40" width="6"  height="6"  rx="1" fill="#C2185B" />
      <rect x="24" y="40" width="6"  height="6"  rx="1" fill="#3E2723" />
      <rect x="4"  y="50" width="6"  height="6"  rx="1" fill="#C2185B" />
      <rect x="18" y="50" width="6"  height="6"  rx="1" fill="#3E2723" />
      <rect x="28" y="50" width="6"  height="6"  rx="1" fill="#3E2723" />
      <rect x="40" y="40" width="6"  height="6"  rx="1" fill="#3E2723" />
      <rect x="50" y="40" width="6"  height="6"  rx="1" fill="#C2185B" />
      <rect x="60" y="40" width="6"  height="6"  rx="1" fill="#3E2723" />
      <rect x="70" y="40" width="6"  height="6"  rx="1" fill="#C2185B" />
      <rect x="80" y="40" width="6"  height="6"  rx="1" fill="#3E2723" />
      <rect x="40" y="50" width="6"  height="6"  rx="1" fill="#C2185B" />
      <rect x="54" y="50" width="6"  height="6"  rx="1" fill="#3E2723" />
      <rect x="68" y="50" width="6"  height="6"  rx="1" fill="#3E2723" />
      <rect x="80" y="50" width="6"  height="6"  rx="1" fill="#C2185B" />
      <rect x="58" y="58" width="6"  height="6"  rx="1" fill="#3E2723" />
      <rect x="68" y="58" width="6"  height="6"  rx="1" fill="#C2185B" />
      <rect x="58" y="68" width="6"  height="6"  rx="1" fill="#C2185B" />
      <rect x="72" y="68" width="6"  height="6"  rx="1" fill="#3E2723" />
      <rect x="80" y="62" width="6"  height="6"  rx="1" fill="#3E2723" />
      <rect x="58" y="78" width="6"  height="6"  rx="1" fill="#3E2723" />
      <rect x="68" y="78" width="6"  height="6"  rx="1" fill="#C2185B" />
      <rect x="80" y="74" width="6"  height="6"  rx="1" fill="#C2185B" />
      {/* Coração central */}
      <text x="45" y="67" textAnchor="middle" fontSize="14" fill="#C2185B">♥</text>
    </svg>
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
      <ViralSection
        onCta={() => navigate('/criar')}
      />
      <HowItWorksSection />
      <FeaturesSection
        onCta={() => navigate('/criar')}
      />
      <PricingSection
        onCta={() => navigate('/criar')}
      />
      <FaqSection />
      <CtaFinalSection
        onCta={() => navigate('/criar')}
        onLogin={() => navigate('/login')}
      />
    </>
  )
}
