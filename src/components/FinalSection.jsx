import { useState } from 'react'
import { motion } from 'framer-motion'

const PJS = "'Plus Jakarta Sans', sans-serif"

/* ── Share image — Canvas API ───────────────────────────────────── */

function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function drawPlay(ctx, cx, cy, r, color) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(cx - r * 0.38, cy - r * 0.52)
  ctx.lineTo(cx + r * 0.56, cy)
  ctx.lineTo(cx - r * 0.38, cy + r * 0.52)
  ctx.closePath()
  ctx.fill()
}

function drawPause(ctx, cx, cy, r, color) {
  ctx.fillStyle = color
  const bw = r * 0.26, bh = r * 0.58, gap = r * 0.18
  ctx.fillRect(cx - gap - bw, cy - bh, bw, bh * 2)
  ctx.fillRect(cx + gap,       cy - bh, bw, bh * 2)
}

function drawPrev(ctx, cx, cy, s, color) {
  ctx.fillStyle = color
  ctx.fillRect(cx - s * 0.9, cy - s * 0.7, s * 0.2, s * 1.4)
  ctx.beginPath()
  ctx.moveTo(cx + s * 0.5, cy - s * 0.7)
  ctx.lineTo(cx - s * 0.6, cy)
  ctx.lineTo(cx + s * 0.5, cy + s * 0.7)
  ctx.closePath()
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(cx - s * 0.05, cy - s * 0.7)
  ctx.lineTo(cx - s * 1.15, cy)
  ctx.lineTo(cx - s * 0.05, cy + s * 0.7)
  ctx.closePath()
  ctx.fill()
}

function drawNext(ctx, cx, cy, s, color) {
  ctx.fillStyle = color
  ctx.fillRect(cx + s * 0.7, cy - s * 0.7, s * 0.2, s * 1.4)
  ctx.beginPath()
  ctx.moveTo(cx - s * 0.5, cy - s * 0.7)
  ctx.lineTo(cx + s * 0.6, cy)
  ctx.lineTo(cx - s * 0.5, cy + s * 0.7)
  ctx.closePath()
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(cx + s * 0.05, cy - s * 0.7)
  ctx.lineTo(cx + s * 1.15, cy)
  ctx.lineTo(cx + s * 0.05, cy + s * 0.7)
  ctx.closePath()
  ctx.fill()
}

function drawShuffle(ctx, cx, cy, s, color) {
  // Dois traços cruzados com setas
  ctx.strokeStyle = color
  ctx.lineWidth = s * 0.18
  ctx.lineCap = 'round'
  // linha de cima: esquerda-baixo → direita-cima
  ctx.beginPath()
  ctx.moveTo(cx - s, cy + s * 0.5)
  ctx.bezierCurveTo(cx - s * 0.2, cy + s * 0.5, cx + s * 0.2, cy - s * 0.5, cx + s, cy - s * 0.5)
  ctx.stroke()
  // linha de baixo: esquerda-cima → direita-baixo
  ctx.beginPath()
  ctx.moveTo(cx - s, cy - s * 0.5)
  ctx.bezierCurveTo(cx - s * 0.2, cy - s * 0.5, cx + s * 0.2, cy + s * 0.5, cx + s, cy + s * 0.5)
  ctx.stroke()
  // seta cima-direita
  ctx.beginPath()
  ctx.moveTo(cx + s * 0.62, cy - s * 0.85)
  ctx.lineTo(cx + s, cy - s * 0.5)
  ctx.lineTo(cx + s * 0.62, cy - s * 0.15)
  ctx.stroke()
  // seta baixo-direita
  ctx.beginPath()
  ctx.moveTo(cx + s * 0.62, cy + s * 0.15)
  ctx.lineTo(cx + s, cy + s * 0.5)
  ctx.lineTo(cx + s * 0.62, cy + s * 0.85)
  ctx.stroke()
}

function drawRepeat(ctx, cx, cy, s, color) {
  ctx.strokeStyle = color
  ctx.lineWidth = s * 0.18
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  // arco superior
  ctx.beginPath()
  ctx.moveTo(cx - s * 0.4, cy - s * 0.6)
  ctx.lineTo(cx + s * 0.5, cy - s * 0.6)
  ctx.arcTo(cx + s, cy - s * 0.6, cx + s, cy, s * 0.5)
  ctx.lineTo(cx + s, cy + s * 0.3)
  ctx.stroke()
  // arco inferior
  ctx.beginPath()
  ctx.moveTo(cx + s * 0.4, cy + s * 0.6)
  ctx.lineTo(cx - s * 0.5, cy + s * 0.6)
  ctx.arcTo(cx - s, cy + s * 0.6, cx - s, cy, s * 0.5)
  ctx.lineTo(cx - s, cy - s * 0.3)
  ctx.stroke()
  // seta cima-esquerda
  ctx.beginPath()
  ctx.moveTo(cx - s * 0.04, cy - s * 0.95)
  ctx.lineTo(cx - s * 0.4, cy - s * 0.6)
  ctx.lineTo(cx - s * 0.04, cy - s * 0.25)
  ctx.stroke()
  // seta baixo-direita
  ctx.beginPath()
  ctx.moveTo(cx + s * 0.04, cy + s * 0.95)
  ctx.lineTo(cx + s * 0.4, cy + s * 0.6)
  ctx.lineTo(cx + s * 0.04, cy + s * 0.25)
  ctx.stroke()
}

