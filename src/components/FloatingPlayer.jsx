import { motion } from 'framer-motion'

export default function FloatingPlayer({ musicTitle, musicArtist, isPlaying, onTogglePlay, visible, coverSrc }) {
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
          height: 67,
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(12px)',
          borderRadius: 9999,
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px 0 10px',
          gap: 10,
          boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
          pointerEvents: 'auto',
        }}
      >
        {/* Album art */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            background: '#F48FB1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
          }}
        >
          {coverSrc ? (
            <img src={coverSrc} alt="capa" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            '♪'
          )}
        </div>

        {/* Track info */}
        <div className="flex-1 min-w-0">
          <p
            className="truncate"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              color: '#000000',
              lineHeight: 1.3,
            }}
          >
            {musicTitle || '—'}
          </p>
          <p
            className="truncate"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 12,
              color: '#555555',
              lineHeight: 1.3,
            }}
          >
            {musicArtist || '—'}
          </p>
        </div>

        {/* Play/pause button */}
        <button
          onClick={onTogglePlay}
          style={{
            background: '#C2185B',
            border: 'none',
            cursor: 'pointer',
            width: 38,
            height: 38,
            borderRadius: '50%',
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            flexShrink: 0,
          }}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
      </motion.div>
    </div>
  )
}
