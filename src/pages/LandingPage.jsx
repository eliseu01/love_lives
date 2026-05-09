import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useEdition } from '../contexts/EditionContext'

const PJS = "'Plus Jakarta Sans', sans-serif"
const DS  = "'Playfair Display', Georgia, serif"

const C = {
  pink:       '#E91E63',
  pinkDark:   '#C2185B',
  pinkMid:    '#F48FB1',
  pinkLight:  '#FCE4EC',
  cream:      '#FFF5F8',
  white:      '#FFFFFF',
  ink:        '#1A0A10',
  body:       '#4A2030',
  muted:      '#9E6070',
  bgAlt:      '#FFF0F3',
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: 'easeOut', delay },
})

function Btn({ children, onClick, style = {}, full = false }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '18px 36px',
        fontFamily: PJS,
        fontWeight: 800,
        fontSize: 17,
        color: '#fff',
        background: C.pink,
        border: 'none',
        borderRadius: 50,
        cursor: 'pointer',
        boxShadow: '0 6px 24px rgba(233,30,99,.40)',
        width: full ? '100%' : 'auto',
        minHeight: 56,
        letterSpacing: '.01em',
        ...style,
      }}
    >
      {children}
    </motion.button>
  )
}

// ── Phone mockup ──────────────────────────────────────────────────────────────
function PhoneMockup() {
  return (
    <motion.div
      animate={{ y: [0, -7, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      style={{ position: 'relative', flexShrink: 0 }}
    >
      <div style={{
        position: 'absolute', top: -12, right: -14, zIndex: 2,
        background: C.pink, color: '#fff',
        fontFamily: PJS, fontSize: 11, fontWeight: 800,
        padding: '6px 14px', borderRadius: 50,
        boxShadow: '0 4px 14px rgba(233,30,99,.45)',
        whiteSpace: 'nowrap',
      }}>
        Presente ativo ✨
      </div>

      <div style={{
        width: 164,
        background: '#16060c',
        borderRadius: 36,
        padding: 10,
        boxShadow: '0 24px 64px rgba(0,0,0,.36), 0 0 0 2px #2a1218',
      }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', top: 6, left: '50%',
            transform: 'translateX(-50%)',
            width: 56, height: 5,
            background: '#2a1218', borderRadius: 3, zIndex: 2,
          }} />
        </div>

        <div style={{
          background: `linear-gradient(180deg, ${C.cream} 0%, ${C.white} 100%)`,
          borderRadius: 28,
          overflow: 'hidden',
          paddingTop: 24,
        }}>
          <div style={{ padding: '8px 12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <motion.div
              animate={{ scale: [1, 1.18, 1] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              style={{ textAlign: 'center', fontSize: 28 }}
            >
              ❤️
            </motion.div>

            <p style={{
              fontFamily: DS, fontStyle: 'italic',
              fontSize: 13, fontWeight: 700,
              color: C.ink, textAlign: 'center', margin: 0, lineHeight: 1.3,
            }}>
              Para você, meu amor 💕
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
              {[
                `linear-gradient(135deg, ${C.pinkLight}, ${C.pink})`,
                `linear-gradient(135deg, ${C.pinkMid}, ${C.pinkLight})`,
              ].map((bg, i) => (
                <div key={i} style={{
                  aspectRatio: '1', borderRadius: 8,
                  background: bg,
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 18,
                }}>📸</div>
              ))}
            </div>

            <div style={{
              background: C.pink, borderRadius: 8,
              padding: '7px 8px', textAlign: 'center',
            }}>
              <p style={{ fontFamily: PJS, fontSize: 8, fontWeight: 600, color: 'rgba(255,255,255,.8)', margin: 0, textTransform: 'uppercase', letterSpacing: '.08em' }}>
                Juntos há
              </p>
              <p style={{ fontFamily: PJS, fontSize: 11, fontWeight: 800, color: '#fff', margin: '2px 0 0' }}>
                365 dias · 14h · 22min
              </p>
            </div>

            <div style={{
              background: `${C.pink}18`,
              borderRadius: 8, padding: '7px 8px',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ fontSize: 14 }}>🎵</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: PJS, fontSize: 8, fontWeight: 800, color: C.ink, margin: 0 }}>
                  Perfect — Ed Sheeran
                </p>
                <div style={{ height: 2, background: C.pinkLight, borderRadius: 1, marginTop: 3, overflow: 'hidden' }}>
                  <motion.div
                    animate={{ width: ['30%', '70%', '30%'] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    style={{ height: '100%', background: C.pink, borderRadius: 1 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── §1 Hero ───────────────────────────────────────────────────────────────────
function HeroSection({ onCta }) {
  const { copy } = useEdition()
  return (
    <section style={{ background: `linear-gradient(150deg, ${C.cream} 0%, ${C.white} 55%, ${C.pinkLight} 100%)`, padding: '52px 24px 64px', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', width: 500, height: 500,
        right: '-30%', top: '-20%',
        background: `radial-gradient(circle, rgba(233,30,99,.06) 0%, transparent 70%)`,
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: C.white,
          border: `2px solid ${C.pinkMid}`,
          borderRadius: 50, padding: '8px 20px',
          marginBottom: 22,
          boxShadow: '0 2px 16px rgba(233,30,99,.13)',
        }}
      >
        <motion.div
          animate={{ opacity: [1, .25, 1] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          style={{ width: 8, height: 8, borderRadius: '50%', background: C.pink }}
        />
        <span style={{ fontFamily: PJS, fontWeight: 800, fontSize: 14, color: C.pinkDark }}>
          ❤️ {copy.landing?.socialProof ?? '+1.800 presentes criados'}
        </span>
      </motion.div>

      {/* Headline + mockup */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: DS,
              fontSize: 'clamp(28px, 8vw, 40px)',
              fontWeight: 900,
              color: C.ink,
              lineHeight: 1.15,
              margin: '0 0 6px',
            }}
          >
            Surpreenda quem você ama com um{' '}
            <em style={{ color: C.pink, fontStyle: 'italic' }}>presente único</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontFamily: PJS, fontSize: 14,
              color: C.muted, lineHeight: 1.65,
              margin: '0 0 24px',
            }}
          >
            Fotos, carta exclusiva e a música de vocês. Pronto em 5 minutos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
          >
            <Btn onClick={onCta} full style={{ fontSize: 16, padding: '17px 24px' }}>
              {copy.landing?.heroCtaPrimary ?? 'Criar meu presente agora ❤️'}
            </Btn>
            <p style={{ fontFamily: PJS, fontSize: 12, color: C.muted, textAlign: 'center', margin: 0 }}>
              <strong style={{ color: C.body }}>Pagamento único de R$ 24,90</strong> · Sem mensalidade
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  )
}

// ── §2 Trust bar ──────────────────────────────────────────────────────────────
function TrustBar() {
  const items = [
    { icon: '🔒', text: 'Pagamento seguro' },
    { icon: '⚡', text: 'Pronto em 5 min' },
    { icon: '💝', text: '+1.800 presentes' },
    { icon: '⭐', text: '4.9/5 avaliação' },
  ]
  return (
    <div style={{ background: `linear-gradient(135deg, ${C.pinkDark}, ${C.pink})`, padding: '13px 0' }}>
      <div style={{
        display: 'flex', gap: 24, alignItems: 'center',
        overflowX: 'auto', scrollbarWidth: 'none',
        padding: '0 20px', whiteSpace: 'nowrap',
        WebkitOverflowScrolling: 'touch',
      }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
            {i > 0 && <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,.3)', marginRight: 4 }} />}
            <span style={{ fontSize: 15 }}>{item.icon}</span>
            <span style={{ fontFamily: PJS, fontWeight: 700, fontSize: 13, color: '#fff' }}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── §3 Features ───────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: '📸', title: 'Suas fotos com legendas', desc: 'Adicione as melhores fotos de vocês com mensagens especiais' },
  { icon: '💌', title: 'Carta exclusiva', desc: 'Escreva a mensagem que vai fazer chorar de emoção' },
  { icon: '🎵', title: 'Música de vocês', desc: 'A trilha sonora do amor de vocês tocando no presente' },
  { icon: '⏱️', title: 'Contador ao vivo', desc: 'Dias, horas e minutos juntos em tempo real' },
  { icon: '🔗', title: 'Link + QR Code', desc: 'Compartilhe pelo WhatsApp ou imprima o QR Code no cartão' },
]

function FeaturesSection({ onCta }) {
  return (
    <section style={{ background: C.cream, padding: '72px 24px' }}>
      <motion.div {...fadeUp(0)} style={{ marginBottom: 4 }}>
        <span style={{
          display: 'inline-block',
          background: C.pinkLight, color: C.pinkDark,
          fontFamily: PJS, fontSize: 11, fontWeight: 800,
          letterSpacing: '.1em', textTransform: 'uppercase',
          padding: '5px 16px', borderRadius: 50,
        }}>
          O que está incluso
        </span>
      </motion.div>

      <motion.h2 {...fadeUp(0.08)} style={{
        fontFamily: DS, fontWeight: 900,
        fontSize: 'clamp(26px, 7vw, 36px)',
        color: C.ink, margin: '10px 0 6px', lineHeight: 1.2,
      }}>
        Tudo que um presente perfeito precisa ter
      </motion.h2>

      <motion.p {...fadeUp(0.12)} style={{
        fontFamily: PJS, fontSize: 14, color: C.muted,
        lineHeight: 1.65, margin: '0 0 36px',
      }}>
        Cada detalhe pensado para criar uma experiência inesquecível
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {FEATURES.map((f, i) => (
          <motion.div
            key={i}
            {...fadeUp(i * 0.07 + 0.1)}
            whileHover={{ y: -4, boxShadow: '0 8px 28px rgba(233,30,99,.14)' }}
            style={{
              background: C.white,
              border: `1.5px solid ${C.pinkLight}`,
              borderRadius: 16, padding: '20px 16px',
              gridColumn: i === 4 ? '1 / -1' : 'auto',
              cursor: 'default',
              transition: 'border-color .2s',
            }}
          >
            <span style={{ fontSize: 30, display: 'block', marginBottom: 10 }}>{f.icon}</span>
            <p style={{ fontFamily: PJS, fontWeight: 800, fontSize: 14, color: C.ink, margin: '0 0 5px', lineHeight: 1.3 }}>
              {f.title}
            </p>
            <p style={{ fontFamily: PJS, fontSize: 12, color: C.muted, lineHeight: 1.55, margin: 0 }}>
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div {...fadeUp(0.4)} style={{ display: 'flex', justifyContent: 'center', marginTop: 36 }}>
        <Btn onClick={onCta}>Quero criar o meu agora →</Btn>
      </motion.div>
    </section>
  )
}

// ── §4 Como funciona ──────────────────────────────────────────────────────────
const STEPS = [
  { num: '1', icon: '📤', title: 'Escolha as fotos e escreva a carta', desc: 'Selecione as melhores fotos de vocês e escreva a mensagem do coração' },
  { num: '2', icon: '🎨', title: 'Personalize com a música e o estilo', desc: 'Adicione a música do casal e o toque final perfeito' },
  { num: '3', icon: '🎁', title: 'Envie o link e surpreenda ❤️', desc: 'Mande pelo WhatsApp ou imprima o QR Code — e prepare o lenço!' },
]

function HowSection({ onCta }) {
  return (
    <section style={{ background: C.white, padding: '72px 24px' }}>
      <motion.div {...fadeUp(0)} style={{ marginBottom: 4 }}>
        <span style={{
          display: 'inline-block',
          background: C.pinkLight, color: C.pinkDark,
          fontFamily: PJS, fontSize: 11, fontWeight: 800,
          letterSpacing: '.1em', textTransform: 'uppercase',
          padding: '5px 16px', borderRadius: 50,
        }}>
          Super fácil
        </span>
      </motion.div>

      <motion.h2 {...fadeUp(0.08)} style={{
        fontFamily: DS, fontWeight: 900,
        fontSize: 'clamp(26px, 7vw, 36px)',
        color: C.ink, margin: '10px 0 6px', lineHeight: 1.2,
      }}>
        3 passos e o presente está pronto
      </motion.h2>

      <motion.p {...fadeUp(0.12)} style={{
        fontFamily: PJS, fontSize: 14, color: C.muted,
        lineHeight: 1.65, margin: '0 0 40px',
      }}>
        Sem precisar de nenhum conhecimento técnico
      </motion.p>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {/* Linha vertical */}
        <div style={{
          position: 'absolute', left: 27, top: 52, bottom: 52,
          width: 2,
          background: `linear-gradient(180deg, ${C.pinkMid}, ${C.pink}, ${C.pinkMid})`,
        }} />

        {STEPS.map((step, i) => (
          <motion.div
            key={i}
            {...fadeUp(i * 0.12 + 0.1)}
            style={{ display: 'flex', gap: 18, alignItems: 'flex-start', padding: '20px 0', position: 'relative' }}
          >
            <div style={{
              width: 56, height: 56, minWidth: 56,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${C.pink}, ${C.pinkDark})`,
              color: '#fff',
              fontFamily: DS, fontSize: 22, fontWeight: 900,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 18px rgba(233,30,99,.38)',
              position: 'relative', zIndex: 1,
            }}>
              {step.num}
            </div>
            <div style={{ paddingTop: 6 }}>
              <p style={{ fontSize: 22, margin: '0 0 4px' }}>{step.icon}</p>
              <p style={{ fontFamily: PJS, fontWeight: 800, fontSize: 16, color: C.ink, margin: '0 0 4px' }}>
                {step.title}
              </p>
              <p style={{ fontFamily: PJS, fontSize: 13, color: C.muted, lineHeight: 1.55, margin: 0 }}>
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div {...fadeUp(0.5)} style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
        <Btn onClick={onCta}>Começar agora →</Btn>
      </motion.div>
    </section>
  )
}

// ── §5 Depoimentos ────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { av: 'MC', avBg: '#e91e8c', name: 'Mariana Costa', role: 'São Paulo, SP', stars: 5, text: 'Meu namorado chorou quando abriu. Melhor presente que já dei na vida! Fiz em menos de 10 minutos e ficou lindo demais.' },
  { av: 'JP', avBg: C.pinkDark, name: 'João Pereira', role: 'Belo Horizonte, MG', stars: 5, text: 'Dei de aniversário de namoro. Ela amou cada detalhe, principalmente a carta e a música. Ficou emocionada.' },
  { av: 'AS', avBg: '#ad1457', name: 'Ana Silva', role: 'Rio de Janeiro, RJ', stars: 5, text: 'Já comprei 3 vezes — pro namorado, pra melhor amiga e pra minha mãe. Todo mundo ama!' },
]

function TestimonialsSection() {
  return (
    <section style={{ background: C.pinkLight, padding: '72px 24px' }}>
      <motion.div {...fadeUp(0)} style={{ marginBottom: 4, textAlign: 'center' }}>
        <span style={{
          display: 'inline-block',
          background: `${C.pink}20`, color: C.pinkDark,
          fontFamily: PJS, fontSize: 11, fontWeight: 800,
          letterSpacing: '.1em', textTransform: 'uppercase',
          padding: '5px 16px', borderRadius: 50,
        }}>
          Depoimentos reais
        </span>
      </motion.div>

      <motion.h2 {...fadeUp(0.08)} style={{
        fontFamily: DS, fontWeight: 900,
        fontSize: 'clamp(26px, 7vw, 36px)',
        color: C.ink, margin: '10px 0 6px', lineHeight: 1.2, textAlign: 'center',
      }}>
        Quem usou, amou
      </motion.h2>

      <motion.p {...fadeUp(0.12)} style={{
        fontFamily: PJS, fontSize: 14, color: C.muted,
        lineHeight: 1.65, margin: '0 0 36px', textAlign: 'center',
      }}>
        Mais de 1.800 casais já criaram memórias inesquecíveis
      </motion.p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            {...fadeUp(i * 0.1 + 0.1)}
            style={{
              background: C.white, borderRadius: 18,
              padding: '22px 20px',
              boxShadow: '0 4px 20px rgba(233,30,99,.10)',
            }}
          >
            <div style={{ color: '#FFB300', fontSize: 14, letterSpacing: 2, marginBottom: 12 }}>
              {'⭐'.repeat(t.stars)}
            </div>
            <p style={{
              fontFamily: PJS, fontSize: 14,
              color: C.body, lineHeight: 1.65,
              fontStyle: 'italic', margin: '0 0 18px',
            }}>
              "{t.text}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 42, height: 42, borderRadius: '50%',
                background: t.avBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontFamily: PJS, fontWeight: 800, fontSize: 14, color: '#fff' }}>{t.av}</span>
              </div>
              <div>
                <p style={{ fontFamily: PJS, fontWeight: 800, fontSize: 14, color: C.ink, margin: 0 }}>{t.name}</p>
                <p style={{ fontFamily: PJS, fontSize: 12, color: C.muted, margin: 0 }}>{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ── §6 Preço ──────────────────────────────────────────────────────────────────
const PRICE_ITEMS = [
  { icon: '📸', name: 'Fotos personalizadas', val: 'R$ 29,90' },
  { icon: '💌', name: 'Carta exclusiva',       val: 'R$ 19,90' },
  { icon: '🎵', name: 'Música do casal',       val: 'R$ 14,90' },
  { icon: '⏱️', name: 'Contador ao vivo',      val: 'R$  9,90' },
  { icon: '🔗', name: 'Link + QR Code',        val: 'R$  9,90' },
]

function PricingSection({ onCta }) {
  return (
    <section style={{ background: C.white, padding: '72px 24px' }}>
      <motion.div {...fadeUp(0)} style={{ marginBottom: 4, textAlign: 'center' }}>
        <span style={{
          display: 'inline-block',
          background: C.pinkLight, color: C.pinkDark,
          fontFamily: PJS, fontSize: 11, fontWeight: 800,
          letterSpacing: '.1em', textTransform: 'uppercase',
          padding: '5px 16px', borderRadius: 50,
        }}>
          Preço justo
        </span>
      </motion.div>

      <motion.h2 {...fadeUp(0.08)} style={{
        fontFamily: DS, fontWeight: 900,
        fontSize: 'clamp(26px, 7vw, 36px)',
        color: C.ink, margin: '10px 0 40px', lineHeight: 1.2, textAlign: 'center',
      }}>
        Tudo isso por muito menos do que você imagina
      </motion.h2>

      <motion.div
        {...fadeUp(0.1)}
        style={{
          background: C.white,
          border: `2.5px solid ${C.pink}`,
          borderRadius: 24,
          padding: '44px 24px 28px',
          position: 'relative',
          boxShadow: '0 8px 36px rgba(233,30,99,.22)',
        }}
      >
        <div style={{
          position: 'absolute', top: -17, left: '50%',
          transform: 'translateX(-50%)',
          background: `linear-gradient(135deg, ${C.pink}, ${C.pinkDark})`,
          color: '#fff', fontFamily: PJS,
          fontSize: 11, fontWeight: 900,
          letterSpacing: '.14em', textTransform: 'uppercase',
          padding: '6px 22px', borderRadius: 50,
          whiteSpace: 'nowrap',
        }}>
          ⭐ MAIS POPULAR
        </div>

        {/* Itens riscados */}
        <div style={{ marginBottom: 16 }}>
          {PRICE_ITEMS.map((item, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 0',
              borderBottom: i < PRICE_ITEMS.length - 1 ? `1px dashed ${C.pinkLight}` : 'none',
            }}>
              <span style={{ fontFamily: PJS, fontSize: 14, color: C.body, display: 'flex', alignItems: 'center', gap: 8 }}>
                {item.icon} {item.name}
              </span>
              <span style={{ fontFamily: PJS, fontSize: 14, fontWeight: 700, color: C.muted, textDecoration: 'line-through' }}>
                {item.val}
              </span>
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between',
          paddingTop: 12,
          borderTop: `2px solid ${C.pinkLight}`,
          fontFamily: PJS, fontWeight: 700, color: C.muted,
          fontSize: 14, marginBottom: 20,
        }}>
          <span>Total separado</span>
          <span style={{ textDecoration: 'line-through' }}>R$ 84,50</span>
        </div>

        {/* Linha divisória */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '0 0 20px' }}>
          <div style={{ flex: 1, height: 1, background: C.pinkLight }} />
          <span style={{ fontFamily: PJS, fontSize: 12, fontWeight: 700, color: C.muted, whiteSpace: 'nowrap' }}>
            Você paga apenas
          </span>
          <div style={{ flex: 1, height: 1, background: C.pinkLight }} />
        </div>

        {/* Preço final */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <p style={{ fontFamily: PJS, fontSize: 14, color: C.muted, margin: '0 0 2px' }}>Pagamento único</p>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4 }}>
            <span style={{ fontFamily: PJS, fontWeight: 400, fontSize: 20, color: C.pink }}>R$</span>
            <span style={{ fontFamily: DS, fontWeight: 900, fontSize: 64, color: C.pink, lineHeight: 1 }}>24</span>
            <span style={{ fontFamily: DS, fontWeight: 700, fontSize: 28, color: C.pink }}>,90</span>
          </div>
          <p style={{ fontFamily: PJS, fontSize: 13, color: C.muted, margin: '6px 0 0' }}>
            Acesso por 1 ano · Sem mensalidade · Sem pegadinha
          </p>
        </div>

        <Btn onClick={onCta} full style={{ fontSize: 16, padding: '19px 24px' }}>
          Criar minha carta agora ❤️
        </Btn>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 16 }}>
          {['✅ Garantia de satisfação', '💳 Pagamento via Pix', '🔒 Dados protegidos'].map(txt => (
            <span key={txt} style={{ fontFamily: PJS, fontSize: 12, color: C.muted }}>{txt}</span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// ── §7 Urgência ───────────────────────────────────────────────────────────────
function UrgencySection({ onCta }) {
  return (
    <section style={{
      background: `linear-gradient(135deg, #ad1457, ${C.pinkDark})`,
      padding: '48px 24px', textAlign: 'center',
    }}>
      <motion.div {...fadeUp(0)} style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        color: 'rgba(255,255,255,.88)', fontFamily: PJS,
        fontSize: 13, fontWeight: 700, marginBottom: 14,
      }}>
        <motion.div
          animate={{ opacity: [1, .2, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          style={{ width: 9, height: 9, borderRadius: '50%', background: '#69F0AE' }}
        />
        🔥 Mais de 30 pessoas estão criando agora
      </motion.div>

      <motion.h2 {...fadeUp(0.08)} style={{
        fontFamily: DS, fontWeight: 700,
        fontSize: 'clamp(22px, 6vw, 32px)',
        color: '#fff', lineHeight: 1.25, margin: '0 0 12px',
      }}>
        Dia dos Namorados está chegando — garanta o presente perfeito
      </motion.h2>

      <motion.p {...fadeUp(0.14)} style={{
        fontFamily: PJS, fontSize: 14,
        color: 'rgba(255,255,255,.82)',
        lineHeight: 1.65, margin: '0 0 28px',
      }}>
        Não deixe pra última hora. Crie agora em 5 minutos.
      </motion.p>

      <motion.div {...fadeUp(0.2)}>
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={onCta}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', color: C.pinkDark,
            fontFamily: PJS, fontSize: 16, fontWeight: 800,
            padding: '17px 40px', borderRadius: 50,
            border: 'none', cursor: 'pointer',
            boxShadow: '0 6px 24px rgba(0,0,0,.2)',
            minHeight: 56,
          }}
        >
          Criar presente agora →
        </motion.button>
      </motion.div>
    </section>
  )
}

// ── §8 FAQ ────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: 'O que é a LoveStory?', a: 'LoveStory é uma plataforma para criar presentes digitais personalizados. Você cria uma página única com fotos, carta, a música do casal e um contador ao vivo — depois compartilha o link por WhatsApp ou imprime o QR Code.' },
  { q: 'Como a pessoa recebe o presente?', a: 'Depois de criar, você recebe um link único e um QR Code. Basta mandar o link pelo WhatsApp ou Instagram — a pessoa clica e abre o presente no celular, sem precisar baixar nenhum app.' },
  { q: 'Preciso pagar mensalidade?', a: 'Não! É um pagamento único de R$ 24,90. Seu presente fica ativo por 1 ano, sem nenhuma cobrança adicional.' },
  { q: 'Posso editar depois de criar?', a: 'Sim! Você pode editar as fotos, a carta e a música a qualquer momento. As alterações aparecem na mesma URL, sem precisar reenviar o link.' },
  { q: 'Em quanto tempo fica pronto?', a: 'Em menos de 5 minutos! Você preenche as informações, faz o pagamento e o link é gerado na hora.' },
  { q: 'E se eu não gostar do resultado?', a: 'Temos garantia de satisfação. Se você não ficar satisfeita com o resultado, entre em contato pelo Instagram @lovestorybr e vamos resolver.' },
  { q: 'Funciona no celular?', a: 'Sim! Tanto para criar quanto para visualizar. A página é 100% otimizada para celular e funciona em qualquer navegador moderno.' },
  { q: 'Posso colocar quantas fotos?', a: 'Você pode adicionar várias fotos, cada uma com legenda personalizada. Recomendamos entre 4 e 8 fotos para uma experiência mais fluida e bonita.' },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      background: C.white, borderRadius: 14,
      border: `1.5px solid ${open ? C.pinkMid : C.pinkLight}`,
      overflow: 'hidden',
      transition: 'border-color .2s, box-shadow .2s',
      boxShadow: open ? '0 4px 18px rgba(233,30,99,.09)' : 'none',
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 12,
          padding: '18px 20px', textAlign: 'left',
          background: 'none', border: 'none', cursor: 'pointer',
        }}
      >
        <span style={{
          fontFamily: PJS, fontWeight: 700, fontSize: 15,
          color: open ? C.pink : C.ink, transition: 'color .2s',
          lineHeight: 1.4,
        }}>
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0, backgroundColor: open ? C.pink : C.pinkLight }}
          transition={{ duration: 0.2 }}
          style={{
            width: 28, height: 28, minWidth: 28,
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: open ? '#fff' : C.pink,
            fontSize: 18, fontWeight: 700,
          }}
        >
          +
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              fontFamily: PJS, fontSize: 14, color: C.muted,
              lineHeight: 1.65, margin: 0,
              padding: '0 20px 18px',
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
    <section style={{ background: C.cream, padding: '72px 24px' }}>
      <motion.div {...fadeUp(0)} style={{ marginBottom: 4, textAlign: 'center' }}>
        <span style={{
          display: 'inline-block',
          background: C.pinkLight, color: C.pinkDark,
          fontFamily: PJS, fontSize: 11, fontWeight: 800,
          letterSpacing: '.1em', textTransform: 'uppercase',
          padding: '5px 16px', borderRadius: 50,
        }}>
          Dúvidas
        </span>
      </motion.div>

      <motion.h2 {...fadeUp(0.08)} style={{
        fontFamily: DS, fontWeight: 900,
        fontSize: 'clamp(26px, 7vw, 36px)',
        color: C.ink, margin: '10px 0 36px', lineHeight: 1.2, textAlign: 'center',
      }}>
        Perguntas frequentes
      </motion.h2>

      <motion.div {...fadeUp(0.1)} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {FAQS.map(({ q, a }) => <FaqItem key={q} q={q} a={a} />)}
      </motion.div>
    </section>
  )
}

// ── §9 CTA Final ──────────────────────────────────────────────────────────────
function FinalCtaSection({ onCta, onLogin }) {
  return (
    <section style={{
      background: `linear-gradient(140deg, ${C.cream} 0%, ${C.pinkLight} 100%)`,
      padding: '100px 24px', textAlign: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', fontSize: 180, opacity: .04, top: -20, left: -30, transform: 'rotate(-22deg)', pointerEvents: 'none' }}>❤️</div>
      <div style={{ position: 'absolute', fontSize: 180, opacity: .04, bottom: -20, right: -30, transform: 'rotate(22deg)', pointerEvents: 'none' }}>❤️</div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        <motion.h2 {...fadeUp(0)} style={{
          fontFamily: DS, fontWeight: 900,
          fontSize: 'clamp(28px, 8vw, 44px)',
          color: C.ink, lineHeight: 1.18, margin: 0,
        }}>
          Alguém especial merece saber o{' '}
          <em style={{ color: C.pink, fontStyle: 'italic' }}>quanto importa</em>
        </motion.h2>

        <motion.p {...fadeUp(0.1)} style={{
          fontFamily: PJS, fontSize: 15, color: C.muted,
          lineHeight: 1.65, margin: 0, maxWidth: 320,
        }}>
          Crie um presente que vai ser lembrado pra sempre. Em 5 minutos.
        </motion.p>

        <motion.div {...fadeUp(0.18)} style={{ width: '100%' }}>
          <Btn onClick={onCta} full style={{ fontSize: 17, padding: '20px 24px' }}>
            Criar meu presente agora ❤️
          </Btn>
        </motion.div>

        <motion.p {...fadeUp(0.24)} style={{ fontFamily: PJS, fontSize: 13, color: C.muted, margin: 0 }}>
          R$ 24,90 · Pagamento único · Sem pegadinha
        </motion.p>

        <motion.button
          {...fadeUp(0.3)}
          onClick={onLogin}
          style={{
            fontFamily: PJS, fontSize: 13, fontWeight: 500,
            color: C.muted, background: 'none', border: 'none',
            cursor: 'pointer', textDecoration: 'underline',
            textUnderlineOffset: 3, padding: 0,
          }}
        >
          Já tem conta? Entrar
        </motion.button>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: C.ink, padding: '40px 24px 28px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center' }}>
        <p style={{ fontFamily: DS, fontSize: 24, fontWeight: 700, color: '#fff', margin: 0 }}>
          Love<span style={{ color: C.pink }}>Story</span>
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20 }}>
          {[['Termos de uso', '/termos'], ['Política de privacidade', '/privacidade'], ['Contato', 'mailto:contato@lovestorybr.com']].map(([label, href]) => (
            <a key={label} href={href} style={{ fontFamily: PJS, fontSize: 13, color: 'rgba(255,255,255,.5)' }}>{label}</a>
          ))}
        </div>
        <a href="https://instagram.com/lovestorybr" target="_blank" rel="noopener noreferrer" style={{ fontFamily: PJS, fontSize: 13, color: C.pinkMid, fontWeight: 700 }}>
          @lovestorybr
        </a>
        <p style={{ fontFamily: PJS, fontSize: 12, color: 'rgba(255,255,255,.3)', margin: 0 }}>
          Feito com <span style={{ color: C.pink }}>❤️</span> no Brasil · © 2025 LoveStory
        </p>
      </div>
    </footer>
  )
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function LandingPage() {
  const navigate = useNavigate()
  const goCriar = () => navigate('/criar')

  return (
    <div style={{ overflowX: 'hidden' }}>
      <HeroSection   onCta={goCriar} />
      <TrustBar />
      <FeaturesSection onCta={goCriar} />
      <HowSection    onCta={goCriar} />
      <TestimonialsSection />
      <PricingSection  onCta={goCriar} />
      <UrgencySection  onCta={goCriar} />
      <FaqSection />
      <FinalCtaSection onCta={goCriar} onLogin={() => navigate('/login')} />
      <Footer />
    </div>
  )
}