async function buildShareCanvas({ coverPhoto, musicTitle, musicArtist, isPlaying }) {
  await document.fonts.ready

  const W = 1080
  const H = 1920
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  // Fundo escuro
  ctx.fillStyle = '#111111'
  ctx.fillRect(0, 0, W, H)

  // Foto de capa — cobre toda a tela
  if (coverPhoto) {
    try {
      const img = await loadImg(coverPhoto)
      const scale = Math.max(W / img.width, H / img.height)
      const dw = img.width * scale
      const dh = img.height * scale
      ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh)
    } catch { /* sem foto */ }
  }

  // Overlay escuro progressivo — fundo da tela mais opaco
  const overlay = ctx.createLinearGradient(0, 0, 0, H)
  overlay.addColorStop(0,   'rgba(0,0,0,0.25)')
  overlay.addColorStop(0.45,'rgba(0,0,0,0.35)')
  overlay.addColorStop(0.72,'rgba(0,0,0,0.82)')
  overlay.addColorStop(1,   'rgba(0,0,0,0.97)')
  ctx.fillStyle = overlay
  ctx.fillRect(0, 0, W, H)

  // Padding lateral
  const padX = 88

  // Nome da música — alinhado à esquerda
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'
  ctx.font = `800 86px 'Plus Jakarta Sans', sans-serif`
  const maxW = W - padX * 2 - 80
  let title = musicTitle || 'Nossa Música'
  while (ctx.measureText(title).width > maxW && title.length > 4) title = title.slice(0, -1)
  if (title !== (musicTitle || 'Nossa Música')) title += '…'
  ctx.fillText(title, padX, H * 0.725)

  // Artista — alinhado à esquerda
  ctx.fillStyle = 'rgba(255,255,255,0.65)'
  ctx.font = `500 52px 'Plus Jakarta Sans', sans-serif`
  let artist = musicArtist || ''
  while (ctx.measureText(artist).width > maxW && artist.length > 4) artist = artist.slice(0, -1)
  if (artist !== (musicArtist || '')) artist += '…'
  ctx.fillText(artist, padX, H * 0.725 + 80)

  // Controles — 5 botões: shuffle | prev | play | next | repeat
  const ctrlY = H * 0.865
  const playR = 88
  const iconS = 42

  // Espaçamento: distribuído em [padX … W-padX]
  const xs = {
    shuffle: padX + 30,
    prev:    W / 2 - 210,
    play:    W / 2,
    next:    W / 2 + 210,
    repeat:  W - padX - 30,
  }

  // Play/Pause — círculo branco
  ctx.fillStyle = 'white'
  ctx.beginPath()
  ctx.arc(xs.play, ctrlY, playR, 0, Math.PI * 2)
  ctx.fill()

  if (isPlaying) {
    drawPause(ctx, xs.play, ctrlY, playR, '#111111')
  } else {
    drawPlay(ctx, xs.play, ctrlY, playR, '#111111')
  }

  // Prev / Next
  drawPrev(ctx, xs.prev, ctrlY, iconS, 'white')
  drawNext(ctx, xs.next, ctrlY, iconS, 'white')

  // Shuffle / Repeat
  drawShuffle(ctx, xs.shuffle, ctrlY, iconS * 0.75, 'rgba(255,255,255,0.7)')
  drawRepeat( ctx, xs.repeat,  ctrlY, iconS * 0.75, 'rgba(255,255,255,0.7)')

  return canvas
}

function IconShuffle() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 3 21 3 21 8"/>
      <line x1="4" y1="20" x2="21" y2="3"/>
      <polyline points="21 16 21 21 16 21"/>
      <line x1="4" y1="4" x2="9" y2="9"/>
    </svg>
  )
}

function IconPrev() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="19,20 9,12 19,4"/>
      <rect x="5" y="4" width="2" height="16"/>
    </svg>
  )
}

function IconNext() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,4 15,12 5,20"/>
      <rect x="17" y="4" width="2" height="16"/>
    </svg>
  )
}

function IconRepeat() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9"/>
      <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
      <polyline points="7 23 3 19 7 15"/>
      <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
    </svg>
  )
}

