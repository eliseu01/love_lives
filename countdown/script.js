// ── Configure a data de início aqui ──────────────────────
const START_DATE = new Date('2024-06-12T00:00:00')
// ─────────────────────────────────────────────────────────

const MONTHS = [
  'janeiro','fevereiro','março','abril','maio','junho',
  'julho','agosto','setembro','outubro','novembro','dezembro'
]

const daysEl    = document.getElementById('days')
const hoursEl   = document.getElementById('hours')
const minutesEl = document.getElementById('minutes')
const secondsEl = document.getElementById('seconds')
const sinceEl   = document.getElementById('since-date')

// Preenche "Desde X de mês de ano"
sinceEl.textContent =
  `${START_DATE.getDate()} de ${MONTHS[START_DATE.getMonth()]} de ${START_DATE.getFullYear()}`

function pad(n, digits = 2) {
  return String(n).padStart(digits, '0')
}

function animateFlip(el, newValue, digits = 2) {
  const formatted = pad(newValue, digits)
  if (el.textContent === formatted) return
  el.classList.add('flip')
  setTimeout(() => {
    el.textContent = formatted
    el.classList.remove('flip')
  }, 150)
}

function update() {
  const diff = Date.now() - START_DATE.getTime()

  const totalSeconds = Math.floor(diff / 1000)
  const seconds = totalSeconds % 60
  const totalMinutes = Math.floor(totalSeconds / 60)
  const minutes = totalMinutes % 60
  const totalHours = Math.floor(totalMinutes / 60)
  const hours = totalHours % 24
  const days = Math.floor(totalHours / 24)

  animateFlip(daysEl,    days,    4)
  animateFlip(hoursEl,   hours,   2)
  animateFlip(minutesEl, minutes, 2)
  animateFlip(secondsEl, seconds, 2)
}

update()
setInterval(update, 1000)
