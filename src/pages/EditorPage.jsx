import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'

const PJS = "'Plus Jakarta Sans', sans-serif"
const COLORS = {
  bg: '#FFF8F5',
  primary: '#C2185B',
  primaryLight: '#F48FB1',
  text: '#3E2723',
  muted: '#a08060',
  border: '#E0D6CC',
  inputBg: '#ffffff',
  success: '#2e7d32',
  error: '#C2185B',
}

const CAPTION_PLACEHOLDERS = [
  'O começo de tudo',
  'Nossa primeira vez',
  'Te encontrei',
  'Momentos assim',
  'Sempre juntos',
]

function isValidYouTubeUrl(url) {
  return url.includes('youtube.com/watch?v=') || url.includes('youtu.be/')
}

function formatSlug(value) {
  return value.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/--+/g, '-')
}

// ── Componentes base ──────────────────────────────────────────────────────────

function ProgressBar({ step }) {
  return (
    <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map(s => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', flex: s < 5 ? 1 : 'none' }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: PJS,
              fontWeight: 700,
              fontSize: 12,
              flexShrink: 0,
              background: step === s ? COLORS.primary : step > s ? COLORS.primaryLight : 'transparent',
              border: step < s ? `1.5px solid ${COLORS.border}` : 'none',
              color: step >= s ? '#ffffff' : COLORS.muted,
            }}
          >
            {s}
          </div>
          {s < 5 && (
            <div style={{
              flex: 1,
              height: 2,
              background: step > s ? COLORS.primaryLight : COLORS.border,
            }} />
          )}
        </div>
      ))}
    </div>
  )
}

function Field({ label, hint, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {label && (
        <label style={{
          display: 'block',
          fontFamily: PJS,
          fontWeight: 600,
          fontSize: 13,
          color: COLORS.text,
          marginBottom: 6,
        }}>
          {label}
        </label>
      )}
      {children}
      {hint && (
        <span style={{
          fontFamily: PJS,
          fontSize: 12,
          color: COLORS.muted,
          marginTop: 6,
        }}>
          {hint}
        </span>
      )}
    </div>
  )
}

// ── Steps ─────────────────────────────────────────────────────────────────────