function IconPlay() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,3 19,12 5,21"/>
    </svg>
  )
}

function IconPause() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16"/>
      <rect x="14" y="4" width="4" height="16"/>
    </svg>
  )
}

export default function FinalSection({ names, musicTitle, musicArtist, coverPhoto, isPlaying, onTogglePlay }) {
  const [sharing, setSharing] = useState(false)

  async function handleShare() {
    setSharing(true)
    try {
      const canvas = await buildShareCanvas({ coverPhoto, musicTitle, musicArtist, isPlaying })
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
      const file = new File([blob], 'nossa-historia.png', { type: 'image/png' })

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file] })
      } else {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'nossa-historia.png'
        a.click()
        URL.revokeObjectURL(url)
      }
    } catch (err) {
      if (err?.name !== 'AbortError') console.error(err)
    } finally {
      setSharing(false)
    }
  }

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: '#0a0a0a' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          width: '100%',
          maxWidth: 390,
          background: 'linear-gradient(180deg, #111111 0%, #1a1a1a 100%)',
          borderRadius: 24,
          padding: '32px 24px 28px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        {/* Nome do casal */}
        <p
          style={{
            fontFamily: PJS,
            fontWeight: 800,
            fontSize: 'clamp(20px, 5.5vw, 26px)',
            color: 'white',
            textAlign: 'center',
            marginBottom: 24,
            letterSpacing: '-0.02em',
          }}
        >
          {names}
        </p>

        {/* Capa */}
        <div
          style={{
            width: '100%',
            aspectRatio: '1 / 1',
            borderRadius: 16,
            overflow: 'hidden',
            marginBottom: 24,
            background: 'rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 72,
          }}
        >
          {coverPhoto ? (
            <img src={coverPhoto} alt={names} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ color: '#C2185B' }}>♥</span>
          )}
        </div>

        {/* Nome da música + botão + */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ flex: 1, minWidth: 0, paddingRight: 12 }}>
            <p
              className="truncate"
              style={{
                fontFamily: PJS,
                fontWeight: 700,
                fontSize: 22,
                color: 'white',
                lineHeight: 1.2,
                marginBottom: 4,
              }}
            >
              {musicTitle || 'Nossa Música'}
            </p>
            <p
              className="truncate"
              style={{
                fontFamily: PJS,
                fontSize: 14,
                color: '#aaaaaa',
              }}
            >
              {musicArtist || ''}
            </p>
          </div>
          <button
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              border: '2px solid #555',
              background: 'transparent',
              color: '#aaa',
              fontSize: 22,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              lineHeight: 1,
            }}
          >
            +
          </button>
        </div>

        {/* Barra de progresso */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              width: '100%',
              height: 4,
              background: 'rgba(255,255,255,0.15)',
              borderRadius: 2,
              marginBottom: 8,
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: '38%',
                height: '100%',
                background: 'white',
                borderRadius: 2,
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: 'white',
                  position: 'absolute',
                  right: -6,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: PJS, fontSize: 11, color: '#aaa' }}>1:12</span>
            <span style={{ fontFamily: PJS, fontSize: 11, color: '#aaa' }}>3:18</span>
          </div>
        </div>

        {/* Controles principais */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 28,
          }}
        >
          <button style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', padding: 4 }}>
            <IconShuffle />
          </button>
          <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 4 }}>
            <IconPrev />
          </button>

          {/* Play/Pause grande */}
          <button
            onClick={onTogglePlay}
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#111',
              flexShrink: 0,
            }}
          >
            {isPlaying ? <IconPause /> : <IconPlay />}
          </button>

          <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 4 }}>
            <IconNext />
          </button>
          <button style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', padding: 4 }}>
            <IconRepeat />
          </button>
        </div>

        {/* Ícones secundários */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: 28,
            paddingBottom: 24,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Devices */}
          <button style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: 20 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </button>
          {/* Share */}
          <button style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/>
              <circle cx="6" cy="12" r="3"/>
              <circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>
          {/* Queue */}
          <button style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"/>
              <line x1="8" y1="12" x2="21" y2="12"/>
              <line x1="8" y1="18" x2="21" y2="18"/>
              <line x1="3" y1="6" x2="3.01" y2="6"/>
              <line x1="3" y1="12" x2="3.01" y2="12"/>
              <line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Botão compartilhar */}
        <button
          onClick={handleShare}
          style={{
            background: 'white',
            color: '#111',
            border: 'none',
            borderRadius: 32,
            padding: '14px 24px',
            fontFamily: PJS,
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            width: '100%',
            letterSpacing: '-0.01em',
          }}
        >
          {sharing ? 'Gerando imagem…' : 'Compartilhar nos Stories ↗'}
        </button>
      </motion.div>
    </section>
  )
}
