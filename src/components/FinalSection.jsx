import { motion } from 'framer-motion'

export default function FinalSection({ names, musicTitle, musicArtist, coverPhoto }) {
  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: `${names} — nossa história`,
        text: 'Vem ver algo especial ♥',
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard?.writeText(window.location.href)
      alert('Link copiado!')
    }
  }

  return (
    <section
      className="min-h-screen flex flex-col items-center px-6 py-16"
      style={{
        background: 'rgba(176, 23, 27, 0.97)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* LoveStory brand */}
      <motion.h1
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: 'Dancing Script, cursive',
          fontWeight: 400,
          fontSize: 'clamp(42px, 14vw, 58px)',
          color: 'white',
          letterSpacing: '0.02em',
          textAlign: 'center',
          lineHeight: 1.1,
          marginBottom: 4,
        }}
      >
        LoveStory
      </motion.h1>

      {/* Names */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{
          fontFamily: 'Playfair Display, serif',
          fontWeight: 700,
          fontSize: 'clamp(18px, 5.5vw, 24px)',
          color: 'white',
          letterSpacing: '0.05em',
          textAlign: 'center',
          marginBottom: 36,
        }}
      >
        {names}
      </motion.p>

      {/* Circular cover photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          width: 'clamp(160px, 55vw, 220px)',
          height: 'clamp(160px, 55vw, 220px)',
          borderRadius: '50%',
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.15)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 56,
          flexShrink: 0,
          marginBottom: 36,
        }}
      >
        {coverPhoto ? (
          <img src={coverPhoto} alt={names} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          '♥'
        )}
      </motion.div>

      {/* Music info */}
      {(musicTitle || musicArtist) && (
        <div className="text-center" style={{ marginBottom: 24 }}>
          <p
            style={{
              fontFamily: 'Lato, sans-serif',
              fontSize: 10,
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.6)',
              textTransform: 'uppercase',
              marginBottom: 4,
            }}
          >
            tocando agora
          </p>
          <p
            style={{
              fontFamily: 'Lato, sans-serif',
              fontWeight: 700,
              fontSize: 16,
              color: 'white',
            }}
          >
            {musicTitle}
          </p>
          <p
            style={{
              fontFamily: 'Lato, sans-serif',
              fontSize: 13,
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            {musicArtist}
          </p>
        </div>
      )}

      {/* Share button */}
      <button
        onClick={handleShare}
        className="flex items-center gap-2"
        style={{
          background: 'white',
          color: '#B0171B',
          border: 'none',
          borderRadius: 24,
          padding: '14px 24px',
          fontFamily: 'Lato, sans-serif',
          fontWeight: 700,
          fontSize: 14,
          cursor: 'pointer',
          width: '80%',
          justifyContent: 'center',
          minHeight: 48,
          marginTop: 'auto',
        }}
      >
        Compartilhar nos Stories ↗
      </button>
    </section>
  )
}
