import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import envelopeClosed  from '../assets/envelope/envelope_closed.webp'
import envelopeOpening from '../assets/envelope/envelope_opening.webp'

// Estados: 'closed' → 'opening' → 'expanded'

const FADE = {
  initial:    { opacity: 0, y: 12 },
  animate:    { opacity: 1, y: 0  },
  exit:       { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: 'easeInOut' },
}

export default function LetterSection({ letterText, names, startDate, onMusicStart }) {
  const [stage, setStage] = useState('closed')

  function handleEnvelopeClick() {
    if (stage !== 'closed') return
    setStage('opening')
    onMusicStart?.()

    setTimeout(() => setStage('expanded'), 700)
  }

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ background: '#FCD7CE' }}
    >
      <AnimatePresence mode="wait">

        {/* ESTADO 1 — envelope fechado, pulso suave, clicável */}
        {stage === 'closed' && (
          <motion.div
            key="closed"
            className="flex flex-col items-center gap-4 cursor-pointer select-none"
            onClick={handleEnvelopeClick}
            {...FADE}
          >
            <motion.img
              src={envelopeClosed}
              alt="envelope fechado"
              style={{ width: '100%', maxWidth: 280 }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.p
              className="text-sm"
              style={{ fontFamily: 'Lato, sans-serif', color: '#F48FB1' }}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              toque para abrir
            </motion.p>
          </motion.div>
        )}

        {/* ESTADO 2 — envelope abrindo */}
        {stage === 'opening' && (
          <motion.img
            key="opening"
            src={envelopeOpening}
            alt="envelope abrindo"
            style={{ width: '100%', maxWidth: 280 }}
            {...FADE}
          />
        )}

        {/* ESTADO 3 — carta emerge do centro da tela */}
        {stage === 'expanded' && (
          <motion.div
            key="letter"
            className="w-full flex justify-center"
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <LetterCard text={letterText} names={names} startDate={startDate} />
          </motion.div>
        )}

      </AnimatePresence>
    </section>
  )
}

function LetterCard({ text, names, startDate }) {
  const parts = names ? names.split(' & ') : ['', '']
  const from = parts[0] ?? ''
  const to   = parts[1] ?? ''

  const displayDate = startDate
    ? new Date(startDate + 'T12:00:00').toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
      }).replace(/\//g, '.')
    : ''

  const fontFamily = "'Caveat', cursive"

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '24px 16px',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '88%',
          maxWidth: 360,
          background: '#F5EDCC',
          backgroundImage: `repeating-linear-gradient(
            transparent,
            transparent 27px,
            rgba(180,140,60,0.08) 27px,
            rgba(180,140,60,0.08) 28px
          )`,
          borderRadius: 4,
          padding: '32px 28px 40px 28px',
          transform: 'rotate(-1.5deg)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.12), inset 0 0 60px rgba(180,140,60,0.06)',
          fontFamily,
          color: '#2C1A0E',
          lineHeight: 1.75,
        }}
      >
        {/* Dobra no canto superior direito */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '0 24px 24px 0',
            borderColor: 'transparent #e8d8a0 transparent transparent',
            filter: 'drop-shadow(-2px 2px 2px rgba(0,0,0,0.1))',
          }}
        />

        {/* De / Para */}
        {(from || to) && (
          <div
            style={{
              fontSize: 14,
              fontFamily,
              color: 'rgba(44,26,14,0.55)',
              marginBottom: 22,
              lineHeight: 1.6,
              borderBottom: '1px dashed rgba(44,26,14,0.15)',
              paddingBottom: 14,
            }}
          >
            {from && <span style={{ display: 'block' }}>De: {from}</span>}
            {to   && <span style={{ display: 'block' }}>Para: {to}</span>}
          </div>
        )}

        {/* Saudação */}
        {to && (
          <span
            style={{
              display: 'block',
              fontSize: 22,
              fontWeight: 700,
              fontFamily,
              color: '#1a0e06',
              marginBottom: 18,
            }}
          >
            Para {to},
          </span>
        )}

        {/* Corpo */}
        <div
          style={{
            fontSize: 19,
            fontWeight: 400,
            fontFamily,
            color: '#2C1A0E',
            whiteSpace: 'pre-wrap',
          }}
        >
          {text}
        </div>

        {/* Assinatura */}
        {from && (
          <div
            style={{
              marginTop: 24,
              fontSize: 21,
              fontWeight: 700,
              fontFamily,
              color: '#1a0e06',
              textAlign: 'right',
            }}
          >
            {from} ♡
          </div>
        )}

        {/* Data */}
        {displayDate && (
          <div
            style={{
              fontSize: 14,
              fontFamily,
              fontStyle: 'italic',
              color: 'rgba(44,26,14,0.5)',
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            {displayDate}
          </div>
        )}
      </div>
    </div>
  )
}
