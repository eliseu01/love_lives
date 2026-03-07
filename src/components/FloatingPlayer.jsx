import { motion } from 'framer-motion'

export default function FloatingPlayer({ musicTitle, musicArtist, isPlaying, onTogglePlay, visible }) {
  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 16px',
        zIndex: 40,
        pointerEvents: 'none',
      }}
    >
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          width: '100%',
          maxWidth: 398,
          height: 56,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(8px)',
          border: '1px solid #F48FB1',
          borderRadius: 9999,
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: 10,
          boxShadow: '0 4px 20px rgba(194,24,91,0.12)',
          pointerEvents: 'auto',
        }}
      >
        <span style={{ fontSize: 18, color: '#C2185B', flexShrink: 0 }}>♫</span>

        <div className="flex-1 min-w-0">
          <p
            className="truncate"
            style={{ fontFamily: 'Lato, sans-serif', fontSize: 13, color: '#3E2723' }}
          >
            {musicTitle} — {musicArtist}
          </p>
        </div>

        <button
          onClick={onTogglePlay}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#C2185B',
            fontSize: 20,
            padding: 8,
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
      </motion.div>
    </div>
  )
}