function Step1({ form, updateForm }) {
  const [focused, setFocused] = useState(null)
  const today = new Date().toISOString().split('T')[0]

  function inputStyle(name) {
    return {
      width: '100%',
      padding: '14px 16px',
      fontSize: 15,
      fontFamily: PJS,
      color: COLORS.text,
      background: COLORS.inputBg,
      border: `1px solid ${focused === name ? COLORS.primary : COLORS.border}`,
      borderRadius: 12,
      outline: 'none',
      boxSizing: 'border-box',
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Field label="Nomes do casal" hint="Use & para separar os nomes">
        <input
          type="text"
          value={form.names}
          onChange={e => updateForm('names', e.target.value)}
          onFocus={() => setFocused('names')}
          onBlur={() => setFocused(null)}
          style={inputStyle('names')}
          placeholder="Ex: João & Maria"
        />
      </Field>

      <Field label="Quando o relacionamento começou?">
        <input
          type="date"
          value={form.start_date}
          onChange={e => updateForm('start_date', e.target.value)}
          onFocus={() => setFocused('date')}
          onBlur={() => setFocused(null)}
          style={inputStyle('date')}
          max={today}
        />
      </Field>
    </div>
  )
}

function Step2({ form, updateForm }) {
  const [focused, setFocused] = useState(false)

  return (
    <Field
      label="Escreva sua carta"
      hint="Essa carta aparece com visual manuscrito para quem abrir o presente"
    >
      <textarea
        value={form.letter_text}
        onChange={e => updateForm('letter_text', e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: '14px 16px',
          fontSize: 15,
          fontFamily: PJS,
          color: COLORS.text,
          background: COLORS.inputBg,
          border: `1px solid ${focused ? COLORS.primary : COLORS.border}`,
          borderRadius: 12,
          outline: 'none',
          boxSizing: 'border-box',
          height: 240,
          resize: 'vertical',
        }}
        placeholder="Escreva aqui o que você sente..."
      />
    </Field>
  )
}

function Step3({ form, updateForm }) {
  const fileRef = useRef(null)

  function handleFiles(e) {
    const files = Array.from(e.target.files)
    const remaining = 5 - form.photos.length
    const newPhotos = files.slice(0, remaining).map(file => ({
      file,
      caption: '',
      preview: URL.createObjectURL(file),
    }))
    updateForm('photos', [...form.photos, ...newPhotos])
    e.target.value = ''
  }

  function removePhoto(index) {
    const photo = form.photos[index]
    if (photo.preview) URL.revokeObjectURL(photo.preview)
    updateForm('photos', form.photos.filter((_, i) => i !== index))
  }

  function updateCaption(index, caption) {
    updateForm('photos', form.photos.map((p, i) => i === index ? { ...p, caption } : p))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {form.photos.length < 5 && (
        <>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            style={{
              width: '100%',
              padding: '32px 0',
              border: `2px dashed ${COLORS.border}`,
              borderRadius: 12,
              background: 'transparent',
              fontFamily: PJS,
              fontSize: 14,
              color: COLORS.muted,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ fontSize: 24 }}>📷</span>
            <span>Adicionar foto</span>
            <span style={{ fontSize: 12 }}>{form.photos.length}/5 fotos</span>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFiles}
            style={{ display: 'none' }}
          />
        </>
      )}

      {form.photos.map((photo, i) => (
        <div
          key={i}
          style={{
            borderRadius: 12,
            overflow: 'hidden',
            background: COLORS.inputBg,
            border: `1px solid ${COLORS.border}`,
            position: 'relative',
          }}
        >
          <button
            type="button"
            onClick={() => removePhoto(i)}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.5)',
              border: 'none',
              color: '#fff',
              fontSize: 18,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              lineHeight: 1,
            }}
          >
            ×
          </button>
          <img
            src={photo.preview || photo.src}
            alt=""
            style={{
              width: '100%',
              aspectRatio: '4/5',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <div style={{ padding: '12px 16px' }}>
            <input
              type="text"
              value={photo.caption}
              onChange={e => updateCaption(i, e.target.value)}
              placeholder={CAPTION_PLACEHOLDERS[i] || 'Legenda...'}
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: 14,
                fontFamily: PJS,
                color: COLORS.text,
                background: COLORS.bg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function Step4({ form, updateForm }) {
  const [focused, setFocused] = useState(false)
  const [preview, setPreview] = useState(null)
  const [loadingPreview, setLoadingPreview] = useState(false)

  useEffect(() => {
    const url = form.music_url
    if (!isValidYouTubeUrl(url)) {
      setPreview(null)
      setLoadingPreview(false)
      return
    }
    setLoadingPreview(true)
    const timer = setTimeout(async () => {
      try {
        const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
        const res = await fetch(oEmbedUrl)
        if (!res.ok) throw new Error()
        const data = await res.json()
        setPreview({ title: data.title, author: data.author_name })
      } catch {
        setPreview({ error: true })
      } finally {
        setLoadingPreview(false)
      }
    }, 500)
    return () => { clearTimeout(timer); setLoadingPreview(false) }
  }, [form.music_url])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Field
        label="Link da música no YouTube"
        hint="Cole o link do YouTube. Essa música toca durante toda a experiência."
      >
        <input
          type="url"
          value={form.music_url}
          onChange={e => updateForm('music_url', e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            padding: '14px 16px',
            fontSize: 15,
            fontFamily: PJS,
            color: COLORS.text,
            background: COLORS.inputBg,
            border: `1px solid ${focused ? COLORS.primary : COLORS.border}`,
            borderRadius: 12,
            outline: 'none',
            boxSizing: 'border-box',
          }}
          placeholder="https://www.youtube.com/watch?v=..."
        />
      </Field>

      {loadingPreview && (
        <p style={{ fontFamily: PJS, fontSize: 13, color: COLORS.muted, margin: 0 }}>
          Carregando prévia...
        </p>
      )}

      {preview && !loadingPreview && (
        preview.error ? (
          <p style={{ fontFamily: PJS, fontSize: 13, color: COLORS.error, margin: 0 }}>
            Não foi possível carregar a prévia
          </p>
        ) : (
          <div style={{
            padding: '14px 16px',
            background: COLORS.inputBg,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 12,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}>
            <p style={{ fontFamily: PJS, fontWeight: 700, fontSize: 14, color: COLORS.text, margin: 0 }}>
              {preview.title}
            </p>
            <p style={{ fontFamily: PJS, fontSize: 13, color: COLORS.muted, margin: 0 }}>
              {preview.author}
            </p>
          </div>
        )
      )}
    </div>
  )
}

function Step5({ form, updateForm, isEditing, slugStatus }) {
  const [focused, setFocused] = useState(false)

  function handleSlugChange(e) {
    updateForm('slug', formatSlug(e.target.value))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Field label="Escolha a URL do presente">
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <span style={{
            padding: '14px 12px',
            fontFamily: PJS,
            fontSize: 14,
            color: COLORS.muted,
            background: '#F0E6D8',
            border: `1px solid ${COLORS.border}`,
            borderRight: 'none',
            borderRadius: '12px 0 0 12px',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
          }}>
            /p/
          </span>
          <input
            type="text"
            value={form.slug}
            onChange={handleSlugChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={isEditing}
            style={{
              flex: 1,
              padding: '14px 16px',
              fontSize: 15,
              fontFamily: PJS,
              color: COLORS.text,
              background: isEditing ? '#F0E6D8' : COLORS.inputBg,
              border: `1px solid ${focused ? COLORS.primary : COLORS.border}`,
              borderRadius: '0 12px 12px 0',
              outline: 'none',
              boxSizing: 'border-box',
              opacity: isEditing ? 0.8 : 1,
            }}
            placeholder="joao-e-maria"
          />
        </div>

        {slugStatus === 'checking' && (
          <span style={{ fontFamily: PJS, fontSize: 12, color: COLORS.muted, marginTop: 6, display: 'block' }}>
            Verificando...
          </span>
        )}
        {slugStatus === 'taken' && (
          <span style={{ fontFamily: PJS, fontSize: 12, color: COLORS.error, marginTop: 6, display: 'block' }}>
            ❌ Essa URL já está em uso
          </span>
        )}
        {(slugStatus === 'available' || slugStatus === 'locked') && (
          <span style={{ fontFamily: PJS, fontSize: 12, color: COLORS.success, marginTop: 6, display: 'block' }}>
            ✅ {isEditing ? 'URL atual do presente' : 'Disponível!'}
          </span>
        )}
      </Field>
    </div>
  )
}

// ── Tela de sucesso ───────────────────────────────────────────────────────────

function SuccessScreen({ slug, isEditing, navigate }) {
  const url = `${window.location.origin}/p/${slug}`
  const [copied, setCopied] = useState(false)

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: COLORS.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
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
        <span style={{ fontSize: 64, color: COLORS.primary }}>♥</span>

        <h2 style={{
          fontFamily: PJS,
          fontWeight: 800,
          fontSize: 24,
          color: COLORS.primary,
          margin: 0,
        }}>
          {isEditing ? 'Alterações salvas!' : 'Presente publicado!'}
        </h2>

        <p style={{
          fontFamily: PJS,
          fontSize: 14,
          color: COLORS.muted,
          margin: 0,
        }}>
          Compartilhe esse link com quem você ama
        </p>

        <div style={{
          width: '100%',
          padding: '14px 16px',
          background: COLORS.inputBg,
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
      </div>
    </div>
  )
}

// ── EditorPage ────────────────────────────────────────────────────────────────

const STEP_TITLES = ['Nomes & Data', 'Carta', 'Fotos', 'Música', 'Publicar']

export default function EditorPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const isEditing = !!slug

  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    names: '',
    start_date: '',
    letter_text: '',
    photos: [],
    music_url: '',
    slug: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [publishedSlug, setPublishedSlug] = useState(null)
  const [slugStatus, setSlugStatus] = useState('')

  // Carrega dados existentes no modo edição
  useEffect(() => {
    if (!isEditing || !supabase) return
    supabase
      .from('gifts')
      .select('*')
      .eq('slug', slug)
      .eq('user_id', user.id)
      .single()
      .then(({ data, error: fetchError }) => {
        if (fetchError || !data) { navigate('/meus-presentes'); return }
        setForm({
          names: data.names ?? '',
          start_date: data.start_date ?? '',
          letter_text: data.letter_text ?? '',
          photos: (data.photos ?? []).map(p => ({ src: p.src, caption: p.caption })),
          music_url: data.music_url ?? '',
          slug: data.slug ?? '',
        })
      })
  }, [isEditing, slug])

  // Verifica disponibilidade do slug (só no modo criação)
  useEffect(() => {
    if (isEditing) { setSlugStatus('locked'); return }
    if (form.slug.length < 3) { setSlugStatus(''); return }
    setSlugStatus('checking')
    const timer = setTimeout(async () => {
      if (!supabase) { setSlugStatus('available'); return }
      const { data } = await supabase
        .from('gifts')
        .select('slug')
        .eq('slug', form.slug)
        .maybeSingle()
      setSlugStatus(data ? 'taken' : 'available')
    }, 500)
    return () => clearTimeout(timer)
  }, [form.slug, isEditing])

  function updateForm(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function isCurrentStepValid() {
    const today = new Date().toISOString().split('T')[0]
    switch (step) {
      case 1: return form.names.trim().length >= 3 && !!form.start_date && form.start_date <= today
      case 2: return form.letter_text.trim().length >= 10
      case 3: return form.photos.length >= 1
      case 4: return isValidYouTubeUrl(form.music_url)
      case 5: return form.slug.length >= 3 && (slugStatus === 'available' || slugStatus === 'locked')
      default: return false
    }
  }

  async function handlePublish() {
    if (!supabase || !user) return
    setSaving(true)
    setError(null)
    try {
      const uploadedPhotos = await Promise.all(
        form.photos.map(async (photo, i) => {
          if (photo.file) {
            const ext = photo.file.name.split('.').pop() || 'jpg'
            const path = `${user.id}/${Date.now()}-${i}.${ext}`
            const { error: uploadError } = await supabase.storage
              .from('photos')
              .upload(path, photo.file)
            if (uploadError) throw uploadError
            const { data: { publicUrl } } = supabase.storage
              .from('photos')
              .getPublicUrl(path)
            return { src: publicUrl, caption: photo.caption }
          }
          return { src: photo.src, caption: photo.caption }
        })
      )

      const payload = {
        names: form.names,
        start_date: form.start_date,
        letter_text: form.letter_text,
        music_url: form.music_url,
        photos: uploadedPhotos,
        user_id: user.id,
      }

      if (isEditing) {
        // Edição: salva e mostra tela de sucesso (sem novo pagamento)
        const { error: dbError } = await supabase
          .from('gifts')
          .update(payload)
          .eq('slug', form.slug)
        if (dbError) throw dbError
        setPublishedSlug(form.slug)
      } else {
        // Criação: insere como draft e redireciona para pagamento
        const { data: gift, error: dbError } = await supabase
          .from('gifts')
          .insert({ ...payload, slug: form.slug, status: 'draft' })
          .select('id')
          .single()
        if (dbError) throw dbError

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
      }
    } catch (err) {
      setError(err.message)
      setSaving(false)
    }
  }

  if (publishedSlug) {
    return <SuccessScreen slug={publishedSlug} isEditing={isEditing} navigate={navigate} />
  }

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh' }}>
      <div style={{ maxWidth: 430, margin: '0 auto', position: 'relative', minHeight: '100vh' }}>

        {/* Header fixo */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 430,
          zIndex: 10,
          background: COLORS.bg,
          borderBottom: `1px solid ${COLORS.border}`,
        }}>
          <ProgressBar step={step} />
          <p style={{
            fontFamily: PJS,
            fontWeight: 700,
            fontSize: 16,
            color: COLORS.text,
            textAlign: 'center',
            margin: 0,
            paddingBottom: 12,
          }}>
            {STEP_TITLES[step - 1]}
          </p>
        </div>

        {/* Conteúdo */}
        <div style={{ padding: '96px 24px 104px' }}>
          {step === 1 && <Step1 form={form} updateForm={updateForm} />}
          {step === 2 && <Step2 form={form} updateForm={updateForm} />}
          {step === 3 && <Step3 form={form} updateForm={updateForm} />}
          {step === 4 && <Step4 form={form} updateForm={updateForm} />}
          {step === 5 && (
            <Step5
              form={form}
              updateForm={updateForm}
              isEditing={isEditing}
              slugStatus={slugStatus}
            />
          )}

          {error && (
            <p style={{
              fontFamily: PJS,
              fontSize: 13,
              color: COLORS.error,
              marginTop: 20,
              textAlign: 'center',
            }}>
              {error}
            </p>
          )}
        </div>

        {/* Footer fixo */}
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 430,
          zIndex: 10,
          background: COLORS.bg,
          borderTop: `1px solid ${COLORS.border}`,
          padding: '16px 24px',
          display: 'flex',
          gap: 12,
          boxSizing: 'border-box',
        }}>
          {step > 1 && (
            <button
              onClick={() => setStep(s => s - 1)}
              style={{
                flex: 1,
                padding: '14px 0',
                fontFamily: PJS,
                fontWeight: 700,
                fontSize: 15,
                color: COLORS.text,
                background: 'transparent',
                border: `1px solid ${COLORS.border}`,
                borderRadius: 24,
                cursor: 'pointer',
              }}
            >
              Voltar
            </button>
          )}
          <button
            onClick={step === 5 ? handlePublish : () => setStep(s => s + 1)}
            disabled={!isCurrentStepValid() || saving}
            style={{
              flex: 2,
              padding: '14px 0',
              fontFamily: PJS,
              fontWeight: 700,
              fontSize: 15,
              color: '#ffffff',
              background: COLORS.primary,
              border: 'none',
              borderRadius: 24,
              cursor: isCurrentStepValid() && !saving ? 'pointer' : 'not-allowed',
              opacity: isCurrentStepValid() && !saving ? 1 : 0.5,
            }}
          >
            {step === 5
              ? saving
                ? 'Publicando...'
                : isEditing
                  ? 'Salvar alterações ♥'
                  : 'Publicar presente ♥'
              : 'Próximo'}
          </button>
        </div>

      </div>
    </div>
  )
}
