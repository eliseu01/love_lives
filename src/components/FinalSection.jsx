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
      style={{ background: '#C2185B', position: 'relative', overflow: 'hidden' }}
    >
      {/* Overlay escuro */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.25)',
          zIndex: 0,
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full py-14 gap-6">
        {/* Ícone musical */}
        <div className="flex flex-col items-center gap-1">
          <span style={{ fontSize: 28, color: 'white' }}>♫</span>
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

        {/* Capa — placeholder coração (futuramente: foto do casal) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            width: 'clamp(100px, 30vw, 120px)',
            height: 'clamp(100px, 30vw, 120px)',
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
                background: 'rgba(255,255,255,0.8)',
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
        <div className="flex items-center gap-6">
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.7)',
              fontSize: 20,
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ⏮
          </button>
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
              color: '#C2185B',
            }}
          >
            ▶
          </button>
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.7)',
              fontSize: 20,
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ⏭
          </button>
        </div>

        {/* Botão compartilhar */}
        <button
          onClick={handleShare}
          className="flex items-center gap-2"
          style={{
            background: 'white',
            color: '#C2185B',
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
