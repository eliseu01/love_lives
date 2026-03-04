import { motion } from 'framer-motion'

// Rotações alternadas das polaroids
const ROTATIONS = [-3, 2.5, -2, 3, -1.5]

// Placeholder quando não há foto
function PhotoPlaceholder() {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: '100%',
        aspectRatio: '1 / 1',
        background: '#F0E0D0',
        color: '#C2185B',
        fontSize: 32,
        opacity: 0.5,
      }}
    >
      📷
    </div>
  )
}

function Polaroid({ photo, index }) {
  const rotation = ROTATIONS[index % ROTATIONS.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{
        transform: `rotate(${rotation}deg)`,
        background: '#FFFFFF',
        padding: '12px 12px 36px 12px',
        borderRadius: 2,
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        width: '72%',
        // Alterna posição horizontal para criar ritmo visual
        alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
        marginLeft: index % 2 === 0 ? '8%' : 'auto',
        marginRight: index % 2 !== 0 ? '8%' : 'auto',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Prendedor (clip) */}
      <div
        style={{
          position: 'absolute',
          top: -6,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: '#C2185B',
          zIndex: 3,
        }}
      />

      {/* Foto */}
      <div style={{ overflow: 'hidden', borderRadius: 1 }}>
        {photo.src ? (
          <img
            src={photo.src}
            alt={photo.caption}
            style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <PhotoPlaceholder />
        )}
      </div>

      {/* Legenda */}
      <p
        className="text-center mt-2"
        style={{
          fontFamily: 'Dancing Script, cursive',
          fontSize: 15,
          color: '#3E2723',
        }}
      >
        {photo.caption}
      </p>
    </motion.div>
  )
}

export default function GallerySection({ photos }) {
  return (
    <section
      className="py-16 relative"
      style={{ background: '#FFF8F5' }}
    >
      {/* Fio vertical */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 1.5,
          background: '#C2185B',
          opacity: 0.3,
          zIndex: 1,
        }}
      />

      <h2
        className="text-center text-2xl mb-12"
        style={{ fontFamily: 'Playfair Display, serif', color: '#C2185B' }}
      >
        Nossas Memórias
      </h2>

      <div className="flex flex-col gap-10">
        {photos.map((photo, index) => (
          <Polaroid key={index} photo={photo} index={index} />
        ))}
      </div>
    </section>
  )
}
