import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import QRCode from 'qrcode'

const PJS = "'Plus Jakarta Sans', sans-serif"
const COLORS = {
  bg: '#FFF8F5',
  primary: '#C2185B',
  text: '#3E2723',
  muted: '#a08060',
  border: '#E0D6CC',
}

const STATUS_CONFIG = {
  success: {
    icon: '♥',
    iconColor: COLORS.primary,
    title: 'Presente publicado!',
    subtitle: 'O pagamento foi aprovado. Seu presente está no ar!',
  },
  failure: {
    icon: '❌',
    iconColor: '#c0392b',
    title: 'Pagamento não aprovado',
    subtitle: 'Houve um problema com o pagamento. Tente novamente.',
  },
  pending: {
    icon: '⏳',
    iconColor: '#e67e22',
    title: 'Pagamento pendente',
    subtitle: 'Estamos aguardando a confirmação. Assim que aprovado, seu presente ficará disponível.',
  },
}

export default function PaymentResultPage({ status }) {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  const slug = new URLSearchParams(window.location.search).get('slug')
  const url = slug ? `${window.location.origin}/p/${slug}` : null
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.failure

  const qrCanvasRef = useRef(null)

  useEffect(() => {
    if (status === 'success' && url && qrCanvasRef.current) {
      QRCode.toCanvas(qrCanvasRef.current, url, {
        width: 200,
        margin: 2,
        color: {
          dark: '#3E2723',
          light: '#ffffff',
        },
      })
    }
  }, [status, url])

  function copyLink() {
    if (!url) return
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  async function shareQR() {
    if (!qrCanvasRef.current) return
    try {
      const blob = await new Promise(resolve =>
        qrCanvasRef.current.toBlob(resolve, 'image/png')
      )
      const file = new File([blob], `lovestory-${slug}.png`, { type: 'image/png' })

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: 'LoveStory — QR Code do presente',
          text: `Escaneie para abrir o presente: ${url}`,
          files: [file],
        })
      } else {
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `lovestory-${slug}.png`
        link.click()
        URL.revokeObjectURL(link.href)
      }
    } catch (err) {
      if (err.name !== 'AbortError') console.error(err)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: COLORS.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{
        width: '100%',
        maxWidth: 360,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        textAlign: 'center',
      }}>
        <span style={{ fontSize: 64, color: config.iconColor, lineHeight: 1 }}>
          {config.icon}
        </span>

        <h2 style={{
          fontFamily: PJS,
          fontWeight: 800,
          fontSize: 24,
          color: COLORS.text,
          margin: 0,
        }}>
          {config.title}
        </h2>

        <p style={{
          fontFamily: PJS,
          fontSize: 14,
          color: COLORS.muted,
          margin: 0,
          lineHeight: 1.6,
          maxWidth: 300,
        }}>
          {config.subtitle}
        </p>

        {/* Sucesso: mostrar link + QR Code + botões */}
        {status === 'success' && url && (
          <>
            <div style={{
              width: '100%',
              padding: '14px 16px',
              background: '#ffffff',
              border: `1px solid ${COLORS.border}`,
              borderRadius: 12,
              fontFamily: PJS,
              fontSize: 14,
              color: COLORS.muted,
              wordBreak: 'break-all',
              textAlign: 'left',
              boxSizing: 'border-box',
            }}>
              {url}
            </div>

            {/* QR Code */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              padding: '20px 0',
            }}>
              <canvas
                ref={qrCanvasRef}
                style={{
                  borderRadius: 12,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                }}
              />
              <button
                onClick={shareQR}
                style={{
                  fontFamily: PJS,
                  fontWeight: 600,
                  fontSize: 13,
                  color: COLORS.muted,
                  background: 'transparent',
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 20,
                  padding: '8px 20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                📤 Compartilhar QR Code
              </button>
            </div>

            <button
              onClick={copyLink}
              style={{
                width: '100%',
                padding: '14px 0',
                fontFamily: PJS,
                fontWeight: 700,
                fontSize: 15,
                color: COLORS.primary,
                background: 'transparent',
                border: `1.5px solid ${COLORS.primary}`,
                borderRadius: 24,
                cursor: 'pointer',
              }}
            >
              {copied ? 'Link copiado! ✓' : 'Copiar link'}
            </button>

            <button
              onClick={() => navigate(`/p/${slug}`)}
              style={{
                width: '100%',
                padding: '14px 0',
                fontFamily: PJS,
                fontWeight: 700,
                fontSize: 15,
                color: '#ffffff',
                background: COLORS.primary,
                border: 'none',
                borderRadius: 24,
                cursor: 'pointer',
              }}
            >
              Ver presente
            </button>

            <button
              onClick={() => navigate('/meus-presentes')}
              style={{
                fontFamily: PJS,
                fontSize: 14,
                color: COLORS.muted,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 0',
              }}
            >
              Meus presentes
            </button>
          </>
        )}

        {/* Erro */}
        {status === 'failure' && (
          <button
            onClick={() => navigate('/meus-presentes')}
            style={{
              width: '100%',
              padding: '14px 0',
              fontFamily: PJS,
              fontWeight: 700,
              fontSize: 15,
              color: '#ffffff',
              background: COLORS.primary,
              border: 'none',
              borderRadius: 24,
              cursor: 'pointer',
            }}
          >
            Tentar novamente
          </button>
        )}

        {/* Pendente */}
        {status === 'pending' && (
          <button
            onClick={() => navigate('/meus-presentes')}
            style={{
              width: '100%',
              padding: '14px 0',
              fontFamily: PJS,
              fontWeight: 700,
              fontSize: 15,
              color: '#ffffff',
              background: COLORS.primary,
              border: 'none',
              borderRadius: 24,
              cursor: 'pointer',
            }}
          >
            Meus presentes
          </button>
        )}
      </div>
    </div>
  )
}
