import { useId } from 'react'

/* Camada de textura de papel envelhecido — usada em todas as seções */

export const paperStyle = {
  background: '#f0e6c8',
  backgroundImage: `
    radial-gradient(ellipse at 15% 25%, rgba(212,169,106,0.18) 0%, transparent 50%),
    radial-gradient(ellipse at 82% 72%, rgba(212,169,106,0.14) 0%, transparent 42%),
    radial-gradient(ellipse at 55% 15%, rgba(180,150,90,0.10) 0%, transparent 45%),
    linear-gradient(160deg, rgba(139,115,85,0.04) 0%, transparent 55%),
    linear-gradient(45deg,  rgba(160,130,90,0.03) 0%, transparent 65%)
  `,
}

const LINE = 'rgba(139,115,85,0.2)'

/* ── Lábios ─────────────────────────────────────────────────────── */
function LipsSVG({ id, rotation, top, right }) {
  return (
    <svg
      width="72" height="42"
      viewBox="0 0 110 55"
      style={{
        position: 'absolute', top, right,
        transform: `rotate(${rotation}deg)`,
        filter: 'blur(0.3px)',
        mixBlendMode: 'multiply',
        opacity: 0.78,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <defs>
        <clipPath id={id}>
          <path d="M 8,28 C 8,10 25,3 42,9 C 47,11 50,15 55,13 C 60,15 63,11 68,9 C 85,3 102,10 102,28 C 90,20 72,17 55,19 C 38,17 20,20 8,28 Z" />
          <path d="M 8,28 C 20,46 38,52 55,50 C 72,52 90,46 102,28 C 90,35 72,39 55,39 C 38,39 20,35 8,28 Z" />
        </clipPath>
      </defs>
      <path d="M 8,28 C 8,10 25,3 42,9 C 47,11 50,15 55,13 C 60,15 63,11 68,9 C 85,3 102,10 102,28 C 90,20 72,17 55,19 C 38,17 20,20 8,28 Z" fill="#8b1a1a" opacity="0.85" />
      <path d="M 8,28 C 20,46 38,52 55,50 C 72,52 90,46 102,28 C 90,35 72,39 55,39 C 38,39 20,35 8,28 Z"                                 fill="#8b1a1a" opacity="0.85" />
      <g clipPath={`url(#${id})`}>
        <text x="10" y="18" style={{ fontFamily: 'Georgia, serif', fontSize: '4.5px', fill: '#2a1a1a' }}>amor que atravessa o tempo</text>
        <text x="8"  y="24" style={{ fontFamily: 'Georgia, serif', fontSize: '4px',   fill: '#2a1a1a' }}>e nas páginas da vida</text>
        <text x="12" y="30" style={{ fontFamily: 'Georgia, serif', fontSize: '4.5px', fill: '#2a1a1a' }}>encontra seu lar</text>
        <text x="10" y="36" style={{ fontFamily: 'Georgia, serif', fontSize: '4px',   fill: '#2a1a1a' }}>coração que não esquece</text>
        <text x="14" y="42" style={{ fontFamily: 'Georgia, serif', fontSize: '4.5px', fill: '#2a1a1a' }}>te amo</text>
      </g>
    </svg>
  )
}

/* ── Corações ────────────────────────────────────────────────────── */
const HEARTS = [
  { size: 14, left: 10, bottom: 14, rotate: -12, opacity: 1.0  },
  { size: 10, left: 24, bottom: 28, rotate:   5, opacity: 0.85 },
  { size: 13, left: 38, bottom: 42, rotate:  -8, opacity: 0.9  },
  { size:  9, left: 52, bottom: 54, rotate:  14, opacity: 0.75 },
  { size: 11, left: 64, bottom: 66, rotate:  -3, opacity: 0.95 },
]

function Hearts() {
  return HEARTS.map((h, i) => (
    <span
      key={i}
      style={{
        position: 'absolute',
        left: h.left, bottom: h.bottom,
        fontSize: h.size,
        color: '#c0392b',
        opacity: h.opacity,
        transform: `rotate(${h.rotate}deg)`,
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >♥</span>
  ))
}

/* ── Estrelas ────────────────────────────────────────────────────── */
const STARS = [
  { size: 11, right: 16, bottom: 20, rotate:  10 },
  { size:  9, right: 30, bottom: 12, rotate: -15 },
  { size: 13, right: 24, bottom: 38, rotate:   5 },
  { size:  8, right: 44, bottom: 28, rotate:  20 },
  { size: 10, right: 12, bottom: 50, rotate:  -8 },
]

function Stars() {
  return STARS.map((s, i) => (
    <span
      key={i}
      style={{
        position: 'absolute',
        right: s.right, bottom: s.bottom,
        fontSize: s.size,
        color: '#2d6b6b',
        opacity: 0.72,
        transform: `rotate(${s.rotate}deg)`,
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >★</span>
  ))
}

/* ── Componente principal ────────────────────────────────────────── */
export default function PaperTexture() {
  const uid = useId()
  const idA = `lips-a-${uid}`
  const idB = `lips-b-${uid}`

  return (
    <>
      {/* Linhas de dobra */}
      <div style={{ position: 'absolute', top: 0, left: '50%',    width: 1,      height: '100%', background: LINE, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '33.33%', left: 0, width: '100%', height: 1,      background: LINE, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '66.66%', left: 0, width: '100%', height: 1,      background: LINE, pointerEvents: 'none', zIndex: 0 }} />

      {/* Manchas de envelhecimento */}
      <div style={{ position: 'absolute', top: '8%',  left: '12%', width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(212,169,106,0.22) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '55%', left: '60%', width: 220, height: 160, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(212,169,106,0.18) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '30%', left: '70%', width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(180,140,80,0.14)  0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '75%', left: '8%',  width: 160, height: 120, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(200,160,90,0.16)  0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '15%', left: '45%', width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(212,169,106,0.12) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Lábios — canto superior direito */}
      <LipsSVG id={idA} rotation={-10} top={14} right={10} />
      <LipsSVG id={idB} rotation={5}   top={24} right={18} />

      {/* Corações — canto inferior esquerdo */}
      <Hearts />

      {/* Estrelas — canto inferior direito */}
      <Stars />
    </>
  )
}
