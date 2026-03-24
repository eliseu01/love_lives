import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PaperTexture, { paperStyle } from './PaperTexture'

// Corações que flutuam de baixo para cima
const HEARTS = [
  { id: 1, x: '20%', size: 16, delay: 0,    color: '#F48FB1' },
  { id: 2, x: '45%', size: 24, delay: 0.3,  color: '#C2185B' },
  { id: 3, x: '70%', size: 14, delay: 0.6,  color: '#F48FB1' },
  { id: 4, x: '30%', size: 20, delay: 0.9,  color: '#C2185B' },
  { id: 5, x: '60%', size: 18, delay: 1.2,  color: '#F48FB1' },
  { id: 6, x: '10%', size: 12, delay: 1.5,  color: '#C2185B' },
  { id: 7, x: '80%', size: 22, delay: 0.15, color: '#F48FB1' },
]

function FloatingHeart({ x, size, delay, color }) {
  return (
    <motion.div
      style={{ position: 'absolute', left: x, bottom: '10%', fontSize: size }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: -500, opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2, delay, ease: 'easeOut' }}
    >
      <span style={{ color }}>♥</span>
    </motion.div>
  )
}

export default function LoadingSection({ onDone }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{ ...paperStyle }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <PaperTexture />
          {/* Corações flutuantes */}
          {HEARTS.map((h) => (
            <FloatingHeart key={h.id} {...h} />
          ))}

          {/* Coração central pulsando */}
          <motion.div
            className="text-6xl mb-4 select-none"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span style={{ color: '#C2185B' }}>♥</span>
          </motion.div>

          <p
            className="text-sm italic"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#C2185B' }}
          >
            carregando algo especial...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
