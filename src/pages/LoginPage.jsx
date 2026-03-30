import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

function translateError(msg) {
  if (!msg) return ''
  if (msg.includes('Invalid login credentials')) return 'Email ou senha incorretos'
  if (msg.includes('User already registered')) return 'Este email já está cadastrado'
  if (msg.includes('Password should be at least')) return 'A senha deve ter no mínimo 6 caracteres'
  return msg
}

export default function LoginPage() {
  const navigate = useNavigate()
  const { signIn, signUp } = useAuth()

  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  function inputStyle(field) {
    return {
      width: '100%',
      padding: '14px 16px',
      fontSize: 15,
      fontFamily: PJS,
      color: COLORS.text,
      background: COLORS.inputBg,
      border: `1px solid ${focusedField === field ? COLORS.primary : COLORS.border}`,
      borderRadius: 12,
      outline: 'none',
      boxSizing: 'border-box',
    }
  }

  const labelStyle = {
    display: 'block',
    fontFamily: PJS,
    fontWeight: 600,
    fontSize: 13,
    color: COLORS.text,
    marginBottom: 6,
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (mode === 'signup' && password !== confirm) {
      setError('As senhas não coincidem')
      return
    }

    setLoading(true)

    const fn = mode === 'login' ? signIn : signUp
    const { error: authError } = await fn(email, password)

    setLoading(false)

    if (authError) {
      setError(translateError(authError.message))
      return
    }

    navigate('/meus-presentes')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: COLORS.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
      }}
    >
      <div style={{ width: '100%', maxWidth: 360 }}>
        {/* Título */}
        <h1
          style={{
            fontFamily: PJS,
            fontWeight: 800,
            fontSize: 28,
            color: COLORS.primary,
            textAlign: 'center',
            marginBottom: 8,
          }}
        >
          LoveStory ♥
        </h1>

        {/* Subtítulo */}
        <p
          style={{
            fontFamily: PJS,
            fontSize: 15,
            color: COLORS.muted,
            textAlign: 'center',
            marginBottom: 32,
          }}
        >
          {mode === 'login' ? 'Entre na sua conta' : 'Crie sua conta'}
        </p>

        {/* Toggle Login / Cadastro */}
        <div
          style={{
            display: 'flex',
            background: '#F0E6D8',
            borderRadius: 12,
            padding: 4,
            marginBottom: 28,
          }}
        >
          {['login', 'signup'].map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError('') }}
              style={{
                flex: 1,
                padding: '10px 0',
                fontFamily: PJS,
                fontWeight: 600,
                fontSize: 14,
                color: mode === m ? '#ffffff' : COLORS.muted,
                background: mode === m ? COLORS.primary : 'transparent',
                border: 'none',
                borderRadius: 9,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {m === 'login' ? 'Entrar' : 'Criar conta'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Email */}
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              style={inputStyle('email')}
              placeholder="seu@email.com"
            />
          </div>

          {/* Senha */}
          <div>
            <label style={labelStyle}>Senha</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              style={inputStyle('password')}
              placeholder="mínimo 6 caracteres"
            />
          </div>

          {/* Confirmar senha (só no cadastro) */}
          {mode === 'signup' && (
            <div>
              <label style={labelStyle}>Confirmar senha</label>
              <input
                type="password"
                required
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                onFocus={() => setFocusedField('confirm')}
                onBlur={() => setFocusedField(null)}
                style={inputStyle('confirm')}
                placeholder="repita a senha"
              />
            </div>
          )}

          {/* Erro */}
          {error && (
            <p
              style={{
                fontFamily: PJS,
                fontSize: 13,
                color: COLORS.primary,
                textAlign: 'center',
                margin: 0,
              }}
            >
              {error}
            </p>
          )}

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
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
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              marginTop: 4,
            }}
          >
            {loading
              ? 'Aguarde...'
              : mode === 'login'
              ? 'Entrar'
              : 'Criar conta'}
          </button>
        </form>
      </div>
    </div>
  )
}
