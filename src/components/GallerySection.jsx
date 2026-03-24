import { motion } from 'framer-motion'
import PaperTexture, { paperStyle } from './PaperTexture'

// odd=-3deg, even=2.5deg, 3n=-1.5deg (espelha CSS nth-child)
const ROTATIONS = [-3, 2.5, -1.5, 2.5, -3, -1.5, -3]

function TimelineDot() {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        width: 16,
        height: 16,
        borderRadius: 4,
        background: '#000000',
        zIndex: 3,
        flexShrink: 0,
        transform: 'translateX(-50%) rotate(45deg)',
      }}
    />
  )
}

function GalleryItem({ photo, index }) {
  const rotation = ROTATIONS[index % ROTATIONS.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Timeline dot */}
      <TimelineDot />

      {/* Polaroid card — proporção Instagram 4:5 */}
      <div
        style={{
          marginTop: 24,
          width: 286,
          height: 387,
          background: '#E8E3DA',
          borderRadius: 3,
          padding: '10px 10px 52px 10px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
          transform: `rotate(${rotation}deg)`,
          flexShrink: 0,
        }}
      >
        {/* Foto 4:5 — 200×250px */}
        <div style={{ width: 266, height: 325, overflow: 'hidden' }}>
          {photo.src ? (
            <img
              src={photo.src}
              alt={photo.caption}
              style={{ width: 266, height: 325, objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <div
              style={{
                width: 266,
                height: 325,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.06)',
                fontSize: 40,
              }}
            >
              📷
            </div>
          )}
        </div>

        {/* Legenda na margem inferior */}
        {photo.caption && (
          <p
            style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: 24,
              color: '#1a1a1a',
              textAlign: 'center',
              marginTop: 8,
              lineHeight: 1.3,
            }}
          >
            {photo.caption}
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default function GallerySection({ photos }) {
  return (
    <section
      className="py-4 pb-14 relative"
      style={{ overflow: 'hidden', ...paperStyle }}
    >
      <PaperTexture />
      <h2
        className="mb-10 mt-5"
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(26px, 7vw, 36px)',
          color: '#000000',
          textTransform: 'capitalize',
          letterSpacing: '-0.02em',
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
        }}
      >
        Nossa História
      </h2>

      <div className="flex flex-col" style={{ gap: 48, position: 'relative' }}>
        {/* Fio vertical — começa no primeiro dot */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 2.5,
            background: '#000000',
            zIndex: 1,
          }}
        />
        {photos.map((photo, index) => (
          <GalleryItem key={index} photo={photo} index={index} />
        ))}
      </div>
    </section>
  )
}
