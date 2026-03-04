import { motion } from 'framer-motion'

export default function FinalSection({ names, musicTitle, musicArtist }) {
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
      className="min-h-screen flex flex-col items-center justify-between px-6 py-0"
      style={{ background: '#1DB954', position: 'relative', overflow: 'hidden' }}
    >
      {/* Overlay escuro */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.35)',
          zIndex: 0,
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full py-14 gap-6">
        {/* Logo Spotify */}
        <div className="flex flex-col items-center gap-1">
          <SpotifyIcon />
          <p
            style={{
              fontFamily: 'Lato, sans-serif',
              fontSize: 10,
              letterSpacing: '0.2em',
              color: 'white',
              textTransform: 'uppercase',
            }}
          >
            tocando agora
          </p>
        </div>

        {/* Capa do álbum (foto do casal — placeholder) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 8,
            background: 'rgba(255,255,255,0.15)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
          }}
        >
          ♥
        </motion.div>

        {/* Nome da música */}
        <div className="text-center">
          <p
            style={{
              fontFamily: 'Lato, sans-serif',
              fontWeight: 700,
              fontSize: 20,
              color: 'white',
            }}
          >
            {musicTitle}
          </p>
          <p
            style={{
              fontFamily: 'Lato, sans-serif',
              fontSize: 14,
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            {musicArtist}
          </p>
        </div>

        {/* Barra de progresso decorativa */}
        <div className="w-4/5">
          <div
            style={{
              height: 3,
              borderRadius: 2,
              background: 'rgba(255,255,255,0.2)',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '35%',
                height: '100%',
                background: '#1DB954',
                borderRadius: 2,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '35%',
                transform: 'translate(-50%, -50%)',
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'white',
              }}
            />
          </div>
          <div
            className="flex justify-between mt-1"
            style={{ fontFamily: 'Lato, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.6)' }}
          >
            <span>1:24</span>
            <span>4:21</span>
          </div>
        </div>

        {/* Controles */}
        <div className="flex items-center gap-6" style={{ color: 'white' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', fontSize: 20, padding: 0 }}>⏮</button>
          <button
            style={{
              background: 'white',
              border: 'none',
              cursor: 'pointer',
              width: 48,
              height: 48,
              borderRadius: '50%',
              fontSize: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1DB954',
            }}
          >
            ▶
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', fontSize: 20, padding: 0 }}>⏭</button>
        </div>

        {/* Botão compartilhar */}
        <button
          onClick={handleShare}
          className="flex items-center gap-2"
          style={{
            background: 'white',
            color: '#1DB954',
            border: 'none',
            borderRadius: 24,
            padding: '12px 24px',
            fontFamily: 'Lato, sans-serif',
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            width: '80%',
            justifyContent: 'center',
          }}
        >
          Compartilhar nos Stories ↗
        </button>

        {/* Assinatura */}
        <p
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 16,
            color: 'rgba(255,255,255,0.6)',
            fontStyle: 'italic',
          }}
        >
          {names}
        </p>
      </div>
    </section>
  )
}

function SpotifyIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  )
}
