import { useState, useEffect, useRef } from 'react'
import PaperTexture, { paperStyle } from './PaperTexture'

function getElapsed(startDate) {
  const start = new Date(startDate).getTime()
  const now = Date.now()
  const diff = now - start
  const totalSeconds = Math.floor(diff / 1000)
  const seconds = totalSeconds % 60
  const totalMinutes = Math.floor(totalSeconds / 60)
  const minutes = totalMinutes % 60
  const totalHours = Math.floor(totalMinutes / 60)
  const hours = totalHours % 24
  const days = Math.floor(totalHours / 24)
  return { days, hours, minutes, seconds }
}

function CountBlock({ value, label }) {
  const [flipping, setFlipping] = useState(false)
  const prevValue = useRef(value)

  useEffect(() => {
    if (prevValue.current !== value) {
      setFlipping(true)
      const t = setTimeout(() => setFlipping(false), 150)
      prevValue.current = value
      return () => clearTimeout(t)
    }
  }, [value])

  return (
    <div className="flex flex-col items-center" style={{ minWidth: 'clamp(40px, 10vw, 52px)' }}>
      <span
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(24px, 7vw, 36px)',
          color: '#6b3a2a',
          lineHeight: 1,
          transition: 'transform 0.15s ease, opacity 0.15s ease',
          transform: flipping ? 'translateY(-4px)' : 'translateY(0)',
          opacity: flipping ? 0.3 : 1,
          display: 'block',
        }}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 600,
          fontSize: 'clamp(9px, 2.5vw, 11px)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#a08060',
          marginTop: 6,
        }}
      >
        {label}
      </span>
    </div>
  )
}

function Separator() {
  return (
    <span
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 700,
        fontSize: 'clamp(20px, 6vw, 28px)',
        color: '#c4a882',
        lineHeight: 1,
        paddingBottom: 18,
        flexShrink: 0,
      }}
    >
      :
    </span>
  )
}

export default function CounterSection({ names, startDate }) {
  const [elapsed, setElapsed] = useState(() => getElapsed(startDate))

  useEffect(() => {
    const interval = setInterval(() => setElapsed(getElapsed(startDate)), 1000)
    return () => clearInterval(interval)
  }, [startDate])

  const formattedDate = new Date(startDate).toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  })

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ position: 'relative', overflow: 'hidden', ...paperStyle }}
    >
      <PaperTexture />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(16px, 4.5vw, 22px)',
            color: '#7a2c1e',
            marginBottom: 12,
            textAlign: 'center',
            letterSpacing: '-0.01em',
          }}
        >
          te amo a ❤️
        </p>

        <div
          style={{
            background: 'rgba(255,252,245,0.82)',
            backdropFilter: 'blur(4px)',
            borderRadius: 48,
            boxShadow: '0 8px 32px rgba(100,70,40,0.15)',
            padding: 'clamp(24px, 6vw, 40px) clamp(24px, 6vw, 40px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            width: 'min(100%, 340px)',
            border: '1px solid rgba(139,115,85,0.15)',
          }}
        >
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(11px, 3vw, 13px)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#a08060',
            }}
          >
            {names} · juntos há
          </p>

          <div className="flex items-end gap-1">
            <CountBlock value={elapsed.days}    label="Dias" />
            <Separator />
            <CountBlock value={elapsed.hours}   label="Horas" />
            <Separator />
            <CountBlock value={elapsed.minutes} label="Minutos" />
            <Separator />
            <CountBlock value={elapsed.seconds} label="Segundos" />
          </div>

          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(11px, 3vw, 13px)',
              color: '#a08060',
            }}
          >
            desde {formattedDate}
          </p>
        </div>
      </div>
    </section>
  )
}
