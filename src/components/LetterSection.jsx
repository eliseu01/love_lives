import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Estados da animação do envelope
// 'closed' → 'opening' → 'rising' → 'expanded'

export default function LetterSection({ letterText, onMusicStart }) {
  const [stage, setStage] = useState('closed')

  function handleEnvelopeClick() {
    if (stage !== 'closed') return
    setStage('opening')
    onMusicStart?.()

    // Sequência de animações
    setTimeout(() => setStage('rising'), 700)
    setTimeout(() => setStage('expanded'), 1300)
  }

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ background: '#FFF8F5' }}
    >
      <AnimatePresence mode="wait">
        {/* ENVELOPE FECHADO */}
        {(stage === 'closed' || stage === 'opening') && (
          <motion.div
            key="envelope"
            className="flex flex-col items-center gap-4 cursor-pointer select-none"
            onClick={handleEnvelopeClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
          >
            <EnvelopeSVG isOpening={stage === 'opening'} />
            {stage === 'closed' && (
              <motion.p
                className="text-sm"
                style={{ fontFamily: 'Lato, sans-serif', color: '#F48FB1' }}
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                toque para abrir
              </motion.p>
            )}
          </motion.div>
        )}

        {/* CARTA SAINDO / EXPANDIDA */}
        {(stage === 'rising' || stage === 'expanded') && (
          <motion.div
            key="letter"
            className="w-full"
            style={{ maxWidth: 380 }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <LetterCard text={letterText} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function EnvelopeSVG({ isOpening }) {
  return (
    <div className="relative" style={{ width: 220, height: 160 }}>
      <svg width="220" height="160" viewBox="0 0 220 160" fill="none">
        {/* Corpo do envelope */}
        <rect x="4" y="40" width="212" height="116" rx="6"
          fill="#F5E6D3" stroke="#C2185B" strokeWidth="2" />

        {/* Aba inferior (dobra decorativa) */}
        <path d="M4 156 L110 90 L216 156 Z" fill="#EDD5BE" />

        {/* Linhas diagonais (fechamento lateral) */}
        <path d="M4 40 L110 100 L216 40" stroke="#C2185B" strokeWidth="1.5" strokeOpacity="0.4" />

        {/* Aba superior — gira quando isOpening */}
        <motion.path
          d="M4 40 L110 100 L216 40 L220 34 L0 34 Z"
          fill="#F5E6D3"
          stroke="#C2185B"
          strokeWidth="2"
          style={{ transformOrigin: '110px 40px' }}
          animate={isOpening ? { rotateX: -160 } : { rotateX: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />

        {/* Lacre coração */}
        {!isOpening && (
          <text x="110" y="108" textAnchor="middle" fontSize="28" fill="#C2185B">
            ♥
          </text>
        )}
      </svg>
    </div>
  )
}

function LetterCard({ text }) {
  return (
    <div
      className="rounded-lg p-6 mx-auto"
      style={{
        background: '#FFFDF9',
        border: '1px solid #F0D9C8',
        boxShadow: '0 8px 32px rgba(194,24,91,0.08)',
        width: '85%',
      }}
    >
      {/* Ornamento floral */}
      <div className="text-center mb-3 text-2xl select-none" style={{ color: '#F48FB1' }}>
        ❧
      </div>

      <h2
        className="text-center text-xl mb-5"
        style={{ fontFamily: 'Playfair Display, serif', color: '#C2185B' }}
      >
        Nossa História
      </h2>

      <p
        className="whitespace-pre-line leading-relaxed text-sm"
        style={{ fontFamily: 'Lato, sans-serif', color: '#3E2723', lineHeight: 1.8 }}
      >
        {text}
      </p>

      <p
        className="text-center text-xs italic mt-6"
        style={{ fontFamily: 'Lato, sans-serif', color: '#F48FB1' }}
      >
        27.06.16
      </p>
    </div>
  )
}
