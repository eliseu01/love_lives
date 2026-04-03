import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'

const PJS = "'Plus Jakarta Sans', sans-serif"
const COLORS = {
  bg: '#FFF8F5',
  primary: '#C2185B',
  text: '#3E2723',
  muted: '#a08060',
  border: '#E0D6CC',
  inputBg: '#ffffff',
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const [gifts, setGifts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase || !user) return
    supabase
      .from('gifts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setGifts(data ?? [])
        setLoading(false)
      })
  }, [user])

  async function handleDelete(gift) {
    if (!window.confirm('Tem certeza que deseja excluir esse presente?')) return

    // Deleta fotos do storage
    if (gift.photos?.length) {
      const paths = gift.photos
        .map(p => {
          try {
            const url = new URL(p.src)
            // path após /object/public/photos/
            const parts = url.pathname.split('/object/public/photos/')
            return parts[1] ?? null
          } catch {
            return null
          }
        })
        .filter(Boolean)
      if (paths.length) {
        await supabase.storage.from('photos').remove(paths)
      }
    }

    await supabase.from('gifts').delete().eq('slug', gift.slug).eq('user_id', user.id)
    setGifts(prev => prev.filter(g => g.slug !== gift.slug))
  }

  async function handlePayNow(gift) {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ gift_id: gift.id }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Erro ao criar pagamento')
      const mpEnv = import.meta.env.VITE_MP_ENV || 'sandbox'
      window.location.href = mpEnv === 'production' ? data.init_point : data.sandbox_init_point
    } catch (err) {
      alert(err.message)
    }
  }

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  function formatDate(iso) {
    if (!iso) return ''
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    })
  }

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh' }}>
      <div style={{ maxWidth: 430, margin: '0 auto', padding: '32px 24px 48px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <h1 style={{
            fontFamily: PJS,
            fontWeight: 800,
            fontSize: 'clamp(22px, 6vw, 28px)',
            color: COLORS.text,
            margin: 0,
          }}>
            Meus Presentes
          </h1>
          <button
            onClick={handleSignOut}
            style={{
              fontFamily: PJS,
              fontSize: 13,
              color: COLORS.muted,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '6px 0',
            }}
          >
            Sair
          </button>
        </div>

        {/* Botão criar */}
        <button
          onClick={() => navigate('/criar')}
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
            marginBottom: 28,
          }}
        >
          + Criar novo presente
        </button>

        {/* Lista */}
        {loading ? (
          <p style={{ fontFamily: PJS, fontSize: 14, color: COLORS.muted, textAlign: 'center', fontStyle: 'italic' }}>
            carregando...
          </p>
        ) : gifts.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 48 }}>💌</span>
            <p style={{ fontFamily: PJS, fontSize: 15, color: COLORS.muted, margin: 0 }}>
              Você ainda não criou nenhum presente
            </p>
            <button
              onClick={() => navigate('/criar')}
              style={{
                marginTop: 8,
                padding: '12px 28px',
                fontFamily: PJS,
                fontWeight: 700,
                fontSize: 14,
                color: '#ffffff',
                background: COLORS.primary,
                border: 'none',
                borderRadius: 24,
                cursor: 'pointer',
              }}
            >
              Criar seu primeiro presente
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {gifts.map(gift => (
              <div
                key={gift.slug}
                style={{
                  background: COLORS.inputBg,
                  borderRadius: 12,
                  padding: 16,
                  border: `1px solid ${COLORS.border}`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center',
                }}
              >
                {/* Foto de capa */}
                {gift.photos?.[0]?.src ? (
                  <img
                    src={gift.photos[0].src}
                    alt=""
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 8,
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: 8,
                    background: '#F0E6D8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    flexShrink: 0,
                  }}>
                    💌
                  </div>
                )}

                {/* Texto */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontFamily: PJS,
                    fontWeight: 700,
                    fontSize: 15,
                    color: COLORS.text,
                    margin: '0 0 2px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {gift.names || '—'}
                  </p>
                  <p style={{
                    fontFamily: PJS,
                    fontSize: 12,
                    color: COLORS.muted,
                    margin: '0 0 2px',
                  }}>
                    /p/{gift.slug}
                  </p>
                  {gift.created_at && (
                    <p style={{ fontFamily: PJS, fontSize: 11, color: COLORS.muted, margin: 0 }}>
                      {formatDate(gift.created_at)}
                    </p>
                  )}
                </div>

                {/* Ações */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                  {gift.status === 'paid' ? (
                    <>
                      <span style={{
                        padding: '3px 10px',
                        fontFamily: PJS,
                        fontWeight: 700,
                        fontSize: 11,
                        color: '#2e7d32',
                        background: '#e8f5e9',
                        borderRadius: 20,
                        textAlign: 'center',
                      }}>
                        Ativo
                      </span>
                      <button
                        onClick={() => navigate(`/editar/${gift.slug}`)}
                        style={{
                          padding: '7px 14px',
                          fontFamily: PJS,
                          fontWeight: 600,
                          fontSize: 12,
                          color: COLORS.primary,
                          background: 'transparent',
                          border: `1px solid ${COLORS.primary}`,
                          borderRadius: 20,
                          cursor: 'pointer',
                        }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => navigate(`/p/${gift.slug}`)}
                        style={{
                          padding: '7px 14px',
                          fontFamily: PJS,
                          fontWeight: 600,
                          fontSize: 12,
                          color: COLORS.muted,
                          background: 'transparent',
                          border: `1px solid ${COLORS.border}`,
                          borderRadius: 20,
                          cursor: 'pointer',
                        }}
                      >
                        Ver
                      </button>
                    </>
                  ) : (
                    <>
                      <span style={{
                        padding: '3px 10px',
                        fontFamily: PJS,
                        fontWeight: 700,
                        fontSize: 10,
                        color: '#e65100',
                        background: '#fff3e0',
                        borderRadius: 20,
                        textAlign: 'center',
                        lineHeight: 1.4,
                      }}>
                        Aguardando pagamento
                      </span>
                      <button
                        onClick={() => handlePayNow(gift)}
                        style={{
                          padding: '7px 14px',
                          fontFamily: PJS,
                          fontWeight: 700,
                          fontSize: 12,
                          color: '#ffffff',
                          background: COLORS.primary,
                          border: 'none',
                          borderRadius: 20,
                          cursor: 'pointer',
                        }}
                      >
                        Pagar agora
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(gift)}
                    style={{
                      padding: '7px 14px',
                      fontFamily: PJS,
                      fontWeight: 600,
                      fontSize: 12,
                      color: COLORS.muted,
                      background: 'transparent',
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 20,
                      cursor: 'pointer',
                    }}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
