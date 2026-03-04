import { useState } from 'react'
import { motion } from 'framer-motion'

export default function FloatingPlayer({ musicTitle, musicArtist, visible }) {
  const [playing, setPlaying] = useState(true)

  if (!visible) return null

  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 430,
        height: 56,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid #F48FB1',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 12,
        zIndex: 40,
      }}
    >
      {/* Ícone nota musical */}
      <span style={{ fontSize: 18, color: '#C2185B' }}>♫</span>

      {/* Nome da música */}
      <div className="flex-1 min-w-0">
        <p
          className="truncate"
          style={{
            fontFamily: 'Lato, sans-serif',
            fontSize: 13,
            color: '#3E2723',
          }}
        >
          {musicTitle} — {musicArtist}
        </p>
      </div>

      {/* Play/Pause */}
      <button
        onClick={() => setPlaying((p) => !p)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#C2185B',
          fontSize: 20,
          padding: 4,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {playing ? '⏸' : '▶'}
      </button>
    </motion.div>
  )
}
