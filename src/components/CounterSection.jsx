import { useState, useEffect } from 'react'

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
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        width: 72,
        height: 72,
        background: '#FFFFFF',
        borderRadius: 12,
        border: '1px solid #F48FB1',
        boxShadow: '0 2px 8px rgba(194,24,91,0.08)',
      }}
    >
      <span
        style={{
          fontFamily: 'Playfair Display, serif',
          fontWeight: 700,
          fontSize: 26,
          color: '#C2185B',
          lineHeight: 1,
        }}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span
        style={{
          fontFamily: 'Lato, sans-serif',
          fontSize: 9,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: '#F48FB1',
          marginTop: 4,
        }}
      >
        {label}
      </span>
    </div>
  )
}

export default function CounterSection({ names, startDate }) {
  const [elapsed, setElapsed] = useState(() => getElapsed(startDate))

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(getElapsed(startDate))
    }, 1000)
    return () => clearInterval(interval)
  }, [startDate])

  const formattedDate = new Date(startDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ background: 'linear-gradient(180deg, #FFF0F3 0%, #FFF8F5 100%)' }}
    >
      <h2
        className="text-2xl font-bold text-center mb-2"
        style={{ fontFamily: 'Playfair Display, serif', color: '#C2185B' }}
      >
        {names}
      </h2>

      <p
        className="text-sm italic mb-1"
        style={{ fontFamily: 'Lato, sans-serif', color: '#F48FB1' }}
      >
        juntos há
      </p>

      <p
        className="text-xs mb-10"
        style={{ fontFamily: 'Lato, sans-serif', color: '#F48FB1' }}
      >
        desde {formattedDate}
      </p>

      {/* Blocos do contador */}
      <div className="flex items-center gap-2">
        <CountBlock value={elapsed.days} label="dias" />
        <Separator />
        <CountBlock value={elapsed.hours} label="horas" />
        <Separator />
        <CountBlock value={elapsed.minutes} label="min" />
        <Separator />
        <CountBlock value={elapsed.seconds} label="seg" />
      </div>
    </section>
  )
}

function Separator() {
  return (
    <span
      style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: 20,
        color: '#C2185B',
        lineHeight: 1,
        marginBottom: 12,
      }}
    >
      :
    </span>
  )
}
